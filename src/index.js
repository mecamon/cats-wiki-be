const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const Query = require('./resolvers/Query');
const catsRepo = require('./repos/cats-repo');

const resolvers = { Query };

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: { catsRepo }
});

server.listen().then(({url}) => console.log(`Server running on ${url}`))