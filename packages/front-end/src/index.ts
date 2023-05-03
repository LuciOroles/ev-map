import "./style/style.css";
import { handleMap } from "./map";
import {  companyList, locationsList } from './api'
import {  Origin } from "./types";
import { notificationCreator } from "./notification";


document.addEventListener("DOMContentLoaded", async () => {

  const getMemoLocations = (await locationsList())();
  const getMemoCompanies = (await companyList())();

  let origin: Origin = { ref: null }
  const  notifyElement =  notificationCreator(); // dubious can be moved outside
  
  document.querySelector('#canvas').append(notifyElement);
 
  const drawLocations = handleMap(notifyElement, origin);
  drawLocations(getMemoLocations, getMemoCompanies); 
});
