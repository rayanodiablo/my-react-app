import React from 'react'
import logo from '../assets/logo.png'



const Navbar = () => {

    return (
        <div className='navBar'>
            <img src={logo} alt="" />
            <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contacts</li>
            </ul>
            <button>Get Started</button>
        </div>
    )
} 
export default Navbar