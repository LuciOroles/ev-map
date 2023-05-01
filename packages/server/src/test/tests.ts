import controllers from "../db/controllers";

(async ()=>{
   const re = await controllers.getAllLocations();
     
   console.log(re, ' result')
})()