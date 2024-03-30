# dataform_project
end to end datapipeline using dataform

Project Scope:
  use the power of bigquery to enable a unified data model, which can be used in various industries (banking, healthcare, finance etc.)

project consideration:
  1. use dataform service to build the ELT pipeline, The reason to use dataform service is, It uses simple SQL query to build the whole pipeling and it supports javascript to build reusable components
  2. It has the inbuild options to run an incremental load and the same can be developed using a batch control table which creates a window for the incremental load
  3. enable assertion option to perform testing
  4. Use TAG to tag a set of jobs that runs when the TAG is executed
  5. dependencies is set at the each task to form the end to end pipeline
  6. final pipeline run can be viewed in the compilation code segment
  7. Execution can be made through entities or whole pipeline.
  8. Custom package can be downloaded and installed in the dataform repo, which make reusabel components more effecient


