import * as d3 from 'd3';


interface Station {
    id: string;
    name: string;
    company_id:  string;
    latitude: number;
    longitude: number;
    address: string;
    coord_key: string;
}

interface Location {
    latitude: number;
    longitude: number;
    address: string;
}



export function renderMap(locations: Location[]) { 
 
    const container = d3.select('#canvas').append('svg')
    .attr('width', '850px')
    .attr('height', '850px');

    for (const station of locations) {
        container
          .append('circle')
          .attr('cx', station.latitude)
          .attr('cy', station.longitude)
          .attr('r', 12)
          .attr('fill',  'yellow')
          .attr('class', 'y-circle');
        container.append('text')
        .attr('x', station.latitude - 34 )
        .attr('y', station.longitude < 50 ? station.longitude + 20 : station.longitude -20 )
        .attr('fill', 'red')
        .text(station.address);
    }

}