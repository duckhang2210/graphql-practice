const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

//Middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema
  })
);

app.listen(4000, () => {
  console.log('now listen on port 4000');
});
