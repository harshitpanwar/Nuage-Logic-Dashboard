const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const userSchema = require('./schemas/userSchema');
const userResolvers = require('./resolvers/userResolver');
const companySchema = require('./schemas/companySchema');
const companyResolvers = require('./resolvers/companyResolver');
const contactSchema = require('./schemas/contactSchema');
const contactResolvers = require('./resolvers/contactResolver');

const typeDefs = mergeTypeDefs([userSchema, companySchema, contactSchema]);
const resolvers = mergeResolvers([userResolvers, companyResolvers, contactResolvers]);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;
