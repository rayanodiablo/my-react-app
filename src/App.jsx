
import Home from './pages/Home';
import {Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import SignIn from './pages/SingIn';
import SignUp from './pages/SignUp';
import SignUpFin from './pages/SignUpFin';
import Notes from './pages/MyNotes';
import { SignUpFormProvider } from './formHandler/useFormData';
import ProtectedRoute from './Components/ProtectedRoute';
function App() {

    return (
        <div id="allContent">  
                <Routes  >

                    <Route path="/" element={<Home/>} />

                    <Route element={<Layout/>}>

                        <Route path="/Notes" element={<ProtectedRoute > <Notes/> </ProtectedRoute >} />
                        <Route path="/SignIn" element={<SignIn />} />
                        <Route element={<SignUpFormProvider/>}>
                                <Route path="/SignUp" element={<SignUp />} />
                                <Route path="/SignUpFin" element={<SignUpFin />} />    
                        </Route>
                    </Route>
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>

                    


        </div>

    )

}

export default App;
