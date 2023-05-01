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

export function addContainer(stations: Station[]) { 
 
    const container = d3.select('#canvas').append('svg')
    .attr('width', '850px')
    .attr('height', '850px');

    for (const station of stations) {
        container
          .append('circle')
          .attr('cx', station.latitude)
          .attr('cy', station.longitude)
          .attr('r', 15)
          .attr('fill',  'yellow')
          .attr('class', 'y-circle');
        container.append('text')
        .attr('x', station.latitude - 40 )
        .attr('y',  station.longitude -20 )
        .attr('fill', 'red')
        .text(station.address);
    }

}