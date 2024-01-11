import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrganizerProfile from "../../component/organizer/organizerprofile";
import Eventlogo from '../../common/icon/eventlogo.svg';
import Timelogo from '../../common/icon/time 1.svg';
import Hourglasslogo from '../../common/icon/hourglass.svg';
import LocationIcon from '../../common/icon/location.svg';
import Eventimg from '../../common/event.jpg';
import MailIcon from "../../common/icon/mail.svg";
import DateIcon from '../../common/icon/date 2.svg';
import { app_url, apiurl,onlyDayMonth } from "../../common/Helpers";
const Page = ({ title }) => {
  const { id, name } = useParams();
  const [profiledata, setProfiledata] = useState();
  const [Loader, setLoader] = useState(true);
  const [eventlist, seteventlist] = useState([]);
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
            setLoader(false);
            setProfiledata(data.data);
            seteventlist(data.events);
          } else {
            setLoader(false);
          }
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
      <Container>
        <Row>
          <Col
            md={12}
            className="title-banner d-flex justify-content-center py-5 mb-5"
          >
            <h3 className="title-banner-h3">{title}</h3>
          </Col>
          <Col md={8}>
            <h3 className="All-Events-title">All Events</h3>
            <Row>
              <Col md={12} className="event-category-list">
                <ul>
                  <li className="d-inline-block active">All</li>
                  <li className="d-inline-block">Category a</li>
                  <li className="d-inline-block">Category b</li>
                </ul>
              </Col>
              <Col md={12} className="mt-3">
                <div className="border-botton-devider my-2"></div>
              </Col>
            </Row>
            <Row className="mt-5">
              {eventlist.map((item, index) => (
                <Col md={6} className="mb-3">
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
                          height={70}
                          width={70}
                          src={Eventlogo}
                          alt=""
                          className="organiger-logo"
                        />
                      </div>
                      <div className="d-inline-block">
                        <span className="organizer-by d-block">Organised by</span>
                        <span className="organizer-name d-block">dsd</span>
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
                          {/* Lorem ipsum is a pseudo-Latin text used in web design,
                          typography, layout.. */}
                          {item.event_desc}
                        </p>
                      </div>
                    </div>
                    <div className="ticket-price-area mt-3">
                      <Row>
                        <Col md={7} xs={7} className="border-top-doted">
                          <div className="location d-flex align-items-center text-center">
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
                            <span className="price">$99</span>
                            <span className="cut-price">$100</span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              ))}

            </Row>
          </Col>
          <Col md={4}>
            <div className="organised-by-box eventpage-box-style">
              <div className="organizer-name-sec d-flex align-items-center px-2 py-2">
                <div className="d-inline-block mr-3">
                  <img
                    height={70}
                    width={70}
                    src={Eventlogo}
                    alt=""
                    className="organiger-logo"
                  />
                </div>
                <div className="d-inline-block">
                  <span className="organizer-by d-block">Organizer Profile</span>
                  <span className="organizer-name d-block">dsdsd</span>
                </div>
              </div>
              <div className="border-botton-devider my-2"></div>
              <div className="right-box-con mt-4">
                <div className="d-flex align-items-center">
                  <div className="d-inline-block mr-4">
                    <p className="followers-title">Followers</p>
                    <p className="followers-count">{profiledata.followers ? profiledata.followers : 0}</p>
                  </div>
                  <div className="d-inline-block">
                    <button type="button" className="follow-btn">
                      Follow
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center py-2">
                  <div className="d-inline-block mr-1">
                    <img height={30} width={30} src={LocationIcon} alt="" />
                  </div>
                  <div className="d-inline-block">
                    <span className="event-page-organizer-deta d-block">
                      {profiledata.address ? profiledata.address : 'Address not found !'}
                    </span>
                  </div>
                </div>
                <div className="d-inline-flex align-items-center py-2">
                  <div className="d-inline-block mr-1">
                    <img height={30} width={30} src={MailIcon} alt="" />
                  </div>
                  <div className="d-inline-block">
                    <span className="event-page-organizer-deta d-block">
                      {profiledata.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Page;
