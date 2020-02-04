const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//Dummy db for testing
var books = [
  { name: 'Name of the Wind', genre: 'Horror', id: '1' },
  { name: 'The Final Empire', genre: 'History', id: '2' },
  { name: 'When the Moon aint shine no more', genre: 'Fantasy', id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to get data from db/other source
        return _find(books, { id: args.id });
      }
    }
  }
});

module.export = new GraphQLSchema({
  query: RootQuery
});
