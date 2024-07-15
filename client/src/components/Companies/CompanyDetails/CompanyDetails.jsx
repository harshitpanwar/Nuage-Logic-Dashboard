// CompanyDetails.jsx

import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_COMPANY } from '../../../graphql/queries/companies'; // Import your GET_COMPANY query
import './CompanyDetails.css'; // Import your CSS for styling
import defaultLogo from '../../../assets/company.jpg';

const CompanyDetails = () => {
  const { companyId } = useParams(); // Get companyId from URL params
  const { loading, error, data } = useQuery(GET_COMPANY, {
    variables: { companyId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { getCompany } = data;

  return (
    <div className="max-w-2xl mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-100">
      <div className="flex flex-row justify-between items-baseline">
        <h1 className="text-2xl font-semibold text-gray-900 mb-5 text-center">
          Company Details
        </h1>
      </div>

      <div className="company-header mb-10 text-center">
        <img src={getCompany.logo || defaultLogo} alt={getCompany.name} className="company-logo w-20 h-20 rounded-full mx-auto" />
        <h2 className="text-xl font-bold mt-2">{getCompany.name}</h2>
      </div>

      <div className="details-section grid gap-6">
      <div className="grid md:grid-cols-2 md:gap-6 mt-10">

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="groupsTag"
            name="groupsTag"
            value={getCompany.groupsTag}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
          />
          <label
            htmlFor="groupsTag"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Groups Tag
          </label>
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="status"
            name="status"
            value={getCompany.status}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
          />
          <label
            htmlFor="status"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Status
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 mt-10">

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="assigned"
            name="assigned"
            value={getCompany?.assigned?.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
          />
          <label
            htmlFor="assigned"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Assigned
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="opportunityTag"
            name="opportunityTag"
            value={getCompany.opportunityTag}
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
      <div className="grid md:grid-cols-2 md:gap-6 mt-10">
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            id="summary"
            name="summary"
            value={getCompany.summary}
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
          <textarea
            id="notes"
            name="notes"
            value={getCompany.notes}
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
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 mt-10">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="specialties"
            name="specialties"
            value={getCompany.specialties}
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

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="industry"
            name="industry"
            value={getCompany.industry}
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
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 mt-10">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="revenue"
            name="revenue"
            value={getCompany.revenue}
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
            type="number"
            id="size"
            name="size"
            value={getCompany.size}
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
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 mt-10">
      <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="website"
            name="website"
            value={getCompany.website}
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

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="officePhone"
            name="officePhone"
            value={getCompany.officePhone}
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
      <div className="grid md:grid-cols-2 md:gap-6 mt-10">
      <div className="relative z-0 w-full mb-5 group">
          <textarea
            id="locations"
            name="locations"
            value={getCompany.locations.join(", ")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
          />
          <label
            htmlFor="locations"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Locations
          </label>
        </div>


        <div className="relative z-0 w-full mb-5 group">
          <textarea
            id="mainContact"
            name="mainContact"
            value={`${getCompany?.mainContact?.firstName || ''} ${getCompany?.mainContact?.lastName || ''}`}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
          />
          <label
            htmlFor="mainContact"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Main Contact
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 mt-10">
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            id="contacts"
            name="contacts"
            value={getCompany.contacts && getCompany.contacts.length>0 && getCompany.contacts.map(contact => `${contact.firstName} ${contact.lastName}`).join(", ")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
          />
          <label
            htmlFor="contacts"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Contacts
          </label>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
