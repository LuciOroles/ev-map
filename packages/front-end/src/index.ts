
import  "./style/style.css";
import { GraphQLClient } from 'graphql-request'
import { allCompanies, allLocations } from './queries';
import { handleMap } from "./map";
import { Location } from "graphql";

 

async function getLocations(): Promise<{'locations': Location[]}> {
 
  try {
    const graphQLClient = new GraphQLClient('http://localhost:8000/graphql', {
      mode: 'cors',
    });
    const data = await graphQLClient.request(allLocations);
    console.log(data, ' data')
 
    return data as any;
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

document.addEventListener("DOMContentLoaded", async () => {
  // widget create;
  // widget fill with data
  const addressDetails = document.createElement('div');
  addressDetails.style.position = "absolute";
  ;
  document.querySelector('#canvas').append(addressDetails);
  const comp = document.getElementById('getCompanies');
  comp.addEventListener('click', getCompanies);
  const stGetter = document.getElementById('getLocations');
  const data = await getLocations();
   handleMap(addressDetails)(data.locations as any)  ;
});
