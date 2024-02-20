import React, { useEffect, useState } from "react";
import Searchicon from '../../../common/icon/searchicon.png';
import ArrowDown from '../../../assets/arrowdrop.svg'
import Norecord from '../../../component/Norecordui';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { FaTimes } from 'react-icons/fa';
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import Noimg from "../../../common/image/noimg.jpg";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Timelogo from "../../../common/icon/time 1.svg";
import withReactContent from 'sweetalert2-react-content';
import LocationIcon from "../../../common/icon/location.svg";
import Eimg from '../../../common/icon/Edit.svg';
import Hourglasslogo from "../../../common/icon/hourglass.svg";
import EditPng from '../../../common/icon/Edit.png';
import DateIcon from "../../../common/icon/date 2.svg";
import ArrowPng from "../../../common/icon/Arrow.svg";
import TranferImg from "../../../common/image/Tranfer.svg";
import { apiurl, isEmail, imgurl, admin_url, customer_url, shortPer, onlyDayMonth, get_date_time, get_min_date, app_url } from '../../../common/Helpers';
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";

import QRCode from 'react-qr-code';
import QRsuccess from '../../../common/icon/qr-code-pay.png';
import { FaCircleCheck } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import Select from 'react-select';
import { Link, useNavigate } from "react-router-dom";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
const Dashboard = ({ title }) => {

    const navigate = useNavigate();
    const Beartoken = localStorage.getItem('userauth');
    const [Loader, setLoader] = useState(false);
    const [ModalLoader, setModalLoader] = useState(true);
    const [Listitems, setListitems] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const [CatDropdownopen, setCatDropdownopen] = useState(false);
    const [Startdate, setStartdate] = useState(new Date());
    const [Endtdate, setEndtdate] = useState(new Date());
    const [viewStartdate, setviewStartdate] = useState();
    const [viewEndtdate, setviewEndtdate] = useState();
    const [valueStartdate, setvalueStartdate] = useState();
    const [valueEndtdate, setvalueEndtdate] = useState();
    const [Isany, setIsany] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [Datetype, setDatetype] = useState();

    const handelStartdatechange = (date) => {
        setStartdate(date);
        const get_start_date = get_date_time(date);
        setviewStartdate(get_start_date[0].Dateview);
        setvalueStartdate(get_min_date(date));
    }
    const handelEnddatechange = (date) => {
        setEndtdate(date);
        const get_end_date = get_date_time(date);
        setviewEndtdate(get_end_date[0].Dateview);
        setvalueEndtdate(get_min_date(date));
    }
    const handleCategoryChange = (id) => {
        if (id == 'any') {
            setSelectedCategories([]);
            setIsany(!Isany);
        } else {
            if (selectedCategories.includes(id)) {
                setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id));
            } else {
                setSelectedCategories([...selectedCategories, id]);
            }
            setIsany(false);
        }
    };
    useEffect(() => {
        // Check if there are selected categories and if allEvents is not empty
        if (selectedCategories.length > 0 && allEvents.length > 0) {
            // Filter events where the category ID of the event matches any of the selected category IDs
            const filteredEvents = allEvents.filter(event =>
                event.eventData[0].category && selectedCategories.includes(event.eventData[0].category.toString())
            );
            setListitems(filteredEvents);
        } else if (selectedCategories.length === 0) {
            // If no categories are selected, potentially show all events or handle accordingly
            setListitems(allEvents); // Or a different handling if needed when no categories are selected
        }
    }, [selectedCategories, allEvents]);

    const [Daterange, setDaterange] = useState(false);

    const [Ordersavedata, setOrdersavedata] = useState();
    const [Orderitemlist, setOrderitemlist] = useState();
    const [OrderData, setOrderData] = useState();
    const [CustomerData, setCustomerData] = useState();
    const [Isscan, setIsscan] = useState(false);
    const [modal, setModal] = useState(false);
    const [ShowQr, setShowQr] = useState(false);

    const [modalTT, setModalTT] = useState(false);

    const [quantity, setQuantity] = useState();
    const [Transferid, setTransferid] = useState();
    const [Emailid, setEmailid] = useState(1);
    const [TTloader, setTTloader] = useState(false);

    const handleQuantityChange = (event) => {
        const inputValue = parseInt(event.target.value, 10); // Parse the input value as an integer

        // Check if the input value is a number and within the range
        if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= Orderitemlist.length) {
            setQuantity(inputValue); // Update the quantity state
        }
    };

    const MySwal = withReactContent(Swal);

    const generateRandomNumber = () => {
        return Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    };

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Now filter the events based on the search term
        if (value) {
            const filteredEvents = allEvents.filter(event =>
                event.eventData[0].display_name.toLowerCase().includes(value.toLowerCase()));
            setListitems(filteredEvents);
        } else {
            // If the search term is empty, reset to show all events
            setListitems(allEvents);
        }
    };

    const HandelDatefilterreset = () => {
        setviewStartdate('');
        setviewEndtdate('');
        setvalueStartdate('');
        setvalueEndtdate('');
        setListitems(allEvents);
        setDaterange(!Daterange);
        setDatetype('');
    }
    // const HandelDatefilter = () => {
    //     if (!valueStartdate) {
    //         return toast.error('Start date is requied')
    //     }
    //     if (!valueEndtdate) {
    //         return toast.error('End date is requied')
    //     }
    //     handleDateRangeChange(valueStartdate, valueEndtdate);
    // }
    const handelDateselectchange = (value) => {
        if (value && value.length > 0) {
            setDatetype(value);
            setDaterange(!Daterange);
        }
    };
    const handleDateRangeChange = (e) => {
        e.preventDefault();
        if (Datetype && Datetype == 'Pick between two dates') {
            if (valueStartdate && valueEndtdate) {
                const filteredEvents = allEvents.filter(event => {
                    const eventStart = event.eventData[0].start_mindate;
                    const eventEnd = event.eventData[0].end_mindate;

                    // Check if the event's date range is within the given date range
                    return eventStart >= valueStartdate && eventEnd <= valueEndtdate;
                });
                setListitems(filteredEvents);
                setDaterange(!Daterange);
            } else {
                setListitems(allEvents);
                return toast.error('Start and end date is required');
            }
        } else {
            if (valueStartdate) {
                const filteredEvents = allEvents.filter(event => {
                    const eventStart = event.eventData[0].start_mindate;
                    // Check if the event's date range is within the given date range
                    return eventStart >= valueStartdate;
                });
                setListitems(filteredEvents);
                setDaterange(!Daterange);
            } else {
                setListitems(allEvents);
                return toast.error('Date is required');
            }
        }
        // if (startDate && endDate) {
        //     const filteredEvents = allEvents.filter(event => {
        //         const eventStart = event.eventData[0].start_mindate;
        //         const eventEnd = event.eventData[0].end_mindate;

        //         // Check if the event's date range is within the given date range
        //         return eventStart >= startDate && eventEnd <= endDate;
        //     });
        //     setListitems(filteredEvents);
        // } else {
        //     // If either startDate or endDate is missing, reset to show all events
        //     setListitems(allEvents);
        // }
        // setDaterange(!Daterange);
    };

    // const HandelTransferTicket = async () => {
    //     try {
    //         setTTloader(true)
    //         if (!Emailid && !isEmail(Emailid)) {
    //             return toast.error('Enter valid email id');
    //         }
    //         if (quantity < 1) {
    //             return toast.error('Enter valid quantity');
    //         }
    //         if (!Transferid) {
    //             return toast.error('Server issue try again');
    //         }
    //         const requestData = {
    //             id: Transferid,
    //             email: Emailid,
    //             ticketquantity: quantity,
    //         };
    //         fetch(apiurl + 'order/tickets-transfer', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${Beartoken}`,
    //             },
    //             body: JSON.stringify(requestData),
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.success == true) {
    //                     toast.success('Transfer successfully');
    //                     setModalTT(!modalTT);
    //                 } else {
    //                     toast.success(data.message);
    //                 }
    //                 setTTloader(false)
    //             })
    //             .catch(error => {
    //                 console.error('Insert error:', error);
    //                 setTTloader(false)
    //             });
    //     } catch (error) {
    //         console.error('Api error:', error);
    //         setTTloader(false)
    //     }
    // }
    const fetchmyEvent = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'order/customer/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const filteredData = data.data.filter(item =>
                            item.eventData.length > 0 && item.eventData[0].end_mindate >= get_min_date(new Date())
                        );
                        // Now set the state with the filtered data
                        setListitems(filteredData);
                        setAllEvents(filteredData);
                    }
                    setLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false)
        }
    }
    const fetchCategory = async () => {
        try {
            fetch(apiurl + 'category/get-category-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setCategoryList(data.data);
                        // const transformedCategories = data.data.map(category => ({
                        //     value: category._id,
                        //     label: category.name
                        // }));
                        // const allOption = { value: 'all', label: 'All' };
                        // transformedCategories.unshift(allOption);

                        // // Update CategoryList state
                        // setCategoryList(transformedCategories);
                    } else {

                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const fetchOrderData = async (id, type) => {
        try {
            setModalLoader(true);
            setShowQr(false);
            const requestData = {
                id: id
            };
            fetch(apiurl + 'order/get-order-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        if (type == 2) {
                            const filteredItems = data.data.orderitemlist.filter(item => item.owner_id === data.data.ordersavedata.customer_id);
                            setOrderitemlist(filteredItems);
                        } else {
                            setOrderitemlist(data.data.orderitemlist);
                        }
                        setOrdersavedata(data.data.ordersavedata);
                        console.log("sp",data.data.orderitemlist.length)
                        if (data.data.orderitemlist.length > 0) {
                            const check = data.data.orderitemlist.every(item => item.scan_status === "1");
                            setIsscan(check);
                        } else {
                            setIsscan(false);
                        }
                        setOrderData(data.data.orderData);
                        setCustomerData(data.data.customerData);
                    }
                    setModalLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setModalLoader(false);
                });
        } catch (error) {
            toast.error(error);
            setModalLoader(false);
        }
    }
    useEffect(() => {
        if (!Beartoken) {
            return navigate(app_url)
        }
        fetchmyEvent();
        fetchCategory();
    }, []);

    const [SelectCategoryValue, setSelectCategoryValue] = useState();
    const HandelselectCategory = (selectedValue) => {
        setSelectCategoryValue(selectedValue);
        if (selectedValue && selectedValue.value !== 'all') {
            // Filter events based on the selected category
            const filteredEvents = allEvents.filter(event =>
                event.eventData[0].category && event.eventData[0].category === selectedValue.value);
            setListitems(filteredEvents);
        } else {
            // If 'All' is selected or no category is selected, show all events
            setListitems(allEvents);
        }
    };
    const CategoryOption = [
        {
            options: CategoryList
        }
    ]

    const [checkedItemIds, setCheckedItemIds] = useState([]);

    // Handle checkbox change
    const handleCheckboxChange = (id) => {
        setCheckedItemIds(prevIds => {
            if (prevIds.includes(id)) {
                // Remove id from the array if it's already included
                return prevIds.filter(item => item !== id);
            } else {
                // Add id to the array
                return [...prevIds, id];
            }
        });
    };
    const [Orderid, setOrderid] = useState('');
    const [TransferLoader, setTransferLoader] = useState(false);
    const [ticketQuantity, setTicketQuantity] = useState('');
    const HandelTransferTicket = async () => {
        try {
            if (!Orderid) {
                return toast.error('Server error try again !');
            }
            if (!Emailid || !isEmail(Emailid)) {
                return toast.error('Enter valid email id');
            }
            setTransferLoader(true);
            const requestData = {
                id: Orderid,
                email: Emailid,
                itemid: checkedItemIds
            };
            fetch(apiurl + 'order/tickets-transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Transfer successfully');
                        setModalTT(!modalTT);
                        setEmailid('');
                        setTicketQuantity('');
                    } else {
                        toast.error(data.message);
                    }
                    setTransferLoader(false);
                })
                .catch(error => {
                    console.error(error.message);
                    setTransferLoader(false);
                });
        } catch (error) {
            toast.error(error);
            setTransferLoader(false);
        }
    }
    return (
        <>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} centered size={'xl'}>
                <ModalHeader toggle={!modal}>Order Details
                    <button className="close p-0" onClick={() => setModal(!modal)} style={{ position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'transparent' }}>
                        <FaTimes />
                    </button>
                </ModalHeader>
                <ModalBody>
                    <Row className="justify-content-center">
                        {ModalLoader ? (
                            <>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                            </>
                        ) : (
                            <>
                                <Col md={6} xl={2} className="tickets-data-text">
                                    <div>
                                        <h5 className="text-bold">Email :</h5>
                                        <p>{CustomerData.email}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">Phone :</h5>
                                        <p>{CustomerData.phone_number}</p>
                                    </div>
                                    {/* <div>
                                        <h5 className="text-bold">Address :</h5>
                                        <p>{CustomerData.address} {CustomerData.address ? (',' + CustomerData.address) : ''}</p>
                                    </div> */}
                                </Col>
                                <Col md={6} xl={2} className="tickets-data-text">
                                    {/* <div>
                                        <h5 className="text-bold">Event Name :</h5>
                                        <p>{OrderData.name ? OrderData.name : '--'}</p>
                                    </div> */}
                                    {/* <div>
                                        <h5 className="text-bold">State :</h5>
                                        <p>{CustomerData.state ? CustomerData.state : '--'}</p>
                                    </div> */}
                                    <div>
                                        <h5 className="text-bold">Country :</h5>
                                        <p>{CustomerData.country ? CustomerData.country : '--'}</p>
                                    </div>
                                </Col>
                                <Col md={6} xl={3} className="tickets-data-text">
                                    <div>
                                        <h5 className="text-bold">BOOKING ID :</h5>
                                        <p>{Ordersavedata.bookingid}</p>
                                    </div>
                                    {/* <div>
                                        <h5 className="text-bold">TYPE :</h5>
                                        <p>{Ordersavedata.order_amount && Ordersavedata.order_amount > 0 ? 'Paid' : 'Free'}</p>
                                    </div> */}
                                    <div>
                                        <h5 className="text-bold">Total Ticket :</h5>
                                        <p>{Orderitemlist.length}</p>
                                    </div>
                                    {/* {Orderitemlist.length > 0 ? (
                                        <div>
                                            {ShowQr ? (
                                                <button className="btn btn-success list-Ticket-mng-1" onClick={() => setShowQr(!ShowQr)} type="button">Hide All Scanners</button>
                                            ) : (
                                                <button className="btn btn-success list-Ticket-mng-1" onClick={() => setShowQr(!ShowQr)} type="button">View All Scanners</button>
                                            )}
                                        </div>
                                    ) : ''} */}
                                </Col>
                                {/* <Col md={6} xl={4}>
                                    <div className="tickets-data-text-last">
                                        <h4 style={{ fontWeight: '700' }}>Tickect Scan Status</h4>
                                        {Isscan ? (
                                            <span class="badge-theme-success badge-theme"><FaCircleCheck /> Success</span>
                                        ) : (
                                            <span class="badge-theme-warning badge-theme"><FaClock /> Pending</span>
                                        )}
                                    </div>
                                    <div className="d-none">
                                        <div className="row my-2">
                                            {Orderitemlist.map((item, index) => (
                                                <div className="col-6 col-md-4 col-lg-3 col-xl-3">
                                                    <div className="m-2 text-center">
                                                        {item.is_transfer == 1 ? (
                                                            <img style={{ height: "auto", width: "50px" }} src={QRsuccess} className="qr-scanner-success" alt="" />
                                                        ) : (
                                                            <>
                                                                {item.scan_status == 0 ? (
                                                                    <QRCode style={{ height: "auto", width: "50px" }} value={JSON.stringify({ id: item._id, time: 1, index: index })} />
                                                                ) : (
                                                                    <img style={{ height: "auto", width: "50px" }} src={QRsuccess} className="qr-scanner-success" alt="" />
                                                                )
                                                                }
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Col> */}
                                <Col md={12}>
                                    <Row className="pt-2 mt-4 justify-content-center" style={{ borderTop: '1px solid #eee' }}>
                                    <h4 style={{ fontWeight: '700' }}>Tickect Scan Status</h4>
                                        {Orderitemlist.map((item, index) => (
                                            <Col md={3}>
                                                <div className="ticket-box">
                                                    <div className="ticket-qr text-center">
                                                        {item.is_transfer == 1 ? (
                                                            <>
                                                                <img src={QRsuccess} className="qr-scanner-success dashqrbig" alt="" />
                                                                <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                <p className="mb-0 mt-4" style={{ fontWeight: 600, color: '#000' }}>Transferred to</p>
                                                                <span class="mt-0 badge-theme-success badge-theme mt-3 mb-3 d-block w-100"><FaCircleCheck /> {item.owner_email}</span>
                                                            </>
                                                        ) : (
                                                            <div className="text-center">
                                                                {item.scan_status == 0 ? (
                                                                    <>
                                                                        <div className="transfer_box" style={{ position: 'relative' }}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={checkedItemIds.includes(item._id)}
                                                                                onChange={() => handleCheckboxChange(item._id)}
                                                                                style={{ position: 'absolute', top: '10px', left: '10px' }}
                                                                            />
                                                                            <QRCode className="dashqrbig" value={JSON.stringify({ id: item._id, time: 1, index: index })} />
                                                                            <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                            <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                            <p className="mb-0 mt-1" style={{ fontWeight: 600, color: '#000' }}>Scan status</p>
                                                                            <span class="mt-0 badge-theme-warning badge-theme mt-3 mb-3 d-block w-100"><FaClock /> Pending</span>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <img src={QRsuccess} className="qr-scanner-success dashqrbig" alt="" />
                                                                        <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                        <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                        <p className="mb-0 mt-1" style={{ fontWeight: 600, color: '#000' }}>Scan status</p>
                                                                        <span class="mt-0 badge-theme-success badge-theme mt-3 mb-3 d-block w-100"><FaCircleCheck /> Success</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                        {checkedItemIds.length > 0 ? (
                                            <>
                                                <Col md={12}></Col>
                                                <Col md={3}>
                                                    <button type="button" onClick={() => { setModal(!modal); setModalTT(!modalTT); setModalLoader(false) }} className="w-100 btn btn-success">Transfer</button>
                                                </Col>
                                            </>
                                        ) : ''}
                                    </Row>
                                </Col>
                            </>
                        )}
                    </Row>
                </ModalBody>
            </Modal>
            <Modal isOpen={modalTT} toggle={() => setModalTT(!modalTT)} centered size={'lg'}>
                <ModalHeader toggle={!modalTT}>
                    Transfer Ticket
                    <button className="close p-0" onClick={() => setModalTT(!modalTT)} style={{ position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'transparent' }}>
                        <FaTimes />
                    </button>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        {ModalLoader ? (
                            <>
                                <Col md={6}><div className="linear-background w-100"> </div></Col>
                                <Col md={6}><div className="linear-background w-100"> </div></Col>
                            </>
                        ) : (
                            <>
                                <Col md={6}>
                                    <h3 style={{ fontWeight: '600', color: '#0047AB' }} className="mb-4">Transfer Ticket</h3>
                                    <div class="input-group input-warning-o">
                                        <input type="text" class="form-control px-2 py-3 mb-3" onChange={(e) => setEmailid(e.target.value)} value={Emailid} placeholder="Email Id" />
                                    </div>
                                    <div>
                                        <h5 className="text-bold">total Ticket :</h5>
                                        <p>{checkedItemIds.length}</p>
                                    </div>
                                    {TransferLoader ? (
                                        <button disabled className="mb-0 mr-5 btn btn-dark list-Ticket-mng-1" type="button">Please wait...</button>
                                    ) : (
                                        <>
                                            {checkedItemIds.length > 0 ? (
                                                <div className="mr-5 pt-5">
                                                    <button onClick={() => HandelTransferTicket()} className="mb-0 mr-5  btn btn-success list-Ticket-mng-1" type="button">Transfer Ticket</button>
                                                </div>
                                            ) : (
                                                <div className="mr-5 pt-5">
                                                    <button disabled className="mb-0 mr-5 btn btn-dark list-Ticket-mng-1" type="button">No Ticket Found</button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Col>
                                <Col md={6}>
                                    <img className="TranferImg-css" src={TranferImg}></img>
                                </Col>
                            </>
                        )}
                    </Row>
                </ModalBody>
            </Modal>
            <Modal isOpen={Daterange} toggle={() => setDaterange(!Daterange)} centered>
                <ModalHeader toggle={() => setDaterange(!Daterange)}>Select date</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleDateRangeChange}>
                        <Row>
                            <Col md={6} className="mb-2 mt-0">
                                <label htmlFor="" className="text-black">{Datetype && Datetype == 'Pick between two dates' ? 'Start Date' : 'Select A Date'} </label>
                                <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                    <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                    <input type="text" class="pl-5 form-control date-border-redius date-border-redius-input date_filter" placeholder="Select date" readOnly value={viewStartdate} />
                                    <div className="date-style-picker">
                                        <Flatpickr
                                            value={Startdate}
                                            id='date-picker'
                                            className='form-control'
                                            onChange={date => handelStartdatechange(date)}
                                        />
                                    </div>
                                </div>
                            </Col>
                            {Datetype && Datetype == 'Pick between two dates' ? (
                                <Col md={6} className="mb-2 mt-0">
                                    <label htmlFor="" className="text-black">End Date</label>
                                    <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                        <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                        <input type="text" class="pl-5 form-control date-border-redius date-border-redius-input date_filter" placeholder="Select date" readOnly value={viewEndtdate} />
                                        <div className="date-style-picker">
                                            <Flatpickr
                                                value={Endtdate}
                                                id='date-picker'
                                                className='form-control'
                                                onChange={date => handelEnddatechange(date)}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            ) : (<Col md={6} className="mb-2 mt-0"></Col>)}
                            <Col md={6}>
                                <button className="mb-0 mr-5  btn theme-bg text-white list-Ticket-mng-1 w-100" type="submit">Filter</button>
                            </Col>
                            <Col md={6}>
                                <button onClick={HandelDatefilterreset} className="mb-0 mr-5  btn btn-dark list-Ticket-mng-1 w-100" type="button">Reset</button>
                            </Col>
                        </Row>
                    </form>
                </ModalBody>
            </Modal>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4 grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12} style={{ position: 'relative', zIndex: '2' }} className="mb-md-3 mb-xl-2">
                                            <Row>
                                                <Col md={6} xl={3}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text" style={{height: 38}}><img src={Searchicon} alt="" /></span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search"
                                                            value={searchTerm}
                                                            onChange={handleSearchChange}
                                                            style={{height: 40}}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6} xl={3} className="react-select-h mb-3 dash-select-box">
                                                    <div style={{ position: 'relative' }}>
                                                        <div className="event-page-category-filter-box" onClick={() => setCatDropdownopen(!CatDropdownopen)}>
                                                            <p className="mb-0 theme-color">Select Category</p>
                                                            <img src={ArrowDown} alt="" />
                                                        </div>
                                                        {CatDropdownopen && (
                                                            <div className="category-box-new-for-dashboard">
                                                                <div>
                                                                    <div>
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`checkbox-any`}
                                                                            name={'any'}
                                                                            checked={Isany}
                                                                            onChange={() => handleCategoryChange('any')}
                                                                        />
                                                                        <label style={{ marginLeft: '10px' }} htmlFor={`checkbox-any`}>Any</label>
                                                                    </div>
                                                                    {CategoryList.map((item) => (
                                                                        <div key={item._id}>
                                                                            <input
                                                                                type="checkbox"
                                                                                id={`checkbox-${item._id}`}
                                                                                name={item.name}
                                                                                checked={selectedCategories.includes(item._id)}
                                                                                onChange={() => handleCategoryChange(item._id)}
                                                                            />
                                                                            <label style={{ marginLeft: '10px' }} htmlFor={`checkbox-${item._id}`}>{item.name}</label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col md={6} xl={3}>
                                                    {/* <div class="input-group mb-3 input-warning-o" onClick={() => setDaterange(!Daterange)}>
                                                        <span class="input-group-text search-box-icon-1"><FiClock /></span>
                                                        <input style={{ cursor: 'pointer' }} type="text" class="form-control" value={viewStartdate && viewEndtdate ? viewStartdate + '-' + viewEndtdate : ''} placeholder="Date range" />
                                                        <span class="input-group-text search-box-icon-1"><FiChevronDown /></span>
                                                    </div> */}
                                                    <div className="selectDiv" style={{ marginRight: '0px' }}>
                                                        <select
                                                            className="form-select category me-4"
                                                            aria-label="Default select example"
                                                            value={Datetype}
                                                            onChange={(event) => { handelDateselectchange(event.target.value) }}
                                                            style={{ paddingTop: '8px', height: '40px', color: '#0047ab' }}
                                                        >
                                                            <option value=''>Date</option>
                                                            <option value='Pick a date'>Date Picker</option>
                                                            <option value='Pick between two dates'>Date Range Picker</option>
                                                        </select>
                                                        <img className="select-arrow-custome" src={ArrowDown} alt="" />
                                                    </div>
                                                </Col>
                                                <Col md={6} xl={3}>
                                                    <button className="w-100 theme-btn" onClick={() => navigate(app_url + 'events')}>
                                                        <span className="theme-btn-icon"><FiPlus /></span> <span>Buy Tickets</span>
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        {Loader ? (
                                            <div className="linear-background w-100"> </div>
                                        ) : (
                                            <>
                                                {Listitems.length > 0 ? (
                                                    <>
                                                        {Listitems.map((item, index) => (
                                                            <Col md={12} className="event_list_box_main my-sm-5 my-lg-5 my-xl-5">
                                                                <Link to={`${customer_url}support-tickets/${item.eventData[0]._id}/${item._id}`}><button className="list-rais-ticket-btn" type="button">Raise Ticket</button></Link>
                                                                <button className="list-active-ticket-btn" onClick={() => { setModal(!modal); fetchOrderData(item._id, 1) }} type="button">Ticket <img src={ArrowPng} className="arraw-svg ml-3" alt="" /></button>
                                                                <div className="event_list_box">
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            <div className="dash-list-banner-1">
                                                                                <img src={item.eventData[0].thum_image ? item.eventData[0].thum_image : Noimg} className="list-thum-img" alt="" />
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={5} className="list-data">
                                                                            <div>
                                                                                <Link to={`${app_url}event/${item.eventData[0]._id}/${item.eventData[0].name}`}><span className="list-event-name">{item.eventData[0].name}</span></Link>
                                                                                <p className="list-event-desc mb-0">{shortPer(item.eventData[0].event_desc, 100)}</p>
                                                                            </div>
                                                                            <div className="list-event-location mb-xl-3 mb-1">
                                                                                <div className="d-flex align-items-center text-center location-name">
                                                                                    <img
                                                                                        height={30}
                                                                                        width={30}
                                                                                        src={LocationIcon}
                                                                                        alt=""
                                                                                    />{" "}
                                                                                    <span>{item.eventData[0].location}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="desc_data">
                                                                                <div className="organizer-name-sec px-2 py-2">
                                                                                    <div className="d-inline-flex align-items-center border-right event-time-area">
                                                                                        <div className="d-inline-block mr-1">
                                                                                            <img style={{width:20}} height={30} width={30} src={Timelogo} alt="" />
                                                                                        </div>
                                                                                        <div className="d-inline-block">
                                                                                            <span className="event-duration d-block">
                                                                                                Event Time
                                                                                            </span>
                                                                                            <span className="event-time d-block">{item.eventData[0].start_time}</span>
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
                                                                                            <span className="event-time d-block">{item.eventData[0].event_duration}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={3} className="py-3">
                                                                            <div className="mob-style">
                                                                                <div className="text-end mr-5">
                                                                                    <span className="list-event-category-img">{item.eventData[0].category_name}</span>
                                                                                </div>
                                                                                <div className="text-end mr-5 mt-3 mb-3">
                                                                                    <span className="mb-5">
                                                                                        <img src={DateIcon} alt="" />
                                                                                        <span className="on-img-date-val ml-2">{item.eventData[0].start_date}</span>
                                                                                    </span>
                                                                                </div>

                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <Norecord />
                                                )}
                                            </>
                                        )}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >

        </>
    )
}
export default Dashboard;