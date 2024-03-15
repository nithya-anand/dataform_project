["encounter",
"patient",
"practitioner"].forEach((name) =>
    declare({
        database: dataform.projectConfig.vars.master_project,
        schema: dataform.projectConfig.vars.src_dataset,
        name,
    })
);