import React, { useState, useEffect } from "react";

import google from "../assets/google.svg";
import airBNB from "../assets/airBNB.svg";
import booking from "../assets/booking.com.svg";
import expedia from "../assets/expedia.svg";
import RAwway from '../common/right.png';
import a from "../assets/our/a.png";
import b from "../assets/our/b.png";
import c from "../assets/our/c.png";
import d from "../assets/our/d.png";
import e from '../assets/our/e.png';
import f from '../assets/our/f.png';
import Slider from "react-slick";
import { apiurl, laravel_asset } from "../common/Helpers";
const Component = () => {
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'website/partnerslist', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                    } else {

                    }
                    setLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false)
        }
    }
    useEffect(() => {
        fetchList();
    }, []);

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
            {Loader ? (
                <div className="linear-background w-100" style={{ height: '100px' }}> </div>
            ) : (
                <div className="partnetSlider">
                    <Slider {...settings}>
                        {Listitems && Listitems.map((item) => (
                            <div className="d-flex justify-content-center">
                                <img className="company_logo" src={laravel_asset + item.img_url} alt="google" />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    )
}
export default Component;