import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {


    return(
        <div className="signUpBox">
                <div id="SignUpTitle" className="SignInItem">Welcome to ACE!</div>
                    <form action="">
                        <input type="text" name="firstName"  placeholder="First Name" className="SignInItem"/>
                        <br />
                        <br />
                        <input type="text" name="lastName" placeholder="Last Name" className="SignInItem"/>
                        <br />
                        <br />
                        <input type="text" name="accountName" placeholder="account Name" className="SignInItem"/>
                        <br />
                        <br />
                        <input type="text" name="Gmail" placeholder="Gmail" className="SignInItem"/>
                        <br />
                        <br />
                        
                        <Link to='/SignUpFin'><button className="Button" id="nextButton">NEXT</button></Link>
                        <Link to='/SignIn'><button className="Button SignInUpButton">SignIn</button></Link>

                    </form> 

        </div>
    )

};

export default SignUp;