import React, { useEffect, useState } from "react";
import HeaderMenu from '../../../components/headermenu';
import MobileMenu from '../../../components/mobilemenu';
import Footer from '../../../components/footer';
import 'react-phone-input-2/lib/style.css';
import { Link } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
import OrganizerSignup from '../../../component/Organizersignup';
import { app_url, apiurl, isEmail } from '../../../common/Helpers';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaTimes } from 'react-icons/fa';
import arrow from "../../../assets/arrow.svg";
import TopIcon from "../../../assets/new/top.png"
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button, Col, Row } from "react-bootstrap";
const About = () => {
    const navigate = useNavigate();
    const [ContactModal, setContactModal] = useState(false);
    const [Confirmemail, setConfirmemail] = useState();
    const [Email, setEmail] = useState();
    const [Phonenumber, setPhonenumber] = useState();
    const [Firstname, setFirstname] = useState();
    const [Lastname, setLastname] = useState();
    const [Message, setMessage] = useState();
    const [Countryname, setCountryname] = useState();
    const [countryList, setcountryList] = useState([{ value: "", label: "Country" }]);
    const [Country, setCountry] = useState();
    const [Loader, setLoader] = useState(false);
    const MySwal = withReactContent(Swal)

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
    const handlePhoneChange = (newPhone) => {
        setPhonenumber(newPhone);
    };
    useEffect(() => {
        fetchCountry();
    }, []);
    return (
        <>
            <Modal isOpen={ContactModal} toggle={() => setContactModal(!ContactModal)} centered>
                <ModalHeader toggle={!ContactModal}>Get in touch
                    <button className="close p-0" onClick={() => setContactModal(!ContactModal)} style={{ position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'transparent' }}>
                        <FaTimes />
                    </button>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <div className="form-group">
                                <p>Email address <span className="text-danger">*</span></p>
                                <input className="form-control" type="text" placeholder="email Address" value={Email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <p>Confirm Email address <span className="text-danger">*</span></p>
                                <input className="form-control" type="text" placeholder="Confirm email Address" value={Confirmemail} onChange={(e) => setConfirmemail(e.target.value)}></input>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <p>First Name <span className="text-danger">*</span></p>
                                <input className="form-control" type="text" placeholder="First Name" value={Firstname} onChange={(e) => setFirstname(e.target.value)}></input>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <p>Last Name <span className="text-danger">*</span></p>
                                <input className="form-control" type="text" placeholder="Last Name" value={Lastname} onChange={(e) => setLastname(e.target.value)}></input>
                            </div>
                        </Col>
                        <Col md={6}>
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
                        </Col>
                        <Col md={6}>
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
                        </Col>
                        <div className="form-group">
                            <p>Message</p>
                            <textarea class="form-control" rows="3" value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <Col md={12}>
                            {Loader ? (
                                <button type='button' className="signup-page-button">Please wait...</button>
                            ) : (
                                <button type='button' className="signup-page-button" onClick={() => HandelOrganizersignup()}>Contact Us</button>
                            )}
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            {/* <!-- mobile nav --> */}
            <HeaderMenu />
            <div class="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
                <MobileMenu />
                <h1 class="banner-h fw-bold text-white text-uppercase mb-0 pb-0 animate__animated animate__bounce">
                    Login / Sign up
                </h1>
                <div class="banner-child bg-white px-0" style={{ border: '1px solid #eee' }}>
                    <div className='row p-5 py-5 d-flex justify-content-center'>
                        <div className="col-12 col-md-5 col-lg-5 mt-5">
                            <div className="GetCustomerButtonBox">
                                <img src={TopIcon} alt="" className="TopLeftImg" />
                                <h4>Returning Customer</h4>
                                <Link to={app_url + 'auth/customer/login'}><button class="GetLatestUpdateButton CustomerButton login-pg-btn-cs" >
                                    <div class="left text-center">
                                        <small class="ms-2">Log In</small>
                                    </div>
                                    <div class="right">
                                        <img src={arrow} alt="" style={{ width: "15px" }} />
                                    </div>
                                </button></Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-5 mt-5">
                            <div className="GetCustomerButtonBox">
                                <img src={TopIcon} alt="" className="TopLeftImg" />
                                <h4>Sign Up - Customer</h4>
                                <Link to={app_url + 'auth/customer/signup'}><button class="GetLatestUpdateButton CustomerButton  login-pg-btn-cs">
                                    <div class="left text-center">
                                        <small class="ms-2">Create Account</small>
                                    </div>
                                    <div class="right">
                                        <img src={arrow} alt="" style={{ width: "15px" }} />
                                    </div>
                                </button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-5 mt-5">
                            <div className="GetCustomerButtonBox mt-4">
                                <img src={TopIcon} alt="" className="TopLeftImg" />
                                <h4>Returning Organizer</h4>
                                <Link to={app_url + 'auth/organizer/login'}><button class="GetLatestUpdateButton CustomerButton  login-pg-btn-cs">
                                    <div class="left text-center">
                                        <small class="ms-2">Log In</small>
                                    </div>
                                    <div class="right">
                                        <img src={arrow} alt="" style={{ width: "15px" }} />
                                    </div>
                                </button></Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-5 mt-5">
                            <div className="GetCustomerButtonBox mt-4">
                                <img src={TopIcon} alt="" className="TopLeftImg" />
                                <h4>Sign Up - Organizer</h4>
                                <OrganizerSignup />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            <div class="space-height" style={{ height: '400px' }}></div>
            <Footer />
        </>
    );
};

export default About;
