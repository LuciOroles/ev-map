
import { getDbInstance } from ".";
import { Company } from "./models";
const dbInstance = getDbInstance();

async function getAllCompanies() {
    return await Company.findAll();
}

async function getAllCompaniesAndRef() {
    const [ results, metadata ] = await  dbInstance.query(`
    select  id, name,  parent_company_id as pid ,  parent_company_id as pname  from Company where parent_company_id is null  
    union  
    select  e.id,  e.name, m.id,  m.name  from Company m INNER  JOIN Company e ON m.id = e.parent_company_id;`);

    console.log(results, typeof results)
    console.log(metadata, typeof metadata)

    return results;
}

export default {
    getAllCompanies,
    getAllCompaniesAndRef,
};