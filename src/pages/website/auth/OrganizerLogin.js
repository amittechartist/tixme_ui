import React, { useState, useEffect } from "react";
import HeaderMenu from '../../../components/headermenu';
import MobileMenu from '../../../components/mobilemenu';
import Footer from '../../../components/footer';
import toast from 'react-hot-toast';
import { apiurl, app_url, isEmail, organizer_url } from '../../../common/Helpers';
import { Link, useNavigate } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import SignupImg from '../../../common/image/signup.svg';
const About = () => {
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(false);
    const [LoginEmail, setLoginEmail] = useState();
    const [LoginPassword, setLoginPassword] = useState();
    const HandelOrganizerLogin = async (e) => {
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
            fetch(apiurl + 'auth/organizer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        console.warn("k", data.data._id);
                        localStorage.setItem('organizerid', data.data._id);
                        localStorage.setItem('organizername', data.data.name);
                        localStorage.setItem('organizer_role', 1);
                        toast.success('Login successful', {
                            duration: 3000,
                        });
                        navigate(organizer_url + 'dashboard');
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
                    Organizer Login
                </h1>
                <div class="banner-child bg-white px-0" style={{ border: '1px solid #eee' }}>
                    <div className='row form-area'>
                        <div className="col-md-6">
                            <form onSubmit={HandelOrganizerLogin}>
                                <div>
                                    {/* <h5 className="mb-md-5 mb-2 auth-page-title1" style={{ fontWeight: '600', color: '#000' }}>Do you already have an account? please log in with your email address.</h5> */}
                                    <div className="form-group">
                                        <p>Email Id<span className="text-danger">*</span></p>
                                        <input className="form-control" type="text" placeholder="Email Id" onChange={(e) => setLoginEmail(e.target.value)}></input>
                                    </div>
                                    <div className="form-group">
                                        <p>Password<span className="text-danger">*</span></p>
                                        <input className="form-control" type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}></input>
                                    </div>
                                    <p className="forgot-password-text">Forgot your password? <Link to={app_url + 'auth/organizer/forgot-password'} className='reset-password-link'>Reset your password</Link></p>
                                    <div className='button-area mt-4'>

                                        {Loader ? (
                                            <button type='button' className="signup-page-button">Please wait...</button>
                                        ) : (
                                            <button type='submit' className="signup-page-button">Login</button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="text-center">
                                <img className="no-result-img admin-login-img" src={SignupImg} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            <div class="space-height" style={{ height: '300px' }}></div>
            <Footer />
        </>
    );
};
export default About;
