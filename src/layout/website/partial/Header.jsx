import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Col, Row } from "react-bootstrap";
import { MdMyLocation } from "react-icons/md";
import PersonIcon from "../../../common/icon/person 1.svg";
import AppLogo from "../../../common/logo.svg";
import WhipersonBtn from "../../../component/Whiteuserbtn";
import Whitestarbtn from "../../../component/Whitestarbtn";
import Locationbtn from "../../../component/Locationbtn";
import Rectangle from "../../../common/image/Rectangle.png";
import { Link } from "react-router-dom";
import Select from 'react-select'
import Sidebar from "./Sidebar";
import { app_url, apiurl, organizer_url, customer_url } from "../../../common/Helpers";
import Mobilemenu from "../../../component/mobilemenu";
import Whitestar from "../../../common/icon/whitestart.svg";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
  const organizer_token = localStorage.getItem("organizerauth");
  const country_name = localStorage.getItem("countryname");
  const accountTargetUrl = customer_token
    ? customer_url + "dashboard"
    : organizer_token
      ? organizer_url + "dashboard"
      : app_url + "auth/customer/login";
  useEffect(() => {
    // Function to get current location
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
  };
  useEffect(() => {
    fetchCountry();
  }, []);
  return (
    <>
      <Modal isOpen={newmodal} toggle={() => setNewModal(!newmodal)} centered>
        <ModalHeader toggle={!newmodal}>Select location
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
      <header className="only-pc">
        <Container fluid className="rectangle_bg_pos">
          <Row className="">
            <Col md={12}>
              <img className="rectangle_bg" src={Rectangle} alt="" />
            </Col>
            <Col md={12} className="pt-3 pb-3 bg-white">
              <ul className="website_top_menu float-right">
                <li className="nav-item">
                  <Link to={app_url}>
                    <img className="header-logo mobile-screen" src={AppLogo} />
                  </Link>
                </li>
                <li className="nav-item header-btn-res">
                  <span onClick={() => setNewModal(!newmodal)}>
                    {country_name ? (
                      <Locationbtn title={country_name} />
                    ) : (
                      <Whitestarbtn title={"Location"} />
                    )}
                  </span>
                </li>
                <li className="nav-item header-btn-res">
                  {customer_token || organizer_token ? (
                    <>
                      {customer_token ? (
                        <Link
                          className="button-join"
                          to={customer_url + "dashboard"}
                        >
                          <WhipersonBtn title={"My Account"} />
                        </Link>
                      ) : (
                        <></>
                      )}
                      {organizer_token ? (
                        <Link
                          className="button-join"
                          to={organizer_url + "dashboard"}
                        >
                          <WhipersonBtn title={"My Account"} />
                        </Link>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <Link
                      className="button-join"
                      to={app_url + "auth/customer/login"}
                    >
                      <WhipersonBtn title={"Login"} />
                    </Link>
                  )}
                </li>
                
              </ul>
            </Col>
            <Col md={4} className="p-0">
              <div className="float-left">
                <Link to={app_url}>
                  <span>
                    <img className="header-logo big-screen" src={AppLogo} />
                  </span>
                </Link>
              </div>
            </Col>
            <Sidebar className="header-sidebar-style" />
          </Row>
        </Container>
      </header>
      <header className="only-mobile">
        <div className="header-item-overlay"></div>
        <div className="header-container">
          <div className="header-item-hamburger">
            <Mobilemenu />
          </div>
          <div className="header-items">
            <Link to={app_url}>
              <img className="mobile-screen" src={AppLogo} alt="App Logo" />
            </Link>
          </div>
          <div className="header-items">
            <div className="header-icons">
              <Link onClick={() => setNewModal(!newmodal)}>
                {/* <img height={16} width={16} src={Mapicon} />s */}
              </Link>
            </div>
            <div className="header-icons">
              <Link className="button-join" to={accountTargetUrl}>
                <img
                  height={30}
                  width={30}
                  src={PersonIcon}
                  alt="Person Icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
