 
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

export interface Location {
    latitude: number;
    longitude: number;
    address: string;
}

export interface Origin {
    ref: null | d3.Selection<SVGCircleElement, unknown, HTMLElement, any>,
    coords: {
        cx: number,
        cy: number,
    }
}
 