import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_CONTACT } from '../../../graphql/queries/contacts'; // Import GET_CONTACT query
import { UPDATE_CONTACT } from '../../../graphql/mutations/contact'; // Import UPDATE_CONTACT mutation
import { GET_COMPANIES } from '../../../graphql/queries/companies'; // Import GET_COMPANIES query
// import './UpdateContact.css'; // Import CSS for styling

const UpdateContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CONTACT, {
    variables: { contactId },
  });
  const [formData, setFormData] = useState({
    groupsTag: '',
    displayName: '',
    firstName: '',
    lastName: '',
    nickname: '',
    status: '',
    source: '',
    companyId: '',
    title: '',
    workEmail: '',
    additionalWorkEmail: '',
    homeEmail: '',
    mobilePhone: '',
    workPhone: '',
    extension: '',
    linkedin: '',
    homeAddress: '',
    notes: '',
  });

  const [updateContact, {loading: updateContactLoading}] = useMutation(UPDATE_CONTACT, {
    variables: { id: contactId, input: formData } ,
    onCompleted: () => {
        navigate(`/contact/${contactId}`);
    }
  });
  const [companiesData, setCompaniesData] = useState(null);

  const [getCompanies, { called, loading: loadingCompanies, dataCompanies, errorCompanies}] = useLazyQuery(GET_COMPANIES, {
    onCompleted: (data) => {
        setCompaniesData(data);
    }
  });

  useEffect(() => {
    if (data) {
      setFormData({
        groupsTag: data.contact.groupsTag,
        displayName: data.contact.displayName,
        firstName: data.contact.firstName,
        lastName: data.contact.lastName,
        nickname: data.contact.nickname,
        status: data.contact.status,
        source: data.contact.source,
        companyId: data.contact.companyId._id,
        title: data.contact.title,
        workEmail: data.contact.workEmail,
        additionalWorkEmail: data.contact.additionalWorkEmail,
        homeEmail: data.contact.homeEmail,
        mobilePhone: data.contact.mobilePhone,
        workPhone: data.contact.workPhone,
        extension: data.contact.extension,
        linkedin: data.contact.linkedin,
        homeAddress: data.contact.homeAddress,
        notes: data.contact.notes,
      });
    }
    getCompanies();
  }, [data]);

  if (loading || loadingCompanies) return <p>Loading...</p>;
  if (error || errorCompanies) return <p>Error: {error.message || errorCompanies.message}</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateContact({
        variables: {
          updateContactId: contactId,
          input: formData,
        },
      });
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-100">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-5 text-center">Update Contact</h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="firstName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="lastName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last Name
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
              required
            >
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
            <select
              id="companyId"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              {companiesData &&
                companiesData.getCompanies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
            </select>
            <label
              htmlFor="companyId"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Company
            </label>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <label
              htmlFor="status"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Status
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="customer">Customer</option>
              <option value="lead">Lead</option>
              <option value="referral">Referral</option>
              <option value="vendor">Vendor</option>
              <option value="other">Other</option>
            </select>
            <label
              htmlFor="source"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Source
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="workEmail"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Work Email
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="additionalWorkEmail"
              name="additionalWorkEmail"
              value={formData.additionalWorkEmail}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="additionalWorkEmail"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Additional Work Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="homeEmail"
              name="homeEmail"
              value={formData.homeEmail}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="homeEmail"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Home Email
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="mobilePhone"
              name="mobilePhone"
              value={formData.mobilePhone}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="mobilePhone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mobile Phone
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="workPhone"
              name="workPhone"
              value={formData.workPhone}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="workPhone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Work Phone
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="extension"
              name="extension"
              value={formData.extension}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="extension"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Extension
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="linkedin"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              LinkedIn
            </label>
          </div>
        </div>
      

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="homeAddress"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="homeAddress"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Home Address
          </label>
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            htmlFor="notes"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Notes
          </label>
        </div>
        
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
          disabled={updateContactLoading}
        >
          update Contact
        </button>

      </div>
    </div>
  );
};

export default UpdateContact;
