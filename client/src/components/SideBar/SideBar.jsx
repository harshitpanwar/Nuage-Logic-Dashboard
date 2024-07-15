import React from 'react'
import { House, Building, Contact2, ArrowLeft } from 'lucide-react';
import {Link} from 'react-router-dom'
import './SideBar.css'

const SideBar = () => {

    const toggleSideBar = () => {
        console.log('Toggle sidebar')
    }

  return (
    <div className='sidebar'>
        <ul>

            <li>
                <Link to='/home'>
                    <House/>
                    <p>Home</p>
                </Link>
            </li>
            <li>
                <Link to='/companies'>
                    <Building/>
                    <p>Companies</p>
                </Link>
            </li>
            <li>
                <Link to='/contacts'>
                    <Contact2/>
                    <p>Contacts</p>
                </Link>
            </li>
        </ul>
        {/* <div className='toggle'>
            <button onClick={toggleSideBar}>
                <ArrowLeft/>
            </button>
        </div> */}
    </div>
  )
}

export default SideBar