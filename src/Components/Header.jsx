import React from "react";
import logo from '../assets/logo.png'

function Header ()
{
    return (
        <div className="header">
            <img src={logo} alt="logo" />
            <div>first </div>
            <div>second</div>
            <div>third</div>
        </div>
    )
}

export default Header;