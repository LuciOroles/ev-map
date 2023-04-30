import { Company, Station } from "./models";
import { randomUUID } from "crypto";


async function seedCompaines() {
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

    return {
        companyIds: {
            companyA: companyA.get('id'),
            companyA1B: companyA1.get('id'),
            companyC: companyC.get('id'),
            companyC1A: companyC1.get('id')
        }
    }
}

function generateLocation() {
    const staticLocations = [
        'Location-LA',
        'Location-LB',
        'Location-LC'
    ];
    const randInt = Math.floor(Math.random() * 100);
    if (randInt > 70) {
        return `Location-R${randInt}`
    } else {
        return Math.random() < 0.5 ? staticLocations[0] : staticLocations[1]
    }
}

async function seedStations() {
    const companyes = await seedCompaines();
    const { companyIds } = companyes;
    await Station.sync({ force: true });

    for (const [co, id] of Object.entries(companyIds)) {

    }
}

export async function seedDb() {
    await seedCompaines();
}