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

export interface Origin {
    ref: null | d3.Selection<SVGCircleElement, unknown, HTMLElement, any>
}
 