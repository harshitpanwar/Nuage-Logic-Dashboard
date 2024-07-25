const Company = require('../../models/company.js');
const User = require('../../models/user.js');
const Contact = require('../../models/contact.js');

exports.getCompanies = async (page=1, limit=5, showAll=false) => {
    try {
        if (showAll) {
            const companies = await Company.find().populate('assigned');
            const companiesArray = companies.map(company => {
                return {
                    ...company._doc,
                    _id: company.id
                };
            });
            return {
                companies: companiesArray,
                totalCompanies: companiesArray.length
            };
        }
        const companies = await Company.find().skip((page - 1) * limit).limit(limit).populate('assigned');
        const totalCompanies = await Company.countDocuments();
        const companiesArray = companies.map(company => {
            return {
                ...company._doc,
                _id: company.id
            };
        });
        return {
            companies: companiesArray,
            totalCompanies: totalCompanies
        };

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

exports.updateCompany = async (companyId, companyInput) => {

    try {
        const company = await Company.findById(companyId);
        if (!company) {
            throw new Error('Company not found');
        }

        company.name = companyInput.name;
        company.groupsTag = companyInput.groupsTag;
        company.status = companyInput.status;
        company.assigned = companyInput.assigned;
        company.notes = companyInput.notes;
        company.logo = companyInput.logo;
        company.summary = companyInput.summary;
        company.opportunityTag = companyInput.opportunityTag;
        company.specialties = companyInput.specialties;
        company.industry = companyInput.industry;
        company.revenue = companyInput.revenue;
        company.size = companyInput.size;
        company.locations = companyInput.locations;
        company.officePhone = companyInput.officePhone;
        company.website = companyInput.website;
        company.mainContact = companyInput.mainContact;
        company.contacts = companyInput.contacts;

        // udpate the contact's companyId field
        if(companyInput.contacts && companyInput.contacts.length > 0) {
            companyInput.contacts.forEach(async contactId => {
                const contact = await Contact.findById(contactId);
                contact.companyId = companyId;
                await contact.save();
            }
            );
        }

        const result = await company.save();
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
