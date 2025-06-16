import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/errors/Loading";
import Button  from "../components/Buttons";
import { useDispatch , useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "../redux/cartSlice";
import Navbar from '../components/Navbar'
import Footer from '../components/Fotter'
import '../assets/styles/productdetail.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import  Modal  from 'react-modal';

function ProductDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(()=>{
        axios.get(`https://dummyjson.com/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error=> console.error("featch error:", error));
    },[id]);

    if(!product) return <Loading/>

    const isInCart = cartItems.find(item => item.id === product.id);
    
    const handleAddToCart = (product) => {
        if(!isLoggedIn){
            setShowLoginModal(true);
            return ;
        }
        dispatch(addToCart(product));
        toast.success("🛒 Product added to cart!")
        
    };
    function renderStars(rating) {
        const rounded = Math.round(rating);
        const fullStars = '★'.repeat(rounded);
        const emptyStars = '☆'.repeat(5-rounded);
        return fullStars+emptyStars;
    }
    return(
        <div>
            <Navbar/>
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-12 col-md-6 mb-4">
                        <img
                        src = {product.images[0]}
                        alt={product.title}
                        className="img-fluid rounded"
                        style={{maxWidth: "450px", objectFit: "contain"}}
                        />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="d-flex flex-column dap-3">
                            <h2 className="fw-bold"> {product.title} </h2>
                            <p className="text-muted"> {product.description} </p>

                            <div d-flex >
                                <h4 className="mb-1">
                                    Price: <span className="text-success"> ${product.price} </span>
                                </h4>
                            </div>

                            <div>
                                <h4 className="mb-1">Rating:  
                                <span className="text-success fs-4 ">
                                    {renderStars(product.rating)}{" "}
                                </span>
                                </h4>
                            </div>

                            {!isInCart ?(
                                <div className="d-flex justify-content-start justify-content-md-center mt-3">
                                    <Button
                                    label={
                                    <span>
                                        <FontAwesomeIcon icon={faCartShopping} className="me-2"/>
                                        Add to Cart
                                    </span>}
                                    onClick={()=>handleAddToCart(product)}
                                    variant="success"
                                    className="btn-add rounded-pill"
                                    />
                                </div>
                                
                            ):(
                                <div className="d-flex  flex-wrap justify-content-start justify-content-md-center align-items-center gap-2 mt-3">
                                    <Button
                                    label={"-"}
                                    onClick={()=> dispatch(decrementQuantity({id:product.id}))}
                                    variant="success"
                                    />
                                    <span className="fw-bold">{isInCart.quantity}</span>
                                    <Button
                                    label={"+"}
                                    onClick={()=>dispatch(incrementQuantity({id:product.id}))}
                                    variant="success"
                                    />
                                </div>
                                )}
                                </div>
                        </div>                        
                    </div> 
                </div> 
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
                        className="rounded-pill w-50 mt-3"
                        variant="success"
                        />
                        <Button
                        label={"Not now"}
                        onClick={()=> setShowLoginModal(false)}
                        variant="success"
                        className="rounded-pill w-50 mt-3"
                        />
                        </div>
                    </Modal>
            <Footer/>
        </div>             
    );
}
export default ProductDetail;
