import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import MobileMenu from '../../components/mobilemenu';
import Whitestarbtn from "../../component/Whitestarbtn";
import Eimage from "../../common/image/eimage.png";
import Hourglasslogo from "../../common/icon/hourglass.svg";
import LocationIcon from "../../common/icon/location.svg";
import Timelogo from "../../common/icon/time 1.svg";
import DateIcon from "../../common/icon/date 2.svg";
import { apiurl, app_url, shortPer, onlyDayMonth } from "../../common/Helpers";
const Home = () => {
    const { orderid } = useParams();
    const [Loader, setLoader] = useState(true);
    const [ApiLoader, setApiLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const [OrderDetails, setOrderDetails] = useState();

    const fetchCartdata = async () => {
        try {
            setLoader(true);
            const requestData = {
                orderid: orderid
            };
            fetch(apiurl + 'order/get-cartdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.listitem);
                        setOrderDetails(data.data);
                    } else {
                        toast.error(data.message)
                    }
                    setLoader(false);
                })
                .catch(error => {
                    toast.error(error.message)
                    setLoader(false);
                });
        } catch (error) {
            toast.error(error.message)
            setLoader(false);
        }
    }
    const HandelUpdateUserDetails = async () => {
        try {
            setApiLoader(true);
            const requestData = {
                orderid: orderid,
                cartdata: Listitems,
            };
            fetch(apiurl + 'order/update-orderdetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        localStorage.removeItem('cart')
                        localStorage.setItem("paymentid_token", data.payment_id)
                        window.location.href = data.url;
                    } else {
                        toast.error(data.message)
                    }
                    setApiLoader(false);
                })
                .catch(error => {
                    toast.error(error.message)
                    setApiLoader(false);
                });
        } catch (error) {
            toast.error(error.message)
            setApiLoader(false);
        }
    }

    const handleNameChange = (itemId, newName) => {
        // Find the item in Listitems based on itemId
        const updatedListitems = Listitems.map((item) => {
            if (item._id === itemId) {
                return { ...item, name: newName };
            }
            return item;
        });

        // Update the state with the new name
        setListitems(updatedListitems);
    };

    const handleGenderChange = (itemId, selectedGender) => {
        // Find the item in Listitems based on itemId
        const updatedListitems = Listitems.map((item) => {
            if (item._id === itemId) {
                return { ...item, gender: selectedGender };
            }
            return item;
        });

        // Update the state with the new gender selection
        setListitems(updatedListitems);
    };


    const isFormValid = () => {
        // Loop through the Listitems array
        for (const item of Listitems) {
            if (!item.name || !item.gender) {
                // Return false if any name or gender is missing
                return false;
            }
        }
        // Return true if all name and gender fields are filled
        return true;
    };
    useEffect(() => {
        fetchCartdata();
    }, []);
    return (
        <>
            {" "}
            <HeaderMenu />
            <div className="mx-lg-4 my-lg-3 bg-primary-color rounded-8 position-relative" style={{ height: '150px' }}>
                <MobileMenu />
            </div>
            <div>
                <Row className="mt-5 mx-lg-4 my-lg-3 ">
                    <Col md={12}>
                        <h2 className="Your-cart-text font-weight-bold">Fill tickets details</h2>
                    </Col>
                    {Loader ? (
                        <Col md={12}>
                            <div className="linear-background w-100"> </div>
                        </Col>
                    ) : (
                        <>
                            <Col md={12}>
                                {Listitems.length > 0 ? (
                                    <>
                                        <Row>
                                            <Col md={8}>
                                                <Row>
                                                    {Listitems.map((item, index) => (
                                                        <Col md={12} className="my-3">
                                                            <div className="event_list_box">
                                                                <Row>
                                                                    <Col md={4}>
                                                                        <img src={item.maineventData[0].thum_image ? item.maineventData[0].thum_image : Eimage} className="list-thum-img" alt="" />
                                                                    </Col>
                                                                    <Col md={5} className="list-data">
                                                                        <div>
                                                                            <span className="list-event-name">{item.maineventData[0].display_name}</span>
                                                                            <p className="list-event-desc mb-0">{shortPer(item.maineventData[0].event_desc, 100)}</p>
                                                                        </div>
                                                                        <div className="list-event-location">
                                                                            <div className="d-flex align-items-center text-center location-name">
                                                                                <img
                                                                                    height={30}
                                                                                    width={30}
                                                                                    src={LocationIcon}
                                                                                    alt=""
                                                                                />{" "}
                                                                                <span>{item.maineventData[0].location}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="desc_data">
                                                                            <div className="organizer-name-sec px-2 py-2">
                                                                                <div className="d-inline-flex align-items-center border-right event-time-area">
                                                                                    <div className="d-inline-block mr-1">
                                                                                        <img height={30} width={30} src={Timelogo} alt="" />
                                                                                    </div>
                                                                                    <div className="d-inline-block">
                                                                                        <span className="event-duration d-block">
                                                                                            Event Time
                                                                                        </span>
                                                                                        <span className="event-time d-block">{item.maineventData[0].start_time}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-inline-flex align-items-center time-ticket-sold-box">
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
                                                                                        <span className="event-time d-block">{item.maineventData[0].event_duration}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={3} className="py-3">
                                                                        <div className="mob-style mr-2">
                                                                            <div className="text-end mr-5">
                                                                                <span className="list-event-category-img">{item.maineventData[0].category_name}</span>
                                                                            </div>
                                                                            <div className="text-end mr-5 mt-3 mb-2">
                                                                                <span className="mb-1">
                                                                                    <img src={DateIcon} alt="" />
                                                                                    <span className="on-img-date-val">{item.maineventData[0].start_date}</span>
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id={`name-${item._id}`} // Use a unique ID for each input
                                                                                    name={`name-${item._id}`} // Use a unique name for each input
                                                                                    placeholder="Enter name"
                                                                                    value={item.name}
                                                                                    onChange={(e) => handleNameChange(item._id, e.target.value)} // Handle name change
                                                                                />
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    type="radio"
                                                                                    className="form-radio"
                                                                                    id={`male-${item._id}`} // Use a unique ID for each radio button
                                                                                    name={`gender-${item._id}`} // Use the same name for both radio buttons within the group
                                                                                    value="male"
                                                                                    checked={item.gender === 'male'} // Use the checked attribute to determine the selected option
                                                                                    onChange={(e) => handleGenderChange(item._id, 'male')} // Handle gender change
                                                                                />
                                                                                <label className="mr-3" htmlFor={`male-${item._id}`}>Male</label>

                                                                                <input
                                                                                    type="radio"
                                                                                    className="form-radio"
                                                                                    id={`female-${item._id}`} // Use a unique ID for each radio button
                                                                                    name={`gender-${item._id}`} // Use the same name for both radio buttons within the group
                                                                                    value="female"
                                                                                    checked={item.gender === 'female'} // Use the checked attribute to determine the selected option
                                                                                    onChange={(e) => handleGenderChange(item._id, 'female')} // Handle gender change
                                                                                />
                                                                                <label htmlFor={`female-${item._id}`}>Female</label>
                                                                            </div>

                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Col>
                                            <Col md={4}>
                                                <div className="cart-amount-box">
                                                    <Card>
                                                        <Card.Body>
                                                            <Row>
                                                                <Col md={6} className="my-2">
                                                                    <h5 className="cart-amount-small-title">Subtotal</h5>
                                                                </Col>
                                                                <Col md={6} className="my-2 text-end">
                                                                    <h5 className="cart-amount-small-amount">Rs. {OrderDetails.amount}</h5>
                                                                </Col>
                                                                <Col md={12} className="py-3">
                                                                    <div className="border-bottom"></div>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <h3 className="cart-amount-small-title theme-color font-600">Total</h3>
                                                                </Col>
                                                                <Col md={6} className="text-end">
                                                                    <h3 className="cart-amount-small-amount theme-color font-600">Rs. {OrderDetails.amount}</h3>
                                                                </Col>

                                                                <Col md={12}>
                                                                    {ApiLoader ? (
                                                                        <Button className='signup-page-btn'>Please wait...</Button>
                                                                    ) : (
                                                                        <div className="mt-3 paynow-btn-box"
                                                                            onClick={() => {
                                                                                if (isFormValid()) {
                                                                                    HandelUpdateUserDetails();
                                                                                } else {
                                                                                    // The form is not valid, show an error message or take appropriate action
                                                                                    toast.error('Please fill in all name and gender fields.');
                                                                                }
                                                                            }}
                                                                        >
                                                                            <span>
                                                                                <Whitestarbtn title={'Submit'} />
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </Col>
                                                            </Row>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <Row>
                                        <Col md={12}>
                                            <Card>
                                                <Card.Body>
                                                    <h2 className="text-danger " style={{ fontWeight: '600' }}>Your cart is empty !</h2>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                )}

                            </Col>
                        </>
                    )}

                </Row>
            </div>
            <Footer />
        </>
    );
};
export default Home;