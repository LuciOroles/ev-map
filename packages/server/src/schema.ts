import {
  GraphQLSchema, 
  GraphQLList,
  GraphQLID,
  GraphQLObjectType, 
  GraphQLString,
} from 'graphql';

import CompanyController from './db/controllers';

const { getAllCompanies } = CompanyController;

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
    }
  }
});


const schema = new GraphQLSchema({
  query: RootType,
});

export default schema;