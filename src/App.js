import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';
import  Home from './pages/Home';
import  Login from './pages/LogIn';
import  Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import  NotFound from './components/errors/NotFound';
import SignUp from './pages/SignIUp';
import CheckOut from './pages/CheckOut';
import { HelmetProvider } from 'react-helmet-async';



Modal.setAppElement("#root");
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/checkout" element={<CheckOut />} />
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
