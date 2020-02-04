const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//Dummy db for testing
var books = [
  { name: 'Name of the Wind', genre: 'Horror', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'History', id: '2', authorId: '2' },
  {
    name: 'When the Moon aint shine no more',
    genre: 'Fantasy',
    id: '3',
    authorId: '3'
  },
  { name: 'Game of Balls', genre: 'Novel', id: '4', authorId: '2' },
  { name: 'Hairy Hotpot', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'OT', genre: 'Horror', id: '6', authorId: '1' },
  { name: 'Dafia', genre: 'Novel', id: '7', authorId: '3' },
  { name: 'Sunwars', genre: 'Fantasy', id: '8', authorId: '3' },
  { name: 'OT All Year', genre: 'History', id: '9', authorId: '1' }
];

var authors = [
  { name: 'Patrick Something', age: 42, id: '1' },
  { name: 'Somegirly Lastname', age: 18, id: '2' },
  { name: 'Michael Thatguy', age: 33, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
