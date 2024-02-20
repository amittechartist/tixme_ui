import React, { useState } from "react";
import arrow from "../assets/arrow.svg";
import toast from 'react-hot-toast';
import { apiurl, isEmail } from '../common/Helpers';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const Contact = () => {
    const [Loader, setLoader] = useState(false);
    const [first_name, setfirst_name] = useState();
    const [last_name, setlast_name] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [subject, setsubject] = useState();
    const [areyou, setareyou] = useState();
    const [message, setmessage] = useState();
    const HandelContactForm = (e) => {
        e.preventDefault();
        try {
            if (!first_name || !last_name || !email || !phone || !message || !subject) {
                return toast.error('All field required');
            }
            if (!isEmail(email)) {
                return toast.error('Enter valid email address');
            }
            setLoader(true);
            const requestData = {
                first_name: first_name,
                last_name: last_name,
                name: first_name + ' ' + last_name,
                email: email,
                phone: phone,
                subject: subject,
                areyou: areyou,
                message: message,
            };
            fetch(apiurl + 'website/contact-store', {
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
                        toast.success("Contact form submitted successfully");
                        setfirst_name('');
                        setlast_name('');
                        setemail('');
                        setphone('');
                        setsubject('');
                        setareyou('');
                        setmessage('');
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
        setphone(newPhone);
    };
    return (
        <form className="px-lg-5 px-4 py-4" onSubmit={HandelContactForm}>
            <div className="row">
                <div className="col-lg-4">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                            First Name<span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setfirst_name(e.target.value)}
                            value={first_name}
                            className="form-control line-field"
                            placeholder="John"
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                            Last Name<span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setlast_name(e.target.value)}
                            value={last_name}
                            className="form-control line-field"
                            placeholder="John"
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                            Email ID<span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setemail(e.target.value)}
                            value={email}
                            className="form-control line-field"
                            placeholder="John@domain.com"
                        />
                    </div>
                </div>

                <div className="col-lg-4 extra-phone-css">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                            Phone Number<span className="text-danger">*</span>
                        </label>
                        <PhoneInput
                            country={'us'}
                            className="phone-number-with-code"
                            enableSearch={true}
                            placeholder={'Phone Number'}
                            autoFormat={true}
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <p className="text-primary-color fw-bold mb-3">Subject<span className="text-danger">*</span></p>
                    <div className="d-flex flex-md-row flex-column">
                        <div className="form-check me-3">
                            <input
                                className="form-check-input  rounded-circle"
                                type="checkbox"
                                checked={subject == "General enquiry" ? true : false}
                                onChange={() => setsubject("General enquiry")}
                                value="General enquiry"
                                id="flexCheckDefault"
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                                General Enquiry
                            </label>
                        </div>
                        <div className="form-check me-3">
                            <input
                                className="form-check-input  rounded-circle"
                                type="checkbox"
                                checked={subject == "Ticket issue" ? true : false}
                                value="Ticket issue"
                                onChange={() => setsubject("Ticket issue")}
                                id="flexCheckDefault2"
                            />
                            <label className="form-check-label" for="flexCheckDefault2">
                                Ticket Issue
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <p className="text-primary-color fw-bold mb-3">Are You ?<span className="text-danger">*</span></p>
                    <div className="d-flex flex-md-row flex-column">
                        <div className="form-check me-3">
                            <input
                                className="form-check-input  rounded-circle"
                                type="checkbox"
                                checked={areyou == "Organizer" ? true : false}
                                onChange={() => setareyou("Organizer")}
                                value="Organizer"
                                id="flexCheckDefault3"
                            />
                            <label className="form-check-label" for="flexCheckDefault3">
                                Organiger
                            </label>
                        </div>
                        <div className="form-check me-3">
                            <input
                                className="form-check-input  rounded-circle"
                                type="checkbox"
                                checked={areyou == "Customer" ? true : false}
                                value="Customer"
                                onChange={() => setareyou("Customer")}
                                id="flexCheckDefault24"
                            />
                            <label className="form-check-label" for="flexCheckDefault24">
                                Customer
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="mb-3 mt-lg-0 mt-3">
                        <label for="exampleInputEmail1" className="form-label">
                            Message<span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setmessage(e.target.value)}
                            value={message}
                            className="form-control line-field"
                            placeholder="Write your message"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-md-3 mt-2">
                {Loader ? (
                    <button className="GetLatestUpdateButton">
                        <div className="left">
                            <small className="ms-2">Please wait...</small>
                        </div>
                        <div className="right">
                            <img style={{ width: "18px" }} src={arrow} alt="" />
                        </div>
                    </button>
                ) : (
                    <button type="submit" className="GetLatestUpdateButton">
                        <div className="left px-0 px-md-4">
                            <small className="ms-2">Get In Touch</small>
                        </div>
                        <div className="right">
                            <img style={{ width: "18px" }} src={arrow} alt="" />
                        </div>
                    </button>
                )}
            </div>
        </form>
    );
};
export default Contact;