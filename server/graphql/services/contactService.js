const Contact = require('../../models/contact.js');

exports.getContacts = async (page=1, limit=5) => {
    try {
        // const contacts = await Contact.find().populate('companyId');
        const contacts = await Contact.find().skip((page - 1) * limit).limit(limit).populate('companyId');
        const totalContacts = await Contact.countDocuments();

        const contactsArray =  contacts.map(contact => {
            return {
                ...contact._doc,
                _id: contact.id
            };
        });

        return {
            contacts: contactsArray,
            totalContacts: totalContacts
        }

    } catch (err) {
        throw err;
    }
}

exports.getContact = async (contactId) => {
    try {
        const contact = await Contact.findById(contactId).populate('companyId');
        return {
            ...contact._doc,
            _id: contact.id
        };
    } catch (err) {
        throw err;
    }
}

exports.getContactByCompanyId = async (companyId) => {
    try {
        const contacts = await Contact.find({ companyId: companyId });
        return contacts.map(contact => {
            return {
                ...contact._doc,
                _id: contact.id
            };
        });
    } catch (err) {
        throw err;
    }
}

exports.createContact = async (contactInput) => {
    try {

        const contact = new Contact({
            groupsTag: contactInput.groupsTag,
            displayName: `${String(contactInput.firstName).trim()} ${String(contactInput.lastName).trim()}`,
            firstName: contactInput.firstName,
            lastName: contactInput.lastName,
            nickname: contactInput.nickname,
            status: contactInput.status,
            source: contactInput.source,
            companyId: contactInput.companyId,
            title: contactInput.title,
            workEmail: contactInput.workEmail,
            additionalWorkEmail: contactInput.additionalWorkEmail,
            homeEmail: contactInput.homeEmail,
            mobilePhone: contactInput.mobilePhone,
            workPhone: contactInput.workPhone,
            extension: contactInput.extension,
            linkedin: contactInput.linkedin,
            homeAddress: contactInput.homeAddress,
            notes: contactInput.notes
        });
        const result = await contact.save();
        return {
            ...result._doc,
            _id: result.id
        };
    } catch (err) {
        throw err;
    }
}

exports.updateContact = async (id, input) => {
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            throw new Error('Contact not found');
        }
        contact.groupsTag = input.groupsTag;
        contact.displayName = input.displayName;
        contact.firstName = input.firstName;
        contact.lastName = input.lastName;
        contact.nickname = input.nickname;
        contact.status = input.status;
        contact.source = input.source;
        contact.companyId = input.companyId;
        contact.title = input.title;
        contact.workEmail = input.workEmail;
        contact.additionalWorkEmail = input.additionalWorkEmail;
        contact.homeEmail = input.homeEmail;
        contact.mobilePhone = input.mobilePhone;
        contact.workPhone = input.workPhone;
        contact.extension = input.extension;
        contact.linkedin = input.linkedin;
        contact.homeAddress = input.homeAddress;
        contact.notes = input.notes;
        const result = await contact.save();
        return {
            ...result._doc,
            _id: result.id
        };
    }
    catch (err) {
        throw err;
    }
}

exports.deleteContact = async (id) => {
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            throw new Error('Contact not found');
        }
        await Contact.findByIdAndDelete(id);
        return {
            ...contact._doc,
            _id: contact.id
        };
    }
    catch (err) {
        throw err;
    }
}
    

