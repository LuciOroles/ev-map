function genCoord(margin: number) {
    return Math.floor(Math.random() * margin);
}

const locationFormater = (group: boolean, address: string) => ({ 
        address,
        group,
        coords: {
            latitude: genCoord(800),
            longitude: genCoord(800)
        }
});

interface Location {
    address: string,
    group: boolean;
    coords: {
        latitude: number,
        longitude: number
    }
}

export function generateLocation(): Location {
    const staticLocations = [
        locationFormater(true, 'Address-M1'),
        locationFormater(true, 'Address-M2'),
    ];
    const randInt = Math.floor(Math.random() * 100);
    if (randInt > 70) {
        return  locationFormater(false, `Address-${randInt}`);
    } else {
        return Math.random() < 0.5 ? staticLocations[0] : staticLocations[1]
    }
}


export function generateAllLocation(grouped: number, notGrouped: number) {
    let achivedGrouped: Location[] = [];
    let achivedNotGrouped: Location[] =[];

    while (achivedGrouped.length < grouped || achivedNotGrouped.length < notGrouped) {
       const location = generateLocation();

       if (location.group === true && achivedGrouped.length < grouped) {
        achivedGrouped.push(location);
       } else if (location.group === false && achivedNotGrouped.length < notGrouped) {
        achivedNotGrouped.push(location);
       }

    }

    return {
        grouped: achivedGrouped,
        notGrouped: achivedNotGrouped
    };
}