import { useContext } from "react";
import { Link } from "react-router-dom";
import {SignUpFormContext} from '../formHandler/useFormData'
const SignUp = () => {
   
    const {handleInputChange, signUpFormData} = useContext(SignUpFormContext)



    return(
        <div className="signUpBox">
                <div id="SignUpTitle" className="SignInItem">Welcome to ACE!</div>
                    <form  >
                        <input type="text" name="firstName"  placeholder="First Name" className="SignInItem" onChange={handleInputChange} value={signUpFormData.firstName}/>
                        <br />
                        <br />
                        <input type="text" name="lastName" placeholder="Last Name" className="SignInItem" onChange={handleInputChange} value={signUpFormData.lastName}/>
                        <br />
                        <br />
                        <input type="text" name="userName" placeholder="User Name" className="SignInItem" onChange={handleInputChange} value={signUpFormData.userName}/>
                        <br />
                        <br />
                        <input type="text" name="email" placeholder="email" className="SignInItem" onChange={handleInputChange} value={signUpFormData.email}/>
                        <br />
                        <br />

                        
                        <Link to='/SignUpFin'><button type="button" className="Button" id="nextButton">NEXT</button></Link>
                        <Link to='/SignIn'><button type="button" className="Button SignInUpButton">SignIn</button></Link>


                    </form> 

        </div>
    )

};

export default SignUp;