const { gql } = require('apollo-server-express');

const userSchema = gql`
    type User {
        _id: ID!
        email: String!
        password: String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type Query {
        login(email: String!, password: String!): AuthData!
        me: User
    }

    type Mutation {
        createUser(userInput: UserInput): User
    }
`;

module.exports = userSchema;
