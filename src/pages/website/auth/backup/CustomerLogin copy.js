import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import WhitestarBtn from '../../../component/Whitestarbtn';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth, googleProvider, facebookProvider } from '../../../firebase';
import { signInWithPopup } from 'firebase/auth';
import PersonIcon from '../../../common/icon/person 1.svg';
import GoogleLogo from '../../../common/icon/google.png';
import FacebookLogo from '../../../common/icon/facebook.png';
import { apiurl, app_url, isEmail, organizer_url } from '../../../common/Helpers';
const Home = ({ title }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const [LoginEmail, setLoginEmail] = useState();
    const [LoginPassword, setLoginPassword] = useState();
    const [Firstname, setFirstname] = useState();
    const [Lastname, setLastname] = useState();
    const [Email, setEmail] = useState();
    const [Confirmemail, setConfirmemail] = useState();
    const [Phonenumber, setPhonenumber] = useState();
    const [Message, setMessage] = useState();
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

    const [Hobby, setHobby] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const [Loader, setLoader] = useState(false);
    const [SignupUseroption, setSignupUseroption] = useState({ value: '2', label: "Ticket buyer" });
    const [SignupUseroptionid, setSignupUseroptionid] = useState(2);
    const handlePhoneChange = (newPhone) => {
        setPhonenumber(newPhone);
    };
    const HandelCustomerLogin = async () => {
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
    };
    const HandelOrganizersignup = async () => {
        try {
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
            setLoader(true);
            const requestData = {
                first_name: Firstname,
                last_name: Lastname,
                email: Email,
                phone_number: Phonenumber,
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
    const HandelCustomersignup = async () => {
        try {
            if (!Firstname || !Lastname || !Email || !Confirmemail || !Phonenumber || !Password || !ConfirmPassword) {
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

            if (Password.length > 7) {

            } else {
                return toast.error('Password must be at least 8 characters long');
            }
            if (Password === ConfirmPassword) {

            } else {
                return toast.error('Password and confirm password not match');
            }
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
                city: City ? City : '',
                state: State ? State : '',
                country: Country ? Country : '',
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
                        localStorage.setItem('customerauth', data.token);
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

    const handleFacebookLogin = async () => {
        toast.error("Contact your developer");
    }
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
                                localStorage.setItem('user_role', 1);
                                toast.success('Login successful', {
                                    duration: 3000,
                                });
                                navigate(app_url);
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
    const userOption = [
        {
            options: [
                { value: '2', label: "Ticket buyer" },
                { value: '1', label: "Organizer" }
            ]
        }
    ]
    const signupUseroption = (selectedValue) => {
        setSignupUseroption(selectedValue);
        setSignupUseroptionid(selectedValue.value);
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
                    setLoader(false);
                    // toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error(error.message);
        }
    }
    const toggleHobby = (id) => {
        const updatedHobbies = [...selectedHobbies];

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
        <div className="content-data">
            <div className="signup-form-section mt-5 mb-5">
                <Container>
                    <Row className="signup-form-box login-area signup-page-padding">
                        <Col md={3}></Col>
                        <Col md={6} className="">
                            <div className="login-area-sec">
                                <h3 className="signup-page-title">Welcome back</h3>
                                <p className="signup-page-desc">
                                    Do you already have an account? please log in with your email address.
                                </p>
                            </div>
                            <div className="login-area-form-sec">
                                <div className="form-group">
                                    <p>Email address</p>
                                    <input className="form-control" type="text" placeholder="Email Address" onChange={(e) => setLoginEmail(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <p>Password</p>
                                    <input className="form-control" type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}></input>
                                </div>
                                <p className="forgot-password-text">Forgot your password? <Link to={app_url + 'auth/customer/forgot-password'} className='reset-password-link'>Reset your password</Link></p>
                                <p className="forgot-password-text">Want to login as organizer? <Link to={app_url + 'auth/organizer/login'} className='reset-password-link'>Login</Link></p>

                                <p className="forgot-password-text">Don't have an account? <Link to={app_url + 'auth/customer/signup'} className='reset-password-link'>Signup</Link></p>

                                <div className="form-group">
                                    {Loader ? (
                                        <span>
                                            <WhitestarBtn title={'Please wait...'} />
                                        </span>
                                    ) : (
                                        <span onClick={HandelCustomerLogin}>
                                            <WhitestarBtn title={'Login'} />
                                        </span>
                                    )}
                                </div>
                                <div className="border-bottom py-2"></div>
                                <div className="text-center">
                                    <p className="reset-password-link text-center pt-3">Login with</p>
                                </div>
                                <div className="text-center">
                                    <Row>
                                        <Col md={12}>
                                            <button className="login-with-btn mx-1" onClick={handleGoogleLogin}><img src={GoogleLogo}></img></button>
                                            {/* <button className="login-with-btn mx-1" onClick={handleFacebookLogin}><img src={FacebookLogo}></img></button> */}
                                        </Col>

                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    )
}
export default Home;