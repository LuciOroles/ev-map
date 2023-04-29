import {
  GraphQLSchema, GraphQLList,
  GraphQLOutputType,
  GraphQLID,
  GraphQLNonNull, GraphQLInt, GraphQLObjectType, GraphQLString
} from 'graphql';
import answers from './ans.json';
import categories from './category.json'
import CompanyController  from './db/controllers';


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


var CategoryType: GraphQLOutputType = new GraphQLObjectType({
  name: "category",
  description: "a category",
  fields: () => {
    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      answers: {
        type: new GraphQLList(AnswerType),
        resolve: (parent) => {
          return answers.ans.filter((element) => {
            return element.code === parent['id']
          })
        }
      }
    };
  }
});

var AnswerType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: "Answer",
  description: "answer",
  fields: {
    code: {
      type: GraphQLInt
    },
    label: {
      type: new GraphQLNonNull(GraphQLString)
    },
    cateogryName: {
      type: CategoryType,
      resolve: (parent) => {
        return categories.data.find((element) => {
          return element.id === parent['code']
        })
      }
    }
  },

});


const RootAnsType = new GraphQLObjectType({
  name: 'anwserList',
  description: 'list of answers',
  fields: {
    companies: {
      type: new GraphQLList(CompanyType),
      resolve:async ( ) => {
        try {
          return (await getAllCompanies());
        } catch (error) {
          console.error(error);
          return [];
        }
      }
    },
    answer: {
      type: AnswerType,
      description: 'one answer',
      args: {
        id: {
          type: GraphQLInt,
        }
      },
      resolve: (parent, args) => {
        return answers.ans.find((el) => el.code === args.id)
      }
    },
    answers: {
      type: new GraphQLList(AnswerType),
      resolve: () => {
        return answers.ans;
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: () => {
        return categories.data;
      }
    }
  }
});


const schema = new GraphQLSchema({
  query: RootAnsType,
});

export default schema;