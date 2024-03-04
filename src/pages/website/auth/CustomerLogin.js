import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderMenu from '../../../components/headermenu';
import MobileMenu from '../../../components/mobilemenu';
import Footer from '../../../components/footer';
import toast from 'react-hot-toast';
import { apiurl, app_url, isEmail } from '../../../common/Helpers';
import { Link, useNavigate } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import SignupImg from '../../../common/image/signup.svg';
import { auth, googleProvider } from '../../../firebase';
import GoogleLogo from '../../../common/icon/google.png';
import { signInWithPopup } from 'firebase/auth';
const About = () => {
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(false);
    const [LoginEmail, setLoginEmail] = useState();
    const [LoginPassword, setLoginPassword] = useState();
    const HandelCustomerLogin = async (e) => {
        e.preventDefault();
        try {
            if (!LoginEmail) {
                return toast.error('Email is required');
            }
            if (!isEmail(LoginEmail)) {
                return toast.error('Enter valid email address');
            }
            if (!LoginPassword) {
                return toast.error('Password is required');
            }
            setLoader(true);
            const requestData = {
                email: LoginEmail,
                password: LoginPassword
            };
            fetch(apiurl + 'auth/customer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        localStorage.setItem('userauth', data.token);
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('user_role', 1);
                        toast.success('Login successful', {
                            duration: 3000,
                        });
                        const checkIshavecart = localStorage.getItem('cart');
                        if (checkIshavecart) {
                            navigate(app_url + 'cart-details');
                        } else {
                            navigate(app_url);
                        }
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Access user information
            const email = user.email;
            const displayName = user.displayName;
            const uid = user.uid;
            const photoURL = user.photoURL;

            if (email) {
                try {
                    setLoader(true);
                    const requestData = {
                        email: email,
                        name: displayName,
                        profilepic: photoURL
                    };
                    fetch(apiurl + 'auth/customer/login-google', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set the Content-Type header to JSON
                        },
                        body: JSON.stringify(requestData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            setLoader(false);
                            if (data.success == true) {
                                localStorage.setItem('userauth', data.token);
                                localStorage.setItem('username', data.username);
                                localStorage.setItem('user_role', 1);
                                toast.success('Login successful', {
                                    duration: 3000,
                                });
                                const checkIshavecart = localStorage.getItem('cart');
                                if (checkIshavecart) {
                                    navigate(app_url + 'cart-details');
                                } else {
                                    navigate(app_url);
                                }
                            } else {
                                toast.error(data.message);
                            }
                        })
                        .catch(error => {
                            setLoader(false);
                            // toast.error('Insert error: ' + error.message);
                            console.error('Insert error:', error);
                        });
                } catch (error) {
                    console.error('Api error:', error);
                }
            } else {
                toast.error("Something wrong!");
            }

        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <>
            {/* <!-- mobile nav --> */}
            <HeaderMenu />
            <div class="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
                <MobileMenu />
                <h1 class="banner-h fw-bold text-white text-uppercase mb-0 pb-0 animate__animated animate__bounce">
                    Customer Login
                </h1>
            </div>
            {/* </div> */}
            <div class="banner-child banner-child-login bg-white px-0" style={{ border: '1px solid #eee',marginTop: '-265px',
    position: 'relative' }}>
                    <div className='row form-area'>
                        <div className="col-md-6">
                            <div>
                                {/* <h5 className="mb-md-5 mb-2 auth-page-title1" style={{ fontWeight: '600', color: '#000' }}>Do you already have an account? please log in with your email address.</h5> */}
                                <form onSubmit={HandelCustomerLogin}>
                                    <div className="form-group">
                                        <p>Email Id<span className="text-danger">*</span></p>
                                        <input className="form-control" type="text" placeholder="Email Id" onChange={(e) => setLoginEmail(e.target.value)}></input>
                                    </div>
                                    <div className="form-group">
                                        <p>Password<span className="text-danger">*</span></p>
                                        <input className="form-control" type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}></input>
                                    </div>
                                    <p className="forgot-password-text">Forgot your password? <Link to={app_url + 'auth/customer/forgot-password'} className='reset-password-link'>Reset your password</Link></p>
                                    <p className="forgot-password-text">Don't have an account? <Link to={app_url + 'auth/customer/signup'} className='reset-password-link'>Signup</Link></p>
                                    <div className='button-area mt-4'>

                                        {Loader ? (
                                            <button type='button' className="signup-page-button">Please wait...</button>
                                        ) : (
                                            <button type='submit' className="signup-page-button">Login</button>
                                        )}
                                    </div>
                                </form>
                                <div className="border-bottom py-2  d-none"></div>
                                <div className="text-center  d-none">
                                    <p className="reset-password-link text-center pt-3">Login with</p>
                                </div>
                                <div className="text-center d-none">
                                    <Row>
                                        <Col md={12}>
                                            <button className="login-with-btn mx-1" onClick={handleGoogleLogin}><img src={GoogleLogo}></img></button>
                                            {/* <button className="login-with-btn mx-1" onClick={handleFacebookLogin}><img src={FacebookLogo}></img></button> */}
                                        </Col>

                                    </Row>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-center">
                                <img className="no-result-img admin-login-img" src={SignupImg} />
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    );
};

export default About;
