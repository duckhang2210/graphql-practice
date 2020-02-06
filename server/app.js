const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

mongoose.connect(
  'mongodb+srv://duckhang:duckhang_94@cluster0-ax6ux.mongodb.net/test?retryWrites=true&w=majority'
);
mongoose.connection.once('open', () => {
  console.log('DB is connected');
});

//Middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('now listen on port 4000');
});
