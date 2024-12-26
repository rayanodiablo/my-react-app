import React from "react";
import { Link } from "react-router-dom";

const SignUp = ({ SignUpFormData, handleChange }) => {
   


    return(
        <div className="signUpBox">
                <div id="SignUpTitle" className="SignInItem">Welcome to ACE!</div>
                    <form  >
                        <input type="text" name="firstName"  placeholder="First Name" className="SignInItem" onChange={handleChange}/>
                        <br />
                        <br />
                        <input type="text" name="lastName" placeholder="Last Name" className="SignInItem" onChange={handleChange}/>
                        <br />
                        <br />
                        <input type="text" name="userName" placeholder="User Name" className="SignInItem" onChange={handleChange}/>
                        <br />
                        <br />
                        <input type="text" name="email" placeholder="email" className="SignInItem" onChange={handleChange}/>
                        <br />
                        <br />
                        
                        <Link to='/SignUpFin'><button className="Button" id="nextButton">NEXT</button></Link>
                        <Link to='/SignIn'><button className="Button SignInUpButton">SignIn</button></Link>

                    </form> 

        </div>
    )

};

export default SignUp;