import * as d3 from 'd3';
import { getStationsByAddress } from '../api';


// TOD0: type file
export interface Station {
    id: string;
    name: string;
    company_id: string;
    latitude: number;
    longitude: number;
    address: string;
    coord_key: string;
}

export interface Location {
    latitude: number;
    longitude: number;
    address: string;
}




export function handleMap(note: HTMLDivElement) {

    return function renderMap(locations: Location[]) {

        const container = d3.select('#canvas').append('svg')
            .attr('width', '850px')
            .attr('height', '850px');

        for (const station of locations) {
            const circle = container
                .append('circle')
                .attr('cx', station.latitude)
                .attr('cy', station.longitude)
                .attr('r', 12)
                .attr('fill', 'yellow')
                .attr('class', 'y-circle');
            circle.on('click', async (event: MouseEvent) => {

                await getStationsByAddress(station.address);
                const canvasCoords = document.querySelector("#canvas").getBoundingClientRect()
                note.style.left = `${event.pageX - canvasCoords.x}px`;
                note.style.top = `${event.pageY - canvasCoords.y}px`;
                });
            container.append('text')
                .attr('x', station.latitude - 34)
                .attr('y', station.longitude < 50 ? station.longitude + 20 : station.longitude - 20)
                .attr('fill', 'red')
                .text(station.address);
        }
    }
}