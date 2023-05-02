import * as d3 from 'd3';
import { getStationsByAddress } from '../api';
import { Location, Origin } from '../types'
import { createResetButton, notificationCreator } from '../notification';

const { changeCoords, changeBody } = notificationCreator();


export function handleMap(
    notify: HTMLDivElement, 
    origin: Origin ) {

    return function renderMap(locations: Location[]) {
        const  container = d3.select('#canvas').append('svg')
            .attr('width', '800px')
            .attr('height', '800px');
            container.on('click', (event: PointerEvent ) => {
            const {target} = event;
            if ((target as HTMLElement)['tagName'] === 'circle') {
                if ((target as HTMLElement).getAttribute('fill') === '#0c48dd') {
                    const canvasCoords = document.querySelector("#canvas").getBoundingClientRect()
                    changeCoords(event.pageX - (canvasCoords.x) + 20, event.pageY - (canvasCoords.y +20))
                    changeBody(createResetButton(notify, origin));
               }
               return;
            }
            const canvasCoords = document.querySelector("#canvas").getBoundingClientRect();
            const newCoords = {
                cx: Math.round(event.clientX - canvasCoords.x),
                cy: Math.round(event.clientY - canvasCoords.y)
            }

            if (origin.ref === null) {
             
                 origin.ref = container
                .append('circle')
                .attr('cx', newCoords.cx)
                .attr('cy', newCoords.cy)
                .attr('r', 8)

                .attr('fill', '#0c48dd');
                console.log(origin, 'origin');
            }
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
                .attr('fill', '#4caf50')
                .attr('class', 'y-circle');
       
            circle.on('click', async (event: MouseEvent) => {

               const stations = await getStationsByAddress(station.address);
                const canvasCoords = document.querySelector("#canvas").getBoundingClientRect()
                notify.style.left = `${event.pageX - (canvasCoords.x) + 20}px`;
                notify.style.top = `${event.pageY - (canvasCoords.y +20)}px`;
            
                (notify.childNodes[1] as HTMLDivElement).innerHTML = `
                     ${stations.map((station) => "<div>" + station.name + "</div>" ).join('')}
                `;
                notify.style.display = 'block';
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
