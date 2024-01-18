import React, { useEffect, useState } from "react";
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import MobileMenu from '../../components/mobilemenu';
import { apiurl, onlyDayMonth, shortPer, app_url } from "../../common/Helpers";
import { useNavigate, Link } from "react-router-dom";
import Nouserphoto from '../../common/image/nouser.png';
import locationIcon from "../../assets/location (5) 1.svg";
import Container from "react-bootstrap/Container";
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CoundownDiv from '../../component/coundown';
import Noimg from "../../common/image/noimg.jpg";
import calendar from "../../assets/calendar.svg";
import Timelogo from "../../common/icon/time 1.svg";
import Hourglasslogo from "../../common/icon/hourglass.svg";
import LocationIcon from "../../common/icon/location.svg";
import { GoogleMap, Marker } from '@react-google-maps/api';
import DateIcon from "../../common/icon/date 2.svg";
import MapIcon from "../../common/icon/mapicon.svg";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ShareIcon from "../../common/icon/share.svg";
import EventImg from "../../common/event1.png";
import MailIcon from "../../common/icon/mail.svg";
import FlagIcon from "../../common/icon/flag.svg";
import Flip from "react-reveal/Flip";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import Whitestarbtn from "../../component/Whitestarbtn";
import toast from "react-hot-toast";

