
import About from './pages/About';
import Home from './pages/Home';
import Products from './pages/Products';
import Contacts from './pages/Contacts';
import {Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import SignIn from './pages/SingIn';
import SignUp from './pages/SignUp';
import SignUpFin from './pages/SignUpFin';

function App() {

    return (
        <div id="allContent">  
                <Routes  >

                    <Route path="/" element={<Home/>} />

                    <Route element={<Layout/>}>
                        <Route path='/products' element={<Products/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/contacts' element={<Contacts/>}/>
                        <Route path="/SignIn" element={<SignIn/>} />
                        <Route path="/SignUp" element={<SignUp/>} />
                        <Route path="/SignUpFin" element={<SignUpFin/>} />
                    </Route>

                </Routes>

                    


        </div>

    )

}

export default App;
