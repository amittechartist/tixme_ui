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
import arrow from "../assets/arrow.svg";
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
            {prorps == 'pcheadermenu' ? (
                <li class="nav-item border rounded border-primary align-self-center me-3" onClick={() => setContactModal(!ContactModal)}>
                    <Link class="nav-link text-primary-theme pt-1 pb-1p font-nav">
                        List your event{" "}
                        <img class="nav-plus" src={plus} alt="" />
                    </Link>
                </li>
            ) : ''}
            {prorps == 'mobheadermenu' ? (
                <li className="nav-item border rounded border-primary align-self-start px-2 my-1" onClick={() => setContactModal(!ContactModal)}>
                    <Link
                        className="nav-link text-primary-theme pt-1 pb-1p font-nav"
                        onClick={() => setContactModal(!ContactModal)}
                    >
                        List your eventd
                    </Link>
                </li>
            ) : ''}

        </>
    )
}
export default Locationbtn;