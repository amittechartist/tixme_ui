import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import plus from "../assets/plus.svg";
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { app_url, apiurl, organizer_url, customer_url, isEmail } from "../common/Helpers";
import Select from 'react-select'
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button, Col, Row } from "react-bootstrap";
import { Country, State, City } from 'country-state-city';
const Locationbtn = ({ prorps }) => {
    const navigate = useNavigate();
    const [ContactModal, setContactModal] = useState(false);
    const [Confirmemail, setConfirmemail] = useState();
    const [Email, setEmail] = useState();
    const [Phonenumber, setPhonenumber] = useState();
    const [Firstname, setFirstname] = useState();
    const [Lastname, setLastname] = useState();
    const [Message, setMessage] = useState();
    const [Countryname, setCountryname] = useState();
    const [Loader, setLoader] = useState(false);
    const MySwal = withReactContent(Swal)
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        setCountries(Country.getAllCountries().map(({ isoCode, name }) => ({ value: isoCode, label: name })));
    }, []);
    const HandelOrganizersignup = async (e) => {
        e.preventDefault();
        try {
            if (!Firstname || !Lastname || !Email || !Confirmemail || !Phonenumber || !selectedCountry.label) {
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
                countryname: selectedCountry.label,
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
    const handlePhoneChange = (newPhone) => {
        setPhonenumber(newPhone);
    };
    return (
        <>
            <Modal isOpen={ContactModal} toggle={() => setContactModal(!ContactModal)} centered>
            <ModalHeader toggle={() => setContactModal(!ContactModal)}> </ModalHeader>
                <ModalBody>
                    <form onSubmit={HandelOrganizersignup}>
                        <Row>
                            <Col md={12}>
                                <div className="form-group">
                                    <p>Email Address <span className="text-danger">*</span></p>
                                    <input className="form-control" type="text" placeholder="Email Address" value={Email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <p>Confirm Email Address <span className="text-danger">*</span></p>
                                    <input className="form-control" type="text" placeholder="Confirm Email Address" value={Confirmemail} onChange={(e) => setConfirmemail(e.target.value)}></input>
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
                                    <p>Phone Number <span className="text-danger">*</span></p>
                                    {/* <input className="form-control" type="number" placeholder="Phone number" value={Phonenumber} onChange={handlePhoneChange}></input> */}
                                    <PhoneInput
                                        country={'us'}
                                        className="phone-number-with-code"
                                        enableSearch={true}
                                        placeholder={'Phone Number'}
                                        autoFormat={true}
                                        value={Phonenumber}
                                        onChange={handlePhoneChange}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <p>Select Country <span className="text-danger">*</span></p>
                                    <Select
                                        options={countries}
                                        value={selectedCountry}
                                        onChange={setSelectedCountry}
                                        placeholder="Select Country"
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
                                    <button type='submit' className="signup-page-button">Get In Touch</button>
                                )}
                            </Col>
                        </Row>
                    </form>
                </ModalBody>
            </Modal>
            {prorps == 'pcheadermenu' ? (
                <li class="nav-item d-flex align-items-center justify-content-center me-xl-4 me-3">
                    <Link
                        class="nav-link text-primary-theme pe-1 font-nav"
                        onClick={() => setContactModal(!ContactModal)}
                    >
                        List Your Event{" "}
                        <img class="nav-plus" src={plus} alt="" />
                    </Link>
                </li>
            ) : ''}
            {prorps == 'mobheadermenu' ? (
                <li className="nav-item d-flex align-items-center justify-content-start">
                    <Link
                        className="nav-link text-primary-theme pe-1 font-nav"
                        onClick={() => setContactModal(!ContactModal)}
                    >
                        List Your Event {" "}
                        <img class="nav-plus" src={plus} alt="" />
                    </Link>
                </li>
            ) : ''}

        </>
    )
}
export default Locationbtn;