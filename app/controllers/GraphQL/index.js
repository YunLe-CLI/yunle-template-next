const graphql = require('graphql');
const Query = require('./query');
const Mutation = require('./mutation');

const GraphQLSchema = graphql.GraphQLSchema;
const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = schema;
