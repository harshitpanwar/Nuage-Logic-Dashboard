const {gql} = require('apollo-server-express');

const contactSchema = gql`

    type Contact {
        _id: ID!
        groupsTag: String!
        displayName: String!
        firstName: String!
        lastName: String
        nickname: String
        status: String!
        source: String!
        companyId: Company
        title: String!
        workEmail: String!
        additionalWorkEmail: String
        homeEmail: String
        mobilePhone: String
        workPhone: String
        extension: String
        linkedin: String
        homeAddress: String
        notes: String
    }

    input ContactInput {
        groupsTag: String!
        displayName: String
        firstName: String!
        lastName: String
        nickname: String
        status: String!
        source: String!
        companyId: ID
        title: String!
        workEmail: String!
        additionalWorkEmail: String
        homeEmail: String
        mobilePhone: String
        workPhone: String
        extension: String
        linkedin: String
        homeAddress: String
        notes: String
    }

    type paginatedContact {
        contacts: [Contact]
        totalContacts: Int
    }

    type Query {
        contacts(page: Int, limit: Int): paginatedContact
        contact(id: ID!): Contact
    }

    type Mutation {
        createContact(input: ContactInput): Contact
        updateContact(id: ID!, input: ContactInput): Contact
        deleteContact(id: ID!): Contact
    }

`;

module.exports = contactSchema;