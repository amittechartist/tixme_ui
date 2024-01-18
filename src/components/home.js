import React, { useEffect, useState } from "react";
import dropdown from "./assets/dropdown.svg";
import card from "./assets/card.png";
import Select from 'react-select'
import calendar from "./assets/calendar.svg";
import eventLogo from "./assets/eventLogo.svg";
import clock from "./assets/clock.svg";
import hourglass from "./assets/hourglass.svg";
import google from "./assets/google.svg";
import airBNB from "./assets/airBNB.svg";
import booking from "./assets/booking.com.svg";
import expedia from "./assets/expedia.svg";
import ArrowDown from './assets/arrowdrop.svg'
import arrow from "./assets/arrow.svg";
import { useTransition, animated } from 'react-spring';
import locationIcon from "./assets/location (5) 1.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from './footer';
import Slider from "react-slick";
import HeaderMenu from './headermenu';
import Nouserphoto from '../common/image/nouser.png';
import MobileMenu from './mobilemenu';
import Alert from 'react-bootstrap/Alert';
import Arts from '../common/category/Group 1171274918.svg';
import Business from '../common/category/Busimess11.svg';
import Food from '../common/category/Group 1171274941.svg';
import Music from '../common/category/Group 1171274913.svg';
import NIGHTLIFE from '../common/category/Group 1171274914.svg';
import Sports from '../common/category/Group 1171274916.svg';
import InputSearchIcon from '../assets/inputSearch.png'
import { MdMyLocation } from "react-icons/md";
import { FaTimes } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { apiurl, onlyDayMonth, shortPer, app_url, isEmail } from "../common/Helpers";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import Noimg from "../common/image/noimg.jpg";
import toast from "react-hot-toast";
import { Country, State, City } from 'country-state-city';
const Home = () => {

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

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    setCountries(Country.getAllCountries().map(({ isoCode, name }) => ({ value: isoCode, label: name })));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.value).map(({ isoCode, name }) => ({ value: isoCode, label: name })));
    } else {
      setStates([]);
    }
    setSelectedState(null);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry.value, selectedState.value).map(({ name }) => ({ value: name, label: name })));
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry]);

  const [UpdatesLoader, setUpdatesLoader] = useState(false);
  const [Updatesprivacy, setUpdatesprivacy] = useState(false);
  const [UpdatesName, setUpdatesName] = useState();
  const [UpdatesEmail, setUpdatesEmail] = useState();
  const HandelUpdatesForm = async () => {
    try {
      if (!UpdatesName) {
        return toast.error('Enter your name');
      }
      if (!UpdatesEmail || !isEmail(UpdatesEmail)) {
        return toast.error('Enter valid email id');
      }
      if (!Updatesprivacy) {
        return toast.error('Please agree to the privacy statement.');
      }
      setUpdatesLoader(true);
      const requestData = {
        name: UpdatesName,
        email: UpdatesEmail,
      }
      fetch(apiurl + "website/subscribe-insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            toast.success(data.message);
            setUpdatesprivacy(false);
            setUpdatesName('');
            setUpdatesEmail('');
          } else {
            toast.error(data.message);
          }
          setUpdatesLoader(false);
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setUpdatesLoader(false);
        });
    } catch (error) {
      console.error("Login api error:", error);
      setUpdatesLoader(false);
    }
  };


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
  const navigate = useNavigate();

  const [SearchInput, setSearchInput] = useState();

  const HandelCategorsearch = (value) => {
    let url = `${app_url}events/?categoryId=${encodeURIComponent(value)}`;
    navigate(url);
  };
  const handleButtonClick = () => {
    let url = `${app_url}events/`;

    const queryParams = [];
    if (SearchInput) {
      queryParams.push(`query=${encodeURIComponent(SearchInput)}`);
    }
    if (filtercategory) {
      queryParams.push(`categoryId=${encodeURIComponent(filtercategory)}`);
    }

    if (queryParams.length) {
      url += `?${queryParams.join('&')}`;
    }

    navigate(url);
  };


  const [location, setLocation] = useState(null);
  const [newmodal, setNewModal] = useState(false);
  const [MyCountry, setMyCountry] = useState();
  const [CurrentCountry, setCurrentCountry] = useState();
  const [CurrentState, setCurrentState] = useState();
  const [CurrentCity, setCurrentCity] = useState();
  const [Cityname, setCityname] = useState();
  const getMyLoc = async () => {
    setMyCountry(CurrentCountry);
    setCountryname(CurrentCountry);
    setCityname(CurrentCity);
    setNewModal(!newmodal);
  }
  const [countryList, setcountryList] = useState([{ value: "", label: "Country" }]);
  // const [Country, setCountry] = useState();
  const [Countryname, setCountryname] = useState();
  const fetchCountry = async () => {
    try {
      fetch(apiurl + 'admin/country-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to JSON
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == true) {
            const countryData = data.data;
            const CountryOption = countryData.map(category => ({
              value: category.name,
              label: category.name
            }));
            setcountryList(CountryOption);
          }
        })
        .catch(error => {
          console.error('Insert error:', error);
        });
    } catch (error) {
      console.error('Api error:', error);
    }
  }
  const CountryOption = [
    {
      options: countryList
    }
  ]
  const selectCountry = (selectedValue) => {
    // setCountry(selectedValue);
    setCountryname(selectedValue.label);
    setCityname('');
    setNewModal(!newmodal);
  };
  useEffect(() => {
    fetchCountry();
  }, []);
  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    // Callback function on successful geolocation
    const successCallback = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Set the location state
      setLocation({ latitude, longitude });

      // Perform reverse geocoding to get country and city
      reverseGeocode(latitude, longitude);
    };

    // Callback function on geolocation error
    const errorCallback = (error) => {
      console.error('Error getting geolocation:', error);
    };

    const reverseGeocode = (latitude, longitude) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: latitude, lng: longitude };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            // Extract address components from the results
            const addressComponents = results[0].address_components;

            // Initialize variables to store address details
            let country, state, city, postalCode;

            for (let component of addressComponents) {
              if (component.types.includes('country')) {
                country = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
              }
              if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
                city = component.long_name;
              }
              if (component.types.includes('postal_code')) {
                postalCode = component.long_name;
              }
            }
            setCurrentCountry(country);
            setCurrentState(state);
            setCurrentCity(city);
            if (!localStorage.getItem("countryname")) {
              localStorage.setItem('countryname', country);
            }
          } else {
            console.error('No results found for reverse geocoding.');
          }
        } else {
          console.error('Reverse geocoding failed due to:', status);
        }
      });
    };

    // Call the function to get current location
    getCurrentLocation();
  }, []);

  const [Eventlist, setEventlist] = useState([]);
  const [Eventloader, setEventloader] = useState(false);
  const [Listitems, setListitems] = useState([]);
  const [filtercategory, setFilterCategory] = useState('');

  const viewEvent = async (id, name) => {
    navigate(`${app_url}event/${id}/${name}`)
  }
  const fetchEvent = async () => {
    try {
      setEventloader(true)
      const requestData = {
        limit: 10,
        organizerid: null,
        country: Countryname ? Countryname : null,
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
          if (data.success === true) {
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
          if (data.success === true) {
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
  }, [filtercategory, Countryname]);
  useEffect(() => {
    fetchCategory();
  }, []);


  const CategoryImage = [
    { image: NIGHTLIFE },
    { image: Arts },
    { image: Food },
    { image: Sports },
    { image: Business },
    { image: Music },
    { image: NIGHTLIFE },
  ];
  const filteredList = Listitems.filter(item => item.is_homepage === 1);

  return (
    <>
      {" "}
      <Modal isOpen={newmodal} toggle={() => setNewModal(!newmodal)} centered>
        <ModalHeader toggle={!newmodal}>Events In
          <button className="close p-0" onClick={() => setNewModal(!newmodal)} style={{ position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'transparent' }}>
            <FaTimes />
          </button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12} className="text-center">
              <p className="cursor-pointer my-location-btn" onClick={() => getMyLoc()}>
                <MdMyLocation /> My Current Location
              </p>
            </Col>
            <Col md={12}>
              <div className="border-bottom py-2"></div>
              <div className="text-center">
                <p className="reset-password-link text-center pt-3">Or</p>
              </div>
            </Col>
            <Col md={12}>
              {/* <div className="form-group">
                <p>Select country</p>
                <Select
                  isClearable={false}
                  options={CountryOption}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={selectCountry}
                  value={Country}
                />

              </div> */}
              <div className="form-group">
                <p>Select Country</p>
                <Select
                  options={countries}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  placeholder="Select Country"
                />
              </div>
              <div className="form-group">
                <p>Select State</p>
                <Select
                  options={states}
                  value={selectedState}
                  onChange={setSelectedState}
                  placeholder="Select State"
                  isDisabled={!selectedCountry}
                />
              </div>
              <div className="form-group">
                <p>Select City</p>
                <Select
                  options={cities}
                  placeholder="Select City"
                  isDisabled={!selectedState}
                  onChange={setSelectedCity}
                />
              </div>
            </Col>
            <Col md={12}>
              <button type="button" className="btn btn-primary w-100" onClick={() => { setCountryname(selectedCountry.label); setNewModal(!newmodal); setCityname(''); }}>Set Location</button>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setNewModal(!newmodal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <HeaderMenu />
      <div className="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
        <MobileMenu />
        <h1 className="banner-h text-white text-start text-uppercase">Beyond Tickets :</h1>
        <div className="animation-home-banner">
          {transitions((style, i) => (
            <animated.div
              style={{
                ...style,
                position: 'absolute',
                width: '100%',
                color: '#fff'
                // textAlign: 'center'
              }}
            >
              {texts[i]}
            </animated.div>
          ))}
        </div>
        <div className="banner-child bg-white">
          <h5 className="text-primary-color fw-bold space-sec pt-4 animate__animated animate__bounce">
            Find Near By Events
          </h5>
          <div className="d-flex space-sec2 flex-lg-row flex-column mt-lg-0 mt-3">
            <div className="selectDiv" >
              <select
                className="form-select category me-4"
                aria-label="Default select example"
                onChange={(event) => setFilterCategory(event.target.value)}
                style={{ paddingTop: '8px', height: '40px' }}
              >
                <option value=''>Any</option>
                {Listitems.map((item, index) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </select>
              <img src={ArrowDown} alt="" />
            </div>
            <div id="inputForm1Div" style={{ height: '40px' }}>
              <input
                type="search"
                id="form1"
                className="form-control border-b5 mt-lg-0"
                placeholder="Search anything"
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ height: '40px' }}
                value={SearchInput}
              />
              <button className="dfssfdsfdsf" onClick={handleButtonClick} type="button" style={{background: '#f0f0f0'}}>
                <img src={InputSearchIcon} alt="" />
              </button>
            </div>
          </div>
          <div className="row mx-lg-3 mx-1 mb-4 mt-4 gx-md-4 gx-2">
            <div>
              <Swiper
                slidesPerView={2}
                spaceBetween={30}
                breakpoints={{
                  992: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                }}
                className="mySwiper"
              >
                {filteredList.map((item, index) => (
                  <SwiperSlide>
                    <div className="text-center position-relative">
                      <div className="event-card pt-4" id="event-card" onClick={() => HandelCategorsearch(item._id)}>
                        <img className="event-img  animate__animated animate__bounce" src={CategoryImage[index].image} alt="" />
                        <small className="d-block text-card-color my-2 mt-3" style={{ fontSize: '12px' }}> {item.name} </small>
                      </div>
                      <div className="fade-effect"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

        </div>
      </div>
      <div className="event-sec mx-4">
        <div className="d-flex align-items-start justify-content-start">
          <h5 className="event-h fw-bold mx-head pt-4 me-4">Events In</h5>
          <div className="d-flex align-items-center justify-content-start ms-2 border-bttom-dotted" style={{ cursor: 'pointer' }} onClick={() => setNewModal(!newmodal)}>
            <img className="nav-plus pt-1 mt-2 me-2" src={dropdown} alt="" />
            <h5 className="text-primary-color fw-bold pt-4 me-4 mb-1">{Cityname ? Cityname : (Countryname ? Countryname : 'Location')}</h5>
          </div>
        </div>
        <div className="row px-0 mt-lg-5 mt-2 gx-lg-5 gy-4 mx-cards my-margen">
          {Eventloader ? (
            <>
              <div className="mb-5 col-md-4">
                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
              </div>
              <div className="mb-5 col-md-4">
                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
              </div>
              <div className="mb-5 col-md-4">
                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
              </div>
            </>
          ) : (
            <>
              {Eventlist.length > 0 ? (
                <>
                  {Eventlist.map((item, index) => (
                    <div className="col-xl-3 col-md-3 col-12 cursor-pointer" onClick={() => viewEvent(item._id, item.name)}>
                      <div className="bg-white rounded-10 shadow-bottom pb-3" style={{ height: '100%' }}>
                        <div style={{ position: 'relative' }}>
                          <span className="event-category-img">{item.category_name}</span>
                          <img className="event-card-img" src={item.thum_image ? item.thum_image : Noimg} alt="" />
                          <div className="d-flex align-items-center event-date-small-box">
                            <span className="event-date-small">
                              <img className="card-icon me-2" src={calendar} alt="" />
                              <span className="text-primary-color fw-bold me-0 mb-0 mt-md-0">
                                {onlyDayMonth(item.start_date)}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="row px-2 mt-2">
                          <div className="col-md-7 d-flex align-items-center">
                            <img className="card-icon-logo me-2" src={item.organizer_logo ? item.organizer_logo : Nouserphoto} alt="" />
                            <div className="d-flex flex-column align-items-start justify-content-start">
                              <small className="mb-0" style={{ fontSize: '12px' }}>Originated by</small>
                              <p className="text-primary-color fw-bold mb-0 mt-n1 event-text-org-name">
                                By {item.organizer_name}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="bg-fade rounded pl-5 event-cart-price-box">
                              <p className="small fw-bold mb-0 pb-0">Onwards</p>
                              {/* <span className="line-through text-primary-color fw-bold mr-2">{item.countrysymbol} {item.displaycutprice}</span> */}
                              <span className="text-primary-color fw-bold event-cart-display-price">{item.countrysymbol} {item.displayprice}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-start my-2">
                              <img className="card-icon me-1" src={locationIcon} alt="" />
                              <p className="text-primary-color fw-bold mb-0 event-cart-location ml-2">
                                {item.location}
                              </p>
                            </div>
                          </div>

                        </div>
                        {/* <div className="d-flex justify-content-start align-items-start">
                          <div
                            className="d-flex align-items-center justify-content-start w-origin ms-3 pb-2 border-end pe-3"
                            style={{ flexShrink: 0, width: "auto" }}
                          >
                            <img className="card-icon2 me-2" src={clock} alt="" />
                            <div>
                              <p className="small text-primary-color fw-bold mb-0 pb-0">
                                Event Time
                              </p>
                              <p className="small mb-0">{item.start_time}</p>
                            </div>
                          </div>
                          <div
                            className="d-flex align-items-center justify-content-start w-origin ms-3 pb-2"
                            style={{ flexShrink: 0, width: "auto" }}
                          >
                            <img className="card-icon2 me-2" src={hourglass} alt="" />
                            <div>
                              <p className="small text-primary-color fw-bold mb-0 pb-0">
                                Event Duration
                              </p>
                              <p className="small mb-0">{item.event_duration}</p>
                            </div>
                          </div>
                        </div> */}
                        <div className="desc-h ms-3 fw-bold mb-0">{item.display_name}</div>
                        {/* <p className="desc mx-3 pb-3">
                          {shortPer(item.event_desc, 100)}
                        </p> */}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="col-md=12 text-center text-danger">
                  <h3>No events found !</h3>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="count-sec">
        <div className="row">
          <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
            <div className="border-style-home-page pb-md-0 pb-4">
              <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">EVENT HOSTED</h6>
              <p className="mb-0 fs-3 text-primary-color fw-bold">6067+</p>
            </div>
          </div>
          <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
            <div className="border-style-home-page pb-md-0 pb-4">
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
        <h3 className="fw-bold text-primary-color mb-0 text-center mb-0 animate__animated animate__bounce" style={{padding: '0px 14px 0px 0px'}}>
          OUR PARTNER
        </h3>
        <div className="partnetSlider">
          <Slider {...settings}>
            <div>
              <img src={google} alt="google" />
            </div>
            <div>
              <img src={airBNB} alt="google" />
            </div>
            <div>
              <img src={booking} alt="google" />
            </div>
            <div>
              <img src={expedia} alt="google" />
            </div>
            <div>
              <img src={google} alt="google" />
            </div>
            <div>
              <img src={airBNB} alt="google" />
            </div>
            <div>
              <img src={booking} alt="google" />
            </div>
            <div>
              <img src={expedia} alt="google" />
            </div>
          </Slider>
        </div>
      </div>
      <div className="newsletter-sec pb-4 position-relative">
        <div className="position-absolute md-absolute news-form">
          <h5 className="fw-bold text-primary-color mb-0 pt-2 animate__animated animate__bounce">
            Want to receive events & news and updates?
          </h5>
          <div className="d-flex mt-4 flex-md-row flex-column">
            <input
              className="w-auto form-control rounded me-md-3 me-5 mb-md-0 mb-3"
              type="text"
              name=""
              id=""
              onChange={(e) => setUpdatesName(e.target.value)}
              value={UpdatesName}
              placeholder="Name"
            />
            <input
              className="w-auto form-control rounded me-md-0 me-5"
              type="text"
              name=""
              id=""
              onChange={(e) => setUpdatesEmail(e.target.value)}
              value={UpdatesEmail}
              placeholder="Email ID"
            />
          </div>
          <div className="form-check mt-3 mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={Updatesprivacy}
              onChange={(e) => setUpdatesprivacy(e.target.checked)}
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              I agree with the{" "}
              <span className="text-primary-color">privacy statement</span>
            </label>
          </div>
          {UpdatesLoader ? (
            <button className="GetLatestUpdateButton">
              <div className="left">
                <small className="ms-2">Please wait...</small>
              </div>
              <div className="right">
                <img style={{ width: "18px" }} src={arrow} alt="" />
              </div>
            </button>
          ) : (
            <button className="GetLatestUpdateButton" onClick={() => HandelUpdatesForm()}>
              <div className="left">
                <small className="ms-2">Get the latest updates</small>
              </div>
              <div className="right">
                <img style={{ width: "18px" }} src={arrow} alt="" />
              </div>
            </button>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;