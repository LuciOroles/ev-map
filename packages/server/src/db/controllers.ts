import { dbInstance } from ".";
import { Company, Station } from "./models";
import { getDependantCompanyIds } from './util';

async function getAllCompanies() {
    return await Company.findAll();
}

async function getStationsByAddress(address: string) {
    if (typeof address !== 'string') throw Error("Invalid address " + address)
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
    });
}


async function getDistanceFromPoint(cx: number, cy: number, radius: number, company_id: string) {
    const companyIds: string[] = company_id ? [company_id] : [];

    if (company_id) {

        const targetCompany = await Company.findOne({
            where: {
                id: company_id,
            }
        });
        const dependantCompanies = JSON.parse(targetCompany?.get('tree') as string);
        getDependantCompanyIds(dependantCompanies).forEach(id => {
            companyIds.push(id)
        });
    }

    let companyFilter = ''
    if (companyIds.length > 0) {
        companyFilter = `and
        company_id in (${companyIds.map((v) => JSON.stringify(v)).join(',')})`
    }

    const [results] = await dbInstance.query(`
        SELECT  
            floor(sqrt(pow(latitude - ${cx} ,2)   +  pow(longitude - ${cy},2))) as distance, 
            station.id as station_id,
            station.name as station_name,
            address,
            company_id,
            Company.name as company_name
            from 
            Station
                JOIN 
                Company 
                ON Company.id = Station.company_id
            where 
                distance<=${radius}
                ${companyFilter}        
            order by distance
            `);

    return results;

}

export default {
    getAllCompanies,
    getStationsByAddress,
    getAllLocations,
    getDistanceFromPoint
};
