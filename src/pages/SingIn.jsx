import { Link } from "react-router-dom";
import {useSignInFormData} from "../formHandler/useFormData"

const SignIn = () => {

    const {
        isLoading,
        errorMessage,
        handleInputChange,
        handleSignInFormSubmission
    } = useSignInFormData()
    
    return (
        <div id="signInBox">
            <div id="SignInTitle">Sign In</div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                if(!isLoading) handleSignInFormSubmission();
            }}>
                <input type="text" name="userName" id="nameInput" placeholder="user name" onChange={handleInputChange}/>
                <br />
                <br />
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange}/>
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