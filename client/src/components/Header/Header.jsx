import React, { useState } from 'react';
import './Header.css'; // Remove this import
import HeaderImage from '../../assets/header-image.png';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { authData, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='bg-blue-900 text-white'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* Mobile menu button */}
            <button
              onClick={handleMenuToggle}
              className='inline-flex items-center justify-center p-2 rounded-md text-white'
              aria-expanded={menuOpen}
            >
              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                {menuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16m-7 6h7'
                  />
                )}
              </svg>
            </button>
          </div>
          <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex flex-col justify-center'>
              <img className='h-8 w-auto' src={HeaderImage} alt='Header' />
            </div>
            <div className='hidden sm:block sm:ml-6'>
              <div className='flex space-x-4'>
                <Link
                  to='/home'
                  className='text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Home
                </Link>
                <Link
                  to='/companies'
                  className='text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Companies
                </Link>
                <Link
                  to='/contacts'
                  className='text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Contacts
                </Link>
              </div>
            </div>
          </div>
          {authData && authData.userId ? (
            <button
              onClick={logout}
              className='text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium'
            >
              Logout
            </button>
          ) : (
            <button
              className='text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium'
            >
              <Link to='/login'>Login</Link>
            </button>
          )}
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      {menuOpen && (
        <div className='sm:hidden bg-blue-900'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {/* Mobile navigation links */}
            <Link
              to='/home'
              className='text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Home
            </Link>
            <Link
              to='/companies'
              className='text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Companies
            </Link>
            <Link
              to='/contacts'
              className='text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Contacts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
