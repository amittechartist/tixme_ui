import React from "react";
import footerLogo from "./assets/footerLogo.svg";
import facebook from "./assets/facebook.svg";
import instagram from "./assets/instagram.svg";
import whatsapp from "./assets/whatsapp.svg";
import youtube from "./assets/youtube.svg";
import linkedin from "./assets/linkedin.svg";
import support from "./assets/support.svg";
import { app_url } from "../common/Helpers";
import { Link } from "react-router-dom";
import { FaAngleUp } from "react-icons/fa6";
const Footer = () => {
  const scrollTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <div onClick={() => scrollTop()} className="scroll-top-box"><span><FaAngleUp /></span></div>
      <footer className="footer py-5 mt-4">
        <div className="row m-auto w-100 container-fluid">
          <div className="col-lg-5 col-12">
            <div className="mx-footer">
              <img className="footer-logo animate__animated animate__bounce" src={footerLogo} alt="" />
              <p className="text-primary-color mt-4">
                Welcome to TIXME, where every ticket tells a story! Our mission
                is to redefine events, making each occasion an unforgettable and
                cherished memory.
              </p>
              <div className="d-flex footer-logo-box1">
                <span>
                  <a href="https://www.facebook.com/profile.php?id=61556603844279" target="_blank"><img className="social-icon me-4" src={facebook} alt="" /></a>
                  <a href="https://www.instagram.com/tixme.co" target="_blank"><img className="social-icon me-4" src={instagram} alt="" /></a>
                  <a href="https://www.linkedin.com/company/tixme-co" target="_blank"><img className="social-icon me-4" height={'auto'} width={'29px'} src={linkedin} alt="" /></a>
                  {/* <img className="social-icon me-4" src={youtube} alt="" /> */}
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-12 footer-link ps-lg-0 ps-4 mt-lg-0 mt-5">
            <h6 className="fw-bold text-primary-color mb-0 text-underline">
              QUICK LINKS
            </h6>
            <div className="">
              <Link to={app_url} onClick={() => window.scrollTo(0, 0)}>
                <span className="text-primary-color mt-3">Home</span>
              </Link>
              <Link to={app_url + 'events'} onClick={() => window.scrollTo(0, 0)}>
                <span className="text-primary-color mt-3">Events</span>
              </Link>
              <Link to={app_url + 'aboutus'} onClick={() => window.scrollTo(0, 0)}>
                <span className="text-primary-color mt-3">About Us</span>
              </Link>
              <Link to={app_url + 'contact'} onClick={() => window.scrollTo(0, 0)}>
                <span className="text-primary-color mt-3">Contact Us</span>
              </Link>
              <Link to={app_url + 'auth/login-signup'} onClick={() => window.scrollTo(0, 0)}>
                <span className="text-primary-color mt-3">Login/Signup</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-2 col-12 footer-link ps-lg-0 ps-4 mt-lg-0 mt-5">
            <h6 className="fw-bold text-primary-color mb-0  text-underline">OTHER LINKS</h6>
            <div className="">
              <Link to={app_url + 'purchase-policy'}>
                <span className="text-primary-color mt-3">Purchase Policy</span>
              </Link>
              <Link to={app_url + 'privacy-policy'} onClick={() => window.scrollTo(0, 0)}>
                <span className="text-primary-color mt-3">Privacy Policy</span>
              </Link>
              <Link to={app_url + 'organizers'} onClick={() => window.scrollTo(0, 0)}>
                <span className="text-primary-color mt-3">Organizers</span>
              </Link>
              <Link to={app_url + 'faq'} onClick={() => window.scrollTo(0, 0)}>
                <span className="text-primary-color mt-3">FAQs</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-12 d-flex justify-content-center align-items-start flex-column text-center ps-lg-0 ps-4 mt-lg-0 mt-4">
            <img className="support-img ms-4 mb-1 animate__animated animate__bounce" style={{ paddingLeft: "20px" }} src={support} alt="" />
            <h6 className="fw-bold text-primary-color mb-0">24/7 CUSTOMER CARE</h6>
          </div>
        </div>
      </footer>
      <div className="copyright-wrapper position-relative">

        <div className="left"></div>
      <div className="copyright text-center py-2">
        <small className="text-white"> © 2023. All Rights Reserved by TIXME.</small>
      </div>
        <div className="right"></div>
      </div>
    </>
  );
};

export default Footer;
