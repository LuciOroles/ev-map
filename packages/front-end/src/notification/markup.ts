import { groupBy } from 'lodash';
import { ProxyStation } from "../types";

export function displayProxyStations(proxyStations: ProxyStation[]) {

    const result = document.createElement('div');
    
    if (proxyStations.length === 0) {
        result.innerText = 'No station matching criteria'
    } else {
        const groupedStations =  groupBy(proxyStations, 'address');
       
        for (const [address, stations] of Object.entries(groupedStations) ) {
            const addressLabel = document.createElement('div');
            addressLabel.innerText = `@Address: ${address} > ${stations[0].distance}km`;
            result.appendChild(addressLabel);
            const list = document.createElement('ul');
            for (const station of stations) {
                const li = document.createElement('li');
                li.innerText = `${station.station_name} of ${station.company_name}`;
                list.appendChild(li);
            }

            result.append(list);
        }

    
    }
    const hr = document.createElement('hr');
    result.append(hr);
    return result;
}