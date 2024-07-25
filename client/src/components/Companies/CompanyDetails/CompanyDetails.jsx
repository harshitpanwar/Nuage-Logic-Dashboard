import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_COMPANY } from '../../../graphql/queries/companies';
import { GET_CONTACTS } from '../../../graphql/queries/contacts';
import defaultLogo from '../../../assets/company.jpg';
import {ArrowLeft, Edit} from 'lucide-react';
import Loader from '../../Loader/Loader';

const UpdateCompany = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const { data: companyData, loading: companyLoading, error: companyError } = useQuery(GET_COMPANY, {
    variables: { companyId },
  });

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

  const [contactsData, setContactsData] = useState([]);
  const [getContacts, {loading: contactsLoading, error: contactsError}] = useLazyQuery(GET_CONTACTS, {
    onCompleted: (data) => {
      setContactsData(data?.contacts || []);
    }
  });

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  useEffect(() => {
    if (companyData) {
      setFormData({
        website: companyData.getCompany.website || '',
        summary: companyData.getCompany.summary || '',
        status: companyData.getCompany.status || '',
        specialties: companyData.getCompany.specialties || '',
        size: companyData.getCompany.size || 0,
        opportunityTag: companyData.getCompany.opportunityTag || '',
        revenue: companyData.getCompany.revenue || '',
        officePhone: companyData.getCompany.officePhone || '',
        notes: companyData.getCompany.notes || '',
        name: companyData.getCompany.name || '',
        mainContact: companyData.getCompany.mainContact ? companyData.getCompany.mainContact._id : null,
        logo: companyData.getCompany.logo || '',
        locations: companyData.getCompany.locations || [''],
        industry: companyData.getCompany.industry || '',
        groupsTag: companyData.getCompany.groupsTag || '',
        contacts: companyData.getCompany.contacts.map(contact => contact._id) || [],
        assigned: companyData.getCompany.assigned ? companyData.getCompany.assigned._id : ''
      });
    }
  }, [companyData]);


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
      await updateCompany({ variables: { companyId, companyInput: formData } });
      navigate('/companies');
    } catch (error) {
    }
  };

  if (companyLoading || contactsLoading) return <Loader/>;
  if (companyError) return <p>Error: {companyError.message}</p>;
  if (contactsError) return <p>Error: {contactsError.message}</p>;

  return (
    <div className="w-full max-w-2xl mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-100">
      <div className="max-w-md mx-auto">
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between mb-5'>
            <button onClick={() => navigate('/companies')} className='flex flex-row items-center px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 p-1 px-3'>
              <ArrowLeft size={16} />
              <span className='ml-2'>
                Back to Companies                
              </span>
            </button>
            <button onClick={() => navigate(`/update-company/${companyId}`)} className='flex flex-row items-center px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 p-1 px-3'>
              <span className='mr-2'>
                Update Company
              </span>  
              <Edit size={16} />          
            </button>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-5 text-center">Company Details</h1>
          <img src={formData.logo || defaultLogo} alt={formData.name} className="h-20 w-20 mx-auto rounded-full" />
        </div>
        <form className="flex flex-col justify-center align-middle mt-10">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                disabled
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <label
                htmlFor="status"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Status
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <select
                id="groupsTag"
                name="groupsTag"
                value={formData.groupsTag}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                disabled
              >
                <option value="">Select Group Tag</option>
                <option value="active contacts">Active Contacts</option>
                <option value="lead list">Lead List</option>
                <option value="new contacts">New Contacts</option>
                <option value="inactive contacts">Inactive Contacts</option>
              </select>
              <label
                htmlFor="groupsTag"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Groups Tag
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <div>
                {formData.locations.map((location, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => handleLocationChange(index, e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      disabled
                    />

                  </div>
                ))}
              </div>
              <label
                htmlFor="locations"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Locations
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="industry"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Industry
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="website"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Website
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="summary"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Summary
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="specialties"
                name="specialties"
                value={formData.specialties}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="specialties"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Specialties
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleSizeChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="size"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Size
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="opportunityTag"
                name="opportunityTag"
                value={formData.opportunityTag}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="opportunityTag"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Opportunity Tag
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="revenue"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Revenue
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="officePhone"
                name="officePhone"
                value={formData.officePhone}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="officePhone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Office Phone
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="notes"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Notes
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select
                id="mainContact"
                name="mainContact"
                value={formData.mainContact}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                disabled
              >
                <option value="">Select Main Contact</option>
                {
                contactsData && contactsData.contacts &&
                contactsData.contacts.map((contact) => (
                  <option key={contact._id} value={contact._id}>
                    {contact.firstName} {contact.lastName}
                  </option>
                ))}
              </select>
              <label
                htmlFor="mainContact"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Main Contact
              </label>
            </div>
          </div>

          {/* <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled
              />
              <label
                htmlFor="logo"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Logo
              </label>
            </div>

          </div> */}
{/* 
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Company
            </button>
            <button
              type="button"
              onClick={() => navigate('/companies')}
              className="px-4 py-2 bg-gray-600 text-white font-medium text-sm rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default UpdateCompany;
