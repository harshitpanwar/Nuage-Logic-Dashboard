const user = require('../../models/user');
const companyService = require('../services/companyService');
const contactService = require('../services/contactService');

const companyResolvers = {
    Query: {
        getCompanies: async (_, {page, limit}, {user}) => {
            // if(!user) throw new Error("Unauthorized");
            return companyService.getCompanies(page, limit);
        },
        getCompany: async (_, { companyId }, {user}) => {
            if(!user) throw new Error("Unauthorized");
            return companyService.getCompany(companyId);
        }
    },
    Mutation: {
        createCompany: async (_, { companyInput }, {user}) => {
            if(!user) throw new Error("Unauthorized");
            console.log("companyInput", companyInput, user._id);
            return companyService.createCompany(companyInput, user._id);
        },
        updateCompany: async (_, { companyId, companyInput }, {user}) => {
            if(!user) throw new Error("Unauthorized");
            return companyService.updateCompany(companyId, companyInput);
        }
    },
    Company: {
        assigned: async (parent) => {
            if (parent.assigned) {
                return companyService.getUserById(parent.assigned);
            }
            return null;
        },
        mainContact: async (parent) => {
            if (parent.mainContact) {
                return contactService.getContact(parent.mainContact);   
            }
            return null;
        },
        // contacts: async (parent) => {
        //     if(parent.contacts && parent.contacts.length > 0) {
        //         return parent.contacts.map(contactId => {
        //             return contactService.getContact(contactId);
        //         });
        //     }
        //     return [];
        // },
        contacts: async (parent) => {
            if (parent.contacts) {
                return contactService.getContactByCompanyId(parent._id);
            }
            return [];
        }
    }
};

module.exports = companyResolvers;