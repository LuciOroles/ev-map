import {
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import CompanyController from '../db/controllers';
import { CompanyType, ProxyStation, StationType, LocationType } from './types';

const { getDistanceFromPoint, getAllCompanies, getStationsByAddress, getAllLocations } = CompanyController;
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
      args: {
        address: {
          type: GraphQLString,
        }
      },
      resolve: async ( _, args) => {
        try {
          console.log(args);
          return (await getStationsByAddress(args['address']));
        } catch (error) {
          console.error(error);
          return [];
        }
      }
    },
    proxyStations: {
      type: new GraphQLList(ProxyStation),
      args: {
        cx: {
          type: GraphQLInt,
        },
        cy: {
          type: GraphQLInt,
        },
        radius: {
          type: GraphQLInt
        },
        company_id: {
          type: GraphQLID,
        }
      },
      resolve: async ( _, args) => {
        try {
          console.log(args);
          // TODO: add validation
          const {cx, cy, radius, company_id } = args;
          return (await getDistanceFromPoint( cx, cy, radius, company_id));
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