import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useState } from 'react';
import Button from '../components/Buttons'
import Modal from "react-modal"
import FreeShippingNotice from '../components/FreeShippingNotice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCartTotal } from '../redux/cartSlice';
import Navbar from '../components/Navbar'
import Footer from '../components/Fotter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApplePay } from '@fortawesome/free-brands-svg-icons';
import {faCreditCard, faWallet} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/CheckOut.css'


const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.number().required('Email is required'),
    zipcode: yup.number().min(5,'Must be at least 5 digits'),
    terms: yup.boolean().oneOf([true], '')
    
});
function CheckOut() {
    const [userData, setUserData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [discount, setDiscount]= useState(0);
    const [promoCode, setPromoCode]= useState("")
    const [applied, setApplied]= useState(false)
    const total = useSelector(selectCartTotal)
    const shippingFee = getShippingFee(total);
    const discountAmount = total * discount;
    const finalTotal = total - discountAmount+ shippingFee;
    const cartItems = useSelector((state) => state.cart.items);


    const {register, handleSubmit, formState: {errors}}= useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data)=>{
        setUserData(prevData => [...prevData, data]);
        setIsOpen(true);
    };
    
    const hadelApplyCode = () =>{
        if (promoCode === "WELCOME10") {
            setDiscount(0.1);
            setApplied(true);
        }else {
            toast.error("Invalid code")
        }
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
});


    function getShippingFee(cartTotal) {
        return cartTotal <100 ? 10 : 0;
    }
    return (
        <div className="checkout-page bg-light min-vh-100">
            <Navbar/>
            <div className="container py-5">
                <div className="row g-4">
                    {/* left section form */}
                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-sm rounded p-4'>
                            <h2 className='mb-4'>Checkout</h2>
                            {/* 1.content info */}
                            <h5 className='mb-3'>1.Contact Information</h5>
                            {/* FN */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label style={{color: "#212529"}}>First Name</label>
                                    <input type="text" className="form-control mt-1" {...register("firstName")} />
                                    <small className="text-danger"> {errors.firstName?.message} </small>
                                </div>
                                {/* LN */}
                                <div className="col-md-6">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control mt-1" {...register("lastName")} />
                                    <small className="text-danger"> {errors.lastName?.message} </small>
                                </div>
                                {/* phone */}
                                <div className="col-md-6">
                                    <label>Phone</label>
                                    <input type="tel" className="form-control mt-1" {...register("phone")} />
                                    <small className="text-danger"> {errors.phone?.message} </small>
                                </div>
                                {/* email */}
                                <div className="col-md-6">
                                    <label>Email</label>
                                    <input type="email" className="form-control mt-1" {...register("email")} />
                                    <small className="text-danger"> {errors.email?.message} </small>
                                </div>
                            </div>
                        {/* content info end */}
                        {/* 2.addres info */}
                        <h5 className="mb-3">2. Shipping Address</h5>
                        {/* city */}
                        <div className="mb-3">
                            <label>City</label>
                            <input className="form-control" />
                        </div>
                        {/* addres */}
                        <div className="mb-3">
                            <label>Address</label>
                            <textarea className="form-control" placeholder="Building number, street name, apartment number"/>
                        </div>
                        {/* zip */}
                        <div className="mb-3">
                            <label> Postal / ZIP Code</label>
                            <input className="form-control mt-1" type="number" {...register("zipcode")} />
                            <small className="text-danger">{errors.zipcode?.message}</small>
                        </div>
                        {/* add info */}
                        <div className="mb-4">
                            <label>Additional Information</label>
                            <textarea  className="form-control" placeholder="Extra delivery notes or directions"/>
                        </div>
                        {/* adress info end */}
                        {/* pay */}
                        <h5>3. Payment Method</h5>
                        <div className="d-flex flex-wrap gap-3 mb-4">
                            <button type="button" className="btn btn-light px-4 py-2 border rounded-pill shadow-sm fw-bold pay">
                                <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                            </button>
                            <button type="button" className="btn btn-light px-4 py-2 border rounded-pill shadow-sm text-dark pay">
                                <FontAwesomeIcon icon={faApplePay} className="me-2" />
                            </button>
                            <button type="button" className="btn btn-light px-4 py-2 border rounded-pill shadow-sm text-dark pay">
                                <FontAwesomeIcon icon={faWallet} className="me-2" />
                            </button>
                        </div>
                        </form>
                    </div>
                    {/* left end */}
                    {/* right secssion */}
                    <div className='col-lg-4'>
                        <div className="bg-white shadow rounded-4 p-4">
                            <h5 className="mb-4"> Order Summary</h5>
                            {/* order img */}
                            {cartItems.map((item) => (
                                <div className="d-flex  align-items-center mb-3" key={item.id}>
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="rounded me-3"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />
                                <div>
                                    <p className="mb-1 fw-bold">{item.title}</p>
                                    <small className='mx-2'>Qty: {item.quantity}</small>
                                    <small>
                                    <span className="text-success fw-bold">
                                    {formatter.format(item.price * item.quantity)}                                    </span>
                                    </small>
                                </div>
                                </div>
                            ))}
                            <hr/>
                            {/* total */}
                            <div className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <span>{formatter.format(total)}</span>
                            </div>
                            {/* shipping */}
                            <div className="d-flex justify-content-between">
                                <span>Shipping</span>
                                <span><FreeShippingNotice mode="shipping" cartTotal={total} /></span>
                            </div>
                            {/* disscount */}
                            {discount > 0 && (
                                <div className="d-flex justify-content-between text-success fw-bold">
                                    <span >Promo Discount</span>
                                    <span>{formatter.format(-discountAmount)}</span>
                                </div>
                            )}
                            <hr/>
                            {/* total */}
                            <div className="d-flex justify-content-between fw-bold fs-5">
                                <span>Total</span>
                                <span>{formatter.format(finalTotal)}</span>
                            </div>

                            {!applied && (
                                <div className="my-3">
                                    <label className="form-label">Promo Code</label>
                                    <input
                                    type="text"
                                    className="form-control mb-2 mt-1"
                                    placeholder="Enter promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <Button label="Apply" onClick={hadelApplyCode} variant='success' className='rounded-pill check'/>
                                </div>
                            )}

                            <Button
                            label="Place Order"
                            className="w-100 mt-4 rounded-pill check"
                            onClick={() => handleSubmit(onSubmit)()}
                            variant='success'
                            />

                            <div className="form-check mt-3">
                                <input
                                        className="form-check-input mt-1"
                                        type="checkbox"
                                        id="terms"
                                        {...register("terms", { required: true })}
                                    />
                                    <label className="form-check-label text-white" htmlFor="terms">
                                        I Agree to the{" "}
                                        <a href="/terms" className="text-decoration-underline text-success fw-semibold">
                                        Terms & Conditions
                                        </a>
                                    </label>
                                    {errors.terms && <p className="text-danger small">You must agree to continue</p>}
                            </div>
                            {/* right end */}
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                <h2>✅ Order Placed</h2>
                <p>Thank you {userData[userData.length - 1]?.firstName}, your order has been placed.</p>
                <Button label="Close" onClick={() => setIsOpen(false)} variant='success' className='rounded-pill' />
            </Modal>
            <Footer />
        </div>
            );
    }
export default CheckOut;
