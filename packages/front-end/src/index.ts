import "./style/style.css";
import { handleMap } from "./map";
import { getCompanies, getLocations } from './api'
import {  Origin } from "./types";
import { notificationCreator } from "./notification";



document.addEventListener("DOMContentLoaded", async () => {
 
  let origin: Origin = { ref: null }
  const { notifyElement }  =  notificationCreator(); 
 
  document.querySelector('#canvas').append(notifyElement);
  const comp = document.getElementById('getCompanies');
  comp.addEventListener('click', getCompanies);
 
  const data = await getLocations();
  const drawLocations = handleMap(notifyElement, origin);

  drawLocations(data.locations as any);
 
});
