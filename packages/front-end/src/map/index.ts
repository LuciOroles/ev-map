import * as d3 from 'd3';
import { getStationsByAddress } from '../api';
import { Location, MapContainer, Origin } from '../types'

export function handleMap(note: HTMLDivElement, origin: Origin, container: MapContainer ) {
 
    return function renderMap(locations: Location[]) {

        container.ref = d3.select('#canvas').append('svg')
            .attr('width', '800px')
            .attr('height', '800px');
            container.ref.on('click', (evt: PointerEvent ) => {
            const {target} = evt;
            if ((target as HTMLElement)['tagName'] === 'circle') {
                return;
            }
            const canvasCoords = document.querySelector("#canvas").getBoundingClientRect();
            const newCoords = {
                cx: Math.round(evt.clientX - canvasCoords.x),
                cy: Math.round(evt.clientY - canvasCoords.y)
            }

            if (origin.ref === null) {
             
                 origin.ref = container.ref
                .append('circle')
                .attr('cx', newCoords.cx)
                .attr('cy', newCoords.cy)
                .attr('r', 12)
                .attr('fill', '#1313');
                console.log(origin, 'origin');
            }
        });


        let it = 1;
        while (it<8) {
            container.ref.append('line')
            .attr('x1', it*100)
            .attr('y1', 0)
            .attr('x2', it*100)
            .attr('y2', 800)
            .attr('stroke', '#444');
            container.ref.append('line')
            .attr('x1', 0)
            .attr('y1', it*100)
            .attr('x2', 800)
            .attr('y2', it*100)
            .attr('stroke', '#444');
            it++;
        }

        for (const station of locations) {
            const circle = container.ref
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
            container.ref.append('text')
                .attr('x', station.latitude < 50 ? station.latitude: station.latitude - 34)
                .attr('y', station.longitude < 50 ? station.longitude + 20 : station.longitude - 20)
                .attr('fill', '#232323')
                .text(station.address);
        }
    }
}
