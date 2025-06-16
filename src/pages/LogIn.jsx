import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope , faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faGoogle, faXTwitter  } from '@fortawesome/free-brands-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import Button from "../components/Buttons";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FreeShippingNotice from "../components/FreeShippingNotice";
import Footer from '../components/Fotter'
import '../assets/styles/authentication.css'
import { Helmet } from "react-helmet-async";



const schema = yup.object({
    email: yup.string().email('invalid email').required('Email is required'),
    password: yup.string().required('password is requird')
});


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}}= useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) =>{
        dispatch(loginSuccess({email: data.email}));
        toast.success("✅ Logged in successfully")
        navigate('/')
    };

        return (
            <div>
                <Helmet>
                    <title>ShopEase | Login</title>
                </Helmet>
                <FreeShippingNotice mode="static" />
                <div className="d-flex align-items-center justify-content-center min-vh-100 ">
                    <div className="card p-4 rounded-4 shadow-lg login-card">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/*  */}
                            <legend className="text-center text-white"> WELCOME BACK </legend>
                            <p className="text-center mb-4 text-light">
                                Don’t have an account yet?{" "}
                                <Link to="/signup" 
                                className="text-success fw-semibold">
                                    Sign up
                                </Link>
                            </p>
                            {/* form */}

                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-dark border-secondary text-white">
                                        <FontAwesomeIcon icon={faEnvelope} size="xl" />
                                    </span>
                                    <input
                                    placeholder="Email address"
                                    className="form-control bg-dark text-white border-secondary"
                                    {...register("email")}
                                    />
                                </div>
                                <p className="text-danger small mt-1"> {errors.email?.message} </p>
                            </div>

                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-dark border-secondary text-white">
                                        <FontAwesomeIcon icon={faLock} size="xl" />
                                    </span>
                                    <input
                                    className="form-control bg-dark text-white border-secondary"
                                    placeholder="Password"
                                    type="Password" 
                                    {...register("password")}
                                    />
                                </div>
                                <p className="text-danger small mt-1"> {errors.password?.message} </p>
                            </div>

                            <div className="d-grid mb-3">
                                <Button
                                label={"Login in"}
                                onClick={handleSubmit(onSubmit)}
                                className="btn-success rounded-3"
                                />
                            </div>

                            <div className="d-flex align-item-center my-3 text-light">
                                <hr className="flex-grow-1 border-light"/>
                                <span className="mx-3">OR</span>
                                <hr className="flex-grow-1 border-light"/>
                            </div>
                            
                            <div className="d-flex justify-content-between gap-2">
                                <FontAwesomeIcon icon={faFacebook} className="btn btn-outline-light icon-hover w-50"/>
                                <FontAwesomeIcon icon={faInstagram} className="btn btn-outline-light w-50 icon-hover"/>
                                <FontAwesomeIcon icon={faGoogle}className="btn btn-outline-light w-50 icon-hover"/>          
                                <FontAwesomeIcon icon={faXTwitter}className="btn btn-outline-light w-50 icon-hover"/>          
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
    );
}

export default Login; 