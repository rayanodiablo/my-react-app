import {useContext} from "react";
import { Link } from "react-router-dom";
import { SignUpFormContext } from "../formHandler/useFormData";
const SignUpFin = () => {

    const {handleInputChange, errorMessage, isLoading, handleSignUpFormSubmission, signUpFormData} = useContext(SignUpFormContext)



    return(
        <div className="signUpBox">
                <div id="SignUpTitle">Welcome to ACE!</div>
                    <form onSubmit = {(e) =>{
                        e.preventDefault()
                        if(!isLoading) 
                            {
                                handleSignUpFormSubmission();
                            }
                    }
                    }>
                        
                        <input type="password" name="password" placeholder="Password" className="SignInItem" onChange={handleInputChange} value={signUpFormData.password}/>
                        <br />
                        <br />
                        <input type="password" name="confirmPassword" placeholder="Confirm the Password" className="SignInItem" onChange={handleInputChange} value={signUpFormData.confirmPassword}/>
                        <br />
                        <br />
                        <button type="submit" className="SignInItem Button" disabled={isLoading}>Sing Up</button>
                        <Link to='/SignUp'> <button type="button" className="Button" id="previousButton">Previous</button></Link>
                        <Link to='/SignIn'><button type="button" className="Button SignInUpButton" >SignIn</button></Link>

                    </form>

                     {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        </div>
    )

};

export default SignUpFin;