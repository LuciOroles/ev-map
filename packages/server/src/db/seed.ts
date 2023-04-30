import { Company, Station } from "./models";
import { randomUUID } from "crypto";
import { seedCompaines } from './seed/companies'
import { generateLocation } from "./seed/utils";

async function seedStations() {
    const companies = await seedCompaines();
   let index = 0;
   let max = 12;
 
    // await Station.sync({ force: true });

 
}

export async function seedDb() {
    await seedCompaines();
}