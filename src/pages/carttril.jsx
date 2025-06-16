import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, ClearCart } from "../redux/cartSlice";
import Button from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/errors/Loading';
import { useNavigate } from "react-router-dom";
import FreeShippingNotice from "../components/FreeShippingNotice";
import { selectCartTotal } from "../redux/cartSlice";
import '../assets/styles/FreeShippingNotice.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Fotter'

function Cart() {
    const cartItems = useSelector((state)=> state.cart.items);
    const total = useSelector(selectCartTotal)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function Productprice(price,quantity) {
        return price*quantity;
    }
    


    return(
        <div>
            <Navbar/>
            <FreeShippingNotice mode="cart" cartTotal={total}/>
            <div >
            <div className="container my-5">
            <div className="text-center text-muted">
                <h1 className="fw-bold mb-3">Shopping Bag</h1>
                <p className="text-muted mb-4">{cartItems.length} items in your bag</p>
                {cartItems.length === 0 ? (
                <h3 className="loadingM">Your cart is empty 🛒</h3>
        ):( 
            <>
            <div className="bg-white shadow rounded p-4">
                <div className="row fw-bold border-bottom pb-2 mb-3 text-uppercase text-secondary bg-light">
                    <div className="col-md-3">Product</div>
                    <div className="col-md-2">Price</div>
                    <div className="col-md-4">Quantity</div>
                    <div className="col-md-3">Total Price</div>

                </div>
            </div> ..
            {cartItems.map((item)=>(
                    <div 
                    className="row align-items-center border-bootom  py-3"
                    key={item.id}>
                        <div className="col-md-3 d-flex align-items-center">
                        <img
                        src={item.images[0]}
                        alt={item.title}
                        className="img-fluid"
                        style={{ maxWidth: "80px", height:"80px", borderRadius: "8px", objectFit: "cover" }}
                        />
                        </div>
                        <div>
                        <h3>${item.price}</h3>
                        <Button
                        label={"-"}
                        onClick={()=> dispatch(decrementQuantity({id:item.id}))}
                        variant="success"
                        />
                        <span className="fw-bold">{item.quantity}</span>
                        <Button
                        label={"+"}
                        onClick={()=> dispatch(incrementQuantity({id:item.id}))}
                        variant="success"
                        />
                        <h3>Total:${Productprice(item.price, item.quantity).toFixed(2)}</h3>
                        </div>    
                    </div>
                ))}
                <h2 className="mt-4">Cart Total: ${total.toFixed(2)}</h2>
                <Button
                label={"Cheackout"}
                onClick={()=>navigate('/chaeckout')}
                className="rounded-pill w-50 mt-3"
                variant="success"
                />
                <br/>
                <br/>
                <Button
                label={"Clear Cart"}
                onClick={()=> dispatch(ClearCart())}
                className="rounded-pill w-50 mt-3"
                            variant="success"
                />
            </>
            )}
            </div>
            </div>
            </div>
        <Footer/>
    </div>
)}

export default Cart;