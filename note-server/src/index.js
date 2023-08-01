const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const jwt=require('jsonwebtoken')
const db = require('./db')
const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
// const port = 3000;
const JWT_SECRETE="no5more"


db.connect('mongodb://localhost:27017/notedly')

let notes = [{ id: 1, content: "This is a note", author: "pata nahi" },
{ id: 2, content: "This is second note", author: ".12/" },
{ id: 3, content: "This is note about how to write and read the books", author: "|`^'|" }]

const getUser=(token)=>{
  if(token){
    try{
      return jwt.verify(token,JWT_SECRETE);
    }
    catch(err){
      throw new Error('Session invalid')
    }
  }
}

async function startApolloServer(typeDefs, resolvers) {
  // Same ApolloServer initialization as before
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
      const token=req.headers.authorization
      const user=getUser(token)
      // const user={ id: '62ed3ee64719c60884237523', iat: 1659715302 }
      // const user={ id: '62f9e165ee47e34f90177159', iat: 1660543556 }
      console.log(user)
      return {models,user}
    }
  });

  // Required logic for integrating with Express
  await server.start();
  const app = express();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
