import { Company, Station } from "./models";
import  { randomUUID } from "crypto";

export  async function seedDb() {
    await Company.sync({force: true});
    await Station.sync({force: true});

    const companyA = Company.build({
        id: randomUUID(),
        name: "Co A",
        parent_company_id: null
    });

    await companyA.save();

    const companyB = Company.build({
        id: randomUUID(),
        name: "Co A",
        parent_company_id: companyA.get('id')
    });

    await companyB.save();
}