import React, { useState } from "react";
import india from "./assets/india.svg";
import singapore from "./assets/singapore.svg";
import USA from "./assets/USA.svg";
import arrow from "./assets/arrow.svg";
import Indiaflag from "../common/image/India.svg";
import Usaflag from "../common/image/usaf.svg";
import Singapureflag from "../common/image/singapur.svg";
import Footer from './footer';
import HeaderMenu from './headermenu';
import MobileMenu from './mobilemenu';
import toast from 'react-hot-toast';
import { apiurl, isEmail } from '../common/Helpers';
const Contact = () => {
  const [tabno, setTabno] = useState(1);
  const [Loader, setLoader] = useState(false);
  const [first_name, setfirst_name] = useState();
  const [last_name, setlast_name] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [subject, setsubject] = useState();
  const [message, setmessage] = useState();
  const HandelContactForm = async () => {
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
  return (
    <>
      <HeaderMenu />
      <div className="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
        <MobileMenu />
        <h1 className="banner-h text-white text-uppercase fw-bold pb-0 animate__animated animate__bounce">
          Contact Us
        </h1>
        <div className="banner-child bg-white p-3">
          <div className="contact-sec m-2" style={{backgroundSize: 'cover'}}>
            <form className="px-lg-5 px-4 py-4">
              <div className="row">
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      First Name
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
                      Last Name
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
                      Email Id
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
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setphone(e.target.value)}
                      value={phone}
                      className="form-control line-field"
                      placeholder="+1 012 3456 789"
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  <p className="text-primary-color fw-bold mb-3">Select Subject?</p>
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
                        General enquiry
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
                        Ticket issue
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="mb-3 mt-lg-0 mt-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Message
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setmessage(e.target.value)}
                      value={message}
                      className="form-control line-field"
                      placeholder="Write your message."
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
                  <button className="GetLatestUpdateButton" onClick={() => HandelContactForm()}>
                    <div className="left px-0 px-md-4">
                      <small className="ms-2">Send</small>
                    </div>
                    <div className="right">
                      <img style={{ width: "18px" }} src={arrow} alt="" />
                    </div>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="h-200"></div>
      <div className="address-sec banner-child-address py-5 px-md-0 px-3">
        {/* <TabComp /> */}
        <div className="d-flex justify-content-center">
          <div onClick={() => setTabno(1)} className={tabno == 1 ? 'mx-lg-4 mx-2 animate__animated animate__bounce xyss xxx-conta' : 'mx-lg-4 mx-2 animate__animated animate__bounce xxx-conta'}>
            <p className="sssas">India</p>
            <img className="flag-icon" src={Indiaflag}></img>
          </div>
          <div onClick={() => setTabno(2)} className={tabno == 2 ? 'mx-lg-4 mx-2 animate__animated animate__bounce xyss xxx-conta' : 'mx-lg-4 mx-2 animate__animated animate__bounce xxx-conta'}>
            <p className="sssas">singapore</p>
            <img className="flag-icon" src={Singapureflag}></img>
          </div>
          <div onClick={() => setTabno(3)} className={tabno == 3 ? 'mx-lg-4 mx-2 animate__animated animate__bounce xyss xxx-conta' : 'mx-lg-4 mx-2 animate__animated animate__bounce xxx-conta'}>
            <p className="sssas">USA</p>
            <img className="flag-icon" src={Usaflag}></img>
          </div>
          {/* <img onClick={() => setTabno(1)} className="mx-lg-4 mx-2 animate__animated animate__bounce" src={india} alt="" />
          <img onClick={() => setTabno(2)} className="mx-lg-4 mx-2 animate__animated animate__bounce" src={singapore} alt="" />
          <img onClick={() => setTabno(3)} className="mx-lg-4 mx-2 animate__animated animate__bounce" src={USA} alt="" /> */}
        </div>
        <div className="contact-sec w-500 m-auto px-5 py-4 mt-4">
          {
            tabno === 1 && (
              <>
                <div>
                  <span className="text-primary-color text-uppercase fw-bold">Address:</span>
                  <span>
                    Office, Vijay Chambers, Grant Road, Mumbai, Maharashtra 400004
                  </span>
                </div>
                <div>
                  <span className="text-primary-color text-uppercase fw-bold">Email</span>
                  <span>tixme.tix@gmail.com</span>
                </div>
                <div>
                  <span className="text-primary-color text-uppercase fw-bold">Phone</span>
                  <span>+91 8080000007 (WhatsApp)</span>
                </div>
              </>
            )
          }
          {
            tabno === 2 && (
              <>
                <div>
                  <span className="text-primary-color text-uppercase fw-bold">Address:</span>
                  <span>
                    Office, Singapure Office <br /> Location
                  </span>
                </div>
                <div>
                  <span className="text-primary-color text-uppercase fw-bold">Email</span>
                  <span>tixme.tix@gmail.com</span>
                </div>
                <div>
                  <span className="text-primary-color text-uppercase fw-bold">Phone</span>
                  <span>+91 8080000007 (WhatsApp)</span>
                </div>

              </>
            )
          }
          {
            tabno === 3 && (
              <>
                <div>
                  <span className="text-primary-color text-uppercase fw-bold">Address:</span>
                  <span>
                    USA Office Location, Broklyn United Staes of America and more
                  </span>
                </div>
                <div>
                  <span className="text-primary-color text-uppercase fw-bold">Email</span>
                  <span>tixme.tix@gmail.com</span>
                </div>
                <div>
                  <span className="text-primary-color text-uppercase fw-bold">Phone</span>
                  <span>+91 8080000007 (WhatsApp)</span>
                </div>
              </>
            )
          }
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
