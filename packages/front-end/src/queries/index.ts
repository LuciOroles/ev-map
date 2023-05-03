import { gql } from 'graphql-request'

export const allStations = gql`{
	stations {
 	 id
	 name
 	 company_id
	 latitude
	 longitude
	 address
	 coord_key
	}
}`;

export const allCompanies = gql`{
  companies {
    id
   name
   parent {id}
  }
}`;

export const allLocations = gql`
{
	locations {
	 address
	 latitude
	 longitude
	}
}`;

export const getStation = gql`
query ($address: String) {
	stations(address: $address) {
		id
		name
		company_id
		latitude
		longitude
		address
		coord_key
	}
}`;


export const proxyStations = gql`
query ($cx: Int, $cy: Int, $radius: Int, $company_id: ID) {
	proxyStations(cx: $cx, cy: $cy, radius: $radius, company_id: $company_id) {
		distance
		station_id
		station_name
		company_id
		company_name
		address
	}
}`;
