const rdm_config = {
    source_system: [
        ["RDM", "RDM", "Reference data management"],
        ["CERNER", "CERNER_TXAUS", "cerner texas austin"],
        ["CERNER", "CERNER_FLMIM", "cerner florida miami"],
        ["PAT", "PAT", "Patient master data"],
        ["PRACT", "PRACT", "Practitioner master data"],
    ],
    domain_config: [
        ["Encounter Dimension","Encounter Type Code Sk","encounter_dim","encntr_type_cd_sk","Encounter Type","ENC_TYP_CERN_HRM"],
        ["Encounter Dimension","Admission Type Code Sk","encounter_dim","adm_type_cd_sk","Admission Type","ADMIT_TYP_CERN_HRM"],
        ["Encounter Fact","Encounter Status Code Sk","encounter_fct","encntr_sts_cd_sk","Encounter Status","ENC_STS_CERN_HRM"]
    ]
}

module.exports={rdm_config}