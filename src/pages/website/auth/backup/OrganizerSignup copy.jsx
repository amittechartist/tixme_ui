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
    const [Country, setCountry] = useState();
    const [Countryname, setCountryname] = useState();
    const [Loader, setLoader] = useState(false);
    const handlePhoneChange = (newPhone) => {
        setPhonenumber(newPhone);
    };
    const HandelOrganizersignup = async () => {
        try {
            if (!Firstname || !Lastname || !Email || !Confirmemail || !Phonenumber || !Countryname || !Message) {
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
    const [countryList, setcountryList] = useState([{ value: "", label: "Country" }]);
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
    useEffect(() => {
        fetchCountry();
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="content-data">
            <div className="signup-form-section mt-5 mb-5">
                <Container>
                    <Row className="signup-form-box">
                        <Col md={12} className="signup-area signup-page-padding">
                            <Row>
                                <Col md={3}>
                                </Col>
                                <Col md={6}>

                                    <div className="login-area-sec">
                                        <h3 className="signup-page-title">Create an organizer account</h3>
                                        <p className="signup-page-desc">
                                            Create an account for free
                                        </p>
                                    </div>
                                    <div className="login-area-form-sec">
                                            <div>
                                                <div className="form-group">
                                                    <p>First Name <span className="text-danger">*</span></p>
                                                    <input className="form-control" type="text" placeholder="First Name" value={Firstname} onChange={(e) => setFirstname(e.target.value)}></input>
                                                </div>
                                                <div className="form-group">
                                                    <p>Last Name <span className="text-danger">*</span></p>
                                                    <input className="form-control" type="text" placeholder="Last Name" value={Lastname} onChange={(e) => setLastname(e.target.value)}></input>
                                                </div>
                                                <div className="form-group">
                                                    <p>Email address <span className="text-danger">*</span></p>
                                                    <input className="form-control" type="email" placeholder="Email Address" value={Email} onChange={(e) => setEmail(e.target.value)}></input>
                                                </div>
                                                <div className="form-group">
                                                    <p>Confirm Email address <span className="text-danger">*</span></p>
                                                    <input className="form-control" type="email" placeholder="Confirm email Address" value={Confirmemail} onChange={(e) => setConfirmemail(e.target.value)}></input>
                                                </div>
                                                <div className="form-group">
                                                    <p>Phone number <span className="text-danger">*</span></p>
                                                    {/* <input pattern="[0-9]{10}" maxLength={10} className="form-control" type="number" placeholder="Phone number" value={Phonenumber} onChange={handlePhoneChange}></input> */}
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
                                                <p className="forgot-password-text">Already have an account? <Link to={app_url + 'auth/organizer/login'} className='reset-password-link'>Login</Link></p>
                                                {Loader ? (
                                                    <WhitestarBtn title={'Please wait...'} />
                                                ) : (
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <span onClick={HandelOrganizersignup}>
                                                                <WhitestarBtn title={'Create Account'} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                    </div>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    )
}
export default Home;