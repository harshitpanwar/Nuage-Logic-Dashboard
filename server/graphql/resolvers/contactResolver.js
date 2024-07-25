const contactService = require('../services/contactService');
const companyService = require('../services/companyService');

const contactResolvers = {
    Query: {
        contacts: async (_, { page, limit }, {user}) => {
            if(!user) throw new Error("Unauthorized");
            return contactService.getContacts(page, limit);
        },
        contact: async (_, {id: contactId}, {user}) => {
            if(!user) throw new Error("Unauthorized");
            return contactService.getContact(contactId);
        }
    },
    Mutation: {
        
        createContact: async (_, { input }, {user}) => {
            if(!user) throw new Error("Unauthorized");
            return contactService.createContact(input);
        },
        updateContact: async (_, { id, input }, {user}) => {
            if(!user) throw new Error("Unauthorized");
            return contactService.updateContact(id, input);
        },
        deleteContact: async (_, { id }, {user}) => {
            if(!user) throw new Error("Unauthorized");
            return contactService.deleteContact(id);
        }
    },
    Contact: {
        companyId: async (parent) => {
            if (parent.companyId) {
                return companyService.getCompany(parent.companyId);
            }
            return null;
        }
    }
};

module.exports = contactResolvers;