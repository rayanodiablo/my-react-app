import React from "react";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import { useState } from "react";


function Header ()
{

    return (
        <div className="header">
            <Link to='/' id="img-container"><img src={logo} alt="logo" /></Link>

            <form id="form-container">
                <input type="text" id="search-bar" placeholder="search" />
                <input id="search_button" type="submit" value="Submit"/> 
            </form>
        </div>
    )
}

export default Header;