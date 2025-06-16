import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from  '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../components/errors/NotFound'
import Button from './Buttons';
import { logout } from '../redux/authSlice';
import {ClearCart} from '../redux/cartSlice'
import '../assets/styles/navbar.css'
import '../assets/styles/FreeShippingNotice.css'




function Navbar() {
    const cartItems = useSelector((state) => state.cart.items);
    const Products = useSelector((state) => state.products.items);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
    
    const handleSearch = (e) => {
        e.preventDefault();
        const matched = Products.find(
            (p)=> p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if(matched){
            navigate(`/product/${matched.id}`);
        }
        else{
            navigate('/*')
        }
    }
    
    return (
        <>
        <nav className='custom-navbar d-flex align-center justify-content-between '>
                {/* left secction */}
                <div className='d-flex align-items-center gap-3' style={{ flex: 1 }}>
                    <img 
                    src='https://cdn-icons-png.flaticon.com/512/833/833314.png'
                    alt='logo'
                    style={{width: '35px', height: '35px',marginRight: '10px'  }}
                    />
                    <Link to="/" className="navbar-brand text-dark fw-bold">ShopEase</Link>
                </div>
                    {/* center: serchbar */}
                    <div className='d-flex justify-content-center' style={{ flex: 2}}>
                        <form className='w-100' onSubmit={handleSearch}>
                            <div className='search-box'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "black"}}/>
                                <input
                                type='text'
                                placeholder='Search products...'
                                value={searchTerm}
                                onChange={(e)=> setSearchTerm(e.target.value)}/>
                            </div>
                        </form>
                    </div>
                    {/* right: cart & login/logout */}
                    <div className='d-flex align-items-center  justify-content-end gap-5' style={{ flex: 1}}>
                    <Link to={"/cart"}  
                    className='text-dark position-relative'>
                        <FontAwesomeIcon icon={faCartShopping } size='xl'/>
                        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark'>
                            {cartItems.reduce((total, item) => total + item.quantity, 0)}
                        </span>
                    </Link>
                    {/* logIn/Logout button */}
                    {isLoggedIn?(
                        <Button
                            label={"Logout"}
                            variant='light'
                            onClick={()=>{
                                dispatch(logout());
                                dispatch(ClearCart());
                            }}
                            className="btn-glass rounded-pill"/>
                    ):(
                        <Button
                            label={"login"}
                            onClick={()=>navigate("/login")}
                            variant='light'
                            className="btn-glass rounded-pill"/>
                    )}
                    </div>
        </nav>
        {/* <FreeShippingNotice mode="static"/> */}
        </>
    );
}

export default Navbar;
