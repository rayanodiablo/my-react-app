import { useState } from "react";
import {handleSignIn, handleSignUp, setToken} from "../controller/controller";
import { replace, useNavigate } from "react-router-dom";

// functions for saving, reading and removing the toking from the local storage of the browser: 



export function useSignUpFormData () {

        const navigate = useNavigate();
        const [SignUpFormData, setSignUpFormData] = useState({ // setting up sign up input field's object
        firstName : "",
        lastName : "",
        userName : "",
        email : "",
        password : "",
        confirmPassword: ""

    })

    const [signUpIsLoading, setSignUpIsLoading] = useState(false); // bool for whether sign up is loading or not -- only this function can change it's state --
    const [signUpErrorMessage, setSignUpErrorMessage] = useState(""); // error message when signing up


    // handling input change when user is typing: 
    function handleSignUpInputChange (e) { 
        const { name, value} = e.target;
        setSignUpFormData((prev) => ({
            ...prev,
            [name] : value // only change the input that is being typed into
        }))
    };

    const handleSignUpFormSubmission = async () =>{
    
        const {password, confirmPassword, ...userInfo} = SignUpFormData;
/*
        if(password !== confirmPassword)
        {
            setSignUpErrorMessage("password and confirmPassword should match!");
            return;
        }
*/
        setSignUpErrorMessage(""); // deleting any previous errors rendering on the page

        
        setSignUpIsLoading(true);

        console.log("user infos, this should be without the password: ", JSON.stringify(userInfo));

        try{
            const response = handleSignUp({password, ...userInfo });
            console.log("signing up successfully, response: ", response);
            navigate('/SignIn');
        }
        
        catch(error)
        {
            console.log(`error has occured while signin up, error: ${error.message}`);
            setSignUpErrorMessage("Failed to Sign In, please check your credentials");
        }
        finally{
            setSignUpIsLoading(false);
            return;
        }

    }

    return { SignUpFormData, setSignUpFormData, handleSignUpInputChange, handleSignUpFormSubmission,signUpIsLoading, signUpErrorMessage }

}





export function useSignInFormData () {


    const navigate = useNavigate();

    const [signInFormData, setSignInFormData] = useState({ // setting up sign up input field's object
        userName: "",
        password : ""
    });

    const [signInIsLoading, setSignInIsLoading] = useState(false);
    const [signInErrorMessage, setSignInErrorMessage] = useState("");

    const handleSignInInputChange = (e) =>{ // handles input changes in sign in input form
        
        setSignInFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value 
        })
    );
    };

    const handleSignInFormSubmission = async () =>{
        const {userName, password} = signInFormData;
        if(!userName || !password) 
        {
            setSignInErrorMessage("both user name and password are required!")
            return;
        }
        setSignInErrorMessage("");
        setSignInIsLoading(true);

        try{
                const response = await handleSignIn(signInFormData);
                
                console.log(`the received access token is : ${JSON.stringify(response.accessToken)} `);
                if(response.accessToken)
                {
                    setToken( "accessToken", response.accessToken);
                    console.log("user Signed In successfully!");
                    navigate('/Notes');
                }
                else
                {
                    setSignInErrorMessage("Failed to Sign In");
                    setSignInIsLoading(false);
                    return;
                }


        }
        catch(error)
        {
            console.error(`error has occured while signing in, error: ${error.message}`);
            setSignInErrorMessage("Failed to Sign in, please check your user name or password!");
        }
        finally{
            setSignInIsLoading(false);
        }
    }

    return {signInFormData, handleSignInInputChange, handleSignInFormSubmission, signInIsLoading, signInErrorMessage}


};


