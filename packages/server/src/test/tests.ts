import controllers from "../db/controllers";

(async ()=>{
   const re = await controllers.getDistanceFromPoint();
     
   console.log(re, ' result')
})()