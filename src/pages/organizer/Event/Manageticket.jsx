import React, { useEffect, useState } from "react";
import Searchicon from '../../../common/icon/searchicon.png';
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import EditPng from '../../../common/icon/Edit.png';
import ArrowPng from "../../../common/icon/Arrow.svg";
import Norecord from '../../../component/Norecordui';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from 'react-router-dom';
import { apiurl, organizer_url, get_date_time } from '../../../common/Helpers';
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
    Modal,
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
    const [TicketStartdate, setTicketStartdate] = useState(new Date());
    const [TicketEndtdate, setTicketEndtdate] = useState(new Date());
    const [EditApiLoader, setEditApiLoader] = useState(false);
    const [IsEdit, setIsEdit] = useState(false);
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
                        const fetchdata = data.data.allprice.filter(item => item.isdelete === 0);
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

    const CountTicketSold = (id) => {
        const filteredList = Ticketsoldlist.filter(item => item.ticket_id === id);
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
    const EditEvent = async (id, name, ticketid) => {
        navigate(`${organizer_url}event/edit-event/${id}/${name}/${ticketid}`);
    }
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
                                                <Col md={4} xl={5}>
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
                                                <Col md={4} xl={3}>
                                                    <button className="w-100 theme-btn-warning" onClick={() => navigate(`${organizer_url}event/mange-attendee/${Eventdata._id}/${Eventdata.name}`)}>
                                                        <span>Manage All Attendee</span>
                                                    </button>
                                                </Col>
                                                <Col md={4} xl={4} className="d-flex justify-content-end">
                                                    <button className="theme-btn" onClick={() => { setTicketshow(true); setIsEdit(false); }}>
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
                                                                                <span className="ticket-list-name">{item.name}</span> <span className="cursor-pointre list-event-edit-btn" onClick={() => EditEvent(Eventdata._id, Eventdata.name, item.id)}><img src={EditPng} alt="" /></span>
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
                                                                                        <h2>{CountTicketSold(item.id)}</h2>
                                                                                    </Col>
                                                                                    <Col md={3} className="ticket-sts-box  text-center  border-right">
                                                                                        <p>Ticket Available</p>
                                                                                        <h2><h2>{parseInt(item.quantity, 10) - parseInt(CountTicketSold(item.id), 10)}</h2></h2>
                                                                                    </Col>
                                                                                    <Col md={3} className="ticket-sts-box  text-center">
                                                                                        <p>Revenue</p>
                                                                                        <h2>
                                                                                            <h2>
                                                                                                {item.price > 0 ? (
                                                                                                    <>
                                                                                                        {Eventdata.countrysymbol}{parseInt(item.price, 10) * parseInt(CountTicketSold(item.id), 10)}
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
                        <>
                            {/* <Row>
                                <Col md={12} className="justify-content-center d-flex">
                                    <div className="tab-button-box">
                                        <span onClick={() => { setTickettype(1); setPricedisable(false); }} className={Tickettype === 1 ? "tab-button-active" : ""}>Paid</span>
                                        <span onClick={() => { setTickettype(2); setPricedisable(true); setPrice(''); }} className={Tickettype === 2 ? "tab-button-active" : ""}>Free</span>
                                    </div>
                                </Col>
                                <Col md={12} className="mb-2 mt-4">
                                    <label htmlFor="" className="text-black">Ticket name</label>
                                    <input type="text" class="form-control input-default" onChange={(e) => setTicketname(e.target.value)} value={Ticketname} placeholder="Ticket name" />
                                </Col>
                                <Col md={12} className="mb-2">
                                    <label htmlFor="" className="text-black">Ticket short description</label>
                                    <textarea type="text" class="form-control input-default" onChange={(e) => setTicketdesc(e.target.value)} placeholder="Ticket short description" >{Ticketdesc}</textarea>
                                </Col>
                                <Col md={6} className="mb-2">
                                    <label htmlFor="" className="text-black">Available ticket quantity</label>
                                    <input type="number" class="form-control input-default" onChange={(e) => setQuantity(e.target.value)} value={Quantity} placeholder="Available ticket quantity" />
                                </Col>
                                <Col md={6} className="mb-2">
                                    <label htmlFor="" className="text-black">Ticket Price</label>
                                    <Input type="number" disabled={Pricedisable} class="form-control input-default" value={Price} onChange={(e) => setPrice(e.target.value)} placeholder="Ticket Price" />
                                </Col>
                                <div className="col-6">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-groupticket`}
                                        checked={Isgrouptickets}
                                        onChange={(event) => setIsgrouptickets(event.target.checked)}
                                    />
                                    <label style={{ marginLeft: '10px' }} htmlFor={`checkbox-groupticket`}>Create a group tickets ?</label>
                                    <div>
                                        {Isgrouptickets && (
                                            <>
                                                <input type="number" class="form-control input-default" onChange={(e) => setGroupQty(e.target.value)} value={GroupQty} placeholder="Enter group quantity" />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        {EventSubtype == 2 && (
                                            <>
                                                <Col md={6} className="mb-2 mt-1">
                                                    <label htmlFor="" className="text-black">Event start in date</label>
                                                    <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                        <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                        <input type="text" class="form-control date-border-redius date-border-redius-input bg-white" placeholder="" readOnly value={get_date_time(TicketEventdata)[0].Dateview} />
                                                        <div className="date-style-picker">
                                                            <Flatpickr
                                                                value={TicketStartdate}
                                                                data-enable-time
                                                                id='date-picker'
                                                                className='form-control'
                                                                onChange={date => setTicketEventdata(date)}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6} className="mb-2 mt-1">
                                                    <label htmlFor="" className="text-black">Event start in time</label>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                                        <input type="text" class="form-control date-border-redius-input  bg-white" placeholder="" readOnly value={get_date_time(TicketEventdata)[0].Timeview} />
                                                    </div>
                                                </Col>
                                                <Col md={12} className="mb-2"></Col>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <p className="mb-0">Ticket Scan Start From</p>
                                </div>
                                <Col md={6} className="mb-2 mt-1">
                                    <label htmlFor="" className="text-black">Date</label>
                                    <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                        <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                        <input type="text" class="form-control date-border-redius date-border-redius-input bg-white" placeholder="" readOnly value={get_date_time(TicketStartdate)[0].Dateview} />
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
                                <Col md={6} className="mb-2 mt-1">
                                    <label htmlFor="" className="text-black">Time</label>
                                    <div class="input-group mb-3 input-warning-o">
                                        <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                        <input type="text" class="form-control date-border-redius-input  bg-white" placeholder="" readOnly value={get_date_time(TicketStartdate)[0].Timeview} />
                                    </div>
                                </Col>
                                <Col md={12} className="mb-2"></Col>
                                <Col md={12} className="text-center">
                                    {EditId && (
                                        <>
                                            {Loader ? (
                                                <button type="button" className="text-white btn theme-bg w-100 ">Please wait...</button>
                                            ) : (
                                                <button type="button" onClick={() => handelCreateTicket(EditId)} className=" w-100 text-white btn theme-bg">Add ticket</button>
                                            )}
                                        </>
                                    )}
                                </Col>
                            </Row> */}
                        </>
                    )}
                </ModalBody >
            </Modal >
        </>
    )
}
export default Dashboard;