import controllers from "../db/controllers";

(async ()=>{
   const companyIDs: string[]  = []; // ['95d52b5b-c389-46b0-9782-281f17daa35c', 'ce701d76-dc96-4f07-a8c9-31599f9299f9']
   const re = await controllers.getDistanceFromPoint(449, 558, 300,  '95d52b5b-c389-46b0-9782-281f17daa35c' );
     
   console.log(re, ' result')
})()