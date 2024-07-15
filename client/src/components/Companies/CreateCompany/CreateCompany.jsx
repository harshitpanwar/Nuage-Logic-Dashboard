import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_COMPANY } from '../../../graphql/mutations/company';
import { GET_CONTACTS } from '../../../graphql/queries/contacts';
import './CreateCompany.css';

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    website: '',
    summary: '',
    status: '',
    specialties: '',
    size: 0,
    opportunityTag: '',
    revenue: '',
    officePhone: '',
    notes: '',
    name: '',
    mainContact: null,
    logo: '',
    locations: [''],
    industry: '',
    groupsTag: '',
    contacts: [],
    assigned: ''
  });

  const [contactsData, setContactsData] = useState(null);

  const [getContacts, { called, loading, data, error }] = useLazyQuery(GET_CONTACTS, {
    onCompleted: (data) => {
      setContactsData(data);
    }
  });

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const [createCompany] = useMutation(CREATE_COMPANY);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData({ ...formData, size: value });
  }

  const handleMultiSelectChange = (e) => {
    const { options } = e.target;
    const selectedContacts = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedContacts.push(options[i].value);
      }
    }
    setFormData({ ...formData, contacts: selectedContacts });
  };

  const handleLocationChange = (index, value) => {
    const newLocations = [...formData.locations];
    newLocations[index] = value;
    setFormData({ ...formData, locations: newLocations });
  };

  const addLocationField = () => {
    setFormData({ ...formData, locations: [...formData.locations, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('formData:', formData);
      await createCompany({ variables: { companyInput: formData } });
      navigate('/companies');
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  return (
    <div className="company-form-container">
      <h2>Create Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="groupsTag">Groups Tag</label>
          <select
            id="groupsTag"
            name="groupsTag"
            value={formData.groupsTag}
            onChange={handleChange}
            required
          >
            <option value="">Select Group Tag</option>
            <option value="active contacts">Active Contacts</option>
            <option value="lead list">Lead List</option>
            <option value="new contacts">New Contacts</option>
            <option value="inactive contacts">Inactive Contacts</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="locations">Locations</label>
          {formData.locations.map((location, index) => (
            <div key={index} className="location-input">
              <input
                type="text"
                value={location}
                onChange={(e) => handleLocationChange(index, e.target.value)}
                required
              />
              {index === formData.locations.length - 1 && (
                <button type="button" onClick={addLocationField}>+</button>
              )}
            </div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="opportunityTag">Opportunity Tag</label>
          <input
            type="text"
            id="opportunityTag"
            name="opportunityTag"
            value={formData.opportunityTag}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialties">Specialties</label>
          <input
            type="text"
            id="specialties"
            name="specialties"
            value={formData.specialties}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
            <label htmlFor="revenue">Revenue</label>
            <select
                type="text"
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
            >
                <option value="$0 - $1M">$0 - $1M</option>
                <option value="$1M - $2.5M">$1M - $2.5M</option>
                <option value="$2.5M - $5M">$2.5M - $5M</option>
                <option value="$5M - $10M">$5M - $10M</option>
                <option value="$10M - $20M">$10M - $20M</option>
                <option value="$20M - $50M">$20M - $50M</option>
                <option value="$50M - $100M">$50M - $100M</option>
                <option value="$100M - $500M">$100M - $500M</option>
                <option value="$500M - $1B">$500M - $1B</option>
                <option value="$1B - $5B">$1B - $5B</option>
                <option value="$5B - $10B">$5B - $10B</option>
                <option value="$10B+">$10B+</option>
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <input
            type="number"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleSizeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="officePhone">Office Phone</label>
          <input
            type="number"
            id="officePhone"
            name="officePhone"
            value={formData.officePhone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="logo">Logo</label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mainContact">Main Contact</label>
          <select
            id="mainContact"
            name="mainContact"
            value={formData.mainContact}
            onChange={handleChange}
          >
            <option value="">Select Main Contact</option>
            {contactsData && contactsData.contacts.length > 0 &&
              contactsData.contacts.map((contact) => (
                <option key={contact._id} value={contact._id}>
                  {contact.firstName} {contact.lastName}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Create Company</button>
      </form>
    </div>
  );
};

export default CreateCompany;
