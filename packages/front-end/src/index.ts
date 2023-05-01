
import  "./style/style.css";
import { GraphQLClient } from 'graphql-request'
import { getStation, allCompanies, allLocations } from './queries';
import { renderMap } from "./map";

 

async function getLocations() {
  try {
    const graphQLClient = new GraphQLClient('http://localhost:8000/graphql', {
      mode: 'cors',
    });
    const data = await graphQLClient.request(allLocations);
    console.log(data, ' data')
 
    renderMap( (data as Record<string, any>)['locations']);
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
  stGetter.addEventListener('click', getLocations);
});
