import React, {useState} from 'react';

import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CONTACTS } from '../../graphql/queries/contacts'; 
import Loader from '../Loader/Loader';

const Contacts = () => {
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(5);
  // const { loading, error, data } = useQuery(GET_CONTACTS));
  const { loading, error, data } = useQuery(GET_CONTACTS, {
    variables: { page, limit }
  });

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleNext = (e) => {
    e.preventDefault();
    setPage(page + 1);
  }

  const handlePrev = (e) => {
    e.preventDefault();
    setPage(page - 1);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Contacts</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all contacts. You can add new contacts, edit or delete existing ones.
          </p>
        </div>
        <div>
          <Link
            to="/create-contact"
            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-sm bg-blue-100 text-blue-800 p-1 px-3 hover:bg-blue-300 tex-blue-800"
          >
            Add Contact
          </Link>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">First Name</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Last Name</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Groups Tag</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Work Email</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Status</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.contacts.contacts.map(contact => (
                    <tr key={contact._id}>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">{contact.firstName}</div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">{contact.lastName}</div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">{contact.groupsTag}</div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-grey-100 text-grey-800'>
                          {contact.workEmail}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        {
                          contact.status === 'active' ?
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Active
                          </span>:
                          <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                            inActive
                          </span>

                        }

                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <Link to={`/contact/${contact._id}`} className="text-sm font-medium text-gray-900">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                            View Details
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-6">

        {
        page > 1 && 
        <a className={`flex flex-row mx-1 text-sm font-semibold text-gray-900`} onClick={handlePrev}>
          <span className="lg:block">&larr; Previous</span>
          {/* <span className="block lg:hidden">&larr;</span> */}
        </a>
        }
        
        {page} of {Math.ceil(data.contacts.totalContacts / limit)}

        {
        page < Math.ceil(data.contacts.totalContacts / limit) &&
        <a className="flex flex-row mx-2 text-sm font-semibold text-gray-900" onClick={handleNext}>
          <span className="lg:block">Next &rarr;</span>
          {/* <span className="block lg:hidden">&rarr;</span> */}
        </a>
        }

      </div>
    </section>
  );
};

export default Contacts;
