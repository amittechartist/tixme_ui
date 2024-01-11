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
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';

const About = () => {
    const lottewidth = {
        width: 'auto',
        height: '320px'
    }

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        setCountries(Country.getAllCountries().map(({ isoCode, name }) => ({ value: isoCode, label: name })));
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            setStates(State.getStatesOfCountry(selectedCountry.value).map(({ isoCode, name }) => ({ value: isoCode, label: name })));
        } else {
            setStates([]);
        }
        setSelectedState(null);
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            setCities(City.getCitiesOfState(selectedCountry.value, selectedState.value).map(({ name }) => ({ value: name, label: name })));
        } else {
            setCities([]);
        }
    }, [selectedState, selectedCountry]);

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

    const [fCity, setfCity] = useState();
    const [fState, setfState] = useState();
    const [fCountry, setfCountry] = useState();

    const [Terms, setTerms] = useState(false);
    const [Marketing, setMarketing] = useState(false);
    const [Hobby, setHobby] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const HandelSignupstepback = async (no) => {
        SetSignUpstep(Number(no) - 1);
    }
    const HandelSignupstep = async (no) => {
        if (no == 1) {
            if (!isEmail(Email)) {
                return toast.error('Enter valid email');
            }
        }
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
            if (!Terms) {
                return toast.error('Please agree to the terms and conditions.');
            }
            if (!Marketing) {
                return toast.error('Please agree to the receive marketing.');
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
            fetch(apiurl + 'auth/customer/email-check', {
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
    const HandelCustomersignup = async () => {
        try {
            if (selectedHobbies.length > 0) {

            } else {
                return toast.error('Select hobbies');
            }
            setLoader(true);
            const requestData = {
                first_name: Firstname,
                last_name: Lastname,
                email: Email,
                phone_number: Phonenumber,
                hobbies: selectedHobbies,
                area_code: "+91",
                whatsapp_no: WhatsappNumber ? WhatsappNumber : '',
                address: Address1 ? Address1 : '',
                city: selectedCity ? selectedCity.label : '',
                state: selectedState ? selectedState.label : '',
                country: selectedCountry ? selectedCountry.label : '',
                cityvalue: selectedCity ? selectedCity.value : '',
                statevalue: selectedState ? selectedState.value : '',
                countryvalue: selectedCountry ? selectedCountry.value : '',
                pincode: Pincode,
                agree_to_terms: 1,
                agree_to_receive_marketing: 1,
                password: Password
            };
            fetch(apiurl + 'auth/customer/signup', {
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
                        toast.success('Account created successfully', {
                            duration: 3000,
                        });
                        navigate(app_url);
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
    const handlePhoneChange = (newPhone) => {
        setPhonenumber(newPhone);
    };
    const fetchHobby = async () => {
        try {
            fetch(apiurl + 'website/hobby/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setHobby(data.data)
                    }
                })
                .catch(error => {
                    // toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error(error.message);
        }
    }
    const toggleHobby = (id) => {
        const updatedHobbies = [...selectedHobbies];
        console.log("s", updatedHobbies);
        if (updatedHobbies.includes(id)) {
            // Hobby is already selected, remove it
            const index = updatedHobbies.indexOf(id);
            updatedHobbies.splice(index, 1);
        } else {
            // Hobby is not selected, add it
            updatedHobbies.push(id);
        }

        setSelectedHobbies(updatedHobbies);
    };

    useEffect(() => {
        fetchHobby();
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
                                <h3 className="mb-5" style={{ fontWeight: '600', color: '#000' }}>Create an customer account</h3>
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
                                                <div class="form-check">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => setTerms(e.target.checked)} />
                                                    <label class="form-check-label" for="exampleCheck1">Agree to terms, privacy policy</label>
                                                </div>

                                                <div class="form-check">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck2" onChange={(e) => setMarketing(e.target.checked)} />
                                                    <label class="form-check-label" for="exampleCheck2">Agree to receive marketing</label>
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
                                            <p>Password <span className="text-danger">*</span></p>
                                            <input className="form-control" type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)}></input>
                                        </div>
                                        <div className="form-group">
                                            <p>Confirm Password <span className="text-danger">*</span></p>
                                            <input className="form-control" type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                        </div>
                                        <div className="form-group">
                                            <p>WhatsApp no</p>
                                            <input className="form-control" type="number" placeholder="WhatsApp no" value={WhatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)}></input>
                                        </div>
                                        <div className="form-group">
                                            <p>Select Country</p>
                                            <Select
                                                options={countries}
                                                value={selectedCountry}
                                                onChange={setSelectedCountry}
                                                placeholder="Select Country"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <p>Select State</p>
                                            <Select
                                                options={states}
                                                value={selectedState}
                                                onChange={setSelectedState}
                                                placeholder="Select State"
                                                isDisabled={!selectedCountry}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <p>Select City</p>
                                            <Select
                                                options={cities}
                                                placeholder="Select City"
                                                isDisabled={!selectedState}
                                                onChange={setSelectedCity}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <p>Your Address</p>
                                            <input className="form-control" type="text" placeholder="Your Address" value={Address1} onChange={(e) => setAddress1(e.target.value)}></input>
                                        </div>
                                        <div className="form-group">
                                            <p>Pincode</p>
                                            <input className="form-control" type="text" placeholder="Pincode" value={Pincode} onChange={(e) => setPincode(e.target.value)}></input>
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )}
                                

                                {SignUpstep != 4 ? (
                                    <>
                                        <div className='button-area mt-4'>

                                            {SignUpstep >= 3 ? (
                                                <button type='button' className="signup-page-button mr-3" onClick={() => HandelSignupstepback(SignUpstep)}>Back</button>
                                            ) : ''}

                                            {SignUpstep == 4 ? (
                                                <>

                                                </>
                                            ) : (
                                                <>
                                                    {SignUpstep <= 3 ? (
                                                        <button type='button' className="signup-page-button" onClick={() => HandelSignupstep(SignUpstep)}>Next</button>
                                                    ) : (
                                                        <button type='button' className="signup-page-button" onClick={() => HandelSignupstep(SignUpstep)}>Skip / Next</button>
                                                    )}
                                                </>
                                            )}
                                            <p className="forgot-password-text">Already have an account? <Link to={app_url + 'auth/customer/login'} className='reset-password-link'>Login</Link></p>
                                        </div>
                                    </>
                                ) : (<>

                                </>)}

                            </div>
                        </div>
                        {SignUpstep != 4 ? (
                            <div className="col-md-6">
                                <div className="text-center">
                                    <img className="no-result-img" src={SignupImg} style={lottewidth} />
                                </div>
                            </div>
                        ) : (<>

                        </>)}
                        {SignUpstep == 4 ? (
                                    <>
                                        <div className="col-md-12 px-5-">
                                            <div className="form-group">
                                                <p>Select hobby</p>
                                                {Hobby.map((item, index) => (
                                                    <span
                                                        key={item.name}
                                                        className={`hobby-box ${selectedHobbies.includes(item.name) ? 'hobby-active' : ''}`}
                                                        onClick={() => toggleHobby(item.name)}
                                                    >
                                                        {item.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : ''}
                        {SignUpstep == 4 ? (
                            <div className="col-md-12">
                                <div className='button-area mt-4'>

                                    {SignUpstep >= 3 ? (
                                        <button type='button' className="signup-page-button mr-3" onClick={() => HandelSignupstepback(SignUpstep)}>Back</button>
                                    ) : ''}

                                    {SignUpstep == 4 ? (
                                        <>
                                            {Loader ? (
                                                <button type='button' className="signup-page-button">Please wait...</button>
                                            ) : (
                                                <button type='button' className="signup-page-button" onClick={() => HandelCustomersignup()}>Create account</button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {SignUpstep <= 3 ? (
                                                <button type='button' className="signup-page-button" onClick={() => HandelSignupstep(SignUpstep)}>Next</button>
                                            ) : (
                                                <button type='button' className="signup-page-button" onClick={() => HandelSignupstep(SignUpstep)}>Skip / Next</button>
                                            )}
                                        </>
                                    )}
                                    <p className="forgot-password-text">Already have an account? <Link to={app_url + 'auth/customer/login'} className='reset-password-link'>Login</Link></p>
                                </div>
                            </div>
                        ) : ''}

                    </div>
                </div>
            </div>
            {/* </div> */}
            <div class="space-height" style={{ height: '600px' }}></div>

        </>
    );
};

export default About;
