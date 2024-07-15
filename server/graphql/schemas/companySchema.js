const {gql} = require('apollo-server-express');

const companySchema = gql`
    type Company {
        _id: ID!
        name: String
        groupsTag: String
        status: String!
        assigned: User
        notes: String
        logo: String
        summary: String
        opportunityTag: String
        specialties: String
        industry: String
        revenue: String
        size: Int
        locations: [String]
        officePhone: String
        website: String
        mainContact: Contact
        contacts: [Contact]
    }

    input CompanyInput {
        name: String!
        groupsTag: String
        status: String
        assigned: ID
        notes: String
        logo: String
        summary: String
        opportunityTag: String
        specialties: String
        industry: String
        revenue: String
        size: Int
        locations: [String]
        officePhone: String
        website: String
        mainContact: ID
        contacts: [ID]
    }

    type Query {
        getCompanies: [Company]
    }

    type Query {
        getCompany(companyId: ID!): Company
    }

    type Mutation {
        createCompany(companyInput: CompanyInput): Company
    }
`;

module.exports = companySchema;
