import {  Station } from "../models";
import { randomUUID } from "crypto";
import { seedCompaines } from './companies'
import { generateAllLocation, pickRandomIndex } from "./utils";

async function seedStations() {
    const companies = await seedCompaines();
    await Station.sync({ force: true });
    const companiesLen = companies.length;
   
    const { grouped, notGrouped } =  generateAllLocation(3,9);

    for (const location of grouped) {
        
        for (const idx of [1,2,3]) {
            const company = companies[pickRandomIndex(companiesLen)];
            const station = Station.build({
                id: randomUUID(),
                name: `${company.name}-${idx}`,
                company_id: company.id,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                address: location.address,
                coord_key:`${location.coords.latitude}_${location.coords.longitude}`
            });
            await station.save();
        }
    }

    let idx= 1;
    for (const location of notGrouped) {
        const company = companies[pickRandomIndex(companiesLen)];
        const station = Station.build({
            id: randomUUID(),
            name: `${company.name}-${idx}`,
            company_id: company.id,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            address: location.address,
            coord_key:`${location.coords.latitude}_${location.coords.longitude}`
        });
        await station.save();
        idx++;
    }
 
}

export async function seedDb() {
    await seedStations();
    console.log(`seed finished!`)
}