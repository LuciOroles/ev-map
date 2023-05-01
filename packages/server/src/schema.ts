import {
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import CompanyController from './db/controllers';

const { getAllCompanies, getAllStations, getAllLocations } = CompanyController;


const LocationType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: "Location",
  description: "EV location, with one or many charges",
  fields: () => ({
    address: {
      type: GraphQLString,
    },
    latitude: {
      type: GraphQLInt,
    },
    longitude: {
      type: GraphQLInt,
    }
  }),
});

const CompanyType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: "Company",
  description: "EV organization",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    parent: {
      type: CompanyType
    }
  }),
});


const StationType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: "Station",
  description: "charghing EV station",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    company_id: {
      type: GraphQLID,
    },
    latitude: {
      type: GraphQLInt,
    },
    longitude: {
      type: GraphQLInt,
    },
    address: {
      type: GraphQLString,
    },
    coord_key: {
      type: GraphQLString,
    },
  }),
});

const RootType = new GraphQLObjectType({
  name: 'evRoot',
  description: 'ev graph',
  fields: {
    companies: {
      type: new GraphQLList(CompanyType),
      resolve: async () => {
        try {
          return (await getAllCompanies());
        } catch (error) {
          console.error(error);
          return [];
        }
      }
    },
    stations: {
      type: new GraphQLList(StationType),
      resolve: async () => {
        try {
          return (await getAllStations());
        } catch (error) {
          console.error(error);
          return [];
        }
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve: async () => {
        try {
          return (await getAllLocations());
        } catch (error) {
          console.error(error);
          return [];
        }
      }
    }
  }
});


const schema = new GraphQLSchema({
  query: RootType,
});

export default schema;