import { createContext, useState } from "react";
import { handleSignIn, handleSignUp, setToken } from "../controller/controller";
import { useNavigate, Outlet } from "react-router-dom";
import useForm from "./Forms";
export const SignUpFormContext = createContext();
// ------------------ Sign Up ------------------
export function SignUpFormProvider({ children }) {
    const navigate = useNavigate();

    const {
        formData: signUpFormData,
        setFormData,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
        handleInputChange
    } = useForm({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSignUpFormSubmission = async () => {
        const { password, confirmPassword, ...userInfo } = signUpFormData;
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await handleSignUp({ password, ...userInfo });
            if(response.accessToken){
                console.log(response);
                setToken("accessToken", response.accessToken);
                console.log("access token received: ",response.accessToken)
                await setTimeout(()=>{
                    console.log("hello there!");
                }, 1000);
                
                navigate("/Notes");
            }
            else{
                navigate("/SignIn");
            }
            
        } catch (error) {
            console.log("Sign up error:", error.message);
            setErrorMessage("Failed to Sign Up");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SignUpFormContext.Provider value={{
            signUpFormData,
            setFormData,
            isLoading,
            setIsLoading,
            errorMessage,
            setErrorMessage,
            handleInputChange,
            handleSignUpFormSubmission
        }}>
            <Outlet/>
        </SignUpFormContext.Provider>
    );
}

// ------------------ Sign In ------------------
export function useSignInFormData() {
    const navigate = useNavigate();


    const {
        formData: signInFormData,
        setFormData,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
        handleInputChange
    } = useForm({
        userName: "",
        password: ""
    });

    const handleSignInFormSubmission = async () => {
        const { userName, password } = signInFormData;
        if (!userName || !password) {
            setErrorMessage("Both fields are required!");
            return;
        }
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await handleSignIn(signInFormData);
            if (response.accessToken) {
                setToken("accessToken", response.accessToken);
                navigate("/Notes");
            } else {
                setErrorMessage("Failed to Sign In");
            }
        } catch (error) {
            setErrorMessage("Invalid username or password");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signInFormData,
        setFormData,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
        handleInputChange,
        handleSignInFormSubmission
    };
}
