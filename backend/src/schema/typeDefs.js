const { gql } = require("apollo-server-express");


module.exports = typeDefs = gql`
  type Query {
    me: User
  }
  type User {
    id: ID
    username: String
  }
`;
