import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from 'react-router-dom';
import NoRecord from '../../component/Norecordui'
import card from "../../assets/card.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Select from 'react-select'
import calendar from "../../assets/calendar.svg";
import eventLogo from "../../assets/eventLogo.svg";
import clock from "../../assets/clock.svg";
import hourglass from "../../assets/hourglass.svg";
import location from "../../assets/location (5) 1.svg";
import InputSearchIcon from '../../assets/inputSearch.png'
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import MobileMenu from '../../components/mobilemenu';
import Alert from 'react-bootstrap/Alert';
import { Range, getTrackBackground } from "react-range";
import Whitestartbtn from "../../component/Whitestarbtn";
import DateIcon from "../../common/icon/date 2.svg";
import Nouserphoto from '../../common/image/nouser.png';
import Accordion from 'react-bootstrap/Accordion';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { apiurl, onlyDayMonth, shortPer, app_url, get_date_time } from "../../common/Helpers";
import { Link, useNavigate } from "react-router-dom";
import Noimg from "../../common/image/noimg.jpg";
const Home = () => {
  const { id, name } = useParams();
  const [profiledata, setProfiledata] = useState();
  const [Loader, setLoader] = useState(true);
  const [eventlist, seteventlist] = useState([]);
  const navigate = useNavigate();
  const viewEvent = async (id, name) => {
    navigate(`${app_url}event/${id}/${name}`)
  }

  const getdata = async () => {
    try {
      const requestData = {
        id: id,
      };
      fetch(apiurl + 'website/organizer-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == true) {
            setProfiledata(data.data);
            seteventlist(data.events);
          } else {
          }
          setLoader(false);
        })
        .catch(error => {
          setLoader(false);
          console.error('Insert error:', error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getdata();
  }, [])
  return (
    <>
      {" "}
      <HeaderMenu />
      <div className="mx-lg-4 my-lg-3 banner-organizer-page bg-primary-color rounded-8 position-relative">
        <MobileMenu />
        <h1 className="banner-h text-white text-start text-uppercase">Organizers profile</h1>
      </div>
      <Row className="mx-4" style={{ marginTop: '50px' }}>
        <div className="row p-3">
          <div className="col-md-12">
            {Loader ? (
              <>
                <Row>
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
                </Row>
              </>
            ) : (
              <>
                {eventlist.length > 0 ? (
                  <Row className="event-box-mobile">
                    {eventlist.map((item, index) => (
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
                                <span className="text-primary-color fw-bold event-cart-display-price">{item.countrysymbol} {item.displayprice}</span>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-1">
                            <div className="col-md-12">
                              <div className="d-flex align-items-center justify-content-start my-2">
                                <img className="card-icon me-1" src={location} alt="" />
                                <p className="text-primary-color fw-bold mb-0 event-cart-location ml-2">
                                  {item.location}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="desc-h ms-3 fw-bold mb-0">{item.display_name}</div>
                        </div>
                      </div>
                    ))}
                  </Row>
                ) : (
                  <>
                    <Col md={12}>
                      <NoRecord />
                    </Col>
                  </>
                )}
              </>
            )}
          </div>
          <div className="col-md-4">

          </div>
        </div>
      </Row>
      <Footer />
    </>
  );
};

export default Home;