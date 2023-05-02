import * as d3 from 'd3';
import { getStationsByAddress } from '../api';
import { Location } from '../types'

export function handleMap(note: HTMLDivElement) {

    return function renderMap(locations: Location[]) {

        const container = d3.select('#canvas').append('svg')
            .attr('width', '800px')
            .attr('height', '800px');
        container.on('click', (evt ) => {
            if (evt.target['tagName'] === 'circle') {
                return;
            }
            console.log('clicked', );
        });


        let it = 1;
        while (it<8) {
            container.append('line')
            .attr('x1', it*100)
            .attr('y1', 0)
            .attr('x2', it*100)
            .attr('y2', 800)
            .attr('stroke', '#444');
            container.append('line')
            .attr('x1', 0)
            .attr('y1', it*100)
            .attr('x2', 800)
            .attr('y2', it*100)
            .attr('stroke', '#444');
            it++;
        }

        for (const station of locations) {
            const circle = container
                .append('circle')
                .attr('cx', station.latitude)
                .attr('cy', station.longitude)
                .attr('r', 12)
                .attr('fill', '#444')
                .attr('class', 'y-circle');
       
            circle.on('click', async (event: MouseEvent) => {

               const stations = await getStationsByAddress(station.address);
                const canvasCoords = document.querySelector("#canvas").getBoundingClientRect()
                note.style.left = `${event.pageX - (canvasCoords.x) + 20}px`;
                note.style.top = `${event.pageY - (canvasCoords.y +20)}px`;
            
                note.innerHTML = `
                     ${stations.map((station) => "<div>" + station.name + "</div>" ).join('')}
                `;
                note.style.display = 'block';
                event.stopPropagation();
 
                });
            container.append('text')
                .attr('x', station.latitude < 50 ? station.latitude: station.latitude - 34)
                .attr('y', station.longitude < 50 ? station.longitude + 20 : station.longitude - 20)
                .attr('fill', '#232323')
                .text(station.address);
        }
    }
}
