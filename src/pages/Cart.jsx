import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, ClearCart } from "../redux/cartSlice";
import Button from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import FreeShippingNotice from "../components/FreeShippingNotice";
import { selectCartTotal } from "../redux/cartSlice";
import Navbar from '../components/Navbar';
import Footer from '../components/Fotter';
import '../assets/styles/Cart.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet-async";



function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const total = useSelector(selectCartTotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
});


    function Productprice(price, quantity) {
        return price * quantity;
    }
    return (
        <>
        <Helmet>
            <title>ShopEase | Cart</title>
        </Helmet>

        <div className="page-container d-flex flex-column min-vh-100">
        <Navbar />
        <FreeShippingNotice mode="cart" cartTotal={total} />

        <div className="container my-5" style={{width: "70%" , height: "70%"}}>
            {cartItems.length === 0 ? (
                <div className="d-flex align-items-center justify-content-center fs-2 mt-5 mb-5" >
                    <span className="fw-bold ">
                        <FontAwesomeIcon icon={faCartShopping} className="me-2" size="lg"/>
                        Your cart is empty
                    </span>
                </div>
                ) : (
                    <div className="bg-white shadow rounded p-4">
                <div className="row fw-bold border-bottom pb-2 mb-3 text-uppercase text-secondary">
                <div className="col-6 col-md-3">Product</div>
                <div className="col-6 col-md-2">Price</div>
                <div className="col-6 col-md-4">Quantity</div>
                <div className="col-6 col-md-3">Total Price</div>
                </div>

                {cartItems.map((item) => (
                    <div className="row align-items-center border-bottom py-3" key={item.id}>
                    <div className="col-md-3 d-flex align-items-center">
                    <img
                        src={item.images[0]}
                        alt={item.title}
                        className="img-fluid"
                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                        />
                
                    </div>

                    <div className="col-md-2 fw-semibold">${item.price.toFixed(2)}</div>

                    <div className="col-md-4 d-flex align-items-center justify-content-start gap-2">
                    <Button label={"-"} onClick={() => dispatch(decrementQuantity({ id: item.id }))} variant="success" />
                    <span className="fw-bold">{item.quantity}</span>
                    <Button label={"+"} onClick={() => dispatch(incrementQuantity({ id: item.id }))} variant="success" />
                    </div>

                    <div className="col-md-3 fw-bold text-success">
                    {formatter.format(Productprice(item.price, item.quantity))}
                    </div>
                </div>
                ))}

                <div className="d-flex justify-content-between align-items-center mt-4">
                <h4 className="fw-bold">Cart Total:</h4>
                <h4 className="text-success"> {formatter.format(total)} </h4>
                </div>

                <div className="d-flex flex-wrap  mt-4 justify-content-center align-items-center gap-3 ">
                <Button
                    label={"CheckOut"}
                    onClick={() => navigate('/checkout')}
                    className="rounded-pill btn-cart"
                    variant="success"
                    />
                <Button
                    label={"Clear Cart"}
                    onClick={() => dispatch(ClearCart())}
                    className="rounded-pill btn-cart"
                    variant="success"
                    />
                </div>
            </div>
            )}
        </div>

        <Footer />
        </div>
    </>
    );
    }

    export default Cart;
