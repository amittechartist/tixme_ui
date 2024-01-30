import React, { useEffect } from "react";
import aboutUs from "../common/category/Group (4).svg";
import Silver from "./assets/Sliver.svg";
import Gold from "./assets/Gold.svg";
import Platinum from "./assets/Platinum.svg";
import google from "./assets/google.svg";
import airBNB from "./assets/airBNB.svg";
import booking from "./assets/booking.com.svg";
import expedia from "./assets/expedia.svg";
import Slider from "react-slick";
import Footer from './footer';
import HeaderMenu from './headermenu';
import MobileMenu from './mobilemenu';
import Journey1 from '../common/image/aboutus/Low Fee.svg'
import Journey2 from '../common/image/aboutus/Support (5).svg'
import Journey3 from '../common/image/aboutus/Techonolgy.svg'
import Journey4 from '../common/image/aboutus/Membership.svg'
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {/* <!-- mobile nav --> */}
      <div className="content-area">
        <HeaderMenu />
        <div class="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
          <MobileMenu />
          <h1 class="banner-h fw-bold text-white text-uppercase mb-0 pb-0 animate__animated animate__bounce">
            About us
          </h1>
          <div class="banner-child bg-white px-0">
            <div class="d-flex flex-md-row flex-column">
              <img class="about-img mt-lg-5 mt-4" style={{ paddingLeft: '11px' }} src={aboutUs} alt="" />
              <p class="ps-lg-5 ps-4 pe-4 about-p mt-lg-5 mt-4">
                Welcome to TIXME, where every ticket tells a story! Our mission is
                to redefine events, making each occasion an unforgettable and
                cherished memory. We promise fair prices, support event organizers
                with insights, and ensure secure transactions. Our user-friendly
                website and interactive features ensure simple ticketing and help
                curate extraordinary events. TIXME creates a community, by
                rewarding and incentivizing members with every ticket purchase.
                Our social network enables us to reach a variety of customers. To
                bring this vision to life, we seamlessly blend cutting-edge
                technology with an unwavering commitment to prioritizing customer
                satisfaction.
              </p>
            </div>
            <div className="row newAboutJourney">
              <div className="col-6 col-lg-3">
                <img className="img-fluid" src={Journey1} alt="" />
                <span>Low Fee</span>
              </div>
              <div className="col-6 col-lg-3">
                <img className="img-fluid" src={Journey2} alt="" />
                <span>Excllent Customer Support</span>
              </div>
              <div className="col-6 col-lg-3 mt-4 mt-md-0">
                <img className="img-fluid" src={Journey3} alt="" />
                <span>High Cutting Edge Technology</span>
              </div>
              <div className="col-6 col-lg-3 mt-4 mt-md-0">
                <img className="img-fluid" src={Journey4} alt="" />
                <span>Membership Provided</span>
              </div>
            </div>
            <p>
              At TIXME, we believe in expressing our gratitude to our valued
              customers for their ongoing support. Thereby, we are proud to
              introduce our Loyalty and Rewards Program, designed to enhance your
              experience and show appreciation for your loyalty. As you embark on
              your ticket-buying journey with us, you automatically become a part
              of our three-tiered loyalty program: Silver, Gold and Platinum
            </p>
            <p class="mt-2">
              Step with us into the spotlight of unforgettable moments where the
              journey is secure, the path is clear, and the memories are destined
              to be extraordinary!Seize the moment, secure your ticket!
            </p>
          </div>
        </div>
        {/* </div> */}
        <div class="space-height about-space-height"></div>
        <div class=" sponser-sec banner-child py-5 ">
          <div class="row w-100 m-auto">
            <div class="col-lg-4 text-lg-center text-start">
              <img class="mb-lg-0 mb-4" src={Silver} alt="" />
            </div>
            <div class="col-lg-8">
              <div class="me-lg-4">
                <span class="text-dark text-capitalize fw-bold animate__animated animate__bounce">
                  Silver Tier:
                </span>
                <span>
                  The Beginning Of Your Journey As you make your initial
                  purchases, you enter the Silver Tier, unlocking a range of
                  benefits. Enjoy exclusive discounts on future ticket purchases,
                  ensuring that your loyalty is immediately rewarded.
                </span>z
              </div>
            </div>
          </div>
          <div class="row w-100 m-auto mt-lg-5 mt-4">
            <div class="col-lg-4 text-lg-center text-start">
              <img class="mb-lg-0 mb-4" src={Gold} alt="" />
            </div>
            <div class="col-lg-8">
              <div class="me-lg-4">
                <span class="text-dark text-capitalize fw-bold">Gold Tier :</span>
                <span>
                  Ascending To Greater Rewards With continued engagement, your
                  loyalty propels you into the Gold Tier, where the rewards become
                  even more enticing. In addition to enhanced discounts, Gold
                  members get early access to select events, securing your spot
                  before general sales commence.
                </span>
              </div>
            </div>
          </div>
          <div class="row w-100 m-auto mt-lg-5 mt-4">
            <div class="col-lg-4 text-lg-center text-start">
              <img class="mb-lg-0 mb-4" src={Platinum} alt="" />
            </div>
            <div class="col-lg-8">
              <div class="me-lg-4">
                <span class="text-dark text-capitalize fw-bold animate__animated animate__bounce">
                  Platinum Tier :
                </span>
                <span>
                  Achieving The Pinnacle Of Exclusive Benefits Achieve Platinum
                  status through your sustained support, and experience the
                  pinnacle of our Loyalty and Rewards Program. TIXME’s platinum
                  members receive the most substantial discounts, priority access
                  to special events, and exclusive perks tailored to make your
                  ticket-buying experience truly exceptional.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="count-sec">
          <div className="row">
            <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
              <div className="border-style-home-page pb-md-0 pb-2 pb-mb-4">
                <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">EVENT HOSTED</h6>
                <p className="mb-0 fs-3 text-primary-color fw-bold">6067+</p>
              </div>
            </div>
            <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
              <div className="border-style-home-page pb-md-0 pb-2 pb-mb-4">
                <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">Ticket Sold</h6>
                <p className="mb-0 fs-3 text-primary-color fw-bold">6067+</p>
              </div>
            </div>
            <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
              <div>
                <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">
                  Partners & Organizers
                </h6>
                <p className="mb-0 fs-3 text-primary-color fw-bold">6067+</p>
              </div>
            </div>
          </div>
        </div>
        <div className="partner-sec">
          <h3 className="fw-bold text-primary-color mb-0 text-center mb-0 animate__animated animate__bounce OURPARTNER-padding">
          OUR PARTNERS
          </h3>
          <div className="partnetSlider">
            <Slider {...settings}>
              <div>
                <img className="company_logo" src={google} alt="google" />
              </div>
              <div>
                <img className="company_logo" src={airBNB} alt="google" />
              </div>
              <div>
                <img className="company_logo" src={booking} alt="google" />
              </div>
              <div>
                <img className="company_logo" src={expedia} alt="google" />
              </div>
              <div>
                <img className="company_logo" src={google} alt="google" />
              </div>
              <div>
                <img className="company_logo" src={airBNB} alt="google" />
              </div>
              <div>
                <img className="company_logo" src={booking} alt="google" />
              </div>
              <div>
                <img className="company_logo" src={expedia} alt="google" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
