import React from "react";
import Logo from "./assets/Logo.svg";
import Search from "./assets/search.png";
import Account from "./assets/account.svg";
import menu from "./assets/menu.svg";
import plus from "./assets/plus.svg";
import location from "./assets/location (5) 1.svg";
import music from "./assets/music.svg";
import nightlife from "./assets/nightlife.svg";
import business from "./assets/business.svg";
import sport from "./assets/sport.svg";
import foot from "./assets/food.svg";
import art from "./assets/art.svg";
import { FaLocationDot } from 'react-icons/fa';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-white bg-white d-lg-none mx-4 rounded-8 top-10 d-block mb-5">
        <div className="container-fluid pe-0">
          <img className="nav-logo ms-lg-5 ms-2" src={Logo} alt="Not found" />
          <div>
            <img
              className="m-search me-md-4 me-3"
              src={Search}
              alt="Not found"
            />
            <img className="m-account me-md-3 me-2" src={Account} alt="" />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span>
                <img className="m-account" src={menu} alt="" />
              </span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse mt-3"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item d-flex align-items-center justify-content-start">
                <a
                  className="nav-link text-primary pe-1 font-nav"
                  href="index.html"
                >
                  Home
                  <img className="nav-plus" src={plus} alt="" />
                </a>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <a className="nav-link text-primary pe-1 font-nav" href="events.html">
                  Events
                  <img className="nav-plus" src={plus} alt="" />
                </a>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <a
                  className="nav-link text-primary pe-1 font-nav"
                  href="about-us.html"
                >
                  About Us
                  <img className="nav-plus" src={plus} alt="" />
                </a>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <a
                  className="nav-link text-primary pe-1 font-nav"
                  href="contact-us.html"
                >
                  Contact Us
                  <img className="nav-plus" src={plus} alt="" />
                </a>
              </li>
              <li className="nav-item border rounded border-primary align-self-start px-2 my-1">
                <button className="ListYourEvents">List Your Events kdjfkdjfkfkd</button>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <a
                  className="nav-link text-primary pe-1 font-nav"
                  href="contact-us.html"
                >
                  Login/Sign Up
                  <img className="nav-plus" src={plus} alt="" />
                </a>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <a
                  className="nav-link text-primary pe-1 font-nav"
                  href="contact-us.html"
                >
                  <span className="locationIcon"><FaLocationDot /></span>
                  Location
                  <img className="nav-plus" src={plus} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="mx-lg-4 my-lg-3 banner bg-primary rounded-8 position-relative">
        <nav class="navbar navbar-expand-lg navbar-white bg-white mx-4 rounded-8 top-10 d-lg-block d-none">
          <div class="container-fluid pe-0">
            <a class="" href="/">
              <img class="nav-logo ms-lg-5 ms-2" src={Logo} alt="" />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0 position-relative">
                <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                  <a
                    class="nav-link text-primary pe-1 font-nav"
                    href="index.html"
                  >
                    Home  <img class="nav-plus" src={plus} alt="" />
                  </a>
                </li>
                <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                  <a class="nav-link text-primary pe-1 font-nav" href="/">
                    Events{" "}
                    <img class="nav-plus" src={plus} alt="" />
                  </a>
                </li>
                <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                  <a
                    class="nav-link text-primary pe-1 font-nav"
                    href="about-us.html"
                  >
                    About Us
                    <img class="nav-plus" src={plus} alt="" />
                  </a>
                </li>
                <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                  <a
                    class="nav-link text-primary pe-1 font-nav"
                    href="contact-us.html"
                  >
                    Contact Us
                    <img class="nav-plus" src={plus} alt="" />
                  </a>
                </li>
                <li class="nav-item border rounded border-primary align-self-center me-7">
                  <a class="nav-link text-primary pt-1 pb-1p font-nav" href="/">
                    List your event
                  </a>
                </li>
                <li class="nav-item position-absolute end-0 bg-white nav-box me-0 d-flex flex-column justify-content-center align-items-center rounded-8">
                  <a class="nav-link text-primary pt-1 pb-1p font-nav" href="/">
                    Login/Sign Up
                  </a>
                  <div class="d-flex align-items-center justify-content-center">
                    <img class="nav-loc" src={location} alt="" />
                    <a
                      class="nav-link text-primary px-1 font-nav-small"
                      href="/"
                    >
                      Location
                      <img class="nav-plus" src={plus} alt="" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <h1 class="banner-h text-white text-uppercase">Beyond Tickets :</h1>
        <h3 class="banner-h2 text-white rounded-8 px-4 py-3">
          Your Passport to Eventful Experiences
        </h3>
        <div class="banner-child bg-white">
          <h5 class="text-primary fw-bold space-sec pt-4">
            Find Near By Events
          </h5>
          <div class="d-flex space-sec2 flex-lg-row flex-column mt-lg-0 mt-3">
            <select
              class="form-select category me-4 selectBarIconRight"
              aria-label="Default select example"
            >
              <option>Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <input
              type="search"
              id="form1"
              class="form-control border-b5 mt-lg-0 mt-3"
              placeholder="Search anything"
            />
          </div>
          <div class="row mx-lg-3 mx-1 mb-4 mt-4 gx-md-4 gx-2">
            <div class="col-xl-2 col-4 text-center position-relative">
              <div class="event-card pt-4">
                <img class="event-img" src={music} alt="" />
                <small class="d-block text-primary my-2 mt-3"> Music </small>
              </div>
              <div class="fade-effect"></div>
            </div>
            <div class="col-xl-2 col-4 text-center position-relative">
              <div class="event-card pt-4">
                <img class="event-img" src={nightlife} alt="" />
                <small class="d-block text-primary my-2 mt-3"> Music </small>
              </div>
              <div class="fade-effect"></div>
            </div>
            <div class="col-xl-2 col-4 text-center position-relative">
              <div class="event-card pt-4">
                <img class="event-img" src={business} alt="" />
                <small class="d-block text-primary my-2 mt-3"> Music </small>
              </div>
              <div class="fade-effect"></div>
            </div>
            <div class="col-xl-2 col-4 text-center position-relative d-xl-block d-none">
              <div class="event-card pt-4">
                <img class="event-img" src={sport} alt="" />
                <small class="d-block text-primary my-2 mt-3"> Music </small>
              </div>
              <div class="fade-effect"></div>
            </div>
            <div class="col-xl-2 col-4 text-center position-relative d-xl-block d-none">
              <div class="event-card pt-4">
                <img class="event-img" src={foot} alt="" />
                <small class="d-block text-primary my-2 mt-3"> Music </small>
              </div>
              <div class="fade-effect"></div>
            </div>
            <div class="col-xl-2 col-4 text-center position-relative d-xl-block d-none">
              <div class="event-card pt-4">
                <img class="event-img" src={art} alt="" />
                <small class="d-block text-primary my-2 mt-3"> Music </small>
              </div>
              <div class="fade-effect"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
