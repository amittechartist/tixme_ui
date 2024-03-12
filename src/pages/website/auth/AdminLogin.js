import React, { useEffect, useState } from "react";
import Footer from '../../../components/footer';
import HeaderMenu from '../../../components/headermenu';
import MobileMenu from '../../../components/mobilemenu';
import { FaEnvelope } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { apiurl, admin_url, app_url, isEmail, organizer_url } from '../../../common/Helpers';
import { Link, useNavigate } from "react-router-dom";
import SignupImg from '../../../common/image/signup.svg';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const About = () => {
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(false);
    const [Username, setUsername] = useState();
    const [LoginPassword, setLoginPassword] = useState();

    const HandelLogin = async (e) => {
        e.preventDefault();
        try {
            if (!Username) {
                return toast.error('Username is required');
            }
            if (!LoginPassword) {
                return toast.error('Password is required');
            }
            setLoader(true);
            const requestData = {
                username: Username,
                password: LoginPassword
            };
            fetch(apiurl + 'auth/admin/login', {
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
                        localStorage.setItem('adminauth', data.token);
                        localStorage.setItem('admin_role', 1);
                        toast.success('Login successful', {
                            duration: 3000,
                        });
                        navigate(admin_url + 'dashboard');
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


    return (
        <>
            {/* <!-- mobile nav --> */}
            <HeaderMenu />
            <div class="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
                <MobileMenu />
                <h1 class="banner-h fw-bold text-white text-uppercase mb-0 pb-0 animate__animated animate__bounce">
                    Admin Login
                </h1>
                <div class="banner-child bg-white px-0" style={{ border: '1px solid #eee' }}>
                    <div className='row form-area'>
                        <div className="col-md-6">
                            <form onSubmit={HandelLogin}>
                                <div>
                                    <div className="form-group">
                                        <p>Username</p>
                                        <input className="form-control" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                                    </div>
                                    <div className="form-group">
                                        <p>Password</p>
                                        <input className="form-control" type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}></input>
                                    </div>

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
            <div class="space-height" style={{ height: '600px' }}></div>

        </>
    );
};

export default About;
