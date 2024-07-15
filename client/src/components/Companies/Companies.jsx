// Companies.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COMPANIES } from '../../graphql/queries/companies'; // Import your GET_COMPANIES query
import './Companies.css'; // Import your CSS for styling
import defaultLogo from '../../assets/company.jpg';


const Companies = () => {
  const { loading, error, data } = useQuery(GET_COMPANIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='main-container'>
      <Link className="add-company-button" to='/create-company'>Add Company</Link>
      <div className="companies-container">
        {data.getCompanies.map(company => (
          <Link key={company._id} to={`/company/${company._id}`} className="company-link">
            <div className="company-tile">
              <img src={company.logo || defaultLogo} alt={company.name} className="company-logo" />
              <p className="company-name">{company.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
};

export default Companies;
