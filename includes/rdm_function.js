function fn_rdm_load(){
return `CALL datahub_dataprocess.referenceMngLoad();`;
}


function fn_load_domain(Entity_Name, Attribute_Name,Physical_TableName,Physical_Column_Name,UDMH_Domain_Name,Map_Mnemonic) {
    return `CALL datahub_dataprocess.referenceMngDomainConfig ("${Entity_Name}","${Attribute_Name}","${Physical_TableName}","${Physical_Column_Name}","${UDMH_Domain_Name}","${Map_Mnemonic}");`;
}

function fn_domain_config(rdm_config){
    let len=rdm_config.domain_config.length;
    let j=0;
    let entity_name="";
    let attr_name="";
    let table_name="";
    let col_name="";
    let domain_name="";
    let map_nemonic="";
    let fun=""

    for (let i=0;i<len;i++){
j=j+rdm_config.domain_config[i].length;
 entity_name =rdm_config.domain_config[i][0];
 attr_name=rdm_config.domain_config[i][1];
  table_name=rdm_config.domain_config[i][2];
  col_name=rdm_config.domain_config[i][3];
  domain_name=rdm_config.domain_config[i][4];
  map_nemonic=rdm_config.domain_config[i][5];
 fun= fun+fn_load_domain(entity_name, attr_name, table_name,col_name,domain_name,map_nemonic);
    
}
return `${fun}`;

}


function fn_load_source_system(tenant, src_stm, src_stm_desc) {
    return `CALL datahub_dataprocess.referenceMngSetSourceSystem ("${tenant}","${src_stm}","${src_stm_desc}");`;
}


function fn_source_system_config(rdm_config) {

let len=rdm_config.source_system.length;
let j=0;
let tnt="";
let src_stm="";
let src_stm_desc="";
let fun="";

for (let i=0;i<len;i++){
j=j+rdm_config.source_system[i].length;
 tnt =rdm_config.source_system[i][0];
 src_stm=rdm_config.source_system[i][1];
  src_stm_desc=rdm_config.source_system[i][2];
 fun= fun+fn_load_source_system(tnt, src_stm, src_stm_desc);
    
}
return `${fun}`;

}

module.exports = {
    fn_load_source_system,
    fn_source_system_config,
    fn_load_domain,
    fn_domain_config,
    fn_rdm_load
};