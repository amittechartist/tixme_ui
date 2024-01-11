import React, { useEffect, useState } from "react";
import Select from 'react-select'
import Logo from "./assets/Logo.svg";
import Search from "./assets/search.png";
import Account from "./assets/account.svg";
import menu from "./assets/menu.svg";
import plus from "./assets/plus.svg";
import { MdMyLocation } from "react-icons/md";
import location from "./assets/location (5) 1.svg";
import music from "./assets/music.svg";
import nightlife from "./assets/nightlife.svg";
import business from "./assets/business.svg";
import sport from "./assets/sport.svg";
import foot from "./assets/food.svg";
import art from "./assets/art.svg";
import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Col, Row } from "react-bootstrap";
import { app_url, apiurl, organizer_url, customer_url } from "../common/Helpers";
const Header = () => {

    const [location, setLocation] = useState(null);
    const [newmodal, setNewModal] = useState(false);

    const [MyCountry, setMyCountry] = useState();
    const [MyCity, setMyCity] = useState();
    const [MyState, setMyState] = useState();
    const [CurrentCountry, setCurrentCountry] = useState();
    const [CurrentState, setCurrentState] = useState();
    const [CurrentCity, setCurrentCity] = useState();

    const customer_token = localStorage.getItem("userauth");
    const customer_name = localStorage.getItem("username");

    const organizername = localStorage.getItem("organizername");
    const country_name = localStorage.getItem("countryname");
    const accountTargetUrl = customer_token
        ? customer_url + "dashboard"
        : organizername
            ? organizer_url + "dashboard"
            : app_url + "auth/customer/login";
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
    }, []); // Empty dependency array to ensure useEffect runs only once
    
    const [Totalcart, setTotalcart] = useState(0);
    const cartCheck = localStorage.getItem('cart');

    function CartListItem() {
        if (cartCheck) {
            const { items, quantities } = JSON.parse(cartCheck);
            setTotalcart(items.length)
        }
        return (
            <li className="nav-item align-self-center me-7 cursor-pointer">
                <Link to={app_url + 'cart-details'}>
                    <div className="position-relative">
                        <FaShoppingCart size={30} color="#003B8F" />
                        {Totalcart > 0 && (
                            <div className="cart-count">{Totalcart}</div>
                        )}
                    </div>
                </Link>
            </li>
        );
    }

    useEffect(() => {
        CartListItem()
    }, [cartCheck]);
    const getMyLoc = async () => {
        setMyCountry(CurrentCountry);
        setMyCity(CurrentCity);
        setMyState(CurrentState);
        setNewModal(!newmodal)
        localStorage.setItem('countryname', CurrentCountry);
        window.location.reload();
    }
    const [countryList, setcountryList] = useState([{ value: "", label: "Country" }]);
    const [Country, setCountry] = useState();
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
        setCountry(selectedValue);
        setCountryname(selectedValue.label);
        localStorage.setItem('countryname', selectedValue.label);
        setNewModal(!newmodal)
        window.location.reload();
    };
    useEffect(() => {
        fetchCountry();
    }, []);
    

    return (
        <>
            <Modal isOpen={newmodal} toggle={() => setNewModal(!newmodal)} centered>
                <ModalHeader toggle={!newmodal}>Select location
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
                            <div className="form-group">
                                <p>Select country</p>
                                <Select
                                    isClearable={false}
                                    options={CountryOption}
                                    className='react-select'
                                    classNamePrefix='select'
                                    onChange={selectCountry}
                                    value={Country}
                                />

                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setNewModal(!newmodal)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal >
            <nav class="navbar navbar-expand-lg navbar-white bg-white mx-4 rounded-8 top-10 d-lg-block d-none">
                <div class="container-fluid pe-0">
                    <Link to={app_url}><img class="home_logo nav-logo ms-lg-5 ms-2" src={Logo} alt="" /></Link>
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
                                <Link
                                    class="nav-link text-primary-theme pe-1 font-nav"
                                    to={app_url}
                                >
                                    Home  <img class="nav-plus" src={plus} alt="" />
                                </Link>
                            </li>
                            <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                                <Link class="nav-link text-primary-theme pe-1 font-nav" to={app_url + 'events'}>
                                    Events{" "}
                                    <img class="nav-plus" src={plus} alt="" />
                                </Link>
                            </li>
                            <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                                <Link
                                    class="nav-link text-primary-theme pe-1 font-nav"
                                    to={app_url + 'aboutus'}
                                >
                                    About Us
                                    <img class="nav-plus" src={plus} alt="" />
                                </Link>
                            </li>
                            <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                                <Link
                                    class="nav-link text-primary-theme pe-1 font-nav"
                                    to={app_url + 'contact'}
                                >
                                    Contact Us
                                    <img class="nav-plus" src={plus} alt="" />
                                </Link>
                            </li>
                            <li class="nav-item border rounded border-primary align-self-center me-3">
                                <Link class="nav-link text-primary-theme pt-1 pb-1p font-nav" to={app_url + 'auth/login-signup'}>
                                    List your event
                                </Link>
                            </li>
                            <CartListItem />
                            <li class="nav-item position-absolute end-0 bg-white nav-box me-0 d-flex flex-column justify-content-center align-items-center rounded-8">
                                {customer_token || organizername ? (
                                    <>
                                        {customer_token ? (
                                            <Link class="nav-link text-primary-theme pt-1 pb-1p font-nav" to={customer_url + "dashboard"}>
                                                <p className="mb-0 text-dark">Customer Account</p>
                                                <span className="font-bold">{customer_name}</span>
                                            </Link>
                                        ) : (
                                            <>
                                                {organizername ? (
                                                    <Link class="nav-link text-primary-theme pt-1 pb-1p font-nav" to={organizer_url + "dashboard"}>
                                                        <p className="mb-0 text-dark">Organizer Account</p>
                                                        <span className="font-bold"> {organizername}</span>
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <Link class="nav-link text-primary-theme pt-1 pb-1p font-nav" to={app_url + 'auth/login-signup'}>
                                        Login/Sign Up
                                    </Link>
                                )}

                                <div class="d-flex align-items-center justify-content-center" onClick={() => setNewModal(!newmodal)}>
                                    <img class="nav-loc" src={location} alt="" />
                                    <a
                                        class="nav-link text-primary-theme px-1 font-nav-small"
                                        href="#"
                                        style={{ marginTop: '-10px' }}
                                    >
                                        {country_name ? country_name : 'Location'}
                                        <img class="nav-plus" src={plus} alt="" />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
