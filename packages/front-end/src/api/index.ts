import { GraphQLClient } from 'graphql-request'
import { getStation } from '../queries';

export async function getStationsByAddress(address: string) {
    try {
      const graphQLClient = new GraphQLClient('http://localhost:8000/graphql', {
        mode: 'cors',
      });
      const data = await graphQLClient.request(getStation, {
        address,
      });
      console.log(data, ' data')
   
    } catch (error) {
      console.log(error)
    }
  
  }
  