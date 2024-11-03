import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {

    return (

        <div className='navBar col-2'>
            <ul className='ul_navbar'>
                <Link to='/' ><li>Home</li></Link>
                <Link to='/products' ><li>Products</li></Link>
                <Link to ='/about' ><li>About</li></Link>
                <Link to ='/contacts' ><li>Contacts</li></Link>
            </ul>
            <button id='getStartedButton'>Get Started</button>
        </div>
    )
} 
export default Navbar