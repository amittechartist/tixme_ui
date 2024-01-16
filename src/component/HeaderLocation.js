import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Col, Row } from "react-bootstrap";
import { app_url, apiurl, organizer_url, customer_url } from "../common/Helpers";
import { MdMyLocation } from "react-icons/md";
import { FaTimes } from 'react-icons/fa';
import plus from "../assets/plus.svg";
import Select from 'react-select'
const Locationbtn = ({ prorps }) => {
    const country_name = localStorage.getItem("countryname");
    const [location, setLocation] = useState(null);
    const [newmodal, setNewModal] = useState(false);
    const [MyCountry, setMyCountry] = useState();
    const [MyCity, setMyCity] = useState();
    const [MyState, setMyState] = useState();
    const [CurrentCountry, setCurrentCountry] = useState();
    const [CurrentState, setCurrentState] = useState();
    const [CurrentCity, setCurrentCity] = useState();

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
            {prorps == 'pc' ? (
                <>
                    <div class="pc-header-location d-flex align-items-center justify-content-center" onClick={() => setNewModal(!newmodal)}>

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
                </>
            ) : (
                <>
                    <li className="nav-item d-flex align-items-center justify-content-start" onClick={() => setNewModal(!newmodal)}>
                        <a
                            className="nav-link text-primary-theme pe-1 font-nav"
                        >
                            {country_name ? country_name : 'Location'}
                            <img className="nav-plus" src={plus} alt="" />
                        </a>
                    </li>
                </>
            )}
        </>
    )
}
export default Locationbtn;