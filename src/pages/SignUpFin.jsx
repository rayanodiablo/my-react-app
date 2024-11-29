import React from "react";
import { Link } from "react-router-dom";

const SignUpFin = () => {


    return(
        <div className="signUpBox">
                <div id="SignUpTitle">Welcome to ACE!</div>
                    <form action="">
                        
                        <input type="text" name="Password" placeholder="Password" className="SignInItem"/>
                        <br />
                        <br />
                        <input type="text" name="confirmPassword" placeholder="Confirm the Password" className="SignInItem"/>
                        <br />
                        <br />
                        <button className="SignInItem Button">Sing Up</button>
                        <Link to='/SignUp'> <button className="Button" id="previousButton">Previous</button></Link>
                        <Link to='/SignIn'><button className="Button SignInUpButton" >SignIn</button></Link>

                    </form>

        </div>
    )

};

export default SignUpFin;