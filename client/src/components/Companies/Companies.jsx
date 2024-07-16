import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COMPANIES } from '../../graphql/queries/companies';
import './Companies.css'; 
import defaultLogo from '../../assets/company.jpg';
import Loader from '../Loader/Loader';
import {Edit} from 'lucide-react'

const Companies = () => {
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(5);

  const { loading, error, data } = useQuery(GET_COMPANIES, {
    variables: { page, limit }
  });

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleNext = (e) => {
    console.log('next', page);
    e.preventDefault();
    setPage(page + 1);
  }

  const handlePrev = (e) => {
    e.preventDefault();
    setPage(page - 1);
  }

  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-4'>
      <div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
        <div>
          <h2 className='text-lg font-semibold'>Companies</h2>
          <p className='mt-1 text-sm text-gray-700'>
            This is a list of all companies. You can add new companies, view details, and more.
          </p>
        </div>
        <div>
          <Link
            to='/create-company'
            className='px-2 inline-flex text-xs leading-5 font-semibold rounded-sm bg-blue-100 text-blue-800 p-1 px-3 hover:bg-blue-300 tex-blue-800'
          >
            Add Company
          </Link>
        </div>
      </div>
      <div className='mt-6 flex flex-col'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'></th>
                    <th className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>Company Name</th>
                    <th className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>Group Tag</th>
                    <th className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>Assigned To</th>
                    <th className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>Locations</th>
                    <th className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>Revenue</th>
                    <th className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>Status</th>
                    <th className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {data.getCompanies.companies.map(company => (
                    <tr key={company._id}>
                      <td className='whitespace-nowrap px-4 py-4'>
                        <img src={company.logo || defaultLogo} alt={company.name} className='h-10 w-10 rounded-full' />
                      </td>
                      <td className='whitespace-nowrap px-4 py-4'>
                        <Link to={`/company/${company._id}`} className='text-sm font-medium text-gray-900'>
                          {company.name}
                        </Link>
                      </td>
                      <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500'>{company.groupsTag}</td>
                      
                      <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-grey-100 text-grey-800'>
                          {company?.assigned?.email}
                        </span>
                      </td>
                      <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500'>
                        {company.locations && company.locations.length > 0 ? (
                          <div className='flex flex-col'>
                            {/* {
                              company.locations.map((location, index) => (
                                <span key={index} className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                  {location}
                                </span>
                              ))
                            } */}
                            <span className=''>
                              {company.locations.join(', ')}
                            </span>
                          </div>

                        ) : (
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                            Not Specified
                          </span>
                        )}
                      </td>
                      <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500'>
                        {company.revenue}
                      </td>
                      <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500'>
                        
                        {company.status == 'Active' ? (
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            Active
                          </span>
                        ) : (
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500'>
                        <div className='flex flex-row'>
                          <Link to={`/company/${company._id}`} className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 p-1 px-3'>
                            View
                          </Link>
                          <Link to={`/update-company/${company._id}`} className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 p-1 px-3'>
                            <span className='mr-1'>Edit</span><Edit size={16} />
                          </Link>
                        </div>
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

        {page} of {Math.ceil(data.getCompanies.totalCompanies / limit)}

        {
        page < Math.ceil(data.getCompanies.totalCompanies / limit) &&
        <a className="flex flex-row mx-2 text-sm font-semibold text-gray-900" onClick={handleNext}>
          <span className="lg:block">Next &rarr;</span>
          {/* <span className="block lg:hidden">&rarr;</span> */}
        </a>
        }

      </div>
    </div>
  );
};

export default Companies;
