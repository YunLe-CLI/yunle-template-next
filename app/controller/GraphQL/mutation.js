const GraphQL = require('graphql');

const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLString = GraphQL.GraphQLString;
const GraphQLNonNull = GraphQL.GraphQLNonNull;
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    upHello: {
      type: GraphQLString,
      args: {
        name: {
          name: 'userName',
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          name: 'password',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, args) => JSON.stringify(args),
    },
  },
});

module.exports = Mutation;
