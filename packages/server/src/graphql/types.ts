
import {

    GraphQLID,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export const LocationType: GraphQLObjectType<any, any> = new GraphQLObjectType({
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

export const CompanyType: GraphQLObjectType<any, any> = new GraphQLObjectType({
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


export const StationType: GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: "Station",
    description: "charging EV station",
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

export const ProxyStation: GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: "ProxyStation",
    description: "Station on proximity",
    fields: () => ({
        distance: {
            type: GraphQLInt,
        },
        station_id: {
            type: GraphQLID,
        },
        station_name: {
            type: GraphQLString,
        },
        company_id: {
            type: GraphQLID,
        },
        company_name: {
            type: GraphQLString,
        },

        address: {
            type: GraphQLString,
        },
    }),
});