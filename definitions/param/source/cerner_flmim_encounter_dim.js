const job = {
    job_code: "job_cerner_flmim_datahub_encounter_dim",
    job_desc: "Loads ehr cerner encounter related subject area data into datahub"
};

const source = {
    dk: ["enc_id","'CERNER~FLMIM'" , "current_datetime()"],
    bk: ["enc_id","'CERNER~FLMIM'"],
    hash_dif: ["encntr_type_cd"		
        ,"adm_type_cd"		
        ,"adm_ts"		
        ,"dschrg_ts"],
    source_incr_load_column: ["extract_ts"],
    source_full_read_flag: "N",

    hist_load_timestamp: null,
    source_code : "CERNER~FLMIM",
    source_table:"encounter",
    stage_table:"step_tbl_process_cerner_flmim_encounter_dim",
    target_table:"encounter_dim",
    pvt_overlap_days: "7"
};


module.exports = {
    job,
    source
};
