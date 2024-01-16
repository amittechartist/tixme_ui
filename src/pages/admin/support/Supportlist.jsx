import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url, getSupportbagecolor , get_date_time, get_min_date } from '../../../common/Helpers';
import Searchicon from '../../../common/icon/searchicon.png';
import WhiteButton from '../../../component/Whitestarbtn';
import Norecord from '../../../component/Norecordui';
import DateIcon from "../../../common/icon/date 2.svg";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";
import Select from 'react-select'
import { FaCircle } from "react-icons/fa6";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Flatpickr from "react-flatpickr";
    import "flatpickr/dist/themes/material_green.css";
const Dashboard = ({ title }) => {
    const MySwal = withReactContent(Swal)
    const [modal, setModal] = useState(false);
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
    const [Isclosestatus, setIsclosestatus] = useState();
    const fetchList = async () => {
        try {
            setListLoader(true);
            fetch(apiurl + 'admin/support/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                // body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                        setallData(data.data);
                    } else {

                    }
                    setListLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setListLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setListLoader(false);
        }
    }
    const HandelReplyapi = async () => {
        if (!ReplyMessage && Isclosestatus === 0) {
            return toast.error('Reply message is required');
        }
        try {
            const requestData = {
                replymessage: ReplyMessage,
                id: Updatid,
                closestatus: Isclosestatus
            };
            fetch(apiurl + 'admin/support/store-replay', {
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
                        console.log("hii", Isclosestatus);
                        if (Isclosestatus == 1) {
                            setModal(!modal);
                            fetchList();
                        } else {
                            Handelviewmodal(Updatid)
                        }
                        setReplyMessage('');
                        // setapiLoader(false)
                    } else {
                        // setModal(false)
                        // setapiLoader(false)
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    // setModal(false)
                    // setapiLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setModal(false)
        }
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
                        setIsclosestatus(data.data.isclose);
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
    }, []);

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
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row>
                                        <Col md={12}>
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
                                                                                    <p><span className={`ticket-sts-icon ${getSupportbagecolor(item.isclose)}`}><FaCircle /></span><span className="ticket-head-tt1">Ticket# {item.uniqueid}</span> 
                                                                                    {item.priority ? (
                                                                                        <>{item.priority == 'High Priority' ? (<><span className="bage-danger-css">{item.priority}</span></>) : (<><span className="bage-light-css">{item.priority}</span></>)}</>
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
                                                                                        <Link to={`${admin_url}view-support-ticket/${item._id}`} className="Open-Ticket-link">Open Ticket</Link>
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
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Dashboard;