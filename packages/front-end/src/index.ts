import  "./style/style.css";
import { handleMap } from "./map";
import { getCompanies, getLocations } from './api'


document.addEventListener("DOMContentLoaded", async () => {
  // widget create;
  // widget fill with data
  const addressDetails = document.createElement('div');
  addressDetails.style.position = "absolute";
  addressDetails.classList.add('address-details');

  addressDetails.addEventListener('click', (e)=> {
    addressDetails.style.display = 'none';
  });
  document.querySelector('#canvas').append(addressDetails);
  const comp = document.getElementById('getCompanies');
  comp.addEventListener('click', getCompanies);
  const stGetter = document.getElementById('getLocations');
  const data = await getLocations();
   handleMap(addressDetails)(data.locations as any)  ;
});
