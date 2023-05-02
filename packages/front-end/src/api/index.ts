import { GraphQLClient } from 'graphql-request'
import { getStation, allCompanies, allLocations } from '../queries';
import { Station } from '../types';

const graphQLClient = new GraphQLClient('http://localhost:8000/graphql', {
    mode: 'cors',
});

export async function getStationsByAddress(address: string): Promise<Station[]> {
    try {
        const data = await graphQLClient.request(getStation, {
            address,
        }) as any;
        console.log(data, ' data')
        return data['stations'];
    } catch (error) {
        console.log(error);
        alert("Error getting data!");
    }
}

export async function getLocations(): Promise<{ 'locations': Location[] }> {
    try {
        const data = await graphQLClient.request(allLocations);
        console.log(data, ' data')
        return data as any;
    } catch (error) {
        console.log(error)
    }
}


export async function getCompanies() {
    try {
        const data = await graphQLClient.request(allCompanies)
        console.log(data, ' data')
    } catch (error) {
        console.error(error)
    }
}