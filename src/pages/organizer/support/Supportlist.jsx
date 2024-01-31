import React, { useEffect, useState } from "react";
import { apiurl, organizer_url, isEmail, getSupportbagecolor, get_date_time, get_min_date, shortPer } from '../../../common/Helpers';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Searchicon from '../../../common/icon/searchicon.png';
import DateIcon from "../../../common/icon/date 2.svg";
import WhiteButton from '../../../component/Whitestarbtn';
import Norecord from '../../../component/Norecordui';
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select'
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useParams } from 'react-router-dom';
import { FaCircle } from "react-icons/fa6";
import Indiaflag from "../../../common/image/India.svg";
import Usaflag from "../../../common/image/usaf.svg";
import Singapureflag from "../../../common/image/singapur.svg";
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const OrganizerId = localStorage.getItem('organizerid');
    const Beartoken = localStorage.getItem('userauth');
    const { eventid } = useParams();
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
            const requestData = {
                id: OrganizerId
            };
            fetch(apiurl + 'website/organizer/support/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
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
    const HandelOrganizerform = async () => {
        try {
            if (!newTitle) {
                return toast.error('Title is required');
            }
            if (!newMessage) {
                return toast.error('Message is required');
            }
            const id = OrganizerId;
            const requestData = {
                id: id,
                title: newTitle,
                message: newMessage
            };
            setLoader(true);
            fetch(apiurl + 'website/organizer/support/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }).then(response => response.json()).then(data => {
                setLoader(false);
                if (data.success == true) {
                    MySwal.fire({
                        text: "Support ticket submitted successfully!",
                        icon: "success"
                    });
                    setNewModal(!newmodal)
                    setnewTitle('');
                    setnewMessage('');
                    fetchList();
                } else {
                    toast.error(data.message);
                }
                setLoader(false);
            }).catch(error => {
                setLoader(false);
                toast.error('Insert error: ' + error.message);
                console.error('Insert error:', error);
            });

        } catch (error) {

        }
    };
    const Handelform = async () => {
        try {
            if (!newTitle) {
                return toast.error('Title is required');
            }
            if (!newMessage) {
                return toast.error('Message is required');
            }
            const id = OrganizerId;
            const requestData = {
                id: id,
                title: newTitle,
                message: newMessage
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
                    MySwal.fire({
                        text: "Support ticket submitted successfully!",
                        icon: "success"
                    });
                    setNewModal(!newmodal)
                    setnewTitle('');
                    setnewMessage('');
                    fetchList();
                } else {
                    toast.error(data.message);
                }
                setLoader(false);
            }).catch(error => {
                setLoader(false);
                toast.error('Insert error: ' + error.message);
                console.error('Insert error:', error);
            });

        } catch (error) {

        }
    };
    const HandelReplyapi = async () => {
        if (!ReplyMessage) {
            return toast.error('Reply message is required');
        }
        try {
            setBtnloader(true)
            const requestData = {
                replymessage: ReplyMessage,
                id: Updatid
            };
            fetch(apiurl + 'website/support/store-replay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success(data.data);
                        Handelviewmodal(Updatid)
                        setReplyMessage('');
                    } else {

                    }
                    setBtnloader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setBtnloader(false)

                });
        } catch (error) {
            console.error('Api error:', error);
            setModal(false)
            setBtnloader(false)
        }
    }
    const Handelnewmodal = async () => {
        setNewModal(true)
    }
    const Handelviewmodal = async (id) => {
        try {
            const requestData = {
                id: id,
            };
            setModal(true)
            setapiLoader(true)
            fetch(apiurl + 'admin/support/view', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setUpdatid(data.data._id);
                        setEmail(data.data.email);
                        setTitle(data.data.title);
                        setIsopen(data.data.isclose);
                        setMessage(data.data.message);
                        setMessagelog(data.data.messagelog);
                        setapiLoader(false)
                    } else {
                        setModal(false)
                        setapiLoader(false)
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setModal(false)
                    setapiLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setModal(false)
        }
    }
    useEffect(() => {
        fetchList();
        if (eventid) {
            fetchEventData();
            getAttendenceList(eventid);
        } else {
            setFormLoader(false);
            setEventData(null);
        }
    }, [eventid]);

    const fetchallEvent = async () => {
        try {
            setLoader(true)
            const requestData = {
                id: OrganizerId,
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
                        const myeventdata = data.data;
                        const TicketEventlist = myeventdata.map(event => ({
                            label: event.display_name,
                            value: event._id
                        }));
                        setTicketEventList(TicketEventlist);
                    }
                    setLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        fetchallEvent();
    }, []);

    // select code

    const [Eventattendence, setEventattendence] = useState([]);
    const [TicketTypelist, setTicketTypelist] = useState([]);
    const [TicketTypevalue, setTicketTypevalue] = useState();
    const [TicketType, setTicketType] = useState();
    const [Customerloader, setCustomerloader] = useState(false);
    const TicketTypeOption = [
        {
            options: TicketTypelist
        }
    ]
    const selectTicketType = (SelectValue) => {
        setTicketType(SelectValue);
        setTicketTypevalue(SelectValue.value);
        getAttendenceListwithname(SelectValue.value);
    };

    const getAttendenceListwithname = async (name) => {
        try {
            const requestData = {
                eventid: eventid,
                name: name
            };
            setLoader(true);
            fetch(apiurl + 'website/get-event-attendence-byname', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }).then(response => response.json()).then(data => {
                setLoader(false);
                if (data.success == true) {
                    const xxx = data.data;
                    setAttendencelist(data.data);
                    const yyy = xxx.map(event => ({
                        label: event.customer_name,
                        value: event.customer_id
                    }));
                    setEventattendence(yyy);
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

    // select code
    const [TicketPrioritylist, setTicketPrioritylist] = useState([{ value: "High Priority", label: "High Priority" }]);
    const [TicketPriorityvalue, setTicketPriorityvalue] = useState();
    const [TicketPriority, setTicketPriority] = useState();
    const TicketPriorityOption = [
        {
            options: TicketPrioritylist
        }
    ]
    const [ticketEventList, setTicketEventList] = useState([]);
    const [selecteventdata, setSelecteventdata] = useState();
    const [selecteventdataid, setSelecteventdataid] = useState();
    const [Customerid, setCustomerid] = useState();
    const [Attendencelist, setAttendencelist] = useState();
    const [selectAttendencecustomervalue, setselectAttendencecustomervalue] = useState();
    const EventListoption = [
        {
            options: ticketEventList
        }
    ]
    const CustomerList = [
        {
            options: Eventattendence
        }
    ]
    console.log("ioio", CustomerList);
    const selectMyEventname = (SelectValue) => {
        setSelecteventdata(SelectValue);
        setSelecteventdataid(SelectValue.value);
        getAttendenceList(SelectValue.value);

    };
    const selectAttendencecustomer = (SelectValue) => {
        setselectAttendencecustomervalue(SelectValue);
        setCustomerid(SelectValue.value);

    };
    const selectTicketPriority = (SelectValue) => {
        setTicketPriority(SelectValue);
        setTicketPriorityvalue(SelectValue.value);
    };

    const getAttendenceList = async (id) => {
        try {
            const requestData = {
                eventid: id,
            };
            setLoader(true);
            fetch(apiurl + 'website/get-event-attendence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }).then(response => response.json()).then(data => {
                setLoader(false);
                if (data.success == true) {
                    const xxx = data.data;
                    setAttendencelist(data.data);
                    const yyy = xxx.map(event => ({
                        label: event.customer_name,
                        value: event.customer_id
                    }));
                    setEventattendence(yyy);
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

    const StoreNewTicket = async () => {
        try {
            if (!Message) {
                return toast.error('Type your Message');
            }
            if (EventData) {
                if (!TicketTypevalue) {
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
                customerid: Customerid ? Customerid : null,
            };
            setLoader(true);
            fetch(apiurl + 'website/organizer/support/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                    setEventattendence('');
                    if (eventid) {
                        setEventData('');
                        navigate(organizer_url + 'support-tickets');
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

    const [Datetype, setDatetype] = useState();
    const [Datevalue, setDatevalue] = useState();
    const selectDatefiltertype = (selectedValue) => {
        setDatevalue(selectedValue);
        setDatetype(selectedValue.value);
    };
    const DatefilterOption = [
        {
            options: [
                { value: "Today", label: "Today" },
                { value: "Tomorrow", label: "Tomorrow" },
                { value: "Next 7 days", label: "Next 7 days" },
                { value: "This month", label: "This month" },
                { value: "Next month", label: "Next month" },
                { value: "Pick a date", label: "Pick a date" },
                { value: "Pick between two dates", label: "Pick between two dates" },
            ]
        }
    ]

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
    const [tabno, setTabno] = useState(1);
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
                    <Row className="d-none justify-content-center">
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
                                                            <input type="text" class="form-control  blr-n" value={viewStartdate && viewEndtdate ? viewStartdate + '-' + viewEndtdate : ''} placeholder="Date range" />
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
                                                                                    <p>
                                                                                        <span className={`ticket-sts-icon ${getSupportbagecolor(item.isclose)}`}><FaCircle /></span>
                                                                                        <span className="ticket-head-tt1">Ticket# {item.uniqueid}</span>
                                                                                        {item.priority ? (
                                                                                            <>
                                                                                                {item.priority == 'High Priority' ? (
                                                                                                    <>
                                                                                                        <span className="bage-danger-css">{item.priority}</span>
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <>
                                                                                                        <span className="bage-light-css">{item.priority}</span>
                                                                                                    </>
                                                                                                )}
                                                                                            </>
                                                                                        ) : ''}
                                                                                        {item.isfororganizer ? (<span className="bage-danger-css mx-1">Customer ticket issue</span>) : ''}
                                                                                    </p>
                                                                                    <p className="ticket-type-12">{item.tickettype}</p>
                                                                                    <p className="ticket-message7">{item.message}</p>
                                                                                </div>
                                                                                <Row className="ticket-box-time1">
                                                                                    <Col md={6}>
                                                                                        <p className="date-and-time-ticket">Posted at {item.time}</p>
                                                                                    </Col>
                                                                                    <Col md={6} className="text-end">
                                                                                        <Link to={`${organizer_url}view-support-ticket/${item._id}`} className="Open-Ticket-link">Open Ticket</Link>
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
                                                            <>
                                                                <div className="form-group">
                                                                    <p className="mb-2">Request Ticket Type</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={TicketTypeOption}
                                                                        className='react-select'
                                                                        classNamePrefix='select'
                                                                        placeholder='Choose Type'
                                                                        onChange={selectTicketType}
                                                                        // Attendencelist
                                                                        value={TicketType}
                                                                    />
                                                                </div>
                                                                {Customerloader ? (
                                                                    <></>
                                                                ) : (
                                                                    <div className="form-group">
                                                                        <p className="mb-2">Select Customer</p>
                                                                        <Select
                                                                            isClearable={false}
                                                                            options={CustomerList}
                                                                            className='react-select'
                                                                            classNamePrefix='select'
                                                                            placeholder='Select your event'
                                                                            onChange={selectAttendencecustomer}
                                                                            value={selectAttendencecustomervalue}
                                                                        />
                                                                    </div>
                                                                )}

                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="form-group">
                                                                    <p className="mb-2">Select Event</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={EventListoption}
                                                                        className='react-select'
                                                                        classNamePrefix='select'
                                                                        placeholder='Select your event'
                                                                        onChange={selectMyEventname}
                                                                        value={selecteventdata}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <p className="mb-2">Select Customer</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={CustomerList}
                                                                        className='react-select'
                                                                        classNamePrefix='select'
                                                                        placeholder='Select your event'
                                                                        onChange={selectAttendencecustomer}
                                                                        value={selectAttendencecustomervalue}
                                                                    />
                                                                </div>
                                                            </>
                                                        )}
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
                                    <div className="banner-child-address py-5 px-md-0 px-3">
                                        {/* <TabComp /> */}
                                        <div className="d-flex justify-content-center">
                                            <div onClick={() => setTabno(2)} className={tabno == 2 ? 'mx-lg-4 mx-2 animate__animated animate__bounce xyss xxx-conta' : 'mx-lg-4 mx-2 animate__animated animate__bounce xxx-conta'}>
                                                <p className="sssas">singapore</p>
                                                <img className="flag-icon" src={Singapureflag}></img>
                                            </div>
                                            <div onClick={() => setTabno(3)} className={tabno == 3 ? 'mx-lg-4 mx-2 animate__animated animate__bounce xyss xxx-conta' : 'mx-lg-4 mx-2 animate__animated animate__bounce xxx-conta'}>
                                                <p className="sssas">USA</p>
                                                <img className="flag-icon" src={Usaflag}></img>
                                            </div>
                                            <div onClick={() => setTabno(1)} className={tabno == 1 ? 'mx-lg-4 mx-2 animate__animated animate__bounce xyss xxx-conta' : 'mx-lg-4 mx-2 animate__animated animate__bounce xxx-conta'}>
                                                <p className="sssas">India</p>
                                                <img className="flag-icon" src={Indiaflag}></img>
                                            </div>
                                        </div>
                                        <div className="contact-sec w-500 m-auto px-5 py-4 mt-4">
                                            {
                                                tabno === 1 && (
                                                    <>
                                                        <div>
                                                            <span className="text-primary-color text-uppercase fw-bold">Address:{" "}</span>
                                                            <span>
                                                                Office No 3N, Vijay Chambers
                                                                Premises CHS LTD, Grant Road, Tribhuvan
                                                                Road, Mumbai, Maharashtra 400004
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-primary-color text-uppercase fw-bold">Email:{" "}</span>
                                                            <span>tixme.india@gmail.com</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-primary-color text-uppercase fw-bold">Phone:{" "}</span>
                                                            <span>+91 8080292007 (WhatsApp)</span>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            {
                                                tabno === 2 && (
                                                    <>
                                                        <div>
                                                            <span className="text-primary-color text-uppercase fw-bold">Address:{" "}</span>
                                                            <span>
                                                                10 Jalan Besar, #17-02 Sim Lim <br />
                                                                Tower, Singapore 208787
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-primary-color text-uppercase fw-bold">Email:{" "}</span>
                                                            <span> tixme.sg@gmail.com</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-primary-color text-uppercase fw-bold">Phone:{" "}</span>
                                                            <span>+65 90288903 (WhatsApp)</span>
                                                        </div>

                                                    </>
                                                )
                                            }
                                            {
                                                tabno === 3 && (
                                                    <>
                                                        <div>
                                                            <span className="text-primary-color text-uppercase fw-bold">Address:{" "}</span>
                                                            <span>
                                                                660 Washington Street, Boston,<br /> MA 02111

                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-primary-color text-uppercase fw-bold">Email:{" "}</span>
                                                            <span>tixme.usa@gmail.com</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-primary-color text-uppercase fw-bold">Phone:{" "}</span>
                                                            <span>+1 (617) 775-0311</span>
                                                        </div>
                                                    </>
                                                )
                                            }
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