
import { dbInstance } from ".";
import { Company, Station } from "./models";
 

async function getAllCompanies() {
    return await Company.findAll();
}

async function getStationsByAddress(address: string) {
    if (typeof address !== 'string') throw Error("Invalid address "+ address)
    return await Station.findAll({
        where: {
            address,
        }
    });
}

async function getAllLocations() {
    return (await Station.findAll({
        group: 'address',
    })).map((val) => {
        const { dataValues } = val;

        return {
            latitude: dataValues.latitude,
            longitude: dataValues.longitude,
            address: dataValues.address
        }
    });;
}


async function getAllCompaniesAndRef() {
    const [results, metadata] = await dbInstance.query(`
    select  id, name,  parent_company_id as pid ,  parent_company_id as pname  from Company where parent_company_id is null  
    union  
    select  e.id,  e.name, m.id,  m.name  from Company m INNER  JOIN Company e ON m.id = e.parent_company_id;`);

    // console.log(results, typeof results)
    // console.log(metadata, typeof metadata)

    return results;
}

async function getDistanceFromPoint() {
    const [results] = await dbInstance.query(`
    SELECT  sqrt(pow(latitude,2) +  pow(longitude,2)) as distance, address, latitude, longitude `);

    return results;
}

export default {
    getAllCompanies,
    getAllCompaniesAndRef,
    getStationsByAddress,
    getAllLocations,
    getDistanceFromPoint
};
