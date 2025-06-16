import {useState, useEffect} from "react";
import axios from "axios";
import Loading from "../components/errors/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch , useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "../redux/cartSlice";
import Button from "../components/Buttons";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import  Modal  from 'react-modal';
import FreeShippingNotice from "../components/FreeShippingNotice";
import '../assets/styles/Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/FreeShippingNotice.css'
import { setProducts as setProductsRedux } from "../redux/productSlice";
import Fotter from "../components/Fotter";
import { Helmet } from "react-helmet-async";






function Home() {
    const [isloading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state)=> state.cart.items);
    const products = useSelector((state) => state.products.items);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


    useEffect(()=>{
        setIsOpen(true);
    },[])
    
    useEffect(() => {
        axios.get("https://dummyjson.com/products")
            .then(response => {
            dispatch(setProductsRedux(response.data.products));
            setIsLoading(false);
            });
}, [dispatch]);

    
    const handleAddToCart = (product) => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return ;
        }
        dispatch(addToCart(product));
    };
    if(isloading){
        return <Loading/>
    }
    function renderStars(rating) {
        const rounded = Math.round(rating);
        const fullStars = '★'.repeat(rounded);
        const emptyStars = '☆'.repeat(5-rounded);
        return fullStars+emptyStars;
    }
    return (
        <>
        <Helmet>
            <title>ShopEase | Home</title>
        </Helmet>

        <div className="after-navbar">
        <Navbar/>
        <FreeShippingNotice mode="static"/>
        </div>
        <div className="container my-5  mb-5 pt-3">
        <div className="row gx-3 gy-4">
        {products.map((product) =>{
        const isInCart = cartItems.find(item => item.id === product.id);
        
        return(
            <div className= "col-sm-6 col-md-4 col-lg-3 mb-4"  key={product.id}>
                <div className='product-card h-100 d-flex flex-column justify-content-between'>
                    <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none text-dark">
                    <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="card-img mb-3"
                    />
                
                    <h3 className="fw-bold mb-2">
                        {product.title}</h3>
                    </Link>

            <h4 className=" price fw-semibold mb-2">${product.price.toFixed(2)}</h4>
            <div className="text-warning mb-3" style={{fontSize: "0.9er"}}>
                {renderStars(product.rating)}{" "}
                <span className="text-muted"> ({product.rating.toFixed(2)})</span>
            </div>
            {!isInCart ?(
                <Button
                label={<span><FontAwesomeIcon icon={faCartShopping} className="me-2"/> Add to Cart</span>}
                onClick={()=>handleAddToCart(product)}
                variant=""
                className="rounded-pill slide-hover w-100"
                />
            ):(
                <div className="d-flex align-items-center gap-2">
                    <Button
                    label={"-"}
                    onClick={()=> dispatch(decrementQuantity({id:product.id}))}
                    className="rounded-pill slide w-50"
                    variant="success"/>
                    <span className="fw-bold">{isInCart.quantity}</span>
                    <Button
                    label={"+"}
                    onClick={()=>dispatch(incrementQuantity({id:product.id}))}
                    className="rounded-pill slide w-50"
                    variant="success"/>
                </div>
            )}
                </div>
                </div>
    );
})}
</div>
</div>
<Modal
isOpen={isOpen}
onRequestClose={()=> setIsOpen(false)}
className="custom-modal"
overlayClassName="custom-overlay"
>
    <h1>🎉 10% off your first order</h1>
    <p>Use code <strong>WELCOME10</strong> at checkout.</p>
    <Button
    label={"Got it!"}
    onClick={()=>setIsOpen(false)}
    variant="success"
    className=" rounded-pill w-50 mt-3 slide"/>
</Modal>
<Modal
isOpen={showLoginModal}
onRequestClose={()=> setShowLoginModal(false)}
className="custom-modal"
overlayClassName="custom-overlay"
>
    <h1>To start shopping pleas Login</h1>
    <div className="d-flex justify-content-center gap-3 mt-3">
        <Button
        label={"Login"}
        onClick={()=> {
            navigate("/login");
            setShowLoginModal(false)
        }}
        className="rounded-pill w-50 mt-3 slide"
        variant="success"
        />
        <Button
        label={"Not now"}
        onClick={()=> setShowLoginModal(false)}
        variant="success"
        className="rounded-pill w-50 mt-3 slide"
        />
    </div>
</Modal>
<Fotter/>
</>
    );
}
export default Home;
