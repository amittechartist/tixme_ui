import React, { useState, useEffect } from "react";
import google from "../assets/google.svg";
import airBNB from "../assets/airBNB.svg";
import booking from "../assets/booking.com.svg";
import expedia from "../assets/expedia.svg";
import RAwway from '../common/right.png';
import Slider from "react-slick";
const Component = () => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <img className="right-aww-sl" src={RAwway} onClick={onClick} alt="" />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <img className="left-aww-sl" src={RAwway} onClick={onClick} alt="" />
        );
    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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
        <div className="partner-sec">
            <h3 className="fw-bold text-primary-color mb-0 text-center mb-0 animate__animated animate__bounce OURPARTNER-padding">
                OUR PARTNERS
            </h3>
            <div className="partnetSlider">
                <Slider {...settings}>
                    <div className="d-flex justify-content-center">
                        <img className="company_logo" src={google} alt="google" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <img className="company_logo" src={airBNB} alt="google" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <img className="company_logo" src={booking} alt="google" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <img className="company_logo" src={expedia} alt="google" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <img className="company_logo" src={google} alt="google" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <img className="company_logo" src={airBNB} alt="google" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <img className="company_logo" src={booking} alt="google" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <img className="company_logo" src={expedia} alt="google" />
                    </div>
                </Slider>
            </div>
        </div>
    )
}
export default Component;