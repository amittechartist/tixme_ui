import React, { useState } from "react";
import Logo from "./assets/Logo.svg";
import Search from "./assets/search.png";
import Account from "./assets/account.svg";
import OrganizerSignupmob from '../component/Organizersignupmob';
import menu from "./assets/menu.svg";
import plus from "./assets/plus.svg";
import { Link } from "react-router-dom";
import { app_url, apiurl, organizer_url, customer_url } from "../common/Helpers";
import HeaderLocation from '../component/HeaderLocation';
const Header = () => {
  const customer_token = localStorage.getItem("userauth");
  const organizername = localStorage.getItem("organizername");
  const customer_name = localStorage.getItem("username");
  const [openmenu, setOpenmenu] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-white bg-white d-lg-none mx-4 rounded-8 top-10 d-block mb-5">
        <div className="container-fluid pe-0">
          <Link to={app_url}><img className="nav-logo ms-lg-5 ms-2" src={Logo} alt="Not found" /></Link>
          <div>
            <img
              className="m-search me-md-4 me-3"
              src={Search}
              alt="Not found "
            />
            {customer_token || organizername ? (
              <>
                {customer_token ? (
                  <Link to={customer_url + "dashboard"}><img className="m-account me-md-3 me-2" src={Account} alt="" /></Link>
                ) : (
                  <>
                    {organizername ? (
                      <Link to={organizer_url + "dashboard"}><img className="m-account me-md-3 me-2" src={Account} alt="" /></Link>
                    ) : ''}
                  </>
                )}
              </>
            ) : (
              <Link to={app_url + 'auth/login-signup'}><img className="m-account me-md-3 me-2" src={Account} alt="" /></Link>
            )}
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setOpenmenu(!openmenu)}
            >
              <span>
                <img className="m-account" src={menu} alt="" />
              </span>
            </button>
          </div>
          <div
            className={openmenu ? 'collapse navbar-collapse mt-3 show' : 'collapse navbar-collapse mt-3'}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item d-flex align-items-center justify-content-start">
                <Link
                  className="nav-link text-primary-theme pe-1 font-nav"
                  to={app_url}
                >
                  Home
                  <img className="nav-plus" src={plus} alt="" />
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <Link className="nav-link text-primary-theme pe-1 font-nav" to={app_url + 'events'}>
                  Events
                  <img className="nav-plus" src={plus} alt="" />
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <Link
                  className="nav-link text-primary-theme pe-1 font-nav"
                  to={app_url + 'aboutus'}
                >
                  About Us
                  <img className="nav-plus" src={plus} alt="" />
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <Link
                  className="nav-link text-primary-theme pe-1 font-nav"
                  to={app_url + 'contact'}
                >
                  Contact Us
                  <img className="nav-plus" src={plus} alt="" />
                </Link>
              </li>
              <OrganizerSignupmob prorps={'mobheadermenu'} />
              <li className="nav-item">

                {customer_token || organizername ? (
                  <>
                    {customer_token ? (
                      <>
                        <p className="mb-0 text-dark d-">Customer Account</p>
                        <Link
                          className="nav-link text-primary-theme pe-1 font-nav"
                          to={customer_url + "dashboard"}
                        >
                          {customer_name}
                          <img className="nav-plus" src={plus} alt="" />
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                    {organizername ? (
                      <>
                        <p className="mb-0 text-dark">Organizer Account</p>
                        <Link
                          className="nav-link text-primary-theme pe-1 font-nav"
                          to={organizer_url + "dashboard"}
                        >
                          {organizername}
                          <img className="nav-plus" src={plus} alt="" />
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <Link
                    className="nav-link text-primary-theme pe-1 font-nav"
                    to={app_url + 'auth/login-signup'}
                  >
                    Login/Sign Up
                    <img className="nav-plus" src={plus} alt="" />
                  </Link>
                )}

              </li>
              <HeaderLocation prorps={'mob'} />
            </ul>
          </div>
        </div>
      </nav >
    </>
  );
};

export default Header;
