import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import Searchicon from '../../../common/icon/searchicon.png';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import EditPng from '../../../common/icon/Edit.png';
import ArrowPng from "../../../common/icon/Arrow.svg";
import Norecord from '../../../component/Norecordui';
import DateIcon from "../../../common/icon/date 1.svg";
import TimeIcon from "../../../common/icon/time 1.svg";
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from 'react-router-dom';
import { apiurl, organizer_url, get_date_time } from '../../../common/Helpers';
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap'
const Dashboard = ({ title }) => {
    const [Loader, setLoader] = useState(false);
    const { id, name } = useParams();
    const navigate = useNavigate();
    const [Ticketshow, setTicketshow] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const [allEvents, setallEvents] = useState([]);
    const [Ticketsoldlist, setTicketsoldlist] = useState([]);
    const [Eventdata, setEventdata] = useState([]);
    const [Tickettype, setTickettype] = useState(1);
    const [IsTicketMultiple, setIsTicketMultiple] = useState();
    const [Ticketname, setTicketname] = useState();
    const [Description, setDescription] = useState();
    const [TicketId, setTicketId] = useState();
    const [Ticketoldname, setTicketoldname] = useState();
    const [Quantity, setQuantity] = useState();
    const [TicketStartdate, setTicketStartdate] = useState(new Date());
    const [TicketEndtdate, setTicketEndtdate] = useState(new Date());
    const [Price, setPrice] = useState();
    const [Tax, setTax] = useState();
    const [Pricedisable, setPricedisable] = useState(false);
    const [ApiLoader, setApiLoader] = useState(false);
    const [EditApiLoader, setEditApiLoader] = useState(false);
    const [IsEdit, setIsEdit] = useState(false);

    const MySwal = withReactContent(Swal);
    const fetchAllTicket = async () => {
        try {
            setLoader(true);
            const requestData = {
                updateid: id
            };
            fetch(apiurl + 'event/ticket-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {

                    if (data.success == true) {
                        const fetchdata = data.data.allprice;
                        setTicketsoldlist(data.ticketdata);
                        setListitems(fetchdata);
                        setallEvents(fetchdata);
                    }
                    setLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false);
                });

        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }

    const CountTicketSold = (name) => {
        const filteredList = Ticketsoldlist.filter(item => item.ticket_name === name);
        return filteredList.length;
    }
    const fetchEvent = async () => {
        try {
            setLoader(true);
            const requestData = {
                id: id
            };
            fetch(apiurl + 'event/get-details', {
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
                    }
                    setLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false);
                });

        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    const fromticketgetdate = get_date_time(TicketStartdate);
    var ticketstartdate = '';
    var ticketstarttime = '';
    if (fromticketgetdate) {
        ticketstartdate = fromticketgetdate[0].Dateview;
        ticketstarttime = fromticketgetdate[0].Timeview;
    }
    const toticketgetdate = get_date_time(TicketEndtdate);
    var ticketenddate = '';
    var ticketendtime = '';
    if (toticketgetdate) {
        ticketenddate = toticketgetdate[0].Dateview;
        ticketendtime = toticketgetdate[0].Timeview;
    }
    const handelCreateTicket = async () => {
        try {
            if (!Tickettype) {
                return toast.error('Select ticket type');
            }
            if (!Ticketname) {
                return toast.error('Enter ticket name');
            }
            if (!Quantity) {
                return toast.error('Enter ticket quantity');
            }
            if (!Price && Tickettype == 1) {
                return toast.error('Enter ticket price');
            }
            // if (!Tax && Tickettype == 1) {
            //     return toast.error('Enter tax amount or 0');
            // }
            setApiLoader(true);
            const requestData = {
                tax: 0,
                updateid: id,
                ticket_type: Tickettype,
                name: Ticketname,
                description: Description,
                quantity: Quantity,
                startdate: ticketstartdate,
                endtdate: ticketenddate,
                starttime: ticketstarttime,
                endttime: ticketendtime,
                price: Price,
                start_date_min: TicketStartdate,
                end_date_min: TicketEndtdate
            };
            fetch(apiurl + 'event/update/price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setApiLoader(false);
                    setTicketshow(false);
                    if (data.success == true) {
                        toast.success('Updated', {
                            duration: 3000,
                        });
                        emptyPriceForm();
                        fetchAllTicket();
                    } else {
                        toast.error(data.message);
                    }
                    setApiLoader(false);
                })
                .catch(error => {
                    setApiLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiLoader(false);
        }
    }
    const handelEditTicketform = async () => {
        try {
            if (!Tickettype) {
                return toast.error('Select ticket type');
            }
            if (!Ticketname) {
                return toast.error('Enter ticket name');
            }
            if (!Quantity) {
                return toast.error('Enter ticket quantity');
            }
            if (!Price && Tickettype == 1) {
                return toast.error('Enter ticket price');
            }
            if (!Tax && Tickettype == 1) {
                return toast.error('Enter tax amount or 0');
            }
            setApiLoader(true);
            const requestData = {
                tax: Tax,
                updateid: id,
                ticketid: TicketId,
                ticket_type: Tickettype,
                name: Ticketname,
                description: Description,
                oldname: Ticketoldname,
                quantity: Quantity,
                startdate: ticketstartdate,
                endtdate: ticketenddate,
                starttime: ticketstarttime,
                endttime: ticketendtime,
                price: Price,
                start_date_min: TicketStartdate,
                end_date_min: TicketEndtdate
            };
            fetch(apiurl + 'event/edit/price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setApiLoader(false);
                    setTicketshow(false);
                    if (data.success == true) {
                        toast.success('Updated', {
                            duration: 3000,
                        });
                        emptyPriceForm();
                        fetchAllTicket();
                    } else {
                        toast.error(data.message);
                    }
                    setApiLoader(false);
                })
                .catch(error => {
                    setApiLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiLoader(false);
        }
    }
    const HandelTicketEdit = async (ticketid) => {
        try {
            const requestData = {
                updateid: id
            };
            fetch(apiurl + 'event/ticket-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {

                    if (data.success == true) {
                        const fetchdata = data.data.allprice;
                        const targetID = ticketid; // Provide the name you want to filter
                        const filteredData = fetchdata.filter(item => item.id === targetID);
                        if (filteredData.length > 0) {
                            setIsEdit(true);
                            setTicketshow(!Ticketshow);
                            // setEditApiLoader(true);
                            setIsTicketMultiple(data.data.event_subtype_id);
                            setTickettype(filteredData[0].ticket_type);
                            setTicketname(filteredData[0].name);
                            setTicketId(filteredData[0].id);
                            setQuantity(filteredData[0].quantity);
                            setPrice(filteredData[0].ticket_amount);
                            setTicketoldname(filteredData[0].name);
                            setTax(filteredData[0].tax_value ? filteredData[0].tax_value : 0);
                            setTicketStartdate(filteredData[0].start_date_min[0] ? filteredData[0].start_date_min : null);
                            setTicketEndtdate(filteredData[0].end_date_min[0] ? filteredData[0].end_date_min : null);
                            setEditApiLoader(false);
                        } else {
                            toast.error("Server issue");
                        }
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });

        } catch (error) {
            console.error('Api error:', error);
        }
    }
    function emptyPriceForm() {
        setTickettype(1);
        setTicketname('');
        setTicketId('');
        setQuantity('');
        setPrice('');
        setPricedisable(false);
    }
    useEffect(() => {
        fetchAllTicket();
        fetchEvent();
    }, []);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        // Now filter the events based on the search term
        if (value) {

            const filteredEvents = allEvents.filter(event =>
                event.name.toLowerCase().includes(value.toLowerCase()));
            setListitems(filteredEvents);
        } else {
            // If the search term is empty, reset to show all events
            setListitems(allEvents);
        }
    };
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4 grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            <Row>
                                                <Col md={5}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search ticket name"
                                                            value={searchTerm}
                                                            onChange={handleSearchChange}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <button className="w-100 theme-btn-warning" onClick={() => navigate(`${organizer_url}event/mange-attendee/${Eventdata._id}/${Eventdata.name}`)}>
                                                        <span>Mange All Attendee</span>
                                                    </button>
                                                </Col>
                                                <Col md={2}></Col>
                                                <Col md={2}>
                                                    <button className="w-100 theme-btn" onClick={() => { setTicketshow(true); setIsEdit(false); }}>
                                                        <span className="theme-btn-icon"><FiPlus /></span> <span>Add Ticket</span>
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
                                                            <Col md={12} className="event_list_box_main in-ticket-list-1">
                                                                <button onClick={() => navigate(`${organizer_url}event/mange-attendee/${Eventdata._id}/${Eventdata.name}/${item.name}`)} className="list-active-ticket-btn" type="button">Attendee  <img src={ArrowPng} className="arraw-svg ml-3" alt="" /></button>
                                                                <div className="event_list_box">
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            <div className="text-center">
                                                                                <span className="ticket-list-name">{item.name}</span> <span className="cursor-pointre list-event-edit-btn" onClick={() => HandelTicketEdit(item.id)}><img src={EditPng} alt="" /></span>
                                                                                <p className="ticket-list-price_title mb-0">Price</p>
                                                                                <p className="ticket-list-price_value">{item.ticket_type == 1 ? Eventdata.countrysymbol + ' ' + item.price : 'Free'}</p>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={8}>
                                                                            <div>
                                                                                <Row className="pt-4">
                                                                                    <Col md={3} className="ticket-sts-box  text-center border-right">
                                                                                        <p>Total Ticket</p>
                                                                                        <h2>{item.quantity}</h2>
                                                                                    </Col>
                                                                                    <Col md={3} className="ticket-sts-box  text-center  border-right">
                                                                                        <p>Ticket Sold</p>
                                                                                        <h2>{CountTicketSold(item.name)}</h2>
                                                                                    </Col>
                                                                                    <Col md={3} className="ticket-sts-box  text-center  border-right">
                                                                                        <p>Ticket Available</p>
                                                                                        <h2><h2>{parseInt(item.quantity, 10) - parseInt(CountTicketSold(item.name), 10)}</h2></h2>
                                                                                    </Col>
                                                                                    <Col md={3} className="ticket-sts-box  text-center">
                                                                                        <p>Revenue</p>
                                                                                        <h2>
                                                                                            <h2>
                                                                                                {item.price > 0 ? (
                                                                                                    <>
                                                                                                        {Eventdata.countrysymbol}{parseInt(item.price, 10) * parseInt(CountTicketSold(item.name), 10)}
                                                                                                    </>
                                                                                                ) : 'FREE'}

                                                                                            </h2>
                                                                                        </h2>
                                                                                    </Col>
                                                                                </Row>
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
            <Modal isOpen={Ticketshow} toggle={() => setTicketshow(!Ticketshow)} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent'>Manage Ticket
                    <button className="close p-0" onClick={() => setTicketshow(!Ticketshow)} style={{ position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'transparent' }}>
                        <FaTimes />
                    </button>
                </ModalHeader>
                <ModalBody className=''>
                    {EditApiLoader ? (
                        <div className="linear-background w-100"> </div>
                    ) : (
                        <Row>
                            <Col md={12} className="justify-content-center d-flex">
                                <div className="tab-button-box">
                                    {/* tab-button-active */}
                                    <span onClick={() => { setTickettype(1); setPricedisable(false); }} className={Tickettype === 1 ? "tab-button-active" : ""}>Paid</span>
                                    <span onClick={() => { setTickettype(2); setPricedisable(true); setPrice(''); }} className={Tickettype === 2 ? "tab-button-active" : ""}>Free</span>
                                    {/* <span onClick={() => { setTickettype(3); setPricedisable(true); setPrice(''); }} className={Tickettype === 3 ? "tab-button-active" : ""}>Donation</span> */}
                                </div>
                            </Col>
                            <Col md={4} className="mb-2 mt-4">
                                <label htmlFor="" className="text-black">Name</label>
                                <input type="text" class="form-control input-default" onChange={(e) => setTicketname(e.target.value)} value={Ticketname} placeholder="Name" />
                            </Col>
                            <Col md={4} className="mb-2 mt-4">
                                <label htmlFor="" className="text-black">Available quantity</label>
                                <input type="number" class="form-control input-default" onChange={(e) => setQuantity(e.target.value)} value={Quantity} placeholder="Available quantity" />
                            </Col>
                            <Col md={4} className="mb-2 mt-4">
                                <label htmlFor="" className="text-black">Price</label>
                                <Input type="number" disabled={Pricedisable} class="form-control input-default" value={Price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="" className="text-black">Description</label>
                                <input type="text" class="form-control input-default" onChange={(e) => setDescription(e.target.value)} value={Description} placeholder="Description" />
                            </Col>
                            <Col md={4} className="mb-2"></Col>
                            {/* <Col md={4} className="mb-2">
                                <label htmlFor="" className="text-black">Tax (%)</label>
                                <Input type="number" disabled={Pricedisable} class="form-control input-default" value={Tax} onChange={(e) => setTax(e.target.value)} placeholder="Tax" />
                            </Col> */}
                            {IsTicketMultiple && IsTicketMultiple == 2 && (
                                <>
                                    <Col md={4} className="mb-2 mt-4">
                                        <label htmlFor="" className="text-black">Start date</label>
                                        <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                            <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                            <input type="text" class="form-control date-border-redius date-border-redius-input date_filter" placeholder="" readOnly value={ticketstartdate} />
                                            <div className="date-style-picker">
                                                <Flatpickr
                                                    value={TicketStartdate}
                                                    data-enable-time
                                                    id='date-picker'
                                                    className='form-control'
                                                    onChange={date => setTicketStartdate(date)}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-2  mt-4">
                                        <label htmlFor="" className="text-black">Start time</label>
                                        <div class="input-group mb-3 input-warning-o">
                                            <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                            <input type="text" class="form-control date-border-redius-input date_filter" placeholder="" readOnly value={ticketstarttime} />
                                        </div>
                                    </Col>
                                    <Col md={12} className="mb-2"></Col>
                                    <Col md={4} className="mb-2">
                                        <label htmlFor="" className="text-black">End date</label>
                                        <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                            <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                            <input type="text" class="form-control date-border-redius date-border-redius-input date_filter" placeholder="" readOnly value={ticketenddate} />
                                            <div className="date-style-picker">
                                                <Flatpickr
                                                    value={TicketEndtdate}
                                                    data-enable-time
                                                    id='date-picker'
                                                    className='form-control'
                                                    onChange={date => setTicketEndtdate(date)}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-2">
                                        <label htmlFor="" className="text-black">End time</label>
                                        <div class="input-group mb-3 input-warning-o">
                                            <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                            <input type="text" class="form-control date-border-redius-input date_filter" placeholder="" readOnly value={ticketendtime} />
                                        </div>
                                    </Col>
                                </>
                            )}
                            <Col md={12}>
                                <>
                                    {ApiLoader ? (
                                        <button className="w-100 theme-btn">
                                            <span className="theme-btn-icon"><FiPlus /></span> <span>Please wait...</span>
                                        </button>
                                    ) : (
                                        <>
                                            {IsEdit ? (
                                                <button className="w-100 theme-btn" onClick={() => handelEditTicketform()}>
                                                    <span className="theme-btn-icon"><FiPlus /></span> <span>Edit ticket</span>
                                                </button>
                                            ) : (
                                                <button className="w-100 theme-btn" onClick={() => handelCreateTicket()}>
                                                    <span className="theme-btn-icon"><FiPlus /></span> <span>Add ticket</span>
                                                </button>
                                            )}
                                        </>
                                    )}
                                </>
                            </Col>
                        </Row >
                    )}
                </ModalBody >
            </Modal >
        </>
    )
}
export default Dashboard;