import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schemas.js';
import { Query, Product, Category, Mutation } from './resolvers/index.js';
import db from './data.js';

const resolvers = {
  Query,
  Category,
  Product,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db,
  },
});

server.listen().then(({ url }) => console.log('Server running at ' + url));
