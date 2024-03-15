function fn_calculateHash(input_value) {
    const {
        glb_null_replace,
        glb_hash_concat,
        glb_hash_algorithm
    } = env_vars;

    //const aliasPrefix = alias ? `${alias}.` : '';

    const fetchValue = input_value;
    const value = fetchValue.map((v) => `coalesce(cast(trim(cast(${v} as STRING)) as STRING), '${glb_null_replace}')`).join('||"~"||');
    const calculateHash = `TO_HEX(${glb_hash_algorithm}(${value}))`
    return `(${calculateHash})`;
}

// Calculate the business key ,'bk'. '<>' for readability
function fn_calculateConcat(input_value) {
    const {
        glb_null_replace
    } = env_vars;
    const fetchValue = input_value;
    const value = fetchValue.map((v) => `coalesce(cast(${v} as STRING), '${glb_null_replace}')`).join('||"<>"||');
    const calculateHash = `(${value})`
    return `(${calculateHash})`;
}

function fn_setIncrWhere(source, batch, alias) {
    // extract values from object being passed
    let inc_src_col = source.source_incr_load_column;
    const fullScanFlag = source.source_full_read_flag;
    const OverlapFlag = source.pvt_overlap_days;

    const batch_code = batch.batch_code;

    //extract environmental and global variables
    const batch_table = env_vars.glb_audit_batch_control;
    const hist_load_ts = env_vars.glb_hist_load_ts;

    //declare individual query condition
    const greaterThan = `(SELECT batch_extract_load_start_ts FROM ${batch_table} WHERE batch_code = "${batch_code}")`;
    const lessThan = `(SELECT batch_extract_load_end_ts FROM ${batch_table} WHERE batch_code = "${batch_code}")`;

    // alias if passed will be used else skipped
    const aliasPrefix = alias ? `${alias}.` : '';

    // consolidated condition
    const condition = fullScanFlag === "N" ?
        `BETWEEN ${greaterThan} AND ${lessThan}` :
        `> "${hist_load_ts}"`;
    
    return `WHERE cast(${aliasPrefix}${inc_src_col} as DATETIME) ${condition}`;
    

}


//----UPDATED (replaced 'AND' with 'OR')----- fetch 'compare_list' array and create comparison statement separated by logical 'OR'
function fn_updateColCompareList(column_list) {
    return column_list.map(col => `coalesce(CAST(tgt.${col} AS STRING),'^') != coalesce(CAST(src.${col} AS STRING),'^')`).join(' OR ');
}


/*UPDATED LOGIC*/
// fn_scd2_load takes processed table, target table, and target object as arguments.
// It returns the SCD Type-2 statement by comparing necessary values between the processed and target tables.

function fn_SCD2load(processed_table, target_table, target, load_type) {
    // Destructuring properties from the target object
    const {
        bk,
        hash_dif,
        dk,
        insert_list,
        compare_list
    } = target;

    // Initialize variables for unique_key (bk), hash difference (hk), datakey (dk),
    // column list for insert, and compare list using the provided functions.
    let unique_key = bk;
    //let hash_dif = hk;
    let datakey = dk;
    let column_list = insert_list;

    // Generate the list of columns to compare
    let compare_listString = fn_updateColCompareList(compare_list);
    // Checking if hash_dif exists or not for the given target table, ignore hash key compariso if not exists
    if (hash_dif === "") {
        return `
      MERGE INTO ${target_table} AS tgt
      USING (
        -- Selecting all the records from the processed table, duplicating unique with different alias name
        SELECT distinct ${processed_table}.${unique_key} AS join_key, ${processed_table}.*
        FROM ${processed_table}
        WHERE vld_fm_ts IN (
          SELECT vld_fm_ts
          FROM (
            SELECT vld_fm_ts, ROW_NUMBER() OVER (PARTITION BY ${unique_key} ORDER BY vld_fm_ts DESC) AS rank
            FROM ${processed_table}
          )
          WHERE rank = 1
        )
        UNION ALL
        -- Adding a Null record for the inserting condition
        SELECT distinct CAST(NULL AS String) as join_key, src.*
        FROM ${processed_table} src
        JOIN ${target_table} tgt
        ON src.${unique_key} = tgt.${unique_key}
        WHERE (${compare_listString}
          AND tgt.vld_to_ts = '9999-12-31T00:00:00')
          AND src.vld_fm_ts IN (
            SELECT vld_fm_ts
            FROM (
              SELECT vld_fm_ts, ROW_NUMBER() OVER (PARTITION BY ${unique_key} ORDER BY vld_fm_ts DESC) AS rank
              FROM ${processed_table}
            )
            WHERE rank = 1
          )
      ) src
      -- Joining on join key to create duplicates of records to be updated or inserted
      ON src.join_key = tgt.${unique_key}
      WHEN MATCHED AND ${compare_listString} AND tgt.vld_to_ts = '9999-12-31T00:00:00'
      THEN
        -- Update condition for updating valid_to_ts value only and any data column
        UPDATE SET tgt.vld_to_ts = src.vld_fm_ts
      -- Insert records whether new or updated
      WHEN NOT MATCHED AND src.vld_to_ts='9999-12-31T00:00:00' THEN 
        INSERT (${column_list})
        VALUES (${column_list})`;
    } else {
        // Include hash_dif comparison if hash_dif exists for given target table
        return `
      MERGE INTO ${target_table} AS tgt 
      USING (
        -- Selecting all the records from the target table, duplicating unique with different alias name
        SELECT distinct ${processed_table}.${unique_key} AS join_key, ${processed_table}.*
        FROM ${processed_table}
        WHERE vld_fm_ts IN (
          SELECT vld_fm_ts
          FROM (
            SELECT vld_fm_ts, ROW_NUMBER() OVER (PARTITION BY ${unique_key} ORDER BY vld_fm_ts DESC) AS rank
            FROM ${processed_table}
          )
          WHERE rank = 1
        )
        UNION ALL
        -- Adding a Null record for the inserting condition
        SELECT distinct CAST(NULL AS String) as join_key, src.*
        FROM ${processed_table} src
        JOIN ${target_table} tgt
        ON src.${unique_key} = tgt.${unique_key}
        WHERE (
          src.${hash_dif} != tgt.${hash_dif} AND
          --src.${datakey} != tgt.${datakey} AND
          tgt.vld_to_ts = '9999-12-31T00:00:00'
        )
        AND src.vld_fm_ts IN (
          SELECT vld_fm_ts
          FROM (
            SELECT vld_fm_ts, ROW_NUMBER() OVER (PARTITION BY ${unique_key} ORDER BY vld_fm_ts DESC) AS rank
            FROM ${processed_table}
          )
          WHERE rank = 1
        )
      ) src
      -- Joining on join key to create duplicates of records to be updated or inserted
      ON src.join_key = tgt.${unique_key}
      WHEN MATCHED AND src.${hash_dif} != tgt.${hash_dif} AND tgt.vld_to_ts = '9999-12-31T00:00:00'
      THEN
        -- Update condition for updating valid_to_ts value only and any data column
        UPDATE SET tgt.vld_to_ts = src.vld_fm_ts
      -- Insert records whether new or updated
      WHEN NOT MATCHED THEN
        INSERT (${column_list})
        VALUES (${column_list})`;
    }
}

