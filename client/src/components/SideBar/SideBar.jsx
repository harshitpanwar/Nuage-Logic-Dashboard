import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SideBar = () => {
  const { authData } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [widthCss, setWidthCss] = useState('w-[50px]');

  const handleMenuToggle = () => {
    if (menuOpen) {
      setWidthCss('w-[50px]');
    } else {
      setWidthCss('w-[200px]');
    }
    setMenuOpen(!menuOpen);
  };

  // check the window url and highlight the active link
  const checkActiveLink = (url) => {
    return window.location.pathname === url ? 'bg-blue-800' : '';
  };

  if (!authData || !authData.userId) return null;

  return (
<div className={`h-screen md:block bg-blue-900 md:fixed top-16 left-0 ${widthCss} md:w-[200px]`}>

  <div className='px-2 pt-2 pb-3 space-y-1 hidden md:block'>
    {/* <Link
      to='/'
      className='text-white block px-3 py-2 rounded-md text-base font-medium'
    >
      Home
    </Link> */}

    <p className='text-white block px-3 py-2 rounded-md text-base font-medium'>Home</p>
    <div className='ml-4'>
      <a
        href='/settings'
        className={`text-white block px-3 py-2 hover:bg-blue-800 ${checkActiveLink('/settings')}`}
      >
        Settings
      </a>
    </div>

    <p className='text-white block px-3 py-2 rounded-md text-base font-medium'>Sales</p>
    <div className='ml-4'>
      <a
        href='/companies'
        className={`text-white block px-3 py-2 hover:bg-blue-800 ${checkActiveLink('/companies')}`}
      >
        Companies
      </a>
      <a
        href='/contacts'
        className={`text-white block px-3 py-2 hover:bg-blue-800 ${checkActiveLink('/contacts')}`}
      >
        Contacts
      </a>
    </div>
  
  </div>

  {menuOpen && (
    <div className='md:hidden bg-blue-900'>
      <button
        onClick={handleMenuToggle}
        className='text-white block px-3 py-2 rounded-md text-base font-medium md:hidden'
      >
        <svg
          className='h-6 w-6'
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
              className='ml-[200px]'
            />
          )}
        </svg>
      </button>
      <p className='text-white block px-3 py-2 rounded-md text-base font-medium'>Home</p>
    <div className='ml-4'>
      <a
        href='/settings'
        className={`text-white block px-3 py-2 hover:bg-blue-800 ${checkActiveLink('/settings')}`}
      >
        Settings
      </a>
    </div>

    <p className='text-white block px-3 py-2 rounded-md text-base font-medium'>Sales</p>
    <div className='ml-4'>
        <a
          href='/companies'
          className={`text-white block px-3 py-2 hover:bg-blue-800 ${checkActiveLink('/companies')}`}
        >
          Companies
        </a>
        <a
          href='/contacts'
          className={`text-white block px-3 py-2 hover:bg-blue-800 ${checkActiveLink('/contacts')}`}
        >
          Contacts
        </a>
    </div>
    </div>
  )}

  {!menuOpen && (
    <div className='md:hidden bg-blue-900'>
      <button
        onClick={handleMenuToggle}
        className='text-white block px-3 py-2 rounded-md text-base font-medium md:hidden'
      >
        <svg
          className='h-6 w-6'
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
              className='ml-[200px]'
            />
          )}
        </svg>
      </button>
    </div>
  )}

</div>
  );
};

export default SideBar;
