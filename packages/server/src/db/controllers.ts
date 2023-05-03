
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

async function getDistanceFromPoint(cx: number, cy: number, radius: number, companyIds: string[]) {
    const [results] = await dbInstance.query(`
    SELECT  
        floor(sqrt(pow(latitude - ${cx} ,2)   +  pow(longitude - ${cy},2))) as distance, 
        id,
        address,
        company_id,
        name
        from 
        Station where 
            distance<=${radius}
                and
            company_id in (${companyIds.map((v)=>JSON.stringify(v)).join(',')})
        order by distance
        `);


        // group by location
    return results;
}

export default {
    getAllCompanies,
    getAllCompaniesAndRef,
    getStationsByAddress,
    getAllLocations,
    getDistanceFromPoint
};
