import React, { useEffect, useState } from "react";
import aboutUs from "../../../assets/about-us-pic.svg";
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
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import SignupImg from '../../../common/image/signup.svg';
import Lottie from "lottie-react";
import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const About = () => {
    const lottewidth = {
        width: 'auto',
        height: '320px'
    }
    const navigate = useNavigate();
    const [SignUpstep, SetSignUpstep] = useState(2);
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

    const HandelOrganizersignup = async () => {
        try {
            setLoader(true);
            const requestData = {
                first_name: Firstname,
                last_name: Lastname,
                email: Email,
                phone_number: Phonenumber,
                countryname: Countryname,
                message: Message,
                area_code: "+91",
                agree_to_terms: 1,
                isactive: 0
            };
            fetch(apiurl + 'auth/organizer/signup', {
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
                        MySwal.fire({
                            icon: 'success',
                            title: '',
                            text: 'Your information has been received, we shall get back shortly! We are working on curating your extraordinary event. Please contact us for any further details or concerns.',
                        }).then((result) => {
                            navigate(app_url);
                        });
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

    }

    const fetchCountry = async () => {
        try {
            fetch(apiurl + 'admin/country-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const countryData = data.data;
                        const CountryOption = countryData.map(category => ({
                            value: category.name,
                            label: category.name
                        }));
                        setcountryList(CountryOption);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const CountryOption = [
        {
            options: countryList
        }
    ]
    const selectCountry = (selectedValue) => {
        setCountry(selectedValue);
        setCountryname(selectedValue.label);
    };

    const HandelSignupstepback = async (no) => {
        SetSignUpstep(Number(no) - 1);
    }
    const HandelSignupstep = async (no) => {
        
        if (no == 2) {
            if (!Firstname || !Lastname || !Email || !Confirmemail || !Phonenumber) {
                return toast.error('Required field must not be empty');
            }
            if (!isEmail(Email)) {
                return toast.error('Enter valid email address');
            }
            if (!isEmail(Confirmemail)) {
                return toast.error('Enter valid confirm email address');
            }
            if (Email === Confirmemail) {

            } else {
                return toast.error('Email and confirm email must me same');
            }
            HandelEmailCheck();
        }
        if (no == 3) {
            if (!Password || !ConfirmPassword) {
                return toast.error('Required field must not be empty');
            }
            if (Password.length > 7) {

            } else {
                return toast.error('Password must be at least 8 characters long');
            }
            if (Password === ConfirmPassword) {

            } else {
                return toast.error('Password and confirm password not match');
            }
            SetSignUpstep(4);
        }
        if (no == 4) {
            SetSignUpstep(5);
        }

    }
    const HandelEmailCheck = async () => {
        try {
            const requestData = {
                email: Email,
            };
            fetch(apiurl + 'auth/organizer/email-check', {
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
                        SetSignUpstep(3);
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {

                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const handlePhoneChange = (newPhone) => {
        setPhonenumber(newPhone);
    };
    useEffect(() => {
        fetchCountry();
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {/* <!-- mobile nav --> */}
            <HeaderMenu />
            <div class="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
                <MobileMenu />
                <h1 class="banner-h fw-bold text-white text-uppercase mb-0 pb-0 animate__animated animate__bounce">
                    Sign Up
                </h1>
                <div class="banner-child bg-white px-0" style={{ border: '1px solid #eee' }}>
                    <div className='row form-area'>
                        <div className="col-md-6">
                            <div>
                                <h3 className="mb-5" style={{ fontWeight: '600', color: '#000' }}>Organizer Contact Form</h3>
                                {SignUpstep == 2 || SignUpstep == 1 ? (
                                    <>
                                        {SignUpstep == 2 ? (
                                            <>
                                                <div class="input-group mb-3 input-warning-o">
                                                    <span class="input-group-text">
                                                        <FaEnvelope />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Yourname@gmail.com"
                                                        value={Email} onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <p>Confirm Email address <span className="text-danger">*</span></p>
                                                    <input className="form-control" type="text" placeholder="Confirm email Address" value={Confirmemail} onChange={(e) => setConfirmemail(e.target.value)}></input>
                                                </div>
                                                <div className="form-group">
                                                    <p>First Name <span className="text-danger">*</span></p>
                                                    <input className="form-control" type="text" placeholder="First Name" value={Firstname} onChange={(e) => setFirstname(e.target.value)}></input>
                                                </div>
                                                <div className="form-group">
                                                    <p>Last Name <span className="text-danger">*</span></p>
                                                    <input className="form-control" type="text" placeholder="Last Name" value={Lastname} onChange={(e) => setLastname(e.target.value)}></input>
                                                </div>
                                                <div className="form-group">
                                                    <p>Phone number <span className="text-danger">*</span></p>
                                                    {/* <input className="form-control" type="number" placeholder="Phone number" value={Phonenumber} onChange={handlePhoneChange}></input> */}
                                                    <PhoneInput
                                                        country={'us'}
                                                        className="phone-number-with-code"
                                                        enableSearch={true}
                                                        placeholder={'Phone number'}
                                                        autoFormat={true}
                                                        value={Phonenumber}
                                                        onChange={handlePhoneChange}
                                                    />
                                                </div>
                                            </>
                                        ) : ''}
                                    </>
                                ) : (
                                    ''
                                )}
                                {SignUpstep == 3 ? (
                                    <>
                                        <div className="form-group">
                                            <p>Select country <span className="text-danger">*</span></p>
                                            <Select
                                                isClearable={false}
                                                options={CountryOption}
                                                className='react-select'
                                                classNamePrefix='select'
                                                onChange={selectCountry}
                                                value={Country}
                                            />

                                        </div>
                                        <div className="form-group">
                                            <p>Message <span className="text-danger">*</span></p>
                                            <textarea class="form-control" rows="3" value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )}

                                <div className='button-area mt-4'>

                                    {SignUpstep >= 3 ? (
                                        <button type='button' className="signup-page-button mr-3" onClick={() => HandelSignupstepback(SignUpstep)}>Back</button>
                                    ) : ''}

                                    {SignUpstep == 3 ? (
                                        <>
                                            {Loader ? (
                                                <button type='button' className="signup-page-button">Please wait...</button>
                                            ) : (
                                                <button type='button' className="signup-page-button" onClick={() => HandelOrganizersignup()}>Submit</button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <button type='button' className="signup-page-button" onClick={() => HandelSignupstep(SignUpstep)}>Next</button>
                                        </>
                                    )}
                                    <p className="forgot-password-text">Already have an account? <Link to={app_url + 'auth/organizer/login'} className='reset-password-link mt-2'>Login</Link></p>
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
