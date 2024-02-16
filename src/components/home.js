import React, { useEffect, useState } from "react";
import dropdown from "./assets/dropdown.svg";
import Select from 'react-select'
import calendar from "./assets/calendar.svg";
import ArrowDown from './assets/arrowdrop.svg'
import { useTransition, animated } from 'react-spring';
import locationIcon from "./assets/location (5) 1.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from './footer';
import Slider from "react-slick";
import HeaderMenu from './headermenu';
import Nouserphoto from '../common/image/nouser.png';
import Indiaflag from "../common/image/India.svg";
import Usaflag from "../common/image/usaf.svg";
import Singapureflag from "../common/image/singapur.svg";
import MobileMenu from './mobilemenu';
import Arts from '../common/category/Group 1171274918.svg';
import Business from '../common/category/Business & Networking (2).svg';
import Food from '../common/category/Group 1171274941.svg';
import Music from '../common/category/Group 1171274913.svg';
import NIGHTLIFE from '../common/category/Group 1171274914.svg';
import Sports from '../common/category/Group 1171274916.svg';
import Festival from '../common/category/Festivals & Holidays.svg';
import RAwway from '../common/right.png';
import InputSearchIcon from '../assets/inputSearch.png'
import { MdMyLocation } from "react-icons/md";
import { FaTimes } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { apiurl, onlyDayMonth, app_url, isEmail, shortPer } from "../common/Helpers";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import Noimg from "../common/image/noimg.jpg";
import toast from "react-hot-toast";
import { Country, State, City } from 'country-state-city';
// component
import HomeCountBox from '../component/HomeCountBox';
import OURPARTNERS from '../component/OURPARTNERS';
import NewsLetter from '../component/Newsletter';
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
    window.scrollTo(0, 0);
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
    setStatename('');
    setCityname('');
    setSelectedCity('');
    setSelectedState(null);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry.value, selectedState.value).map(({ name }) => ({ value: name, label: name })));
    } else {
      setCities([]);
    }
    setCityname('');
    setSelectedCity('');
  }, [selectedState, selectedCountry]);

  const handelSetHomelocation = () => {
    if (selectedCity) {
      setCityname(selectedCity.label);
    } else {
      setCityname('');
    }
    if (selectedState) {
      setStatename(selectedState.label)
    } else {
      setStatename('');
    }
    if (selectedCountry) {
      console.log("ssss", selectedCountry.label);
      setCountryname(selectedCountry.label);
    }
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
  const categorysettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1150, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const eventslistsettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 1,
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
  const viewMoreButtonClick = (country_name) => {
    let url = `${app_url}events/`;

    const queryParams = [];
    if (country_name) {
      queryParams.push(`country=${encodeURIComponent(country_name)}`);
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
  const [Statename, setStatename] = useState();
  const getMyLoc = async () => {
    setMyCountry(CurrentCountry);
    setCountryname(CurrentCountry);
    setCityname(CurrentCity);
    setStatename(CurrentState);
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
  useEffect(() => {
    fetchCountry();
  }, []);

  // useEffect(() => {
  //   const getCurrentLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         successCallback,
  //         errorCallback
  //       );
  //     } else {
  //       console.log('Geolocation is not supported by this browser.');
  //     }
  //   };

  //   // Callback function on successful geolocation
  //   const successCallback = (position) => {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     // Set the location state
  //     setLocation({ latitude, longitude });

  //     // Perform reverse geocoding to get country and city
  //     reverseGeocode(latitude, longitude);
  //   };

  //   // Callback function on geolocation error
  //   const errorCallback = (error) => {
  //     console.error('Error getting geolocation:', error);
  //   };

  //   const reverseGeocode = (latitude, longitude) => {
  //     const geocoder = new window.google.maps.Geocoder();
  //     const latlng = { lat: latitude, lng: longitude };

  //     geocoder.geocode({ location: latlng }, (results, status) => {
  //       if (status === 'OK') {
  //         if (results[0]) {
  //           // Extract address components from the results
  //           const addressComponents = results[0].address_components;

  //           // Initialize variables to store address details
  //           let country, state, city, postalCode;

  //           for (let component of addressComponents) {
  //             if (component.types.includes('country')) {
  //               country = component.long_name;
  //             }
  //             if (component.types.includes('administrative_area_level_1')) {
  //               state = component.long_name;
  //             }
  //             if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
  //               city = component.long_name;
  //             }
  //             if (component.types.includes('postal_code')) {
  //               postalCode = component.long_name;
  //             }
  //           }
  //           setCurrentCountry(country);
  //           setCurrentState(state);
  //           setCurrentCity(city);

  //           setMyCountry(country);
  //           setCountryname(country);
  //           setCityname(city);
  //           setStatename(state);

  //           if (!localStorage.getItem("countryname")) {
  //             localStorage.setItem('countryname', country);
  //           }
  //         } else {
  //           console.error('No results found for reverse geocoding.');
  //         }
  //       } else {
  //         console.error('Reverse geocoding failed due to:', status);
  //       }
  //     });
  //   };

  //   // Call the function to get current location
  //   getCurrentLocation();
  // }, []);
  const [EventlistIndia, setEventlistIndia] = useState([]);
  const [EventloaderIndia, setEventloaderIndia] = useState(false);
  const [EventlistUsa, setEventlistUsa] = useState([]);
  const [EventloaderUsa, setEventloaderUsa] = useState(false);
  const [EventlistSingapur, setEventlistSingapur] = useState([]);
  const [EventloaderSingapur, setEventloadSingapur] = useState(false);
  const [Listitems, setListitems] = useState([]);
  const [CategoryLoader, setCategoryLoader] = useState(true);
  const [filtercategory, setFilterCategory] = useState('');

  const viewEvent = async (id, name) => {
    navigate(`${app_url}event/${id}/${name}`)
  }
  const fetchIndiaEvent = async () => {
    try {
      setEventloaderIndia(true)
      fetch(apiurl + "website/india-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            setEventlistIndia(data.data);
          } else {
          }
          setEventloaderIndia(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setEventloaderIndia(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setEventloaderIndia(false)
    }
  };
  const fetchUsaEvent = async () => {
    try {
      setEventloaderUsa(true)
      fetch(apiurl + "website/usa-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            setEventlistUsa(data.data);
          } else {
          }
          setEventloaderUsa(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setEventloaderUsa(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setEventloaderUsa(false)
    }
  };
  const fetchSingapurEvent = async () => {
    try {
      setEventloadSingapur(true)
      fetch(apiurl + "website/singapur-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            setEventlistSingapur(data.data);
          } else {
          }
          setEventloadSingapur(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setEventloadSingapur(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setEventloadSingapur(false)
    }
  };
  const fetchCategory = async () => {
    try {
      setCategoryLoader(true);
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
          setCategoryLoader(false);
        })
        .catch(error => {
          console.error('Insert error:', error);
          setCategoryLoader(false);
        });
    } catch (error) {
      console.error('Api error:', error);
      setCategoryLoader(false);
    }
  }
  function getCountryFlagImage(country) {
    if (country == "India") {
      // return <img className="event-card-flag" src={Indiaflag}  />;
    } else if (country == "United states") {
      // return <img className="event-card-flag" src={Usaflag}  />;
    } else if (country == "Singapore") {
      // return <img className="event-card-flag" src={Singapureflag}  />;
    } else {
      return null; // or a default image if you have one
    }
  }
  useEffect(() => {
    // fetchEvent();
    fetchIndiaEvent();
    fetchUsaEvent();
    fetchSingapurEvent();
  }, []);
  useEffect(() => {
    fetchCategory();
  }, []);
  const CategoryImage = [
    { image: Arts },
    { image: Business },
    { image: NIGHTLIFE },
    { image: Festival },
    { image: Food },
    { image: Music },
    { image: Sports },
  ];

  function handleEnterPress(event) {
    if (event.keyCode === 13 || event.which === 13) {
      handleButtonClick();
    }
  }

  const filteredList = Listitems.filter(item => item.is_homepage === 1);
  return (
    <>
      <div className="content-area">
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
                  <p className="reset-password-link text-center pt-3">OR</p>
                </div>
              </Col>
              <div className="col-12 col-md-12">
                <div className="form-group">
                  <p>Select Country</p>
                  <Select
                    options={countries}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Select Country"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
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
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <p>Select City</p>
                  <Select
                    options={cities}
                    placeholder="Select City"
                    isDisabled={!selectedState}
                    onChange={setSelectedCity}
                  />
                </div>
              </div>
              <Col md={12}>
                <button type="button" className="btn btn-primary w-100 theme-bg" onClick={() => { handelSetHomelocation(); setNewModal(!newmodal); }}>Set Location</button>
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
          <div className='d-md-flex flex-md-1 align-items-center BeyondTickets-sec'>
            <h1 className="banner-h-home-pg text-white text-start text-uppercase mb-0 ">Beyond Tickets :</h1>
            <div className="animation-home-banner">
              {transitions((style, i) => (
                <animated.div
                  style={{
                    ...style,
                    position: 'absolute',
                    color: '#fff'
                    // textAlign: 'center'
                  }}
                >
                  {texts[i]}
                </animated.div>
              ))}
            </div>
          </div>
          <div className="banner-child bg-white">
            <h5 className="text-primary-color fw-bold space-sec pt-4 animate__animated animate__bounce">
              Find Nearby Events
            </h5>
            <div className="d-flex home-fil-mar flex-lg-row flex-column mt-3">
              <div className="selectDiv d-none" >
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
              <div className="events-page-search" id="inputForm1Div" style={{ height: '40px' }}>
                <input
                  type="search"
                  id="form1"
                  className="form-control mt-lg-0"
                  placeholder="Search"
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleEnterPress}
                  value={SearchInput}
                  style={{ height: '40px', border: 'none' }}
                />
                <button className="dfssfdsfdsf" onClick={handleButtonClick} type="button" style={{ background: '#F6F6F6' }}>
                  <img src={InputSearchIcon} alt="" />
                </button>
              </div>

            </div>
            <div className="row mx-lg-3 mx-1 mb-4 mt-4 gx-md-4 gx-2 home-car-slider">
              <div>
                {CategoryLoader ? (
                  <div className="linear-background w-100" style={{ height: '160px' }}> </div>
                ) : (
                  <>
                    <Slider {...categorysettings}>
                      {filteredList.map((item, index) => (
                        <div className="cat-home-box">
                          <div className="text-center position-relative" style={{ overflow: 'hidden' }}>
                            <div className="event-card pt-4" id="event-card" onClick={() => HandelCategorsearch(item._id)}>
                              <img className="event-img  animate__animated animate__bounce" src={CategoryImage[index].image} alt="" />
                              <small className="d-block text-card-color my-2 mt-3 home-category-slide-name"> {item.name} </small>
                            </div>
                            {/* <div className="fade-effect"></div> */}
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
        <div className="event-sec home-event-in-box">
          <div className="singapur-div pt-2">
            {EventloaderSingapur ? (
              <>
                <Row>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                  </Col>
                </Row>
              </>
            ) : (
              <div className="india-events-box">
                <h3 className="home-events-title">Singapore</h3>
                <Slider {...eventslistsettings}>
                  {EventlistSingapur.map((item, index) => (
                    <div className="home-events-box">
                      <div className="bg-white rounded-10 shadow-bottom pb-3 cursor-pointer overflow-hidden" onClick={() => viewEvent(item._id, item.name)} style={{ height: '100%', position: 'relative' }}>
                        <div style={{ position: 'relative' }}>
                          <span className="event-category-img">{item.category_name}</span>
                          <img className="event-card-img" src={item.thum_image ? item.thum_image : Noimg} alt="" />
                          <div className="d-flex align-items-center event-date-small-box">
                            <span className="event-date-small  d-flex align-items-center">
                              <img className="card-icon me-2" src={calendar} alt="" />
                              <span className="text-primary-color fw-bold me-0 mb-0 mt-md-0">
                                {onlyDayMonth(item.start_date)}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="row px-2 mt-2">
                          <div className="col-md-7 d-flex align-items-center col-7">
                            <img className="card-icon-logo me-2" src={item.organizer_logo ? item.organizer_logo : Nouserphoto} alt="" />
                            <div className="d-flex flex-column align-items-start justify-content-start">
                              <small className="mb-0" style={{ fontSize: '12px' }}>Originated by</small>
                              <p className="text-primary-color fw-bold mb-0 mt-n1 event-text-org-name">
                                {item.organizer_name}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5  col-5">
                            <div className="bg-fade rounded text-center event-cart-price-box">
                              <span className="text-primary-color fw-bold event-cart-display-price">{item.isfreeticket == 1 ? 'FREE' : item.countrysymbol + item.displayprice + '.00'}</span>
                              <p className="small fw-bold mb-0 pb-0">Onwards</p>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-start my-2 mx-2">
                              <img className="card-icon me-1" src={locationIcon} alt="" />
                              <p className="text-primary-color fw-bold mb-0 event-cart-location">
                                {item.city ? item.city + ',' : ''} {item.countryname ? item.countryname : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="desc-h ms-3 fw-bold mb-0">{shortPer(item.display_name,30)}</div>
                        {getCountryFlagImage(item.countryname)}
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn theme-bg text-white my-2" onClick={() => viewMoreButtonClick("Singapore")}>More events</button>
                </div>
              </div>
            )}
          </div>
          <div className="india-div">
            {EventloaderIndia ? (
              <>
                <Row>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                  </Col>
                </Row>
              </>
            ) : (
              <div className="india-events-box">
                <h3 className="home-events-title">India</h3>
                <Slider {...eventslistsettings}>
                  {EventlistIndia.map((item, index) => (
                    <div className="home-events-box">
                      <div className="bg-white rounded-10 shadow-bottom pb-3 cursor-pointer overflow-hidden" onClick={() => viewEvent(item._id, item.name)} style={{ height: '100%', position: 'relative' }}>
                        <div style={{ position: 'relative' }}>
                          <span className="event-category-img">{item.category_name}</span>
                          <img className="event-card-img" src={item.thum_image ? item.thum_image : Noimg} alt="" />
                          <div className="d-flex align-items-center event-date-small-box">
                            <span className="event-date-small  d-flex align-items-center">
                              <img className="card-icon me-2" src={calendar} alt="" />
                              <span className="text-primary-color fw-bold me-0 mb-0 mt-md-0">
                                {onlyDayMonth(item.start_date)}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="row px-2 mt-2">
                          <div className="col-md-7 d-flex align-items-center col-7">
                            <img className="card-icon-logo me-2" src={item.organizer_logo ? item.organizer_logo : Nouserphoto} alt="" />
                            <div className="d-flex flex-column align-items-start justify-content-start">
                              <small className="mb-0" style={{ fontSize: '12px' }}>Originated by</small>
                              <p className="text-primary-color fw-bold mb-0 mt-n1 event-text-org-name">
                                {item.organizer_name}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5  col-5">
                            <div className="bg-fade rounded text-center event-cart-price-box">
                              <span className="text-primary-color fw-bold event-cart-display-price">{item.isfreeticket == 1 ? 'FREE' : item.countrysymbol + item.displayprice + '.00'}</span>
                              <p className="small fw-bold mb-0 pb-0">Onwards</p>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-start my-2 mx-2">
                              <img className="card-icon me-1" src={locationIcon} alt="" />
                              <p className="text-primary-color fw-bold mb-0 event-cart-location">
                                {item.city ? item.city + ',' : ''} {item.countryname ? item.countryname : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="desc-h ms-3 fw-bold mb-0">{shortPer(item.display_name,30)}</div>
                        {getCountryFlagImage(item.countryname)}
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn theme-bg text-white my-2" onClick={() => viewMoreButtonClick("India")}>More events</button>
                </div>
              </div>
            )}
          </div>
          <div className="usa-div">
            {EventloaderUsa ? (
              <>
                <Row>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                  </Col>
                  <Col md={4} className="mb-5">
                    <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                  </Col>
                </Row>
              </>
            ) : (
              <div className="india-events-box">
                <h3 className="home-events-title">United States</h3>
                <Slider {...eventslistsettings}>
                  {EventlistUsa.map((item, index) => (
                    <div className="home-events-box">
                      <div className="bg-white rounded-10 shadow-bottom pb-3 cursor-pointer overflow-hidden" onClick={() => viewEvent(item._id, item.name)} style={{ height: '100%', position: 'relative' }}>
                        <div style={{ position: 'relative' }}>
                          <span className="event-category-img">{item.category_name}</span>
                          <img className="event-card-img" src={item.thum_image ? item.thum_image : Noimg} alt="" />
                          <div className="d-flex align-items-center event-date-small-box">
                            <span className="event-date-small  d-flex align-items-center">
                              <img className="card-icon me-2" src={calendar} alt="" />
                              <span className="text-primary-color fw-bold me-0 mb-0 mt-md-0">
                                {onlyDayMonth(item.start_date)}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="row px-2 mt-2">
                          <div className="col-md-7 d-flex align-items-center col-7">
                            <img className="card-icon-logo me-2" src={item.organizer_logo ? item.organizer_logo : Nouserphoto} alt="" />
                            <div className="d-flex flex-column align-items-start justify-content-start">
                              <small className="mb-0" style={{ fontSize: '12px' }}>Originated by</small>
                              <p className="text-primary-color fw-bold mb-0 mt-n1 event-text-org-name">
                                {item.organizer_name}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5  col-5">
                            <div className="bg-fade rounded text-center event-cart-price-box">
                              <span className="text-primary-color fw-bold event-cart-display-price">{item.isfreeticket == 1 ? 'FREE' : item.countrysymbol + item.displayprice + '.00'}</span>
                              <p className="small fw-bold mb-0 pb-0">Onwards</p>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-start my-2 mx-2">
                              <img className="card-icon me-1" src={locationIcon} alt="" />
                              <p className="text-primary-color fw-bold mb-0 event-cart-location">
                                {item.city ? item.city + ',' : ''} {item.countryname ? item.countryname : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="desc-h ms-3 fw-bold mb-0">{shortPer(item.display_name,30)}</div>
                        {getCountryFlagImage(item.countryname)}
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn theme-bg text-white my-2" onClick={() => viewMoreButtonClick("United states")}>More events</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <HomeCountBox />
        <OURPARTNERS/>
        <NewsLetter/>
      </div>
      <Footer />
    </>
  );
};

export default Home;