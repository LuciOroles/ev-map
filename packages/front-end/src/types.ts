 
export interface Company {
    id: string;
    name: string;
}

export interface Station {
    id: string;
    name: string;
    company_id: Company['id'];
    latitude: number;
    longitude: number;
    address: string;
    coord_key: string;
}

export interface ProxyStation {
    address: Station['address'];
    company_id: Company['id'];
    company_name: Company['name'];
    distance: number;
    station_id: Station['id'];
    station_name: Station['name']
}

export interface Location {
    latitude: number;
    longitude: number;
    address: string;
}

export interface Origin {
    container: null |  d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    ref: null | d3.Selection<SVGCircleElement, unknown, HTMLElement, any>,
    coords: {
        cx: number,
        cy: number,
    },
    areaRef: null | d3.Selection<SVGCircleElement, unknown, HTMLElement, any>,

}
 