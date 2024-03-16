["encounter",
"patient",
"practitioner",
"qadata_ptnt",
"refdata_catalogs",
"refdata_maps"].forEach((name) =>
    declare({
        database: dataform.projectConfig.vars.master_project,
        schema: dataform.projectConfig.vars.src_dataset,
        name,
    })
);