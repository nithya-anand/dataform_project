["audit_batch_control"].forEach((name) =>
    declare({
        database: dataform.projectConfig.vars.master_project,
        schema: dataform.projectConfig.vars.stg_dataset,
        name,
    })
);