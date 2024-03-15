const source = {
    dk: ["patient_key", "current_datetime()"],
    bk: ["patient_key"],
    hash_dif: ["frst_nm",
        "last_nm",
        "mid_nm",
        "full_nm",
        "dspl_nm",
        "adr_line_1_descr",
        "adr_line_2_descr",
        "cty_nm",
        "cnty_nm",
        "ste_prov_cd",
        "prim_zip_exn_num",
        "hm_ph_num",
        "email_adr_descr"
    ],
    source_code: "EMPI",
    source_incr_load_column: ["extract_timestamp"],
    stage_table: "step_tbl_process_patient_dim",
    target_table: "patient_dim",
}

module.exports = {
    source
};
