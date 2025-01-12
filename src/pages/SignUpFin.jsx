import React from "react";
import { Link } from "react-router-dom";

const SignUpFin = ({ SignUpFormData, handleChange, handleSubmit, isLoading, errorMessage}) => {





    return(
        <div className="signUpBox">
                <div id="SignUpTitle">Welcome to ACE!</div>
                    <form onSubmit = {(e) =>{
                        e.preventDefault()
                        if(!isLoading) 
                            {
                                handleSubmit();
                            }
                    }
                    }>
                        
                        <input type="password" name="password" placeholder="Password" className="SignInItem" onChange={handleChange}/>
                        <br />
                        <br />
                        <input type="password" name="confirmPassword" placeholder="Confirm the Password" className="SignInItem" onChange={handleChange}/>
                        <br />
                        <br />
                        <button type="submit" className="SignInItem Button" disabled={isLoading}>Sing Up</button>
                        <Link to='/SignUp'> <button className="Button" id="previousButton">Previous</button></Link>
                        <Link to='/SignIn'><button className="Button SignInUpButton" >SignIn</button></Link>

                    </form>

                     <div className="errorMessage">{"errorMessage!!"}</div>

        </div>
    )

};

export default SignUpFin;