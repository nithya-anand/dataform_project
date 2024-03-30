const source = {
    dk: ["pract_id", "current_datetime()"],
    bk: ["pract_id"],
    hash_dif: ["frst_nm",
        "mid_nm",
        "last_nm",
        "sufx_nm",
        "full_nm",
        "dspl_nm",
        "adr_line_1_descr",
        "adr_line_2_descr",
        "adr_line_3_descr",
        "adr_line_4_descr",
        "cty_nm",
        "cnty_nm",
        "ste_prov_cd",
        "pst_cd",
        "prim_zip_extention_num",
        "cntry_nm",
        "ph_num",
        "email_use_descr",
        "npi_num",
        "sex_cd_sk",
        "sex_cd",
    ],
    source_code: "APDH",
    source_incr_load_column: ["extract_timestamp"],
    stage_table: "step_tbl_process_practitioner_dim",
    target_table: "practitioner_dim",
}

module.exports = {
    source
};
