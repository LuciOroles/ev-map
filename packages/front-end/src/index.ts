import "./style/style.css";
import { handleMap } from "./map";
import { getCompanies, getLocations } from './api'
import { MapContainer, Origin } from "./types";



document.addEventListener("DOMContentLoaded", async () => {
  // widget create;
  // widget fill with data

  let origin: Origin = { ref: null }
  let container: MapContainer = { ref: null };
  const addressDetails = document.createElement('div');
  addressDetails.style.position = "absolute";
  addressDetails.classList.add('address-details');

  addressDetails.addEventListener('click', (e) => {
    addressDetails.style.display = 'none';
  });
  document.querySelector('#canvas').append(addressDetails);
  const comp = document.getElementById('getCompanies');
  comp.addEventListener('click', getCompanies);
  const stGetter = document.getElementById('getLocations');
  const data = await getLocations();
  const drawLocations = handleMap(addressDetails, origin, container);

  drawLocations(data.locations as any);
  document.querySelector("#resetOrigin").addEventListener('click', () => {
  
    if (origin.ref && container.ref) {
        origin.ref.remove();
        origin.ref = null;
    }
  })
});
