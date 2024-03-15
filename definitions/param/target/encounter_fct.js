const target = {    
    dk: ["encntr_dk"],
    bk: ["encntr_bk"],
    hash_dif: "",
    insert_list: ["encntr_dk",
"encntr_bk",
"vld_fm_ts",
"vld_to_ts",
"dwm_load_info_sk",
"tenant_sk",
"src_cd_sk",
"src_cd",
"ptnt_dk",
"attnd_pract_dk",
"adm_pract_dk",
"pcp_pract_dk",
"adm_cdr_dk",
"adm_dt	",
"dschrg_cdr_dk",
"encntr_sts_cd_sk",
"encntr_sts_cd",
"encntr_sts_harmonized_cd",
"adm_dgns_cd_sk",
"adm_dgns_cd",
"adm_dgns_descr",
"adm_dgns_dk",
"dschrg_dt",
"ptnt_age_num"			
],
    update_list: [],
    compare_list:["adm_ts"
        ,"dschrg_ts"
        ,"encntr_cnt"
        ,"act_los_day_cnt"
        ,"crn_acct_bal"
        ,"ptnt_death_ts"
        ,"encntr_ts"
        ,"encntr_sts_ts"
        ,"encntr_sts_cd"
        ,"encntr_sts_rsn_cd"
        ,"adm_dgns_cd"
        ,"adm_dgns_descr"
        ,"loc_asgn_ts"
        ,"ptnt_age_num"
        ,"ptnt_dk"
        ,"fcy_pvdr_dk"
        ,"attnd_pract_dk"
        ,"adm_pract_dk"
        ,"rndrg_pract_dk"
        ,"super_pract_dk"
        ,"pcp_pract_dk"
        ,"asgn_poc_loc_dk"]
}
module.exports = {
    target
};