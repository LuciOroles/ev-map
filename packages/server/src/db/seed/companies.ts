import { Company } from "../models";
import { randomUUID } from "crypto";

export async function seedCompaines() {
    await Company.sync({ force: true });

    const companyA = Company.build({
        id: randomUUID(),
        name: "Co A",
        parent_company_id: null
    });


    const companyA1 = Company.build({
        id: randomUUID(),
        name: "Co A1",
        parent_company_id: companyA.get('id')
    });

    const companyC = Company.build({
        id: randomUUID(),
        name: "Co C",
        parent_company_id: null
    });

    const companyC1 = Company.build({
        id: randomUUID(),
        name: "Co C1",
        parent_company_id: companyC.get('id')
    });

    const companyC1_1 = Company.build({
        id: randomUUID(),
        name: "Co C1_1",
        parent_company_id: companyC1.get('id')
    });

    await companyA.save();
    await companyA1.save();
    await companyC.save();
    await companyC1.save();
    await companyC1_1.save();

    await companyA.update({
        tree: JSON.stringify({
            dep: [{
                id: companyA1.get('id'),
                dep: []
            }]
        })
    });

    await companyA1.update({
        tree: JSON.stringify({
            dep: []
        })
    });

    const c1_1dep = {
        id: companyC1_1.get('id'),
        dep: []
    };

    await companyC.update({
        tree: JSON.stringify({
            dep: [{
                id: companyC1.get('id'),
                dep: [c1_1dep]
            }]
        })
    });

    await companyC1.update({
        tree: JSON.stringify({
            dep: [c1_1dep]
        })
    });

    await companyC1_1.update({
        tree: JSON.stringify({
            dep: []
        })
    });


    return [ companyA, companyA1, companyC, companyC1, companyC1, companyC1_1].map((co) => ({
        name: co.get('name') as string,
        id: co.get('id') as string
    }));
}
