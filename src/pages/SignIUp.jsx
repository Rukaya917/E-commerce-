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


const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('invalid email').required('Email is required'),
    password: yup.string().required('password is requird'),
    terms: yup.boolean().oneOf([true], '')
});

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}}= useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) =>{
        dispatch(loginSuccess({email: data.email}));
        toast.success("✅ Sign Up successfully")
        navigate('/')
    };
    return (
            <div>
                <FreeShippingNotice mode="static" />
                <div className="d-flex align-items-center justify-content-center min-vh-100 ">
                    <div className="card p-4 rounded-4 shadow-lg login-card">                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/*  */}
                            <legend className="text-center text-white "> Create an account</legend>
                            <p className="text-center mt-3 text-light">
                                Already have an account?{" "}
                                <Link to="/login" 
                                className="text-success fw-semibold">
                                    LogIn
                                </Link>
                            </p>                            
                            {/* form */}
                            <div className="row mb-3">
                                <div className="col mt-3">
                                    <div className="input-group">
                                        <input
                                        placeholder="First Name"
                                        className="form-control bg-dark text-white border-secondary rounded"
                                        {...register("firstName")}
                                        />
                                    </div>
                                        <p className="text-danger small mt-1"> {errors.firstName?.message} </p>
                                </div>
                                <div className="col mt-3">
                                    <div className="input-group">
                                        <input
                                        placeholder="Last Name"
                                        className="form-control bg-dark text-white border-secondary rounded"
                                        {...register("lastName")}
                                        />
                                        <p className="text-danger small mt-1"> {errors.lastName?.message} </p>
                                    </div>
                                </div>
                                
                                <div className="mt-3">
                                    <div className="input-group">
                                        <span className="input-group-text bg-dark border-secondary text-white ">
                                            <FontAwesomeIcon icon={faEnvelope} size="xl" />
                                        </span>
                                        <input
                                        placeholder="Email address"
                                        className="form-control bg-dark text-white border-secondary rounded"
                                        {...register("email")}
                                        />
                                    </div>
                                </div>
                            <p className="text-danger small mt-1"> {errors.email?.message} </p>
                            </div>

                            <div className="mt-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-dark border-secondary text-white ">
                                        <FontAwesomeIcon icon={faLock} size="xl" />
                                    </span>
                                    <input
                                    className="form-control bg-dark text-white border-secondary rounded "
                                    placeholder="Password"
                                    type="Password" 
                                    {...register("password")}
                                    />
                                </div>
                            <p className="text-danger small mt-1"> {errors.password?.message} </p>
                            </div>

                                <div className="form-check mt-3">
                                    <input
                                        className="form-check-input"
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

                            <div className="d-grid mb-3">
                                <Button
                                label={"Create account"}
                                onClick={handleSubmit(onSubmit)}
                                className="btn-success rounded-3 mt-3"
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
    )
}

export default SignUp;