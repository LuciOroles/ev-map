import { GraphQLClient } from 'graphql-request'
import { getStation, allCompanies, allLocations } from '../queries';
import { Station, Location, Company } from '../types';

const graphQLClient = new GraphQLClient('http://localhost:8000/graphql', {
    mode: 'cors',
});

export async function getStationsByAddress(address: string): Promise<Station[]> {
    try {
        const data = await graphQLClient.request(getStation, {
            address,
        }) as any;
        return data['stations'];
    } catch (error) {
        console.log(error);
        alert("Error getting data!");
    }
}

 async function getLocations(): Promise<Location[]> {
    try {
        const data = await graphQLClient.request(allLocations) as any;
        console.log(data, ' data')
        return data['locations']; 
    } catch (error) {
        console.log(error)
    }
}


 async function getCompanies(): Promise<Company[]> {
    try {
        const data = await graphQLClient.request(allCompanies) as any;
         return data['companies'];
    } catch (error) {
        console.error(error)
    }
}

export const locationsList = async function () {
    const locations = await getLocations();
    return ():Location[] => {
        return locations;
    }
};

export const companyList = async function () {
    const companies = await getCompanies();

    return (): Company[] => {
      return companies;
     }
};

