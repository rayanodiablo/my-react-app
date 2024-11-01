import React from 'react'
import logo from '../assets/logo.png'



const Navbar = () => {

    return (

        <div className='navBar col-2'>
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