import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import WhitestarBtn from '../../../component/Whitestarbtn';
import 'react-phone-input-2/lib/style.css';
import { apiurl, app_url, isEmail, organizer_url } from '../../../common/Helpers';
const Home = ({ title }) => {
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
            fetch(apiurl + 'auth/organizer/reset-password-check', {
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
            fetch(apiurl + 'auth/organizer/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
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
        <div className="content-data">
            <div className="signup-form-section mt-5 mb-5">
                <Container>
                    <Row className="signup-form-box login-area signup-page-padding">
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
                                                    type="text"  // Use type="text" to allow for maxLength attribute
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
                                <p className="forgot-password-text">Wait, I remember my password <Link to={app_url + 'auth/organizer/login'} className='reset-password-link'>Login</Link></p>

                                <p className="forgot-password-text">Don't have an account? <Link to={app_url + 'auth/organizer/signup'} className='reset-password-link'>Signup</Link></p>

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
                </Container>
            </div >
        </div >
    )
}
export default Home;