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
