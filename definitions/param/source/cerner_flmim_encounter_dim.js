const job = {
    job_code: "job_cerner_flmim_datahub_encounter_dim",
    job_desc: "Loads ehr cerner encounter related subject area data into datahub"
};

const source = {
    dk: ["enc_id","'CERNER~FLMIM'" , "current_datetime()"],
    bk: ["enc_id","'CERNER~FLMIM'"],
    hash_dif: ["encntr_type_cd"
        ,"encntr_type_descr"				
        ,"encntr_num"		
        ,"encntr_seq"		
        ,"encntr_key_id"		
        ,"adm_cpln_txt"		
        ,"adm_loc_cd"		
        ,"adm_loc_descr"		
        ,"ub_adm_type_cd"		
        ,"adm_type_cd"		
        ,"adm_type_descr"		
        ,"adm_rsn_cd"		
        ,"adm_rsn_descr"		
        ,"ub_dschrg_sts_cd"		
        ,"dschrg_sts_cd"
        ,"dschrg_sts_descr"		
        ,"ub_ptnt_cl_cd"		
        ,"ptnt_cl_cd"			
        ,"ptnt_cl_descr"		
        ,"ub_pnt_of_orig_cd"		
        ,"pnt_of_orig_cd"		
        ,"pnt_of_orig_descr"				
        ,"plc_of_svc_cd"		
        ,"plc_of_svc_descr"			
        ,"publ_cd_dt"		
        ,"publ_cd"		
        ,"publ_descr"		
        ,"adm_dt"	
        ,"adm_ts"		
        ,"dschrg_ts"			
        ,"act_los_day_cnt"			
        ,"palliative_care_ind"		
        ,"hspc_care_ind"		
        ,"ed_ind"		
        ,"ptnt_age_num"	
        ,"dschrg_dt"	
        ,"encntr_ste_cd"
        ,"vld_to_ts"
        ,"mdcl_rcrd_num"
        ,"cmnty_mdcl_rcrd_num"],
    source_incr_load_column: ["extract_ts"],
    source_full_read_flag: "N",

    hist_load_timestamp: null,
    source_code : "CERNER~FLMIM",
    source_table:"encounter",
    stage_table:"step_tbl_process_cerner_flmim_encounter_dim",
    target_table:"encounter_dim",
    pvt_overlap_days: "7"
};

const exception={
    expt_tgt_id:"100",
    src_cd:"CERNER-P3291-TXAUS",
    tgt_expt_dk:[""],
    src_expt_bk:["encntr_bk"],
        
};

module.exports = {
    job,
    source,
    exception
};
