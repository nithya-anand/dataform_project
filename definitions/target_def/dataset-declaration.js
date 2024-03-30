["cd_dmn_dim",
"cdr_dim",
"cmn_cd_2_tenant_cmn_cd_brg",
"cmn_cd_dim",
"encntr_2_pract_brg",
"encounter_dim",
"encounter_fct",
"patient_dim",
"practitioner_dim",
"src_stm_dim",
"tenant_cmn_cd_dim",
"tenant_dim",
"diag_info"].forEach((name) =>
    declare({
        database: dataform.projectConfig.vars.master_project,
        schema: dataform.projectConfig.vars.tgt_dataset,
        name,
    })
);


