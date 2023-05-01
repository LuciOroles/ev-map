
import  "./style/style.css";
import { GraphQLClient } from 'graphql-request'
import { allStations, allCompanies } from './queries';
import { addContainer } from "./map";


let stations: any[];

async function getStation() {
  try {
    const graphQLClient = new GraphQLClient('http://localhost:8000/graphql', {
      mode: 'cors',
    });
    const data = await graphQLClient.request(allStations);
    console.log(data, ' data')
 
    addContainer( (data as Record<string, any>)['stations']);
  } catch (error) {
    console.log(error)
  }

}

async function getCompanies() {
  try {
    const graphQLClient = new GraphQLClient('http://localhost:8000/graphql', {
      mode: 'cors',
    });
    const data = await graphQLClient.request(allCompanies)
    console.log(data, ' data')
  } catch (error) {
    console.error(error)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const comp = document.getElementById('getCompanies');
  comp.addEventListener('click', getCompanies);
  const stGetter = document.getElementById('getStations');
  stGetter.addEventListener('click', getStation);
});
