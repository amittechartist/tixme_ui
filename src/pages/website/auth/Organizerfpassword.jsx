import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderMenu from '../../../components/headermenu';
import MobileMenu from '../../../components/mobilemenu';
import Footer from '../../../components/footer';
import toast from 'react-hot-toast';
import { apiurl, app_url, isEmail, organizer_url } from '../../../common/Helpers';
import { Link, useNavigate } from "react-router-dom";
const About = () => {
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
            fetch(apiurl + 'auth/organizer/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
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
            if (otp.length !== 6) {
                return toast.error('Invalid OTP length. Must be 6 digits.');
            }
            setLoader(true);
            const requestData = {
                otp: otp,
                email: Email
            };
            fetch(apiurl + 'auth/organizer/reset-password-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
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
            fetch(apiurl + 'auth/organizer/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        localStorage.removeItem('userauth');
                        localStorage.removeItem('user_role');
                        localStorage.setItem('organizerauth', '');
                        localStorage.setItem('organizerid', data.data._id);
                        localStorage.setItem('organizername', data.data.name);
                        localStorage.setItem('organizer_role', 1);
                        toast.success('Congratulations! Your new password has been set successfully.', {
                            duration: 3000,
                        });
                        navigate(organizer_url + 'dashboard');
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
                                                <p>Password <span className="text-danger">*</span><span className="text-danger">*</span></p>
                                                <input className="form-control" type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)}></input>
                                            </div>
                                            <div className="form-group">
                                                <p>Confirm Password <span className="text-danger">*</span><span className="text-danger">*</span></p>
                                                <input className="form-control" type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {Otploader ? (
                                                <div className="form-group">
                                                    <p>OTP <span className="text-danger">*</span></p>
                                                    <input
                                                        className="form-control"
                                                        type="text"  // Use type="text" to allow for maxLength attribute
                                                        maxLength="6"
                                                        placeholder="Enter OTP"
                                                        value={otp}
                                                        onInput={handleOTPChange}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="form-group">
                                                    <p>Email Id<span className="text-danger">*</span></p>
                                                    <input className="form-control" type="text" placeholder="Email Id" onChange={(e) => setEmail(e.target.value)}></input>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <p className="forgot-password-text">Wait, I remember my password <Link to={app_url + 'auth/organizer/login'} className='reset-password-link'>Login</Link></p>
                                    <div className="form-group">
                                        {Loader ? (
                                            <span>
                                                <button type='button' className="signup-page-button">Please wait...</button>
                                            </span>
                                        ) : (
                                            <>
                                                {Newpassloader ? (
                                                    <button type='button' className="signup-page-button" onClick={handelNewPassword}>New password</button>
                                                ) : (
                                                    <>
                                                        {Otploader ? (
                                                            <button type='button' className="signup-page-button" onClick={checkUserOtp}>Verify OTP</button>
                                                        ) : (
                                                            <button type='button' className="signup-page-button" onClick={checkUserEmail}>Reset password</button>
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
            <div class="space-height" style={{ height: '500px' }}></div>
            <Footer />
        </>
    );
};

export default About;
