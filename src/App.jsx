//import Navbar from './Components/Navbar';
//import Header from './Components/Header';
import About from './pages/About';
import Home from './pages/Home';
import Products from './pages/Products';
import Contacts from './pages/Contacts';
import {Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';

function App() {

    return (
        <div>
            <Layout/>
  
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/products' element={<Products/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
            </Routes>

        </div>

    )

}

export default App;