/*UPDATED LOGIC*/
//fn_insertload takes processed table name, target table name and object as the arguments
// The function only inserts the data after comparing necessary attributes, no updates are done on data
function fn_insertload(processed_table, target_table, target) {
    // Destructuring properties from the target object

    const {
        bk,
        hash_dif,
        dk,
        insert_list,
        compare_list
    } = target;
    
    const {
        glb_null_replace,
        glb_hash_concat,
        glb_hash_algorithm
    } = env_vars;

    // Initialize variables for unique_key (bk), hash difference (hk), datakey (dk),
    // column list for insert, and compare list using the provided functions.
    let unique_key = bk;
    let unique_key1 = dk;
    let datakey = dk;
    let column_list = insert_list;

    let compare_listString = fn_updateColCompareList(compare_list);

	  let tgt_join = unique_key.map((v) => `tgt.${v} `).join(' || ');
    let src_join_key = unique_key.map((v) => `${processed_table}.${v} `).join(' || ');
    let rank_value='=1';

    let find_index=target_table.indexOf('_arr')
    if (find_index>1) {
	
   rank_value= '=rank';
   tgt_join = unique_key1.map((v) => `tgt.${v} `).join(' || ');
   src_join_key = unique_key1.map((v) => `${processed_table}.${v} `).join(' || ');

}
    return `
      MERGE INTO ${target_table} AS tgt
      USING (
        -- Selecting all the records from the processed table, duplicating unique with different alias name
        SELECT ${src_join_key} AS join_key,
         ${processed_table}.*
        FROM ${processed_table}
        WHERE vld_fm_ts IN (
          SELECT vld_fm_ts
          FROM (
            SELECT vld_fm_ts, ROW_NUMBER() OVER (PARTITION BY ${src_join_key} ORDER BY vld_fm_ts DESC) AS rank
            FROM ${processed_table}
          )
          WHERE rank ${rank_value}
        )
      ) src
      -- Joining on join key to create duplicates of records to be updated or inserted
      ON src.join_key = ${tgt_join} AND NOT(${compare_listString})
      --ON src.join_key = tgt.${unique_key}.replace('||','|| tgt.') AND NOT(${compare_listString})
      -- Insert records whether new or updated
      WHEN NOT MATCHED THEN
        INSERT (${column_list})
        VALUES (${column_list});`;
};


function fn_getSK(src_cd, cmn_cd_sk){
  return `CASE
  WHEN ${src_cd} IS NULL THEN '-2'
  WHEN ${src_cd} IS NOT NULL and ${cmn_cd_sk} IS NULL THEN '-1'
  ELSE ${cmn_cd_sk}
  END`
}


function fn_batchstart(){
  let dataverse_project = dataform.projectConfig.vars.master_project;
  let dataprocess_dataset = dataform.projectConfig.vars.stg_dataset;
  return `
  CALL \`${dataverse_project}.${dataprocess_dataset}.BatchStart\`('datahub-dataload');`;
}

function fn_batchend(){
  let dataverse_project = dataform.projectConfig.vars.master_project;
  let dataprocess_dataset = dataform.projectConfig.vars.stg_dataset;
  return `
  CALL \`${dataverse_project}.${dataprocess_dataset}.BatchEnd\`('datahub-dataload');`;
}

module.exports = {
    fn_calculateHash,
    fn_calculateConcat,
    fn_setIncrWhere,
    fn_SCD2load,
    fn_insertload,
    fn_getSK,
    fn_batchstart,
    fn_batchend
}; 