import controllers from "../db/controllers";

(async ()=>{
   const re = await controllers.getDistanceFromPoint(449, 558, 200);
     
   console.log(re, ' result')
})()