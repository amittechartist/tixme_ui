import React, { useEffect, useState } from "react";
import { apiurl, getSupportbagecolor, get_date_time, get_min_date, shortPer, customer_url } from '../../../common/Helpers';
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Searchicon from '../../../common/icon/searchicon.png';
import DateIcon from "../../../common/icon/date 2.svg";
import Norecord from '../../../component/Norecordui';
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select'
import { FiClock, FiChevronDown } from "react-icons/fi";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useParams } from 'react-router-dom';
import { FaCircle } from "react-icons/fa6";
// component
import ContactDetails from '../../../component/ContactusFrorm';
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const OrganizerId = localStorage.getItem('organizerid');
    const Beartoken = localStorage.getItem('userauth');
    const { eventid, orderid } = useParams();
    const [newTitle, setnewTitle] = useState();
    const [newMessage, setnewMessage] = useState();

    const [modal, setModal] = useState(false);
    const [newmodal, setNewModal] = useState(false);
    const [Btnloader, setBtnloader] = useState(false);
    const [Loader, setLoader] = useState(false);
    const [ListLoader, setListLoader] = useState(false);
    const [apiLoader, setapiLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const [allData, setallData] = useState([]);

    const [Email, setEmail] = useState();
    const [Updatid, setUpdatid] = useState();
    const [Title, setTitle] = useState();
    const [Message, setMessage] = useState();
    const [Isopen, setIsopen] = useState();
    const [Messagelog, setMessagelog] = useState([]);

    const [ReplyMessage, setReplyMessage] = useState();

    const [Startdate, setStartdate] = useState(new Date());
    const [Endtdate, setEndtdate] = useState(new Date());
    const [viewStartdate, setviewStartdate] = useState();
    const [viewEndtdate, setviewEndtdate] = useState();
    const [valueStartdate, setvalueStartdate] = useState();
    const [valueEndtdate, setvalueEndtdate] = useState();
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

    const [Daterange, setDaterange] = useState(false);
    const HandelDatefilterreset = () => {
        setviewStartdate('');
        setviewEndtdate('');
        setvalueStartdate('');
        setvalueEndtdate('');
        setListitems(Listitems);
        setDaterange(!Daterange);
    }
    const HandelDatefilter = () => {
        if (!valueStartdate) {
            return toast.error('Start date is requied')
        }
        if (!valueEndtdate) {
            return toast.error('End date is requied')
        }
        handleDateRangeChange(valueStartdate, valueEndtdate);
    }
    const handleDateRangeChange = (startDate, endDate) => {
        if (startDate && endDate) {
            const filteredEvents = allData.filter(event => {
                const eventDate = event.mindate; // Date of the event
                // Check if the event's date is within the given date range
                return eventDate >= startDate && eventDate <= endDate;
            });
            setListitems(filteredEvents);
        } else {
            // If either startDate or endDate is missing, reset to show all events
            setListitems(allData);
        }
        setDaterange(!Daterange);
    };
    const [FormLoader, setFormLoader] = useState(false);
    const [EventData, setEventData] = useState();
    const [EventMainidData, setEventMainidData] = useState();
    console.log("sss",EventMainidData);
    const fetchEventData = async () => {
        setFormLoader(true)
        try {
            const requestData = {
                id: eventid
            };
            fetch(apiurl + 'event/get-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setEventData(data.data);
                        setEventMainidData(orderid);
                        setTicketTypelist(data.data.allprice.map(ticket => ({ value: ticket.name, label: ticket.name })));
                    } else {
                        toast.error(data.message);
                    }
                    setFormLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setFormLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setFormLoader(false)
        }
    }
    const fetchList = async () => {
        setListLoader(true)
        try {
            fetch(apiurl + 'website/customer/support/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                        setallData(data.data);
                        setListLoader(false)
                    } else {

                    }
                    setListLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setListLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setListLoader(false)
        }

    }
    useEffect(() => {
        fetchList();
        if (eventid) {
            fetchEventData();
        } else {
            setFormLoader(false);
            setEventData(null);
        }
    }, [eventid]);
    // select code
    const [TicketTypelist, setTicketTypelist] = useState([]);
    const [TicketTypevalue, setTicketTypevalue] = useState();
    const [TicketType, setTicketType] = useState();
    const TicketTypeOption = [
        {
            options: TicketTypelist
        }
    ]
    const selectTicketType = (SelectValue) => {
        setTicketType(SelectValue);
        setTicketTypevalue(SelectValue.value);
    };
    // select code
    const [TicketPrioritylist, setTicketPrioritylist] = useState([{ value: "High Priority", label: "High Priority" }]);
    const [TicketPriorityvalue, setTicketPriorityvalue] = useState();
    const [TicketPriority, setTicketPriority] = useState();
    const TicketPriorityOption = [
        {
            options: TicketPrioritylist
        }
    ]
    const selectTicketPriority = (SelectValue) => {
        setTicketPriority(SelectValue);
        setTicketPriorityvalue(SelectValue.value);
    };

    const StoreNewTicket = async () => {
        try {
            if (!Message) {
                return toast.error('Type your Message');
            }
            if(EventData){
                if(!TicketTypevalue){
                    return toast.error('Select request ticket type');
                }
            }
            const requestData = {
                id: OrganizerId,
                email: Email,
                message: Message,
                tickettype: TicketTypevalue ? TicketTypevalue : null,
                priority: TicketPriorityvalue,
                eventid: EventData ? EventData._id : null,
                eventmainid: EventMainidData ? EventMainidData : null,
                isfororganizer: EventData ? EventData.organizer_id : null,
            };
            setLoader(true);
            fetch(apiurl + 'website/customer/support/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                },
                body: JSON.stringify(requestData),
            }).then(response => response.json()).then(data => {
                setLoader(false);
                if (data.success == true) {
                    toast.success('Submitted successfully');
                    setEmail('');
                    setMessage('');
                    setTicketType('');
                    setTicketTypevalue('');
                    setTicketPriority('');
                    setTicketPriorityvalue('');
                    if (eventid) {
                        setEventData('');
                        navigate(customer_url + 'support-tickets');
                    }
                    fetchList();
                } else {
                    toast.error(data.message);
                }
                setLoader(false);
            }).catch(error => {
                setLoader(false);
                toast.error('Error: ' + error.message);
            });
        } catch (error) {
            toast.error(error);
        }
    }
    const [Priorityfiltertype, setPriorityfiltertype] = useState();
    const [Priorityfiltervalue, setPriorityfiltervalue] = useState();
    const selectPriorityfilter = (selectedValue) => {
        setPriorityfiltervalue(selectedValue);
        setPriorityfiltertype(selectedValue.value);
        if (selectedValue.value) {
            const filteredEvents = allData.filter(event =>
                event.isclose.toString() === selectedValue.value);
            setListitems(filteredEvents);
        } else {
            setListitems(allData);
        }

    };

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Now filter the events based on the search term
        if (value) {
            const filteredEvents = allData.filter(event =>
                event.uniqueid.toLowerCase().includes(value.toLowerCase()));
            setListitems(filteredEvents);
        } else {
            // If the search term is empty, reset to show all events
            setListitems(allData);
        }
    };

    const CustomOption = ({ innerProps, label, value }) => {
        let iconColor = '';

        // Apply different icon colors based on the value
        switch (value) {
            case '0':
                iconColor = 'text-warning';
                break;
            case '1':
                iconColor = 'text-primary';
                break;
            case '2':
                iconColor = 'text-success';
                break;
            default:
                iconColor = '';
        }

        return (
            <div {...innerProps}>
                <span><span style={{ paddingLeft: '5px' }} className={`ticket-sts-icon ${iconColor}`}><FaCircle /></span> <span className="cpointer">{label}</span></span>
            </div>
        );
    };
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: 10,
        }),
    };
    const PriorityfilterOption = [
        {
            options: [
                { value: "0", label: "New Tickets" },
                { value: "1", label: "On-Going Tickets" },
                { value: "2", label: "Resolved Tickets" },
            ]
        }
    ]

    return (
        <>
            <Modal isOpen={Daterange} toggle={() => setDaterange(!Daterange)} centered>
                <ModalHeader toggle={!Daterange}>Select date</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6} className="mb-2 mt-0">
                            <label htmlFor="" className="text-black">Start Date</label>
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
                        <Col md={6}>
                            <button onClick={HandelDatefilter} className="mb-0 mr-5  btn btn-success list-Ticket-mng-1 w-100" type="button">Filter</button>
                        </Col>
                        <Col md={6}>
                            <button onClick={HandelDatefilterreset} className="mb-0 mr-5  btn btn-dark list-Ticket-mng-1 w-100" type="button">Reset</button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">

                    <Row className="d-none  justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row>
                                        <Col md={8}>
                                            <div className="ticket-list">
                                                <Row className="react-select-h">
                                                    <Col md={4}>
                                                        <div class="input-group mb-3 input-warning-o" onClick={() => setDaterange(!Daterange)}>
                                                            <span class="input-group-text search-box-icon-1 br-n" ><FiClock /></span>
                                                            <input type="text" class="form-control  blr-n" value={viewStartdate && viewEndtdate ? viewStartdate + '-' + viewEndtdate : ''} placeholder="Date range"  />
                                                            <span class="input-group-text search-box-icon-1  bl-n" ><FiChevronDown /></span>
                                                        </div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select
                                                            isClearable={false}
                                                            options={PriorityfilterOption[0].options}
                                                            components={{ Option: CustomOption }}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            placeholder='Select Status'
                                                            onChange={selectPriorityfilter}
                                                            value={Priorityfiltervalue}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <div class="input-group mb-3 input-warning-o grey-border">
                                                            <span class="input-group-text"><img src={Searchicon} alt="" /></span>

                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Search for ticket"
                                                                value={searchTerm}
                                                                onChange={handleSearchChange}
                                                            />
                                                        </div>
                                                    </Col>
                                                    {ListLoader ? (
                                                        <>
                                                            <div className="mb-5 linear-background w-100" style={{ height: '150px' }}> </div>
                                                            <div className="mb-5 linear-background w-100" style={{ height: '150px' }}> </div>
                                                            <div className="mb-5 linear-background w-100" style={{ height: '150px' }}> </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {Listitems.length > 0 ? (
                                                                <>
                                                                    {Listitems.map((item, index) => (
                                                                        <Col md={12} className="mb-5">
                                                                            <div className="support-tickets-list-1">
                                                                                <div className="xyz-ticket-desc-box">
                                                                                    <p><span className={`ticket-sts-icon ${getSupportbagecolor(item.isclose)}`}><FaCircle /></span><span className="ticket-head-tt1">Ticket# {item.uniqueid}</span> {item.priority ? (
                                                                                        <>{item.priority == 'High Priority' ? (<><span className="bage-danger-css">{item.priority}</span></>) : (<><span className="bage-light-css">{item.priority}</span></>)}</>
                                                                                    ) : ''}</p>
                                                                                    <p className="ticket-type-12">{item.tickettype}</p>
                                                                                    <p className="ticket-message7">{item.message}</p>
                                                                                </div>
                                                                                <Row className="ticket-box-time1">
                                                                                    <Col md={6}>
                                                                                        <p className="date-and-time-ticket">Posted at {item.time}</p>
                                                                                    </Col>
                                                                                    <Col md={6} className="text-end">
                                                                                        <Link to={`${customer_url}view-support-ticket/${item._id}`} className="Open-Ticket-link">Open Ticket</Link>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        </Col>
                                                                    ))}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Norecord />
                                                                </>
                                                            )}

                                                        </>
                                                    )}
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="ticket-form">
                                                <div className="pb-3 border-bottom" style={{ borderColor: '#000', borderWidth: '1px' }}>
                                                    <h3 className="mb-1" style={{ fontWeight: '600' }}>Create Quick Ticket</h3>
                                                    <p className="mb-1" style={{ fontWeight: '500', fontSize: '14px' }}>Write and address new queries and issues</p>
                                                </div>
                                                {FormLoader ? (
                                                    <div className="linear-background w-100"> </div>
                                                ) : (
                                                    <div className="form-area-1 py-4">
                                                        <div>
                                                            {EventData ? (
                                                                <div class="card">
                                                                    <div class="card-body">
                                                                        <div class="profile-blog">
                                                                            <h5 class="text-primary d-inline">Event details</h5>
                                                                            <img src={EventData.thum_image} alt="" class="img-fluid mt-4 mb-4 w-100 rounded" />
                                                                            <h4>{EventData.display_name}</h4>
                                                                            <p class="mb-0">{shortPer(EventData.event_desc, 100)}</p>
                                                                            <p class="mb-0">Start From : <span className="text-warning">{EventData.start_date} {EventData.start_time}</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : ''}
                                                        </div>
                                                        {EventData ? (
                                                            <div className="form-group">
                                                            <p className="mb-2">Request Ticket Type</p>
                                                            <Select
                                                                isClearable={false}
                                                                options={TicketTypeOption}
                                                                className='react-select'
                                                                classNamePrefix='select'
                                                                placeholder='Choose Type'
                                                                onChange={selectTicketType}
                                                                value={TicketType}
                                                            />
                                                        </div>
                                                        ) : ''}
                                                        <div className="form-group">
                                                            <p className="mb-2">Priority Status</p>
                                                            <Select
                                                                isClearable={false}
                                                                options={TicketPriorityOption}
                                                                className='react-select'
                                                                classNamePrefix='select'
                                                                placeholder='Select Status'
                                                                onChange={selectTicketPriority}
                                                                value={TicketPriority}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <p className="mb-2">Message</p>
                                                            <textarea class="form-control" rows="5" placeholder="Type messages here.." value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            {Loader ? (
                                                                <button className="btn btn-primary w-100" type="button">Please wait...</button>
                                                            ) : (
                                                                <>
                                                                {EventData ? (<button className="btn btn-dark mb-2 w-100" onClick={() => setEventData(null)} type="button">Cancel</button>) : ''}
                                                                <button className="btn btn-primary  mb-2 w-100" onClick={StoreNewTicket} type="button">Submit</button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card >
                        </Col >
                    </Row >
                    <Row className="justify-content-center">
                        <div className="col-md-12">
                            <Card className="py-4">
                                <Card.Body>
                                    <ContactDetails />
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