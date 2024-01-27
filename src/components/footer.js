import React from "react";
import footerLogo from "./assets/footerLogo.svg";
import facebook from "./assets/facebook.svg";
import instagram from "./assets/instagram.svg";
import whatsapp from "./assets/whatsapp.svg";
import youtube from "./assets/youtube.svg";
import support from "./assets/support.svg";
import { app_url } from "../common/Helpers";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer py-5 mt-4">
        <div className="row m-auto w-100">
          <div className="col-lg-5 col-12">
            <div className="mx-footer">
              <img className="footer-logo animate__animated animate__bounce" src={footerLogo} alt="" />
              <p className="text-primary-color mt-4">
                Welcome to TIXME, where every ticket tells a story! Our mission
                is to redefine events, making each occasion an unforgettable and
                cherished memory.
              </p>
              <div className="d-flex">
                <span>
                  <img className="social-icon me-4" src={facebook} alt="" />
                  <img className="social-icon me-4" src={instagram} alt="" />
                  <img className="social-icon me-4" src={whatsapp} alt="" />
                  <img className="social-icon me-4" src={youtube} alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-12 footer-link ps-lg-0 ps-4 mt-lg-0 mt-5">
            <h6 className="fw-bold text-primary-color mb-0">
              QUICK LINKS
            </h6>
            <div className="">
              <Link to={app_url + 'auth/login-signup'}>
                <span className="text-primary-color mt-3">Login</span>
              </Link>
              <Link to={app_url + 'faq'}>
                <span className="text-primary-color mt-3">FAQ's</span>
              </Link>
              <Link to={app_url + 'events'}>
                <span className="text-primary-color mt-3">Event</span>
              </Link>
              <Link to={app_url + 'organizers'}>
                <span className="text-primary-color mt-3">Organizers</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-2 col-12 footer-link ps-lg-0 ps-4 mt-lg-0 mt-5">
            <h6 className="fw-bold text-primary-color mb-0">LINKS</h6>
            <div className="">
              <Link to={app_url}>
                <span className="text-primary-color mt-3">Home</span>
              </Link>
              <Link to={app_url + 'events'}>
                <span className="text-primary-color mt-3">All Events</span>
              </Link>
              <Link to={app_url + 'aboutus'}>
                <span className="text-primary-color mt-3">About Us</span>
              </Link>
              <Link to={app_url + 'privacy-policy'}>
                <span className="text-primary-color mt-3">Privacy Policy</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-12 d-flex justify-content-center align-items-start flex-column text-center ps-lg-0 ps-4 mt-lg-0 mt-4">
            <img className="support-img ms-4 mb-1 animate__animated animate__bounce" src={support} alt="" />
            <h6 className="fw-bold text-primary-color mb-0">24/7 CUSTOMER CARE</h6>
          </div>
        </div>
      </footer>
      <div className="copyright text-center py-2">
        <small className="text-white"> © 2023 TIXME </small>
      </div>
    </>
  );
};

export default Footer;
