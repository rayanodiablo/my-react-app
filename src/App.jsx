
import Home from './pages/Home';
import {Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import SignIn from './pages/SingIn';
import SignUp from './pages/SignUp';
import SignUpFin from './pages/SignUpFin';
import Notes from './pages/MyNotes';
import { useSignUpFormData, useSignInFormData } from './formHandler/useFormData';
import ProtectedRoute from './Components/ProtectedRoute';
function App() {

    // Sign in :
    const { SignUpFormData, handleSignUpInputChange, handleSignUpFormSubmission, signUpIsLoading, signUpErrorMessage  } = useSignUpFormData();
    
    //Sign Up : 
    const {signInFormData, handleSignInInputChange, handleSignInFormSubmission, signInIsLoading, signInErrorMessage} = useSignInFormData();

    return (
        <div id="allContent">  
                <Routes  >

                    <Route path="/" element={<Home/>} />

                    <Route element={<Layout/>}>

                        <Route path="/Notes" element={<ProtectedRoute > <Notes/> </ProtectedRoute >} />
                        <Route path="/SignIn" element={<SignIn singInFormData={signInFormData} handleChange={handleSignInInputChange} handleSubmit={handleSignInFormSubmission} isLoading={signInIsLoading} errorMessage={signInErrorMessage}/>} />
                        <Route path="/SignUp" element={<SignUp SignUpFormData={SignUpFormData} handleChange={handleSignUpInputChange} handleSubmit={handleSignUpFormSubmission} isLoading={signUpIsLoading} errorMessage={signUpErrorMessage}/>} />
                        <Route path="/SignUpFin" element={<SignUpFin SignUpFormData={SignUpFormData} handleChange={handleSignUpInputChange} handleSubmit={handleSignUpFormSubmission} errorMessage={signUpErrorMessage} isLoading={signUpIsLoading} />} />
                    </Route>
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>

                    


        </div>

    )

}

export default App;
