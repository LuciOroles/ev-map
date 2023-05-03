import { seedStations } from './stations';

(async()=> {
    console.log('db seed started');
    await seedStations();
    console.log('db seed done');
})();