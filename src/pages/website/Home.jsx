import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GoogleIcon from "../../common/icon/googleicon.svg";
import AirbnbLogo from "../../common/icon/image 7.png";
import BookingLogo from "../../common/icon/image 8.png";
import ExpediaIcon from "../../common/icon/image 9.png";
import TuiIconIcon from "../../common/icon/image 10.png";

import Arts from '../../common/category/Group 1171274918.svg';
import Business from '../../common/category/Group 1171274915.svg';
import Food from '../../common/category/Group 1171274917.svg';
import Music from '../../common/category/Group 1171274913.svg';
import NIGHTLIFE from '../../common/category/Group 1171274914.svg';
import Sports from '../../common/category/Group 1171274916.svg';

import OurPartnerIcon from "../../common/icon/Our Partner.svg";
import MusicIcon from "../../common/icon/Music.svg";
import TicketIcon from "../../common/icon/Ticket vector.svg";
import FindnearByEvents from "../../common/icon/findnear By Events.svg";
import Eventlogo from "../../common/icon/eventlogo.svg";
import Timelogo from "../../common/icon/time 1.svg";
import Hourglasslogo from "../../common/icon/hourglass.svg";
import LocationIcon from "../../common/icon/location.svg";
import Eventimg from "../../common/event.jpg";
import DateIcon from "../../common/icon/date 2.svg";
import EllipseIcon from "../../common/icon/Ellipse 5.svg";
import Bounce from "react-reveal/Bounce";
import Flip from "react-reveal/Flip";
import Slider from "react-slick";
import CountUp from "react-countup";
import Fade from "react-reveal/Fade";
import Zoom from 'react-reveal/Zoom';
import { Link, useNavigate } from "react-router-dom";
import { apiurl, onlyDayMonth, shortPer, app_url } from "../../common/Helpers";
import { useTransition, animated } from 'react-spring';
import Alert from 'react-bootstrap/Alert';
const Home = ({ title }) => {
  const [Eventlist, setEventlist] = useState([]);
  const [Eventloader, setEventloader] = useState(false);
  const [Listitems, setListitems] = useState([]);
  const [filtercategory, setFilterCategory] = useState('');
  const countryName = localStorage.getItem("countryname");
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 1,
    arrows: false,
    speed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          speed: 1000,
          cssEase: "linear",
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  const viewEvent = async (id, name) => {
    navigate(`${app_url}event/${id}/${name}`)
  }
  const fetchEvent = async () => {
    try {
      setEventloader(true)
      const requestData = {
        limit: 10,
        organizerid: null,
        country: countryName ? countryName : null,
        category: filtercategory ? filtercategory : null
      }
      fetch(apiurl + "website/all-events-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            setEventlist(data.data);
          } else {
          }
          setEventloader(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setEventloader(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setEventloader(false)
    }
  };
  const fetchCategory = async () => {
    try {
      fetch(apiurl + 'category/get-category-list', {
        method: 'POST',
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
        })
        .catch(error => {
          console.error('Insert error:', error);
        });
    } catch (error) {
      console.error('Api error:', error);
    }
  }
  useEffect(() => {
    fetchEvent();
    fetchCategory();
  }, [filtercategory, countryName]);
  const texts = [
    "Unlock Your Entertainment Gateway",
    "Where Thrills Commence",
    "Your Passport to Eventful Experiences",
    "Unleashing Live Entertainment",
    "Crafting Memorable Experiences",
    "Inspiring Escapes to Entertainment",
    "Igniting Entertainment Escapes",
    "Elevating Your Event Journeys"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(current => (current + 1) % texts.length);
    }, 3000); // Change text every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const transitions = useTransition(index, {
    from: { transform: 'translateY(100%)', opacity: 0 },
    enter: { transform: 'translateY(0)', opacity: 1 },
    leave: { transform: 'translateY(-100%)', opacity: 0 },
    config: { tension: 220, friction: 120 }
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);

  const showCurrentLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          const url = `https://www.google.com/maps/@?api=1&map_action=map=${latitude},${longitude}`;
          window.open(url, "_blank");
        },
        () => {
          alert(
            "Could not get your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    setShowLocation(true);
  };
  const CategoryImage = [
    { image: NIGHTLIFE },
    { image: Arts },
    { image: Food },
    { image: Sports },
    { image: Business },
    { image: Music },
    { image: NIGHTLIFE },
  ];
  const firstSixCategories = Listitems.slice(0, 6);
  const filteredList = Listitems.filter(item => item.is_homepage === 1);
  return (
    <>
      <Container fluid className="body-container">
        <div className="home_banner">
          <Row>
            <Col>
              {/* <p className="banner_shop_desc">
                <span className="bullet-point"></span>
                <Flip top>
                  Safe, secure, reliable ticketing. Your ticket to live
                  entertainment !
                </Flip>
              </p> */}
              <p className="banner_text">
                <Flip top cascade>
                  <div>
                    Beyond Tickets:
                  </div>
                </Flip>
                <div className="flip-text-animation">
                  {transitions((style, i) => (
                    <animated.div
                      style={{
                        ...style,
                        position: 'absolute',
                        width: '100%',
                        color: '#0047ab'
                        // textAlign: 'center'
                      }}
                    >
                      {texts[i]}
                    </animated.div>
                  ))}
                </div>
                {/*<Bounce right cascade>*/}
                {/*  <span className="text-blue ml-3">Unforgettable</span>*/}
                {/*</Bounce>*/}
                {/*<br />*/}
                {/*<Flip top cascade>*/}
                {/*  Experiences : Your Ticket to*/}
                {/*  <br />*/}
                {/*  Exceptional Events !*/}
                {/*</Flip>*/}
              </p>
            </Col>
          </Row>
        </div>
        <div className="mb-5">
          <div>
            <div className="find-nearby-section">
              <Row>
                <Col md={12}>
                  <h3 className="find-near-box">Find Nearby Events</h3>
                </Col>
                <Col md={12} className="Find-Near-form">
                  <div>
                    <select name="" id="" className="theme-dropdown dropdown-custome category-select" onChange={(event) => setFilterCategory(event.target.value)}>
                      {Listitems.map((item, index) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                    </select>
                    <select
                      name=""
                      id=""
                      className="theme-dropdown dropdown-customer location-select"
                    >
                      <option value="location">Location</option>
                      <option
                        value="my current location"
                        onClick={showCurrentLocation}>My Current Location
                      </option>
                    </select>
                  </div>
                  <input
                    type="text"
                    className="theme-input"
                    placeholder="Search anything"
                  />
                </Col>
                {showLocation && (
                  <div >
                    <LoadScript googleMapsApiKey="AIzaSyDhWeUv_PRpblvaIoascl69mpTFEE7F2kc">
                      <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        center={currentLocation}
                        zoom={15}
                      >
                        {currentLocation && (
                          <Marker position={currentLocation} />
                        )}
                      </GoogleMap>
                    </LoadScript>
                  </div>
                )}
                <Col md={12} className="category-box-responsive">
                  <div className="category-section text-center">
                    <Slider {...settings}>
                      {filteredList.map((item, index) => (
                        <div key={index} className="mx-2">
                          <div className="category-items-box">
                            <div className="cat-image-box" onClick={() => setFilterCategory(item._id)}>
                              {/* Dynamically set the image source based on CategoryImage */}
                              <img
                                className="ticket-category-bg"
                                src={CategoryImage[index].image}
                                alt=""
                              />
                            </div>
                            <p className="category-title">{item.name}</p>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="event-category-section">
          <div className="event-list-bg">
            <span className="event-title-home">
              <img src={EllipseIcon} alt="" /> Events
            </span>
            <Row className="event-box-mobile event-box-mobile-home">
              {Eventloader ? (
                <>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                  </Col>
                </>
              ) : (
                <>
                  {Eventlist.length > 0 ? (
                    <>
                      {Eventlist.map((item, index) => (
                        <Col md={4} className="mb-5 cursor-pointer" title="View" onClick={() => viewEvent(item._id, item.name)}>
                          <Fade bottom>
                            <div className="event-box-style">
                              <div className="event-image-part">
                                <img className="event-image" src={Eventimg} alt="" />
                                <span className="event-category-img">{item.category_name}</span>
                                <span className="on-img-date">
                                  <img src={DateIcon} alt="" />
                                  <span className="on-img-date-val">{onlyDayMonth(item.start_date)}</span>
                                </span>
                              </div>
                              <div className="organizer-name-sec d-flex align-items-center px-2 py-2">
                                <div className="d-inline-block mr-3">
                                  <img
                                    height={50}
                                    width={50}
                                    src={Eventlogo}
                                    alt=""
                                    className="organiger-logo"
                                  />
                                </div>
                                <div className="d-inline-block">
                                  <span className="organizer-by d-block">Organised by</span>
                                  <span className="organizer-name d-block">{item.organizer_name}</span>
                                </div>
                              </div>
                              <div className="organizer-name-sec px-2 py-2">
                                <div className="d-inline-flex align-items-center border-right event-time-area">
                                  <div className="d-inline-block mr-1">
                                    <img height={30} width={30} src={Timelogo} alt="" />
                                  </div>
                                  <div className="d-inline-block">
                                    <span className="event-duration d-block">
                                      Event Time
                                    </span>
                                    <span className="event-time d-block">{item.start_time}</span>
                                  </div>
                                </div>
                                <div className="d-inline-flex align-items-center">
                                  <div className="d-inline-block mr-1">
                                    <img
                                      height={30}
                                      width={30}
                                      src={Hourglasslogo}
                                      alt=""
                                    />
                                  </div>
                                  <div className="d-inline-block">
                                    <span className="event-duration d-block">
                                      Event Duration
                                    </span>
                                    <span className="event-time d-block">{item.event_duration}</span>
                                  </div>
                                </div>
                                <div className="event-name">
                                  <span>{item.display_name}</span>
                                  <p>
                                    {shortPer(item.event_desc, 100)}
                                  </p>
                                </div>
                              </div>
                              <div className="ticket-price-area mt-3">
                                <Row>
                                  <Col md={7} xs={7} className="border-top-doted">
                                    <div className="d-flex align-items-center text-center location-name">
                                      <img
                                        height={30}
                                        width={30}
                                        src={LocationIcon}
                                        alt=""
                                      />{" "}
                                      <span>{item.location}</span>
                                    </div>
                                  </Col>
                                  <Col md={5} xs={5}>
                                    <div className="price-section text-center">
                                      <p>Ticket Price</p>
                                      <span className="price">${item.displayprice}</span>
                                      <span className="cut-price">${item.displaycutprice}</span>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </Fade>
                        </Col>
                      ))}
                    </>
                  ) : (
                    <>
                      <Col md={12}>
                        <Alert variant="danger">
                          No records available for the specified category
                        </Alert>
                      </Col>
                    </>
                  )}

                </>
              )}
            </Row>
          </div>
        </div>
        <div className="events-count-section mt-5 mb-5">
          <div className="text-center">
            <ul className="events-count-list">
              {/* <li className="d-inline-block">
                <Fade bottom cascade>
                  <div className="count-box">
                    <h3 className="count-box-title">Events</h3>
                    <h3 className="count-box-count">
                      <span>
                        <CountUp separator="" start={4000} end={9001} />+
                      </span>
                    </h3>
                  </div>
                </Fade>
              </li> */}
              <li className="d-inline-block">
                <Fade bottom cascade>
                  <div className="count-box">
                    <h3 className="count-box-title">Events Hosted</h3>
                    <h3 className="count-box-count">
                      <span>
                        <CountUp separator="" start={4000} end={6067} />+
                      </span>
                    </h3>
                  </div>
                </Fade>
              </li>
              <li className="d-inline-block">
                <Fade bottom cascade>
                  <div className="count-box">
                    <h3 className="count-box-title">Tickets Sold</h3>
                    <h3 className="count-box-count">
                      <span>
                        <CountUp separator="" start={4000} end={8544} />+
                      </span>
                    </h3>
                  </div>
                </Fade>
              </li>
              <li className="d-inline-block">
                <Fade bottom cascade>
                  <div className="count-box">
                    <h3 className="count-box-title">Partners & Organizers</h3>
                    <h3 className="count-box-count">
                      <span>
                        <CountUp separator="" start={4000} end={9800} />+
                      </span>
                    </h3>
                  </div>
                </Fade>
              </li>
              <li className="d-inline-block">
                <Fade bottom cascade>
                  <div className="count-box">
                    <h3 className="count-box-title">Operating Countries</h3>
                    <h3 className="count-box-count">
                      <span>
                        <CountUp separator="" start={4000} end={9088} />+
                      </span>
                    </h3>
                  </div>
                </Fade>
              </li>
            </ul>
          </div>
        </div>
        <div className="our_partner mt-5 mb-5">
          <Row>
            <Col md={12} className="OurPartnerIcon-title-box">
              <img
                className="OurPartnerIcon-title"
                src={OurPartnerIcon}
                alt=""
              />
            </Col>
            <Col md={12} className="partner-slider-margin">
              <div className="partner-slider text-center">
                <ul>
                  <li className="d-inline-block mx-3">
                    <Zoom><img src={GoogleIcon} alt="" /></Zoom>
                  </li>
                  <li className="d-inline-block mx-3">
                    <Zoom><img src={AirbnbLogo} alt="" /></Zoom>
                  </li>
                  <li className="d-inline-block mx-3">
                    <Zoom><img src={BookingLogo} alt="" /></Zoom>
                  </li>
                  <li className="d-inline-block mx-3">
                    <Zoom><img src={ExpediaIcon} alt="" /></Zoom>
                  </li>
                  <li className="d-inline-block mx-3">
                    <Zoom><img src={TuiIconIcon} alt="" /></Zoom>
                  </li>
                </ul>
              </div>
            </Col>

          </Row>

        </div>
      </Container>
    </>
  );
};
export default Home;