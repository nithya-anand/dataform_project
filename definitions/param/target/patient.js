const target = {
    dk: ["ptnt_dk"],
    bk: ["ptnt_bk"],
    source_table: "step_tbl_process_patient_dim",
    target_table: "ptnt_dim",
    hash_dif: "hash_dif",
    insert_list: ["ptnt_dk",
        "ptnt_bk",
        "bk_hash",
        "vld_fm_ts",
        "vld_to_ts",
        "dwm_load_info_sk",
        "tenant_sk",
        "src_cd_sk",
        "src_cd",
        "src_cd_descr",
        "hash_dif",
        "dob",
        "sex_cd_sk",
        "sex_cd",
        "sex_descr",
        "frst_nm",
        "last_nm",
        "sufx_nm",
        "mid_nm",
        "ttl_nm",
        "full_nm",
        "dspl_nm",
        "adr_line_1_descr",
        "adr_line_2_descr",
        "adr_line_3_descr",
        "adr_line_4_descr",
        "cty_nm",
        "cnty_nm",
        "ste_prov_cd",
        "prim_zip_exn_num",
        "hm_ph_num",
        "email_adr_descr",
        "dscd_ind"
    ],
    update_list: [],
    compare_list: [null]

}

module.exports = {
    target
}
