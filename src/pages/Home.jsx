import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {


    return (
        <div id="homeContainer" >
            <div id='coloredCircle'></div>
            <div id='welcomeTitle'> <div className='inlineDiv'>Welcome to</div> <div id='Ace' className='inlineDiv'>Ace</div> </div>
            <Link to="/SignIn"><button id='getStarted'>Get Started</button></Link>
        </div>
    )
} 
export default Home