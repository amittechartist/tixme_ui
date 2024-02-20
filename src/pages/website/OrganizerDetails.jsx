import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from 'react-router-dom';
import NoRecord from '../../component/Norecordui'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import calendar from "../../assets/calendar.svg";
import location from "../../assets/location (5) 1.svg";
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import MobileMenu from '../../components/mobilemenu';
import Nouserphoto from '../../common/image/nouser.png';
import "flatpickr/dist/themes/material_green.css";
import OrganizerProfile from '../../component/organizer/organizerprofile';
import { apiurl, onlyDayMonth, shortPer, app_url, get_date_time } from "../../common/Helpers";
import { useNavigate } from "react-router-dom";
import Noimg from "../../common/image/noimg.jpg";
const Home = () => {
  const { id, name } = useParams();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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
    window.scrollTo(0, 0);
    getdata();
  }, [])
  return (
    <>
      <div className="content-area">
        {" "}
        <HeaderMenu />
        <div className="mx-lg-4 my-lg-3 banner-organizer-page bg-primary-color rounded-8 position-relative">
          <MobileMenu />
          <h1 className="banner-h text-white text-start text-uppercase animate__animated animate__bounce">Organizers profile</h1>
        </div>
        <div className="row p-md-3 p-0 mx-4 mt-5">
          {screenWidth <= 900 ? (
            <div className="col-md-12">
              {Loader ? '' : (<OrganizerProfile props={profiledata} />)}
            </div>
          ) : ''}
          <div className="col-md-9">
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
                      <div className="col-xl-4 col-md-4 col-12 cursor-pointer" onClick={() => viewEvent(item._id, item.name)}>
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
                                <small className="mb-0 wspace-no" style={{ fontSize: '12px' }}>Originated by</small>
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
          {screenWidth > 900 ? (
            <div className="col-md-3">
              {Loader ? '' : (<OrganizerProfile props={profiledata} />)}
            </div>
          ) : ''}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;