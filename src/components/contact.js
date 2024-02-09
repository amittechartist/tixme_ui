import React, { useState } from "react";
import arrow from "./assets/arrow.svg";
import Footer from './footer';
import HeaderMenu from './headermenu';
import MobileMenu from './mobilemenu';
import 'react-phone-input-2/lib/style.css';
// component
import ContactDetails from '../component/ContactDetails';
import ContactUsform from '../component/ContactusFrorm';
const Contact = () => {
  return (
    <>
      <div className="content-area">
        <HeaderMenu />
        <div className="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
          <MobileMenu />
          <h1 className="banner-h text-white text-uppercase fw-bold pb-0 animate__animated animate__bounce">
            Contact Us
          </h1>
          <div className="banner-child bg-white p-3">
            <div className="contact-sec m-2" style={{ backgroundSize: 'cover' }}>
              <ContactUsform />
            </div>
          </div>
        </div>
        <div className="h-200"></div>
        <ContactDetails />
      </div>
      <Footer />
    </>
  );
};

export default Contact;
