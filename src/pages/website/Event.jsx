import React, { useEffect, useState } from "react";
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import OrganizerProfile from '../../component/organizer/organizerprofile';
import { FaTimes } from 'react-icons/fa';
import MobileMenu from '../../components/mobilemenu';
import { apiurl, onlyDayMonth, shortPer, app_url, getDayName, getDay, getMonthName } from "../../common/Helpers";
import { useNavigate, Link } from "react-router-dom";
import Nouserphoto from '../../common/image/nouser.png';
import locationIcon from "../../assets/location (5) 1.svg";
import Container from "react-bootstrap/Container";
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CoundownDiv from '../../component/coundown';
import Noimg from "../../common/image/noimg.jpg";
import calendar from "../../assets/calendar.svg";
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ShareIcon from "../../common/icon/share.svg";
import WhiteShareIcon from "../../common/icon/whiteshear.svg";
import EventImg from "../../common/event1.png";
import FlagIcon from "../../common/icon/flag.svg";
import Flip from "react-reveal/Flip";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import toast from "react-hot-toast";
import locationIconevent from "./eventpageicon/Location (8).svg";
import hourglassIcon from "./eventpageicon/hourglass.svg";
import timeIcon from "./eventpageicon/clock.svg";
import dataIcon from "./eventpageicon/date 2.svg";
import mapIcon from "./eventpageicon/map (2).svg";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
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
  const [TicketsList, setTicketsList] = useState([]);
  const [TicketsSelledList, setTicketsSelledList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [SelectedTicketId, setSelectedTicketId] = useState(null);
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

  function getCountryFlagImage(country) {
    if (country == "India") {
    } else if (country == "United states") {
    } else if (country == "Singapore") {
    } else {
      return null;
    }
  }

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
            setTicketsList(data.data.allprice.filter(item => item.isdelete === 0));
            setOrganizerdata(data.organizer)
            setTicketsSelledList(data.orderqtylist)
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
            setTicketsSelledList(data.orderqtylist)
            setTicketsList(data.data.allprice.filter(item => item.isdelete === 0));
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
  const fetchOrganizerEvent = async (id) => {
    try {
      const requestData = {
        limit: 4,
        organizerid: id
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
  }, [SelectedTicketId]);

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
  const HandelCategorsearch = (value) => {
    let url = `${app_url}events/?categoryId=${encodeURIComponent(value)}`;
    navigate(url);
  };
  const CountSoldOut = (item) => {
    const totalQuantity = TicketsSelledList.filter((i) => i.ticket_id == item.id)
      .reduce((acc, item) => acc + item.quantity, 0);
    const qty_avl = Number(item.quantity) - Number(totalQuantity);
    if (qty_avl == 0) {
      return false;
    } else {
      return true;
    }
  }
  const addToCart = (item, id) => {
    const totalQuantity = TicketsSelledList.filter((i) => i.ticket_id == item.id)
      .reduce((acc, item) => acc + item.quantity, 0);
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
    const qty_avl = Number(item.quantity) - Number(totalQuantity);
    localStorage.setItem('inside_cart_id', id);

    if (qty_avl == 0) {
      return toast.error("Cannot add more than the available quantity");
    }
    // Set payment gateway and currency symbol based on currency code
    if (Eventdata.currencycode.trim() === "USD") {
      localStorage.setItem('payment_gatway', 'Stripe');
      localStorage.setItem('currency_symble', '$');
    } else if (Eventdata.currencycode.trim() === "SGD") {
      localStorage.setItem('payment_gatway', 'hitpay');
      localStorage.setItem('currency_symble', 'S$');
    } else if (Eventdata.currencycode.trim() === "INR") {
      localStorage.setItem('payment_gatway', 'rezorpay');
      localStorage.setItem('currency_symble', '₹');
    }

    localStorage.setItem('cart_insert_id', id);

    if (existingItem) {
      // Check if adding one more quantity exceeds the available quantity
      if (existingItem.quantity + 1 <= qty_avl) {
        const updatedCart = cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCartItems(updatedCart);

        // Update local quantity state
        setLocalQuantities({
          ...localQuantities,
          [item.id]: (localQuantities[item.id] || 0) + 1,
        });
      } else {
        // Show an alert or message if the quantity exceeds the available quantity
        toast.error("Cannot add more than the available quantity");
      }
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, eventId, event: Eventdata, ticket: item }]);

      // Update local quantity state for the new item
      setLocalQuantities({
        ...localQuantities,
        [item.id]: 1,
      });
    }

    setIsFirstRender(true);
  };



  const removeFromCart = (Id, quantity) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === Id ? { ...cartItem, quantity: cartItem.quantity > 0 ? cartItem.quantity - 1 : 0 } : cartItem
    );

    const filteredCart = updatedCart.filter((cartItem) => cartItem.quantity > 0);
    setCartItems(filteredCart);

    // Update local quantity state
    setLocalQuantities({
      ...localQuantities,
      [Id]: quantity > 0 ? quantity - 1 : 0,
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
    const check_same_id = localStorage.getItem('cart_insert_id');
    if (SelectedTicketId) {
      localStorage.removeItem('cart');
      localStorage.removeItem('cart_insert_id');
      setCartItems([]);
      setLocalQuantities([]);
    } else {
      if (check_same_id && check_same_id == id) {
        if (storedCart) {
          const { items, quantities } = JSON.parse(storedCart);
          // Check if items and quantities exist in the stored data
          if (items && quantities) {
            setCartItems(items);
            setLocalQuantities(quantities);
          }
        }
      } else {
        localStorage.removeItem('cart');
        localStorage.removeItem('cart_insert_id');
      }
    }
  };
  const openGoogleMaps = () => {
    const location = Eventdata.location; // Replace with the location name or coordinates
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}`;
    window.open(mapsUrl, "_blank");
  };
  const openGoogleMapswithlon = (latitude, longitude) => {
    const coordinates = `${latitude},${longitude}`;
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(coordinates)}`;
    window.open(mapsUrl, "_blank");
  };
  const handelTicketselect = (id) => {
    const matchingTickets = TicketsList.filter(ticket => ticket.datetimeid === id && ticket.isdelete === 0);
    setSelectedTicket(matchingTickets); // Set the array of matching tickets
    setSelectedTicketId(id);
    localStorage.removeItem('cart');
    localStorage.removeItem('cart_insert_id');
  }
  return (
    <>
      {" "}
      <div className="content-area">
        <Modal isOpen={newmodal} toggle={() => setNewModal(!newmodal)} centered>
          <ModalHeader toggle={!newmodal}>Share this event
            <button className="close p-0" onClick={() => setNewModal(!newmodal)} style={{ position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'transparent' }}>
              <FaTimes />
            </button>
          </ModalHeader>
          <ModalBody>
            <div>
              <Row>
                <Col md={12}>
                  <p className="mb-0">Event URL</p>
                  <input onClick={() => CopyUrlhandel()} className="form-control cursor-pointer" disabled value={currentUrl}></input>
                </Col>
                <Col md={12} className="mt-2">
                  {Iscopy ? (
                    <button onClick={() => CopyUrlhandel()} type='button' className="btn theme-bg text-white">Link copied</button>
                  ) : (
                    <button onClick={() => CopyUrlhandel()} type='button' className="btn theme-bg text-white">Copy link</button>
                  )}
                  <span className="ml-3 theme-color">| Share with <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer"><span className="mx-1 cursor-pointer sh-icon"><FaFacebookF /></span></a><a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer"><span className="mx-1 cursor-pointer sh-icon"><FaWhatsapp /></span></a></span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
        <HeaderMenu />
        <div className="mx-lg-4 my-lg-3 banner-event bg-primary-color rounded-8 position-relative">
          <MobileMenu />
          {Apiloader ? (
            <div className="xxx-event-page-top-loader">
              <div className="linear-background w-100" style={{ height: '150px' }}> </div>
            </div>
          ) : (
            <>
              <h3 className="eventpage-cat-name text-white animate__animated animate__bounce">
                <span className="cursor-pointer" onClick={() => HandelCategorsearch(Eventdata.category)}>{Eventdata.category_name}</span>
              </h3>
              <h1 className="banner-h banner-h-event-page banner-h-mob-event text-white text-start text-uppercase">{Eventdata.display_name}</h1>
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
                        <span className="text-white event-time d-block">{Eventdata.start_time}</span>
                      </div>
                    </div>
                    <div className={`d-inline-flex align-items-center ${Eventdata.eventtype == 2 && 'border-right'} event-time-area px-2`}>
                      <div className="d-inline-block mr-1">
                        <img height={30} width={'auto'} className="ml-2" src={hourglassIcon} alt="" />
                      </div>
                      <div className="d-inline-block">
                        <span className="event-duration d-block">Event Duration</span>
                        <span className="text-white event-time d-block">{Eventdata.event_duration}</span>
                      </div>
                    </div>
                    {Eventdata.eventtype == 2 && (
                      <div className="d-inline-flex align-items-center">
                        <div className="d-inline-block mr-1">
                          <img height={30} width={'auto'} src={locationIconevent} alt="" />
                        </div>
                        <div className="d-inline-block">
                          <span className="event-duration d-block eventpage-location-name">
                            {Eventdata.location}
                          </span>
                          {Eventdata.Lag && Eventdata.lat ? (
                            <span onClick={() => openGoogleMapswithlon(Eventdata.lat, Eventdata.Lag)} className="text-white event-time d-block cursor-pointer py-0">Get direction</span>
                          ) : (
                            <span onClick={openGoogleMaps} className="text-white event-time d-block cursor-pointer py-0">Get direction</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="row px-3 py-3">
                    <div className="col-6 d-flex align-items-center justify-content-start">
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
                    <div className="col-6  d-flex align-items-center justify-content-start">
                      <div>
                        <div className="d-inline-flex align-items-centerevent-time-area">
                          <div className="d-inline-block mr-1">
                            <img height={30} width={'auto'} src={timeIcon} alt="" />
                          </div>
                          <div className="d-inline-block">
                            <span className="event-duration d-block">Event Time</span>
                            <span className="event-time d-block text-white">{Eventdata.start_time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6  d-flex align-items-center justify-content-start">
                      <div>
                        <div className="d-inline-flex align-items-center event-time-area">
                          <div className="d-inline-block mr-1">
                            <img height={30} width={'auto'} className="" src={hourglassIcon} alt="" />
                          </div>
                          <div className="d-inline-block">
                            <span className="event-duration d-block">Event Duration</span>
                            <span className="event-time d-block  text-white">{Eventdata.event_duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6  d-flex align-items-center justify-content-start">
                      <div>
                        <div className="d-inline-flex align-items-center">
                          <div className="d-inline-block mr-1">
                            <img height={30} width={'auto'} src={locationIconevent} alt="" />
                          </div>
                          <div className="d-inline-block">
                            <span className="event-duration d-block eventpage-location-name">
                              {Eventdata.location}
                            </span>
                            <span onClick={openGoogleMaps} className="event-time d-block cursor-pointer py-0  text-white">Get direction</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="row evnt-page-save-shear-box">
                <div className="text-white d-inline-flex  align-items-center justify-content-md-end justify-content-end ml-2">
                  <span className="d-flex align-items-center cursor-pointer" onClick={() => SaveEvent(Eventdata._id)}>
                    <span className="event-pg-icon">
                      {IssaveEvent ? (<FaHeart />) : (<FaRegHeart />)}
                    </span>
                    <span className="event-pg-icon-text">Add to favourites</span>
                  </span>
                  <span className="d-flex align-items-center  cursor-pointer" onClick={() => { setNewModal(!newmodal); setIscopy(false) }}>
                    <span className="event-pg-icon-img">
                      <img src={WhiteShareIcon} alt="" />
                    </span>
                    <span className="event-pg-icon-text">Share event</span>
                  </span>
                </div>
              </div>
              {/* <div className="banner-child-event">
              <img className="mt-2 event-banner" src={Eventdata.banner_image ? Eventdata.banner_image : EventImg} alt="" />
            </div> */}
            </>
          )}
        </div>
        {Apiloader ? (
          <div style={{ margin: '30px 26px' }}>
            <div className="linear-background w-100"> </div>
          </div>
        ) : (
          <div className="my-lg-3 my-md-3 event-view-body">
            <div className="event-desc event-page-margin">
              <Container fluid>
                <Row>
                  <div className="col-md-12 col-12 mb-5">
                    <div className="event-page-banner-1">
                      <img
                        alt=""
                        src={Eventdata.banner_image ? Eventdata.banner_image : EventImg}
                        fetchpriority="high"
                        data-testid="hero-img"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-12 mb-5 d-none">
                    <div className="event-hero">
                      {/* style={{ backgroundImage: `url("${Eventdata.banner_image ? Eventdata.banner_image : EventImg}")` }} */}
                      <div
                        className="event-hero__background"

                      ></div>
                      <div className="css-1vu2yqv e1kx2rja0">
                        <div className="css-1tue3c7 e1kx2rja1">
                          <img
                            width="600"
                            height="300"
                            alt="Gangtok: 21 Day- Free Kundalini Inner Energy Awakening Meditation"
                            src={Eventdata.banner_image ? Eventdata.banner_image : EventImg}
                            fetchpriority="high"
                            data-testid="hero-img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-7 col-lg-8 col-xl-8">
                    <div className="event-vew-page-margin">
                      <div className="desc-sec">
                        <span className="sec-title" style={{ color: '#003B8F' }}>
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
                      {Eventdata.eventtype == 2 && (
                        <div className="event-page-menu-div">
                          <GoogleMap
                            center={position}
                            zoom={15}
                            mapContainerStyle={{ height: '300px', width: '100%' }}
                          >
                            {position && <Marker position={position} />}
                          </GoogleMap>
                        </div>
                      )}
                      <Row className="d-none">
                        <Col md={12}>
                          <Slide bottom>
                            <div className="start-in-box eventpage-box-style-event-view mb-5">
                              <Row>
                                <Col md={6}>
                                  <div className="right-box-title">
                                    <p>Tags</p>
                                  </div>
                                </Col>
                                <Col md={12}>
                                  <div className="tags py-2">
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

                    </div>
                  </div>
                  <div className="col-12 col-md-5 col-lg-4 col-xl-4">
                    {Eventdata.start_mindate && Eventdata.is_clock_countdown ? (
                      <CoundownDiv props={Eventdata.start_mindate} />
                    ) : ''}
                    <div className="start-in-box eventpage-box-style-event-view mb-5 my-5 event-page-ticket" style={{ position: 'relative' }}>
                      <div className={`right-box-title`}>
                        <div className="row border-bottom-1">
                          <div className="col-6 d-flex justify-content-start">
                            <span><Flip left cascade>Tickets</Flip></span>
                          </div>
                          {Eventdata.is_selling_fast && (
                            <div className="col-6 d-flex justify-content-end">
                              <span className="selling-f-box">Selling Fast</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {Eventdata.event_subtype_id == 2 ? (
                        <>
                          <div className="row">
                            {Eventdata.allprice ? (
                              <>
                                {Eventdata.event_dates.map((items, index) => (
                                  <>
                                    {items.is_delete === 0 && (
                                      <>
                                        <div className="col-12 my-3">
                                          <div className="mx-2">
                                            <div className={`row new-week-ticket-box ${SelectedTicketId == items.id && 'new-week-ticket-box-active'}`} onClick={() => handelTicketselect(items.id)}>
                                              <div className="col-6  d-flex align-items-end">
                                                <div className="d-flex align-items-center">
                                                  <div className="day-box-1">
                                                    <p className="day-name-1">{getDay(items.date)}</p>
                                                  </div>
                                                  <div>
                                                    <p className="week-name-1">{getDayName(items.date)}</p>
                                                    <p className="month-name-1">{getMonthName(items.date)}</p>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-6 text-end d-flex align-items-end justify-content-end">
                                                <p className="time-name-1">{items.time}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </>
                                ))}
                                {selectedTicket && (
                                  <>
                                    {selectedTicket.map((item) => (
                                      <div className="col-12">
                                        <div className="row my-3">
                                          <div className="col-6 justify-content-center">
                                            <p className="mb-0" style={{ fontSize: '15px', height: '30px' }}>Ticket Type</p>
                                            <div className="grediant-border-in-ticket text-center"><p className="mb-0" style={{ fontSize: '12px' }}>{item.name}</p></div>
                                          </div>
                                          <div className="col-6 d-flex justify-content-center">
                                            <div className="d-inline-block">
                                              <div className="text-center">
                                                <p className="mb-0" style={{ fontSize: '16px', height: '30px' }}>Price : {item.ticket_type == 1 ? Eventdata.countrysymbol + item.price + '.00' : 'Free'}</p>
                                              </div>
                                              <div className="">
                                                <div className="row grediant-border d-flex align-items-center mx-1">
                                                  <div className="col-4"><span className="new_cart_btn" onClick={() => removeFromCart(item.id, localQuantities[item.id] || 0)}>-</span></div>
                                                  <div className="col-4"><span>{localQuantities[item.id] || 0}</span></div>
                                                  <div className="col-4"><span className="new_cart_btn" onClick={() => addToCart(item, Eventdata._id)}>+</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {item.description && (
                                            <div className="col-12 ticket-type-dsc">
                                              <p>{item.description}</p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {Eventdata.allprice ? (
                            <>
                              {/* {items.name}
                            {Eventdata.countrysymbol}{items.price}
                            {items.ticket_type == 1 ? () : ()}
                            onClick={() => removeFromCart(items.name, localQuantities[items.name] || 0)}
                            {localQuantities[items.name] || 0}
                            onClick={() => addToCart(items, Eventdata._id)} */}
                              {Eventdata.allprice.map((items, index) => (
                                <>
                                  {items.isdelete === 0 && (
                                    <div className="row my-3">
                                      <div className="col-6 justify-content-center">
                                        <p className="mb-0" style={{ fontSize: '15px', height: '30px' }}>Ticket Type</p>
                                        <div className="grediant-border-in-ticket text-center"><p className="mb-0" style={{ fontSize: '12px' }}>{items.name}</p></div>
                                      </div>
                                      <div className="col-6 d-flex justify-content-center">
                                        <div className="d-inline-block">
                                          <div className="text-center">
                                            <p className="mb-0" style={{ fontSize: '16px', height: '30px' }}>Price : {items.ticket_type == 1 ? Eventdata.countrysymbol + items.price + '.00' : 'Free'}</p>
                                          </div>
                                          <div className="">
                                            {CountSoldOut(items) ? (
                                              <>
                                                <div className="row grediant-border d-flex align-items-center mx-1">
                                                  <div className="col-4"><span className="new_cart_btn" onClick={() => removeFromCart(items.id, localQuantities[items.id] || 0)}>-</span></div>
                                                  <div className="col-4"><span>{localQuantities[items.id] || 0}</span></div>
                                                  <div className="col-4"><span className="new_cart_btn" onClick={() => addToCart(items, Eventdata._id)}>+</span></div>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <button type="button" className="btn theme-bg text-white w-100">Sold Out</button>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ))}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                      <div className="text-center py-2">
                        <span className="main-title">Total Price : {Eventdata.countrysymbol}{eventTotalPrice.toFixed(2)}</span>{" "}
                      </div>
                      <div className="text-center">
                        {Paynowbtnstatus ? (
                          <button onClick={() => saveCartToLocalStorage()} type="button" className="btn theme-bg text-white mt-3 w-100">Pay Now</button>
                        ) : ''}
                      </div>
                    </div>
                    <OrganizerProfile props={Organizerdata} />
                  </div>
                </Row>
              </Container>
            </div>
            <div className="event-category-section mb-5 in-event-page">
              <Container fluid className="">
                {OrganizerEventlist.length > 0 && (
                  <Row className="mt-2">
                    <Col md={12}>
                      <h2 className="desc-sec theme-color">More events from this organiser</h2>
                    </Col>
                    <Col md={12}>
                      <Row className="p-1" >
                        {OrganizerEventlist.map((item, index) => (
                          <>
                            <div className="col-xl-3 col-xxl-3 col-md-4 col-12 mb-3" >
                              <div className="bg-white rounded-10 shadow-bottom pb-3 cursor-pointer overflow-hidden mx-3 mx-md-0" onClick={() => viewEvent(item._id, item.name)} style={{ height: '100%' }}>
                                <div style={{ position: 'relative' }}>
                                  <span className="event-category-img">{item.category_name}</span>
                                  {getCountryFlagImage(item.countryname)}
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
                                  <div className="col-md-7 d-flex align-items-center col-7">
                                    <img className="card-icon-logo me-2" src={item.organizer_logo ? item.organizer_logo : Nouserphoto} alt="" />
                                    <div className="d-flex flex-column align-items-start justify-content-start">
                                      <small className="mb-0 wspace-no" style={{ fontSize: '12px' }}>Originated by</small>
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
                                <div className="desc-h ms-3 fw-bold mb-0">{item.display_name}</div>
                              </div>
                            </div>
                          </>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                )}
                <Row className="event-box-mobile">

                  <Col md={12}>
                    <h2 className="desc-sec theme-color">Other events you may like</h2>
                  </Col>
                  {Eventlist.map((item, index) => (
                    <div className="col-xl-3 col-xxl-3 col-md-4 col-12 mb-3" >
                      <div className="bg-white rounded-10 shadow-bottom pb-3 cursor-pointer overflow-hidden mx-3 mx-md-0" onClick={() => viewEvent(item._id, item.name)} style={{ height: '100%' }}>
                        <div style={{ position: 'relative' }}>
                          <span className="event-category-img">{item.category_name}</span>
                          {getCountryFlagImage(item.countryname)}
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
                          <div className="col-md-7 d-flex align-items-center col-7">
                            <img className="card-icon-logo me-2" src={item.organizer_logo ? item.organizer_logo : Nouserphoto} alt="" />
                            <div className="d-flex flex-column align-items-start justify-content-start">
                              <small className="mb-0 wspace-no" style={{ fontSize: '12px' }}>Originated by</small>
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
                        <div className="desc-h ms-3 fw-bold mb-0">{item.display_name}</div>
                      </div>
                    </div>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;