function genCoord(margin: number) {
    return Math.floor(Math.random() * margin);
}

const locationFormatter = (group: boolean, address: string) => ({
    address,
    group,
    coords: {
        latitude: genCoord(750)+10,
        longitude: genCoord(750)+10
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
    const randInt = Math.floor(Math.random() * 100);
    if (randInt > 70) {
        const secondRand = Math.floor(Math.random()*9999).toString(16); // avoid naming overlap
        return locationFormatter(false, `Address-${secondRand}`);
    } else {
        return locationFormatter(true,`Address-M${randInt}`)
    }
}


export function generateAllLocation(grouped: number, notGrouped: number) {
    const achievedGrouped: Location[] = [];
    const achievedNotGrouped: Location[] = [];

    while (achievedGrouped.length < grouped || achievedNotGrouped.length < notGrouped) {
        const location = generateLocation();

        if (location.group === true && achievedGrouped.length < grouped) {
            achievedGrouped.push(location);
        } else if (location.group === false && achievedNotGrouped.length < notGrouped) {
            achievedNotGrouped.push(location);
        }

    }

    return {
        grouped: achievedGrouped,
        notGrouped: achievedNotGrouped
    };
}

export function pickRandomIndex(len: number) {
    let cIdx = Math.ceil(Math.random() * len) - 1;
    if (cIdx < 0 || cIdx >= len) cIdx = 0;
    return cIdx;
}