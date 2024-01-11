import React, { useEffect, useState } from "react";
import aboutUs from "../../../assets/about-us-pic.svg";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Silver from "../../../assets/Sliver.svg";
import Gold from "../../../assets/Gold.svg";
import Platinum from "../../../assets/Platinum.svg";
import google from "../../../assets/google.svg";
import airBNB from "../../../assets/airBNB.svg";
import booking from "../../../assets/booking.com.svg";
import expedia from "../../../assets/expedia.svg";
import TUI from "../../../assets/TUI.svg";
import arrow from "../../../assets/arrow.svg";
import Logo from "../../../assets/Logo.svg";
import Search from "../../../assets/search.png";
import Account from "../../../assets/account.svg";
import menu from "../../../assets/menu.svg";
import plus from "../../../assets/plus.svg";
import location from "../../../assets/location (5) 1.svg";
import Footer from '../../../components/footer';
import HeaderMenu from '../../../components/headermenu';
import MobileMenu from '../../../components/mobilemenu';
import { FaEnvelope } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { apiurl, app_url, isEmail, organizer_url } from '../../../common/Helpers';
import WhitestarBtn from '../../../component/Whitestarbtn';
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import NoResult from '../../../lotte/xxx.json';
import Lottie from "lottie-react";
import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { auth, googleProvider, facebookProvider } from '../../../firebase';
import GoogleLogo from '../../../common/icon/google.png';
import { signInWithPopup } from 'firebase/auth';
const About = () => {
    const lottewidth = {
        width: 'auto',
        height: '320px'
    }
    const navigate = useNavigate();
    const [Email, setEmail] = useState();
    const [otp, setOTP] = useState();
    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();

    const [Loader, setLoader] = useState(false);
    const [Otploader, setOtploader] = useState(false);
    const [Newpassloader, setNewpassloader] = useState(false);
    const checkUserEmail = async () => {
        try {
            if (!Email) {
                return toast.error('Email is required');
            }
            if (!isEmail(Email)) {
                return toast.error('Enter valid email address');
            }
            setLoader(true);
            const requestData = {
                email: Email
            };
            fetch(apiurl + 'auth/customer/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Your Gmail OTP has been sent', {
                            duration: 6000,
                        });
                        setOtploader(true);
                    } else {
                        toast.error(data.message, {
                            duration: 5000,
                        });
                    }
                    setLoader(false);
                })
                .catch(error => {
                    setLoader(false);
                    toast.error(error.message, {
                        duration: 5000,
                    });
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    };
    const checkUserOtp = async () => {
        try {
            if (!otp) {
                return toast.error('OTP is required');
            }
            if (otp.length != 6) {
                return toast.error('Invalid OTP length. Must be 6 digits.');
            }
            setLoader(true);
            const requestData = {
                otp: otp,
                email: Email
            };
            fetch(apiurl + 'auth/customer/reset-password-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Your OTP has been successfully verified.', {
                            duration: 6000,
                        });
                        setOtploader(false);
                        setNewpassloader(true);
                    } else {
                        toast.error(data.message, {
                            duration: 5000,
                        });
                    }
                    setLoader(false);
                })
                .catch(error => {
                    setLoader(false);
                    toast.error(error.message, {
                        duration: 5000,
                    });
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    };
    const handelNewPassword = async () => {
        try {
            if (Password.length > 7) {

            } else {
                return toast.error('Password must be at least 8 characters long');
            }
            if (Password === ConfirmPassword) {

            } else {
                return toast.error('Password and confirm password not match');
            }
            setLoader(true);
            const requestData = {
                email: Email,
                password: Password
            };
            fetch(apiurl + 'auth/customer/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        localStorage.removeItem('organizerauth');
                        localStorage.removeItem('organizerid');
                        localStorage.removeItem('organizer_role');
                        localStorage.setItem('userauth', data.token);
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('user_role', 1);
                        toast.success('Congratulations! Your new password has been set successfully.', {
                            duration: 3000,
                        });
                        navigate(app_url);
                    } else {
                        toast.error(data.message, {
                            duration: 5000,
                        });
                    }
                    setLoader(false);
                })
                .catch(error => {
                    setLoader(false);
                    toast.error(error.message, {
                        duration: 5000,
                    });
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    };

    const handleOTPChange = (e) => {
        // Remove non-numeric characters
        const sanitizedValue = e.target.value.replace(/\D/g, '');

        // Ensure the length does not exceed 6 digits
        const truncatedValue = sanitizedValue.slice(0, 6);

        // Update the state with the sanitized and truncated value
        setOTP(truncatedValue);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {/* <!-- mobile nav --> */}
            <HeaderMenu />
            <div class="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
                <MobileMenu />
                <h1 class="banner-h fw-bold text-white text-uppercase mb-0 pb-0 animate__animated animate__bounce">
                    Reset Password
                </h1>
                <div class="banner-child bg-white px-0" style={{ border: '1px solid #eee' }}>
                    <div className=''>
                        <Row className="login-area signup-page-padding">
                            <Col md={3}></Col>
                            <Col md={6} className="">
                                <div className="login-area-sec">
                                    <h3 className="signup-page-title">Reset Password</h3>
                                    <p className="signup-page-desc">
                                        Enter the email associated with your account and we'll send an OTP to reset your password.
                                    </p>
                                </div>
                                <div className="login-area-form-sec">
                                    {Newpassloader ? (
                                        <>
                                            <div className="form-group">
                                                <p>Password <span className="text-danger">*</span></p>
                                                <input className="form-control" type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)}></input>
                                            </div>
                                            <div className="form-group">
                                                <p>Confirm Password <span className="text-danger">*</span></p>
                                                <input className="form-control" type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {Otploader ? (
                                                <div className="form-group">
                                                    <p>OTP</p>
                                                    <input
                                                        className="form-control"
                                                        type="number"  // Use type="text" to allow for maxLength attribute
                                                        maxLength="6"
                                                        placeholder="Enter OTP"
                                                        value={otp}
                                                        onInput={handleOTPChange}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="form-group">
                                                    <p>Email</p>
                                                    <input className="form-control" type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}></input>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <p className="forgot-password-text">Wait, I remember my password <Link to={app_url + 'auth/customer/login'} className='reset-password-link'>Login</Link></p>

                                    <p className="forgot-password-text">Don't have an account? <Link to={app_url + 'auth/customer/signup'} className='reset-password-link'>Signup</Link></p>

                                    <div className="form-group">
                                        {Loader ? (
                                            <span>
                                                <WhitestarBtn title={'Please wait...'} />
                                            </span>
                                        ) : (
                                            <>
                                                {Newpassloader ? (
                                                    <span onClick={handelNewPassword}>
                                                        <WhitestarBtn title={'New password'} />
                                                    </span>
                                                ) : (
                                                    <>
                                                        {Otploader ? (
                                                            <span onClick={checkUserOtp}>
                                                                <WhitestarBtn title={'Verify OTP'} />
                                                            </span>
                                                        ) : (
                                                            < span onClick={checkUserEmail}>
                                                                <WhitestarBtn title={'Reset password'} />
                                                            </span>
                                                        )}
                                                    </>
                                                )}

                                            </>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {/* </div> */}
            <div class="space-height" style={{ height: '600px' }}></div>

        </>
    );
};

export default About;
