import React from "react";
import { Link } from "react-router-dom";


const SignIn = () => {

    return (
        <div id="signInBox">
            <div id="SignInTitle">Sign In</div>
            <form action="">
                <input type="text" name="accountName" id="nameInput" placeholder="Name"/>
                <br />
                <br />
                <input type="text" name="Password" placeholder="Password"/>
                <br />
                <br />
                <button>Log In</button>

            </form>

           
            <div id="forgetPassword">Forgot the password?</div>
            <Link to='/SignUp'><div id="newToAce">   New to ACE ? <br /> Sign Up for free!</div></Link>

        </div>
    )

}

export default SignIn;