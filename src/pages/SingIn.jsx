import React from "react";
import { Link } from "react-router-dom";


const SignIn = ({signInFormData, handleChange, handleSubmit, isLoading, errorMessage}) => {

    return (
        <div id="signInBox">
            <div id="SignInTitle">Sign In</div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                if(!isLoading) handleSubmit();
            }}>
                <input type="text" name="userName" id="nameInput" placeholder="user name" onChange={handleChange}/>
                <br />
                <br />
                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                <br />
                <br />
                <button type="submit" disabled={isLoading}>{isLoading? "Signing in...": "Sign In"}</button>

            </form>
            { errorMessage && <div className="errorMessage"> {errorMessage} </div>} {/*Showing error messages if there is */}
           
            <div id="forgetPassword">Forgot the password?</div>
            <Link to='/SignUp'><div id="newToAce">   New to ACE ? <br /> Sign Up for free!</div></Link>

        </div>
    )

}

export default SignIn;