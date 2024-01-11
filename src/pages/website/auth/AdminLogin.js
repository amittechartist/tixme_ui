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
import { apiurl, admin_url, app_url, isEmail, organizer_url } from '../../../common/Helpers';
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import SignupImg from '../../../common/image/signup.svg';
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
    const [SignUpstep, SetSignUpstep] = useState(1);
    const [Loader, setLoader] = useState(false);
    const [Confirmemail, setConfirmemail] = useState();
    const [Email, setEmail] = useState();
    const [Phonenumber, setPhonenumber] = useState();
    const [Firstname, setFirstname] = useState();
    const [Lastname, setLastname] = useState();

    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    const [WhatsappNumber, setWhatsappNumber] = useState();
    const [Address1, setAddress1] = useState();
    const [Pincode, setPincode] = useState();
    const [City, setCity] = useState();
    const [State, setState] = useState();
    const [Country, setCountry] = useState();
    const [Terms, setTerms] = useState(1);
    const [Marketing, setMarketing] = useState(1);

    const [Message, setMessage] = useState();
    const [Countryname, setCountryname] = useState();

    const [Hobby, setHobby] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [countryList, setcountryList] = useState([{ value: "", label: "Country" }]);
    const MySwal = withReactContent(Swal)

    const [Username, setUsername] = useState();
    const [LoginPassword, setLoginPassword] = useState();

    const HandelLogin = async () => {
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
                            <div>
                                <h5 className="mb-5" style={{ fontWeight: '600', color: '#000' }}>Do you already have an account? please log in with your email address.</h5>

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
                                        <button type='button' className="signup-page-button" onClick={() => HandelLogin()}>Login</button>
                                    )}

                                </div>


                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-center">
                            <img className="no-result-img" src={SignupImg} style={lottewidth} />
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
