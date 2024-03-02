import React, { useEffect, useState } from "react";
import { apiurl, organizer_url, getSupportbagecolor, get_date_time, onlyDayMonth, shortPer } from '../../common/Helpers';
import { Col, Row } from "react-bootstrap";
import arrow from "../../assets/arrow.svg";
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Select from 'react-select'
import toast, { ToastBar, Toaster } from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import Noimg from "../../common/image/noimg.jpg";
import Nouserphoto from '../../common/image/nouser.png';
import calendar from "../../assets/calendar.svg";
import locationIcon from "../../assets/location (5) 1.svg";
// component
const Dashboard = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const organizerid = localStorage.getItem('organizerid');
    // Loader
    const [Loader, setLoader] = useState(false);
    const [CustomerLoader, setCustomerLoader] = useState(false);
    const [Apiloader, setApiloader] = useState(false);
    const [SendmailLoader, setSendmailLoader] = useState(false);
    const [ALlCustomerLoader, setALlCustomerLoader] = useState(false);
    const [isAllcustomer, setisAllcustomer] = useState(false);
    // states
    const [EventList, setEventList] = useState([]);
    const [EventListOption, setEventListOption] = useState([]);
    const [EventPreListOption, setEventPreListOption] = useState([]);
    const [AttendanceListOption, setAttendanceListOption] = useState([]);
    const [OrganizersOption, setOrganizersOption] = useState([]);
    const [SelectedOrg, setSelectedOrg] = useState([]);
    const [AttendanceSelected, setAttendanceSelected] = useState([]);
    const [Membershiplist, setMembershiplist] = useState([]);
    const [selectedMemberplan, setselectedMemberplan] = useState([]);
    const [Eventselected, setEventselected] = useState();
    const [EventPreselected, setEventPreselected] = useState();
    const [ticketOptions, setTicketOptions] = useState([]);
    const [Ticketselected, setTicketselected] = useState();
    const [Customerselected, setCustomerselected] = useState();
    const [EventData, setEventData] = useState();
    const [Messge, setMessge] = useState();


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
    const Customerbyorg = [
        {
            options: OrganizersOption
        }
    ]
    const selectMemebership = (id) => {
        if (selectedMemberplan.includes(id)) {
            setselectedMemberplan(selectedMemberplan.filter((categoryId) => categoryId !== id));
        } else {
            setselectedMemberplan([...selectedMemberplan, id]);
        }
    }
    const HandelSelectPreEvents = (selectedOptions) => {
        if (selectedOptions.some(option => option.value === 'selectAll')) {
            setEventPreselected(EventListOption.slice(1));
        } else {
            setEventPreselected(selectedOptions);
        }
    };
    const HandelSelectTicketType = (selectedOptions) => {
        if (selectedOptions.some(option => option.value === 'selectAll')) {
            setTicketselected(ticketOptions.slice(1));
        } else {
            setTicketselected(selectedOptions);
        }
    };
    const HandelOrgSelect = (selectedOptions) => {
        if (selectedOptions.some(option => option.value === 'selectAll')) {
            setSelectedOrg(OrganizersOption.slice(1));
        } else {
            setSelectedOrg(selectedOptions);
        }
    };
    useEffect(() => {
        if (Eventselected) {
            getEventData(Eventselected.value);
        }
    }, [Eventselected]);
    const handleEventChange = () => {
        const newTicketOptions = [];
        if (EventPreselected) {
            newTicketOptions.push({ value: 'selectAll', label: 'Select All' });
            EventPreselected.forEach(selectedEvent => {
                const selectedEventData = EventList.find(event => event._id === selectedEvent.value);
                if (selectedEventData && selectedEventData.allprice) {
                    const filteredTicketOptions = selectedEventData.allprice
                        .filter(ticket => ticket.isdelete === 0)
                        .map(ticket => ({ value: ticket.id, label: ticket.name }));

                    // Add 'Select All' option at the beginning
                    // Append the filtered ticket options
                    newTicketOptions.push(...filteredTicketOptions);
                }

            });
        }
        setTicketOptions(newTicketOptions);
    };
    const getMembershiip = async () => {
        try {
            fetch(apiurl + 'admin/package-plan-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setMembershiplist(data.data);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }

    }
    const getOrganizerlist = async () => {
        try {
            const requestData = {
                isactive: 1,
            };
            fetch(apiurl + 'admin/get-organizer-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const orglistOptions = [
                            { value: 'selectAll', label: 'Select All' },
                            ...data.data.map(customer => ({
                                value: customer._id,
                                label: customer.name
                            }))
                        ];
                        setOrganizersOption(orglistOptions);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }

    }

    const getMyEvents = async () => {
        try {
            setLoader(true)
            const requestData = {
                id: "65d0478a88772f6ffce352a5",
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
    const getEventData = async (id) => {
        try {
            setApiloader(true)
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
                        setEventData(data.data);
                    } else {
                        Toaster.error(data.message);
                    }
                    setApiloader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiloader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiloader(false);
        }
    }

    const handelSendmail = async () => {
        try {
            if (!Eventselected) {
                return toast.error("No event selected");
            }
            if (!selectedMemberplan && !SelectedOrg) {
                return toast.error("No user selected");
            }
            setSendmailLoader(true);
            const requestData = {
                membershipid: selectedMemberplan,
                organizersid: SelectedOrg,
                message: Messge,
                usertype: "Admin",
                eventid: Eventselected.value,
            };
            fetch(apiurl + 'event/admin-eventmail-send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success(data.message);
                        var eventID = Eventselected.value;
                        emptyfield();
                        handelSender(eventID);
                    } else {
                        toast.error(data.message);
                    }
                    setSendmailLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setSendmailLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setSendmailLoader(false)
        }
    }
    const handelSender = async (id) => {
        try {
            const requestData = {
                orgid: organizerid,
                eventid: id,
            };
            fetch(apiurl + 'event/eventmail-sender', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {

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

    const emptyfield = () => {
        setAttendanceSelected("");
        setEventselected("");
        setEventPreselected("");
        setTicketselected("");
        setEventData("");
        setMessge("");
        setisAllcustomer(false);
        setselectedMemberplan([]);
        setSelectedOrg([]);
    }
    const removeAllcustomer = () => {
        setAttendanceSelected("");
        setAttendanceListOption([]);
        setisAllcustomer(false);
    }

    useEffect(() => {
        getMyEvents();
        getMembershiip();
        getOrganizerlist();
    }, []);
    useEffect(() => {
        handleEventChange();
        setTicketselected("");
    }, [EventPreselected]);
    useEffect(() => {
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
                                                        <div className="row">
                                                            <div className="col-md-12">
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
                                                            {Apiloader ? (
                                                                <div className="linear-background w-100" style={{ height: '250px' }}> </div>
                                                            ) : (
                                                                <>
                                                                    {EventData && (
                                                                        <div className="col-md-12">
                                                                            <div className="row d-flex justify-content-center">
                                                                                <div className="col-md-12 col-12 col-lg-12 col-xl-8">
                                                                                    <div className="home-events-box">
                                                                                        <div className="bg-white rounded-10 shadow-bottom pb-3 cursor-pointer overflow-hidden" style={{ height: '100%', position: 'relative' }}>
                                                                                            <div style={{ position: 'relative' }}>
                                                                                                <span className="event-category-img">{EventData.category_name}</span>
                                                                                                <img className="event-card-img" src={EventData.thum_image ? EventData.thum_image : Noimg} alt="" />
                                                                                                <div className="d-flex align-items-center event-date-small-box">
                                                                                                    <span className="event-date-small  d-flex align-items-center">
                                                                                                        <img className="card-icon me-2" src={calendar} alt="" />
                                                                                                        <span className="text-primary-color fw-bold me-0 mb-0 mt-md-0">
                                                                                                            {onlyDayMonth(EventData.start_date)}
                                                                                                        </span>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="row px-2 mt-2">
                                                                                                <div className="col-md-7 d-flex align-items-center col-7">
                                                                                                    <img className="card-icon-logo me-2" src={EventData.organizer_logo ? EventData.organizer_logo : Nouserphoto} alt="" />
                                                                                                    <div className="d-flex flex-column align-items-start justify-content-start">
                                                                                                        <small className="mb-0" style={{ fontSize: '12px' }}>Originated by</small>
                                                                                                        <p className="text-primary-color fw-bold mb-0 mt-n1 event-text-org-name">
                                                                                                            {EventData.organizer_name}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-md-5  col-5">
                                                                                                    <div className="bg-fade rounded text-center event-cart-price-box">
                                                                                                        <span className="text-primary-color fw-bold event-cart-display-price">{EventData.isfreeticket == 1 ? 'FREE' : EventData.countrysymbol + EventData.displayprice + '.00'}</span>
                                                                                                        <p className="small fw-bold mb-0 pb-0">Onwards</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="row mt-1">
                                                                                                <div className="col-md-12">
                                                                                                    <div className="d-flex align-items-center justify-content-start my-2 mx-2">
                                                                                                        <img className="card-icon me-1" src={locationIcon} alt="" />
                                                                                                        <p className="text-primary-color fw-bold mb-0 event-cart-location">
                                                                                                            {EventData.city ? EventData.city + ',' : ''} {EventData.countryname ? EventData.countryname : ''}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="desc-h ms-3 fw-bold mb-0">{shortPer(EventData.display_name, 30)}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}

                                                            <div className="col-md-12">
                                                                <h4>Body</h4>
                                                                <textarea class="form-control" onChange={(e) => setMessge(e.target.value)} id="exampleFormControlTextarea1" rows="9" placeholder="Enter your message" value={Messge}>{Messge}</textarea>
                                                            </div>
                                                        </div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div className="col-md-6">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title className="border-bottom pb-2">Attendance</Card.Title>
                                                    <Card.Text>
                                                        <div className="row">
                                                            {Membershiplist.length > 0 && (
                                                                <>
                                                                    <div className="col-12 col-md-12">
                                                                        Select Membership Attendance
                                                                    </div>
                                                                    {Membershiplist.map((item) => (
                                                                        <div className="col-12 col-md-4">
                                                                            <button onClick={() => selectMemebership(item._id)} type="button" class={`btn ${selectedMemberplan.includes(item._id) ? 'theme-bg text-white' : 'btn-outline-secondary'} text-capitalize w-100`}>{item.name}</button>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                            <div className="col-12 mt-3">
                                                                <div className="form-group">
                                                                    <p>Select Attendance By Organizers</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={Customerbyorg}
                                                                        isMulti
                                                                        className='react-select'
                                                                        classNamePrefix='select'
                                                                        onChange={HandelOrgSelect}
                                                                        value={SelectedOrg}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="row">
                                                                {SendmailLoader ? (
                                                                    <div className="col-md-12 col-xl-6">
                                                                        <button type="button" className="GetLatestUpdateButton">
                                                                            <div className="left px-0 px-md-4">
                                                                                <small className="ms-2">Please Wait...</small>
                                                                            </div>
                                                                            <div className="right">
                                                                                <img style={{ width: "18px" }} src={arrow} alt="" />
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div className="col-md-12 col-xl-6">
                                                                            <button type="button" className="GetLatestUpdateButton" onClick={() => handelSendmail()}>
                                                                                <div className="left px-0 px-md-4">
                                                                                    <small className="ms-2">Send Mail</small>
                                                                                </div>
                                                                                <div className="right">
                                                                                    <img style={{ width: "18px" }} src={arrow} alt="" />
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        {/* <div className="col-md-12  col-xl-6">
                                                                                    <button type="button" className="GetLatestUpdateButton">
                                                                                        <div className="left px-0 px-md-4">
                                                                                            <small className="ms-2">Schedule Mail</small>
                                                                                        </div>
                                                                                        <div className="right">
                                                                                            <img style={{ width: "18px" }} src={arrow} alt="" />
                                                                                        </div>
                                                                                    </button>
                                                                                </div> */}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card >
                        </div >
                    </Row >
                </div >
            </div >

        </>
    )
}
export default Dashboard;