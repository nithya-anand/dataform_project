const pvt_batchcontrol_dataset = dataform.projectConfig.defaultSchema;
const pvt_batchcontrol_project = dataform.projectConfig.defaultDatabase;
const glb_hash_algorithm = dataform.projectConfig.vars.glb_hash_algorithm;
const glb_null_replace = dataform.projectConfig.vars.glb_null_replace;
const glb_hash_concat = dataform.projectConfig.vars.glb_hash_concat;
const glb_empty_replace = dataform.projectConfig.vars.glb_empty_replace;
const glb_max_vld_to_ts = dataform.projectConfig.vars.glb_max_vld_to_ts;
const glb_env = dataform.projectConfig.vars.env;

// Audit batch control table to be used to pull incremental data in that batch for every model
const glb_audit_batch_control = '`' + pvt_batchcontrol_project + '.' + pvt_batchcontrol_dataset + '.audit_batch_control`'



module.exports = {
    pvt_batchcontrol_dataset,
    pvt_batchcontrol_project,
    glb_audit_batch_control,
    glb_hash_algorithm,
    glb_null_replace,
    glb_hash_concat,
    glb_empty_replace,
    glb_max_vld_to_ts,
    glb_env,
}
