const target = {
    dk: ["pract_dk"],
    bk: ["pract_bk"],
    source_table: "step_tbl_process_practitioner_dim",
    target_table: "pract_dim",
    hash_dif: "hash_dif",
    insert_list: ["pract_dk",
        "pract_bk",
        "inr_pract_id",
        "vld_fm_ts",
        "vld_to_ts",
        "dwm_load_info_sk",
        "tenant_sk",
        "bk_hash",
        "hash_dif",
        "src_cd_sk",
        "src_cd",
        "src_cd_descr",
        "frst_nm",
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
        "sex_cd_descr",
    ],
    update_list: [],
    compare_list: []

}

module.exports = {
    target
}
