const Company = require('../../models/company.js');
const User = require('../../models/user.js');
const Contact = require('../../models/contact.js');

exports.getCompanies = async () => {
    try {
        const companies = await Company.find().populate('assigned');
        return companies.map(company => {
            return {
                ...company._doc,
                _id: company.id
            };
        });
    } catch (err) {
        throw err;
    }
};

exports.getCompany = async (companyId) => {
    try {
        const company = await Company.findById(companyId).populate('assigned');
        return {
            ...company._doc,
            _id: company.id
        };
    } catch (err) {
        throw err;
    }
};

exports.createCompany = async (companyInput, user_id) => {
    try {
        const company = new Company({
            name: companyInput.name,
            groupsTag: companyInput.groupsTag,
            status: companyInput.status,
            assigned: user_id,
            notes: companyInput.notes,
            logo: companyInput.logo,
            summary: companyInput.summary,
            opportunityTag: companyInput.opportunityTag,
            specialties: companyInput.specialties,
            industry: companyInput.industry,
            revenue: companyInput.revenue,
            size: companyInput.size,
            locations: companyInput.locations,
            officePhone: companyInput.officePhone,
            website: companyInput.website,
            mainContact: companyInput.mainContact,
            contacts: companyInput.contacts
        });
        const result = await company.save();

        // udpate the contact's companyId field
        if (companyInput.contacts && companyInput.contacts.length > 0) {
            companyInput.contacts.forEach(async contactId => {
                const contact = await Contact.findById(contactId);
                contact.companyId = result.id;
                await contact.save();
            });
        }

        return {
            ...result._doc,
            _id: result.id
        };
    } catch (err) {
        throw err;
    }
};

exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (err) {
        throw err;
    }
};
