import React, { useEffect, useState } from "react";
import { apiurl, organizer_url, getSupportbagecolor, get_date_time, get_min_date, shortPer } from '../../common/Helpers';
import { Col, Row } from "react-bootstrap";
import arrow from "../../assets/arrow.svg";
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Select from 'react-select'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
// component
import ContactDetails from '../../component/ContactDetails';
const Dashboard = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const organizerid = localStorage.getItem('organizerid');
    // Loader
    const [Loader, setLoader] = useState(false);
    const [CustomerLoader, setCustomerLoader] = useState(false);
    // states
    const [EventList, setEventList] = useState([]);
    const [EventListOption, setEventListOption] = useState([]);
    const [EventPreListOption, setEventPreListOption] = useState([]);
    const [AttendanceListOption, setAttendanceListOption] = useState([]);
    const [AttendanceSelected, setAttendanceSelected] = useState([]);
    const [Eventselected, setEventselected] = useState();
    const [EventPreselected, setEventPreselected] = useState();
    const [ticketOptions, setTicketOptions] = useState([]);
    const [Ticketselected, setTicketselected] = useState();
    const [Customerselected, setCustomerselected] = useState();
    console.log("c",AttendanceSelected);
    const EventOption = [
        {
            options: EventListOption
        }
    ]
    const EventPreOption = [
        {
            options: EventListOption
            // EventPreListOption
        }
    ]
    const AttendanceOption = [
        {
            options: AttendanceListOption
        }
    ]
    const TicketTypeOption = [
        {
            options: ticketOptions
        }
    ]

    const handleAttendanceChange = (selectedOptions) => {
        if (selectedOptions.some(option => option.value === 'selectAll')) {
            setAttendanceSelected(AttendanceListOption.slice(1));
        } else {
            setAttendanceSelected(selectedOptions);
        }
    };
    
    const handleEventChange = () => {
        const newTicketOptions = [];
        if (EventPreselected) {
            EventPreselected.forEach(selectedEvent => {
                const selectedEventData = EventList.find(event => event._id === selectedEvent.value);
                if (selectedEventData && selectedEventData.allprice) {
                    const filteredTicketOptions = selectedEventData.allprice
                        .filter(ticket => ticket.isdelete === 0)
                        .map(ticket => ({ value: ticket.id, label: ticket.name }));
                    newTicketOptions.push(...filteredTicketOptions);
                }
            });
        }
        setTicketOptions(newTicketOptions);
    };
    const getMyEvents = async () => {
        try {
            setLoader(true)
            const requestData = {
                id: organizerid,
            };
            fetch(apiurl + 'event/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setEventList(data.data);

                        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
                        const upcomingEvents = data.data.filter(event => event.end_mindate >= today);
                        const pastEvents = data.data.filter(event => event.end_mindate < today);
                        const upcomingOptions = [
                            { value: 'selectAll', label: 'Select All' },
                            ...upcomingEvents.map(customer => ({
                                value: customer._id,
                                label: customer.display_name
                            }))
                        ];
                        const pastOptions = [
                            { value: 'selectAll', label: 'Select All' },
                            ...pastEvents.map(customer => ({
                                value: customer._id,
                                label: customer.display_name
                            }))
                        ];

                        setEventListOption(upcomingOptions);
                        setEventPreListOption(pastOptions);
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
    const GetCustomerList = async () => {
        try {
            setCustomerLoader(true)
            const requestData = {
                orgid: organizerid,
                tickettype: Ticketselected,
            };
            fetch(apiurl + 'event/get-customerlist-for-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const uniqueCustomers = data.data.filter((customer, index, self) =>
                            index === self.findIndex((t) => (
                                t.customer_email === customer.customer_email
                            ))
                        );
                        const CustomerOptions = [
                            { value: 'selectAll', label: 'Select All' },
                            ...uniqueCustomers.map(customer => ({
                                value: customer.customer_email,
                                label: customer.customer_email
                            }))
                        ];
                        
                        setAttendanceListOption(CustomerOptions);
                    }
                    setCustomerLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setCustomerLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setCustomerLoader(false)
        }
    }

    useEffect(() => {
        getMyEvents();
    }, []);
    useEffect(() => {
        handleEventChange();
        setTicketselected("");
    }, [EventPreselected]);
    useEffect(() => {
        GetCustomerList();
        setAttendanceSelected("");
    }, [Ticketselected]);

    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <div className="col-md-12">
                            <Card className="py-4">
                                <Card.Body>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title className="border-bottom pb-2">Mail</Card.Title>
                                                    <Card.Text>
                                                        <div className="mail-body-org">
                                                            <div>
                                                                <div className="form-group">
                                                                    <p>Select Your Event</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={EventOption}
                                                                        className='react-select'
                                                                        classNamePrefix='select'
                                                                        onChange={setEventselected}
                                                                        value={Eventselected}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h4>Body</h4>
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="9" placeholder="Enter your message"></textarea>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div className="col-md-6">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title className="border-bottom pb-2">Customer</Card.Title>
                                                    <Card.Text>
                                                        <div className="mail-body-org">
                                                            <div className="d-flex justify-content-end">
                                                                <button type="button" className="GetLatestUpdateButton">
                                                                    <div className="left px-0 px-md-4">
                                                                        <small className="ms-2">Select All Attendance</small>
                                                                    </div>
                                                                    <div className="right">
                                                                        <img style={{ width: "18px" }} src={arrow} alt="" />
                                                                    </div>
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <div className="form-group">
                                                                    <p>My Previous Events</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={EventPreOption}
                                                                        isMulti
                                                                        className='react-select'
                                                                        classNamePrefix='select'
                                                                        onChange={setEventPreselected}
                                                                        value={EventPreselected}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <p>Event Ticket Type</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={TicketTypeOption}
                                                                        isMulti
                                                                        className='react-select'
                                                                        classNamePrefix='select'
                                                                        onChange={setTicketselected}
                                                                        value={Ticketselected}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <p>My Event Attendance</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={AttendanceOption}
                                                                        className='react-select'
                                                                        isMulti
                                                                        classNamePrefix='select'
                                                                        onChange={handleAttendanceChange}
                                                                        value={AttendanceSelected}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <button type="button" className="GetLatestUpdateButton">
                                                                                <div className="left px-0 px-md-4">
                                                                                    <small className="ms-2">Send Mail</small>
                                                                                </div>
                                                                                <div className="right">
                                                                                    <img style={{ width: "18px" }} src={arrow} alt="" />
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <button type="button" className="GetLatestUpdateButton">
                                                                                <div className="left px-0 px-md-4">
                                                                                    <small className="ms-2">Schedule Mail</small>
                                                                                </div>
                                                                                <div className="right">
                                                                                    <img style={{ width: "18px" }} src={arrow} alt="" />
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>
                </div >
            </div >

        </>
    )
}
export default Dashboard;