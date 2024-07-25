import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SideBar = () => {
  const { authData } = useAuth();
  const [menuOpen, setMenuOpen] = useState(true);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  if (!authData || !authData.userId) return null;

  return (
<div className='h-screen overflow-auto hidden md:block bg-blue-900 fixed top-16 left-0 w-0 md:w-[200px]'>
  <div className='px-2 pt-2 pb-3 space-y-1'>
    {/* <Link
      to='/'
      className='text-white block px-3 py-2 rounded-md text-base font-medium'
    >
      Home
    </Link> */}
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
  );
};

export default SideBar;
