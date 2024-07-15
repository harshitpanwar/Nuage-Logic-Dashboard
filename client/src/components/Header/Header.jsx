import React from 'react'
import './Header.css'
import HeaderImage from '../../assets/header-image.png'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {

  const { authData, logout } = useAuth();


  return (
    <div className='header'>
      <ul>
        <li>
          <img src={HeaderImage} alt='Header' className='header-image' />
        </li>

        {authData && authData.userId ? (
          <li>
            <button className='login-button' onClick={logout}>
              <a href='/login'>Logout</a>
            </button>
          </li>
        ) : (
          <li>
            <button className='logout-button' >
              <a href='/login'>Login</a>
            </button>
          </li>
        )}

      </ul>
    </div>
  )
}

export default Header