import locationIconevent from "./eventpageicon/location.png";
import hourglassIcon from "./eventpageicon/hourglass.png";
import timeIcon from "./eventpageicon/time.png";
import dataIcon from "./eventpageicon/data.png";
import mapIcon from "./eventpageicon/map.png";
const Home = () => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const Beartoken = localStorage.getItem('userauth');
  const { id, name } = useParams();
  const [Apiloader, setApiloader] = useState(true);
  const [FollowApi, setFollowApi] = useState(false);
  const [Eventsaveapi, setEventsaveapi] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [Eventdata, setEventdata] = useState();
  const [Followtype, setFollowtype] = useState(false);
  const [IssaveEvent, setIssaveEvent] = useState(false);
  const [Iscopy, setIscopy] = useState(false);
  const [Followtypeloader, setFollowtypeloader] = useState(false);
  const [Organizerdata, setOrganizerdata] = useState();
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [Paynowbtnstatus, setPaynowbtnstatus] = useState(true);
  const [newmodal, setNewModal] = useState(false);
  const [Eventlist, setEventlist] = useState([]);
  const [IsMap, setIsMap] = useState(false);
  const [OrganizerEventlist, setOrganizerEventlist] = useState([]);

  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (IsMap) {
      // Replace with your desired latitude and longitude or use the browser's geolocation API
      const initialPosition = { lat: parseFloat(Eventdata.lat), lng: parseFloat(Eventdata.Lag) };
      setPosition(initialPosition);
    }
  }, [Eventdata]); // Run this effect only once


  const CopyUrlhandel = async () => {
    await navigator.clipboard.writeText(currentUrl);
    toast.success("Copied");
    setIscopy(true)
  }
  const SaveEvent = async (id) => {
    try {
      if (!Beartoken) {
        toast.error("You need to login first");
        return false;
      }
      const requestData = {
        eventid: id
      }
      fetch(apiurl + "website/save-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            if (data.typestatus == 1) {
              // 1 = not saved
              toast.success("Removed");
              setIssaveEvent(false);
            } else if (data.typestatus == 2) {
              // 2 = saved
              toast.success("saved");
              setIssaveEvent(true);
            } else {
              toast.error("Internal Server Error");
            }
          } else {

          }
        })
        .catch((error) => {
          console.error("Insert error:", error);
        });
    } catch (error) {
      console.error("Login api error:", error);
    }
  }
  const followOrganizer = async () => {
    try {
      if (!Beartoken) {
        toast.error("You need to login first");
        return false;
      }
      // setFollowApi(true)
      const requestData = {
        organizerid: Organizerdata._id
      }
      fetch(apiurl + "website/follow-organizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            setOrganizerdata(data.data);
            if (data.typestatus == 1) {
              // 1 = not following

            } else if (data.typestatus == 2) {
              // 2 = following

            } else {
              toast.error("Internal Server Error");
            }
          } else {

          }
          setFollowApi(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setFollowApi(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setFollowApi(false)
    }
  }
  const checkfollowOrganizer = async (organizer_id) => {
    try {
      setFollowtypeloader(true)
      const userBeartoken = localStorage.getItem('userauth');
      const requestData = {
        organizerid: organizer_id
      }
      fetch(apiurl + "website/check-follow-organizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userBeartoken}`, // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            setFollowtype(true)
          } else {
          }
          setFollowtypeloader(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setFollowtypeloader(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setFollowtypeloader(false)
    }
  }
  const checkSaveevent = async (eventid) => {
    try {
      setEventsaveapi(true)
      const userBeartoken = localStorage.getItem('userauth');
      const requestData = {
        eventid: eventid
      }
      fetch(apiurl + "website/check-save-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userBeartoken}`, // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            setIssaveEvent(true)
          } else {
            setIssaveEvent(false)
          }
          setEventsaveapi(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setEventsaveapi(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setEventsaveapi(false)
    }
  }
  const viewEvent = async (id, name) => {
    navigate(`${app_url}event/${id}/${name}`)
    try {
      setApiloader(true)
      setIsMap(false);
      const requestData = {
        id: id
      };
      window.scrollTo(0, 0);
      fetch(apiurl + 'event/view-event-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == true) {
            setEventdata(data.data);
            setOrganizerdata(data.organizer)
            if (data.data.organizer_id) {
              fetchOrganizerEvent(data.data.organizer_id);
              checkfollowOrganizer(data.data.organizer_id);
              checkSaveevent(data.data._id);
            }
            setIsMap(true);
            if (data.data) {
              setApiloader(false)
            }
          } else {

          }
        })
        .catch(error => {
          console.error('Insert error:', error);
          setApiloader(false)
        });
    } catch (error) {
      console.error('Api error:', error);
    }
    if (!cartItems || cartItems.length === 0) {
      setAllItemsTotalPrice(0);
      setEventTotalPrice(0);
      return;
    }

    const total = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);

    setAllItemsTotalPrice(total);

    // Calculate total price for the current event
    const eventTickets = cartItems.filter((item) => item.eventId === id);
    const eventTotal = eventTickets.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);

    setEventTotalPrice(eventTotal);
  }
  const fetchEvent = async () => {
    try {
      const requestData = {
        limit: 3,
        organizerid: null
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
        })
        .catch((error) => {
          console.error("Insert error:", error);
        });
    } catch (error) {
      console.error("Login api error:", error);
    }
  };
  const fetchData = async () => {
    window.scrollTo(0, 0);
    try {
      setApiloader(true)
      setIsMap(false);
      const requestData = {
        id: id
      };
      fetch(apiurl + 'event/view-event-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == true) {
            setEventdata(data.data);
            if (data.data.organizer_id) {
              checkfollowOrganizer(data.data.organizer_id);
              fetchOrganizerEvent(data.data.organizer_id);
              checkSaveevent(data.data._id)
              setOrganizerdata(data.organizer)
            }
            if (data.data) {
              setApiloader(false)
            }
            setIsMap(true);
          } else {

          }
        })
        .catch(error => {
          console.error('Insert error:', error);
          setApiloader(false)
        });
    } catch (error) {
      console.error('Api error:', error);
    }
  }
  const fetchOrganizerEvent = async () => {
    try {
      const requestData = {
        limit: 2,
        organizerid: null
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
            setOrganizerEventlist(data.data);
          } else {
          }
        })
        .catch((error) => {
          console.error("Insert error:", error);
        });
    } catch (error) {
      console.error("Login api error:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchEvent();
  }, []);
  useEffect(() => {

  }, [Eventlist]);
  const [cartItems, setCartItems] = useState([]);
  const [allItemsTotalPrice, setAllItemsTotalPrice] = useState(0);
  const [eventTotalPrice, setEventTotalPrice] = useState(0);
  const [localQuantities, setLocalQuantities] = useState({});
  const eventId = id; // Assuming Eventdata has _id property

  useEffect(() => {
    // Calculate total price when cart items change
    calculateTotalPrice();
  }, [cartItems]);
  useEffect(() => {
    if (isFirstRender) {
      localStorage.setItem('cart', JSON.stringify({ items: cartItems, quantities: localQuantities }));
    }
  }, [cartItems]);
  useEffect(() => {
    // Load cart and local quantities from localStorage when component mounts
    loadCartFromLocalStorage();
  }, []);

  //   const addToCart = (item) => {
  //     // Assuming cartItems is defined somewhere in your component

  //     // Check if the cart has items from a different event
  //     const hasDifferentEventItem = cartItems.some(cartItem => cartItem.eventId !== item.eventId);
  //     console.log(item.eventId);
  //     if (hasDifferentEventItem) {
  //         // Log a message and do not add the item to the cart
  //         console.log("You can only add items from the same event to the cart.");
  //         return; // Exit the function
  //     }

  //     // Rest of your logic for adding items to the cart
  //     if (Eventdata.currencycode === "USD") {
  //         localStorage.setItem('payment_gatway', 'Stripe');
  //     } else if (Eventdata.currencycode === "SGD") {
  //         localStorage.setItem('payment_gatway', 'hitpay');
  //     } else if (Eventdata.currencycode === "INR") {
  //         localStorage.setItem('payment_gatway', 'rezorpay');
  //     }

  //     const existingItem = cartItems.find(cartItem => cartItem.name === item.name && cartItem.eventId === item.eventId);

  //     if (existingItem) {
  //         // Update quantity if item already exists in cart
  //         const updatedCart = cartItems.map(cartItem =>
  //             cartItem.name === item.name && cartItem.eventId === item.eventId ? 
  //             { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
  //         );
  //         setCartItems(updatedCart);
  //     } else {
  //         // Add new item with quantity 1
  //         setCartItems([...cartItems, { ...item, quantity: 1, eventId: item.eventId }]);
  //     }

  //     // Update local quantity state
  //     setLocalQuantities({
  //         ...localQuantities,
  //         [item.name]: (localQuantities[item.name] || 0) + 1,
  //     });

  //     setIsFirstRender(true);
  // };

  const addToCart = (item) => {
    // Initialize cartItems as an empty array if it's undefined
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);

    if (Eventdata.currencycode === "USD") {
      localStorage.setItem('payment_gatway', 'Stripe');
      localStorage.setItem('currency_symble', '$');
    } else if (Eventdata.currencycode === "SGD") {
      localStorage.setItem('payment_gatway', 'hitpay');
      localStorage.setItem('currency_symble', 'S$');
    } else if (Eventdata.currencycode === "INR") {
      localStorage.setItem('payment_gatway', 'rezorpay');
      localStorage.setItem('currency_symble', '₹');
    }

    if (existingItem) {
      // If item already exists in cart, update quantity
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
    } else {
      // If item is not in cart, add it with quantity 1 and eventId
      setCartItems([...cartItems, { ...item, quantity: 1, eventId, event: Eventdata, ticket: item }]);
    }

    // Update local quantity state
    setLocalQuantities({
      ...localQuantities,
      [item.name]: (localQuantities[item.name] || 0) + 1,
    });

    setIsFirstRender(true)
  };


  const removeFromCart = (itemName, quantity) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.name === itemName ? { ...cartItem, quantity: cartItem.quantity > 0 ? cartItem.quantity - 1 : 0 } : cartItem
    );

    const filteredCart = updatedCart.filter((cartItem) => cartItem.quantity > 0);
    setCartItems(filteredCart);

    // Update local quantity state
    setLocalQuantities({
      ...localQuantities,
      [itemName]: quantity > 0 ? quantity - 1 : 0,
    });
    setIsFirstRender(true)
  };

  const calculateTotalPrice = () => {
    if (!cartItems || cartItems.length === 0) {
      setAllItemsTotalPrice(0);
      setEventTotalPrice(0);
      return;
    }

    const total = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);

    setAllItemsTotalPrice(total);

    // Calculate total price for the current event
    const eventTickets = cartItems.filter((item) => item.eventId === eventId);
    const eventTotal = eventTickets.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);

    setEventTotalPrice(eventTotal);
    if (eventTotal > 0) {
      setPaynowbtnstatus(true)
    } else {
      setPaynowbtnstatus(true)
    }
  };

  const saveCartToLocalStorage = () => {
    navigate(app_url + 'cart-details');
  };


  const loadCartFromLocalStorage = () => {
    // Load cart items, local quantities, and eventId from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const { items, quantities } = JSON.parse(storedCart);
      // Check if items and quantities exist in the stored data
      if (items && quantities) {
        setCartItems(items);
        setLocalQuantities(quantities);
      }
    }
  };
  const openGoogleMaps = () => {
    const location = Eventdata.location; // Replace with the location name or coordinates
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}`;
    window.open(mapsUrl, "_blank");
  };
  console.log(FollowApi);
  return (
    <>
      {" "}
      <Modal isOpen={newmodal} toggle={() => setNewModal(!newmodal)}>
        <ModalHeader toggle={!newmodal}>Share this event</ModalHeader>
        <ModalBody>
          <div>
            <Row>
              <Col md={12}>
                <p className="mb-0">Event url</p>
                <input className="form-control" type="readonly" value={currentUrl}></input>
              </Col>
              <Col md={12} className="mt-2">
                <span onClick={() => CopyUrlhandel()}>
                  {Iscopy ? (
                    <Whitestarbtn title={'Copied'} />
                  ) : (
                    <Whitestarbtn title={'Copy URL'} />
                  )}
                </span>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setNewModal(!newmodal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal >
      <HeaderMenu />
      <div className="mx-lg-4 my-lg-3 banner-event bg-primary-color rounded-8 position-relative">
        <MobileMenu />
        {Apiloader ? (
          <div className="xxx-event-page-top-loader">
            <div className="linear-background w-100" style={{ height: '330px' }}> </div>
          </div>
        ) : (
          <>
            <h1 className="banner-h text-white text-start text-uppercase">{Eventdata.display_name}</h1>
            <h3 className="banner-h2 text-white rounded-8 px-4 py-3 animate__animated animate__bounce">
              {Eventdata.category_name}
            </h3>
            {screenWidth > 900 ? (
              <div className="py-2 singel-event-page-head-box">
                <div className="organizer-name-sec px-2 py-2">
                  <div className="d-inline-flex align-items-center border-right event-time-area py-2">
                    <div className="d-inline-block mr-1">
                      <img height={30} width={'auto'} src={dataIcon} alt="" />
                    </div>
                    <div className="d-inline-block">
                      <span className="event-duration d-block">{Eventdata.start_date}</span>
                    </div>
                  </div>
                  <div className="d-inline-flex align-items-center border-right event-time-area px-2">
                    <div className="d-inline-block mr-1">
                      <img height={30} width={'auto'} src={timeIcon} alt="" />
                    </div>
                    <div className="d-inline-block">
                      <span className="event-duration d-block">Event Time</span>
                      <span className="event-time d-block">{Eventdata.start_time}</span>
                    </div>
                  </div>
                  <div className="d-inline-flex align-items-center border-right event-time-area">
                    <div className="d-inline-block mr-1">
                      <img height={30} width={'auto'} className="ml-2" src={hourglassIcon} alt="" />
                    </div>
                    <div className="d-inline-block">
                      <span className="event-duration d-block">Event Duration</span>
                      <span className="event-time d-block">{Eventdata.event_duration}</span>
                    </div>
                  </div>
                  <div className="d-inline-flex align-items-center">
                    <div className="d-inline-block mr-1">
                      <img height={30} width={'auto'} src={locationIconevent} alt="" />
                    </div>
                    <div className="d-inline-block">
                      <span className="event-duration d-block eventpage-location-name">
                        {Eventdata.location}
                      </span>
                      <span onClick={openGoogleMaps} className="event-time d-block cursor-pointer py-0">Get direction</span>
                    </div>
                    <div className="d-inline-block mr-1 ml-3">
                      <img height={30} width={30} src={mapIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="row px-3 py-3">
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <div>
                      <div className="d-inline-flex align-items-center event-time-area py-2">
                        <div className="d-inline-block mr-1">
                          <img height={30} width={'auto'} src={dataIcon} alt="" />
                        </div>
                        <div className="d-inline-block">
                          <span className="event-duration d-block">{Eventdata.start_date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6  d-flex align-items-center justify-content-center">
                    <div>
                      <div className="d-inline-flex align-items-centerevent-time-area">
                        <div className="d-inline-block mr-1">
                          <img height={30} width={'auto'} src={timeIcon} alt="" />
                        </div>
                        <div className="d-inline-block">
                          <span className="event-duration d-block">Event Time</span>
                          <span className="event-time d-block">{Eventdata.start_time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6  d-flex align-items-center justify-content-center">
                    <div>
                      <div className="d-inline-flex align-items-center event-time-area">
                        <div className="d-inline-block mr-1">
                          <img height={30} width={'auto'} className="ml-2" src={hourglassIcon} alt="" />
                        </div>
                        <div className="d-inline-block">
                          <span className="event-duration d-block">Event Duration</span>
                          <span className="event-time d-block">{Eventdata.event_duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6  d-flex align-items-center justify-content-center">
                    <div>
                      <div className="d-inline-flex align-items-center">
                        <div className="d-inline-block mr-1">
                          <img height={30} width={'auto'} src={locationIconevent} alt="" />
                        </div>
                        <div className="d-inline-block">
                          <span className="event-duration d-block eventpage-location-name">
                            {Eventdata.location}
                          </span>
                          <span onClick={openGoogleMaps} className="event-time d-block cursor-pointer py-0">Get direction</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="banner-child-event">
              <img className="mt-2 event-banner" src={Eventdata.banner_image ? Eventdata.banner_image : EventImg} alt="" />
            </div>
          </>
        )}
      </div>
      {Apiloader ? (
        <div style={{margin: '30px 26px'}}>
          <div className="linear-background w-100"> </div>
        </div>
      ) : (
        <div className="mx-lg-4 my-lg-3 ">
          <Row>
            <Col md={12}>

            </Col>
          </Row>
          <div className="event-desc event-page-margin">
            <Container fluid>
              <Row>
                <Col md={9}>
                  <div className="desc-sec">
                    <span className="sec-title">
                      <Fade bottom>Description</Fade>
                    </span>
                    <Fade bottom>
                      <p>
                        {Eventdata.event_desc}
                      </p>
                    </Fade>
                  </div>
                  {/* <div className="desc-sec">
                      <span className="sec-title">Map xxx</span>
                    </div> */}
                  <div>

                    <GoogleMap
                      center={position}
                      zoom={15}
                      mapContainerStyle={{ height: '500px', width: '100%' }}
                    >
                      {position && <Marker position={position} />}
                    </GoogleMap>
                  </div>
                  <div className="desc-sec">
                    <span onClick={() => navigate(app_url + 'privacy-policy')} className="sec-title cursor-pointer">
                      Return Policy{" "}
                      <span>
                        <img src={ShareIcon} alt="" />
                      </span>
                    </span>
                    <p onClick={() => navigate(app_url + 'contact')} className="report cursor-pointer">
                      <img src={FlagIcon} alt="" /> Report this event
                    </p>
                  </div>
                  <Row>
                    <Col md={12}>
                      <Slide bottom>
                        <div className="start-in-box eventpage-box-style mb-5">
                          <Row>
                            <Col md={6}>
                              <div className="right-box-title">
                                <p>Tags</p>
                              </div>
                            </Col>
                            <Col md={12}>
                              <div className="tags pt-4 pb-5">
                                <ul className="p-0">
                                  {Eventdata.tags.map((item, index) => (
                                    <li className="d-inline-block m-1 mb-3">
                                      <span className="event-category-title event-category-title-mobile font-13">
                                        {item}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Slide>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className="start-in-box eventpage-box-style mb-5 More-events">
                        <Row>
                          <Col md={8}>
                            <div className="right-box-title">
                              <p>More events from this organiser</p>
                            </div>
                          </Col>
                          <Col md={12}>
                            <Row>
                              {OrganizerEventlist.map((item, index) => (
                                <Col md={6}>
                                  <div className="cursor-pointer" title="View" onClick={() => viewEvent(item._id, item.name)}>
                                    <Slide bottom>
                                      <div className="more-event-box">
                                        <div className="ticket-price-area ticket-price-area-bg mt-3">
                                          <Row>
                                            <Col
                                              md={5}
                                              className="d-flex align-items-center"
                                            >
                                              <div className="event-image-part">
                                                <img
                                                  className="event-image"
                                                  src={item.thum_image ? item.thum_image : Noimg}
                                                  alt=""
                                                />
                                              </div>
                                            </Col>
                                            <Col md={7} className="event-view-page">
                                              <div className="organizer-name-sec px-2 py-2">
                                                <div className="d-inline-flex align-items-center  event-time-area">
                                                  <div className="d-inline-block mr-1">
                                                    <img
                                                      height={30}
                                                      width={30}
                                                      src={Timelogo}
                                                      alt=""
                                                    />
                                                  </div>
                                                  <div className="d-inline-block">
                                                    <span className="event-duration d-block text-dark">
                                                      Event Date
                                                    </span>
                                                    <span className="event-time d-block text-dark">
                                                      {item.start_date}
                                                    </span>
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
                                                    <span className="event-duration d-block text-dark">
                                                      Event Duration
                                                    </span>
                                                    <span className="event-time d-block text-dark">
                                                      {item.event_duration}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                            <Col md={12} className="my-2">
                                              <div className="event-name  ml-2">
                                                <span>{item.display_name}</span>
                                                <p className="font-10">
                                                  {shortPer(item.event_desc, 100)}
                                                </p>
                                              </div>
                                            </Col>
                                            <Col
                                              md={7}
                                              xs={7}
                                              className="border-top-doted"
                                            >
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
                                                <span className="price">{item.countrysymbol} {item.displayprice}</span>
                                              </div>
                                            </Col>
                                          </Row>
                                        </div>
                                      </div>
                                    </Slide>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={3}>
                  {Eventdata.start_mindate && Eventdata.is_clock_countdown ? (
                    <CoundownDiv props={Eventdata.start_mindate} />
                  ) : ''}
                  <div className="organised-by-box eventpage-box-style">
                    <div className="organizer-name-sec d-flex align-items-center px-2 py-2">
                      <div className="d-inline-block mr-3">
                        <img
                          height={70}
                          width={70}
                          src={Organizerdata.profile_picture ? Organizerdata.profile_picture : Nouserphoto}
                          alt=""
                          className="organiger-logo"
                        />
                      </div>
                      <div className="d-inline-block">
                        <span className="organizer-by d-block">Organised by</span>
                        <Link to={`${app_url}organizer-profile/${Organizerdata._id}/${Organizerdata.first_name}`}><span className="organizer-name d-block">By {Organizerdata.first_name}</span></Link>
                      </div>
                    </div>
                    <div className="border-botton-devider my-2"></div>
                    <div className="right-box-con mt-4">
                      {Followtypeloader ? (
                        <div className="linear-background w-100"> </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <div className="d-inline-block mr-4">
                            <p className="followers-title">Followers</p>
                            <p className="followers-count">{Organizerdata.followers ? Organizerdata.followers : 0}</p>
                          </div>
                          <div className="d-inline-block">
                            {FollowApi ? (
                              <button type="button" className="follow-btn">
                                Please wait...
                              </button>
                            ) : (
                              <>
                                {Followtype ? (
                                  <button onClick={() => followOrganizer()} type="button" class="Unfollow-btn-1">Unfollow</button>
                                ) : (
                                  <button onClick={() => followOrganizer()} type="button" className="follow-btn">
                                    Follow
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="align-items-center py-2">
                        <div className="d-inline-block mr-1">
                          <img height={30} width={30} src={LocationIcon} alt="" />
                        </div>
                        <div className="d-inline-block">
                          <span className="event-page-organizer-deta d-block">
                            {Organizerdata.countryname ? Organizerdata.countryname : '--'}
                          </span>
                        </div>
                      </div>
                      <div className="align-items-center py-2">
                        <div className="d-inline-block mr-1">
                          <img height={30} width={30} src={MailIcon} alt="" />
                        </div>
                        <div className="d-inline-block">
                          <span className="event-page-organizer-deta d-block">
                            {Organizerdata.email ? Organizerdata.email : '--'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="start-in-box eventpage-box-style mb-5 my-5 event-page-ticket">
                    <div className="right-box-title">
                      <p><Flip left cascade>Tickets</Flip></p>
                    </div>
                    {Eventdata.allprice ? (
                      <>
                        {Eventdata.allprice.map((items, index) => (
                          <>
                            <div key={items.id} className="right-box-con mt-4 in-event-page-cart-sec">
                              <div className="d-flex align-items-center">
                                <div className="price-section d-inline-block">
                                  <p className="Ticket-title">{items.name}</p>
                                  {items.ticket_type == 1 ? (
                                    <>
                                      <span className="price">{Eventdata.countrysymbol}{items.price}</span>
                                      {/* <span className="cut-price">${items.price}</span> */}
                                    </>
                                  ) : (<>
                                    <span className="price">FREE</span>
                                  </>)}
                                </div>
                                <div className="d-inline-block cart-increment-button">
                                  <span>
                                    <span className="cart-minus cart-btn" onClick={() => removeFromCart(items.name, localQuantities[items.name] || 0)}>-</span>
                                    <span className="cart-number">{localQuantities[items.name] || 0}</span>
                                    <span className="cart-plus cart-btn" onClick={() => addToCart(items)}>+</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="dashed-border-devider my-2"></div>
                          </>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                    <div>
                      <span className="main-title">Total Price :</span>{" "}
                      <span className="float-right main-title">{Eventdata.countrysymbol}{eventTotalPrice.toFixed(2)}</span>
                    </div>
                    {Paynowbtnstatus ? (
                      <div className="mt-5 paynow-btn-box">
                        <span onClick={() => saveCartToLocalStorage()}>
                          <Whitestarbtn title={'Pay now'} />
                        </span>
                      </div>
                    ) : ''}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="event-category-section mb-5 in-event-page">
            <Container fluid className="">
              <Row className="event-box-mobile">
                <Col md={12}>
                  <h2 className="desc-sec theme-color">Other events you may like</h2>
                </Col>
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
              </Row>
            </Container>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;