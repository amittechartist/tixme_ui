import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Range, getTrackBackground } from "react-range";
import Eventlogo from "../../common/icon/eventlogo.svg";
import Timelogo from "../../common/icon/time 1.svg";
import Hourglasslogo from "../../common/icon/hourglass.svg";
import LocationIcon from "../../common/icon/location.svg";
import Whitestartbtn from "../../component/Whitestarbtn";
import Eventimg from "../../common/event.jpg";
import { useNavigate } from "react-router-dom";
import DateIcon from "../../common/icon/date 2.svg";
import Accordion from 'react-bootstrap/Accordion';
import Fade from "react-reveal/Fade";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { apiurl, onlyDayMonth, shortPer, app_url, get_date_time } from "../../common/Helpers";
import "./events.css"
const Events = () => {
    const [Listitems, setListitems] = useState([]);
    const [Eventlist, setEventlist] = useState([]);
    const [Eventloader, setEventloader] = useState(false);
    const [filtercategory, setFilterCategory] = useState('');
    const [Ticketstype, setTicketstype] = useState('');
    const [Dateapitype, setDateapitype] = useState('');
    const [Eventtype, setEventtype] = useState('');
    const [Startdateselect, setStartdateselect] = useState(new Date());
    const [RangeStartdateselect, setRangeStartdateselect] = useState(new Date());
    const [Enddateselect, setEnddateselect] = useState(new Date());
    const [values, setValues] = useState([0]);
    const [Datevalue, setDatevalue] = useState();
    const [PriceFilter, setPriceFilter] = useState();
    const [Datetype, setDatetype] = useState();
    const countryName = localStorage.getItem("countryname");
    
    const [Onlydatevalue, setOnlydatevalue] = useState();

    const fromgetdate = get_date_time(Startdateselect);
    const endgetdate = get_date_time(Enddateselect);
    const rangeendgetdate = get_date_time(RangeStartdateselect);
    const STEP = 1;
    const MIN = 0;
    const MAX = 100;
    var startdate = '';
    var rangestartdate = '';
    var enddate = '';
    if (fromgetdate) {
        startdate = fromgetdate[0].Dateview;
    }
    if (rangeendgetdate) {
        rangestartdate = rangeendgetdate[0].Dateview;
    }
    if (endgetdate) {
        enddate = endgetdate[0].Dateview;
    }

    const navigate = useNavigate();
    const viewEvent = async (id, name) => {
        navigate(`${app_url}event/${id}/${name}`)
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
                        const allCategoryItem = { name: 'All', category: 'All' };
                        const updatedList = [allCategoryItem, ...data.data];
                        setListitems(updatedList);

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
    const fetchEvent = async () => {
        try {
            setEventloader(true)
            const requestData = {
                limit: 10,
                organizerid: null,
                category: filtercategory ? filtercategory : null,
                eventtype: Eventtype ? Eventtype : null,
                tickettype: Ticketstype ? Ticketstype : null,
                dateapitype: Dateapitype ? Dateapitype : null,
                onlydate: Datetype == "Pick a date" ? startdate : null,
                country: countryName ? countryName : null,
                fromdate: Datetype == "Pick between two dates" ? rangestartdate : null,
                todate: Datetype == "Pick between two dates" ? enddate : null,
                price: PriceFilter > 0 ? PriceFilter : null,
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
                    setEventloader(false)
                })
                .catch((error) => {
                    console.error("Insert error:", error);
                    setEventloader(false)
                });
        } catch (error) {
            console.error("Login api error:", error);
            setEventloader(false)
        }
    };

    const Resetfilter = async () => {
        setDatetype('');
        setEventtype('');
        setTicketstype('');
        setDateapitype('');
        setValues([0]);
        setFilterCategory('');
        setPriceFilter('');
        setDatevalue({ value: "", label: "Select" });
        startdate = '';
        rangestartdate = '';
        enddate = '';
        fetchEvent()
    }
    
    const DatefilterOption = [
        {
            options: [
                { value: "", label: "Select" },
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
    const selectDatefiltertype = (selectedValue) => {
        setDatevalue(selectedValue);
        setDatetype(selectedValue.value);
        if (selectedValue.value == 'Today' || selectedValue.value == 'Tomorrow' || selectedValue.value == 'This month' || selectedValue.value == 'Next month'  || selectedValue.value == 'Next 7 days') {
            setDateapitype(selectedValue.value);
        }
        if (!selectedValue.value) {
            setDateapitype('');
        }
    };
    useEffect(() => {
        fetchCategory();
    }, []);
    
    useEffect(() => {
        fetchEvent();
        console.log(countryName);
    }, [filtercategory, Eventtype, Ticketstype, Dateapitype, startdate, enddate, PriceFilter, countryName]);
    return (
        <div className='content-data'>
            <Container fluid className="body-container">
                <h1>Explore our events</h1>
                <Row>
                    <Col md={12}>
                        <div className="categories-container">
                            {
                                Listitems.map((item, index) => {
                                    const isFirstItem = filtercategory === item._id;
                                    const className = isFirstItem ? 'active hobby-box ' : 'hobby-box ';
                                    return <a className={className} onClick={() => setFilterCategory(item._id)} key={index}>{item.name}</a>;
                                })
                            }
                        </div>
                    </Col>
                    <Col md={12} className="filter-according">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Event Filters</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col md={12} xs={12}>
                                            <div>
                                                <p className="mb-0">Event mode</p>
                                                <div className="filterbutton-container">
                                                    <a onClick={() => setEventtype(Eventtype == 1 ? '' : 1)} className={Eventtype == 1 ? 'active hobby-box' : 'hobby-box'}>Online</a>
                                                    <a onClick={() => setEventtype(Eventtype == 2 ? '' : 2)} className={Eventtype == 2 ? 'active hobby-box' : 'hobby-box'}>In-Person</a>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} xs={12}>
                                            <div>
                                                <p className="mb-0">Price</p>
                                                <div className="filterbutton-container">
                                                    <a onClick={() => setTicketstype(Ticketstype == 2 ? '' : 2)} className={Ticketstype == 2 ? 'active hobby-box' : 'hobby-box'}>Free</a>
                                                    <a onClick={() => setTicketstype(Ticketstype == 1 ? '' : 1)} className={Ticketstype == 1 ? 'active hobby-box' : 'hobby-box'}>Paid</a>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} xs={12}>
                                            <div>
                                                <p className="mb-2">Date</p>
                                                <div>
                                                    <Select
                                                        isClearable={false}
                                                        options={DatefilterOption}
                                                        className='react-select'
                                                        classNamePrefix='select'
                                                        onChange={selectDatefiltertype}
                                                        value={Datevalue}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        {Datetype == "Pick a date" ? (
                                            <Col md={4} xs={12}>
                                                <p className="mb-1">Select Date</p>
                                                <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                    <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                    <input type="text" class="form-control date-border-redius date-border-redius-input" placeholder="" readOnly value={startdate} />
                                                    <div className="date-style-picker">
                                                        <Flatpickr
                                                            value={Startdateselect}
                                                            id='date-picker'
                                                            className='form-control'
                                                            onChange={date => setStartdateselect(date)}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                        ) : ''}
                                        {Datetype == "Pick between two dates" ? (
                                            <>
                                                <Col md={2} xs={12}>
                                                    <p className="mb-1">Start Date</p>
                                                    <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                        <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                        <input type="text" class="form-control date-border-redius date-border-redius-input" placeholder="" readOnly value={rangestartdate} />
                                                        <div className="date-style-picker">
                                                            <Flatpickr
                                                                value={RangeStartdateselect}
                                                                id='date-picker'
                                                                className='form-control'
                                                                onChange={date => setRangeStartdateselect(date)}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={2} xs={12}>
                                                    <p className="mb-1">End Date</p>
                                                    <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                        <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                        <input type="text" class="form-control date-border-redius date-border-redius-input" placeholder="" readOnly value={enddate} />
                                                        <div className="date-style-picker">
                                                            <Flatpickr
                                                                value={Enddateselect}
                                                                id='date-picker'
                                                                className='form-control'
                                                                onChange={date => setEnddateselect(date)}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </>
                                        ) : ''}
                                        <Col md={12} className="mb-2"></Col>
                                        <Col md={4}>
                                            <p className="mb-0">Select Price rage</p>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    flexWrap: "wrap",
                                                    margin: "2em"
                                                }}
                                            >
                                                <Range
                                                    values={values}
                                                    step={STEP}
                                                    min={MIN}
                                                    max={MAX}
                                                    onChange={(values) => setValues(values)}
                                                    renderTrack={({ props, children }) => (
                                                        <div
                                                            onMouseDown={props.onMouseDown}
                                                            onTouchStart={props.onTouchStart}
                                                            style={{
                                                                ...props.style,
                                                                height: "36px",
                                                                display: "flex",
                                                                width: "100%"
                                                            }}
                                                        >
                                                            <div
                                                                ref={props.ref}
                                                                style={{
                                                                    height: "5px",
                                                                    width: "100%",
                                                                    borderRadius: "4px",
                                                                    background: getTrackBackground({
                                                                        values,
                                                                        colors: ["#548BF4", "#ccc"],
                                                                        min: MIN,
                                                                        max: MAX
                                                                    }),
                                                                    alignSelf: "center"
                                                                }}
                                                            >
                                                                {children}
                                                            </div>
                                                        </div>
                                                    )}
                                                    renderThumb={({ props, isDragged }) => (
                                                        <div
                                                            {...props}
                                                            style={{
                                                                ...props.style,
                                                                height: "42px",
                                                                width: "42px",
                                                                borderRadius: "4px",
                                                                backgroundColor: "#FFF",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                boxShadow: "0px 2px 6px #AAA"
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    height: "16px",
                                                                    width: "5px",
                                                                    backgroundColor: isDragged ? "#548BF4" : "#CCC"
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                <output style={{ marginTop: "30px" }} id="output">
                                                    $ {values[0].toFixed(0)}
                                                </output>
                                            </div>
                                        </Col>
                                        <Col md={4} className="mt-5">
                                            <span onClick={() => setPriceFilter(values[0].toFixed(0) > 0 ? values[0].toFixed(0) : null)}>
                                                <Whitestartbtn title={'Filter price'} />
                                            </span>
                                            <span onClick={Resetfilter}>
                                                <Whitestartbtn title={'Reset filter'} />
                                            </span>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col md={12}>
                        <div className="event-category-section mb-5 in-event-page mt-5">
                            <Container fluid className="">
                                {Eventloader ? (
                                    <>
                                        <Row>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        {Eventlist.length > 0 ? (
                                            <Row className="event-box-mobile">
                                                {Eventlist.map((item, index) => (
                                                    <Col md={4} className="mb-3 cursor-pointer" title="View" onClick={() => viewEvent(item._id, item.name)}>
                                                        <Fade bottom>
                                                            <div className="event-box-style">
                                                                <div className="event-image-part">
                                                                    <img className="event-image" src={Eventimg} alt="" />
                                                                    <span className="event-category-img">{item.category_name}</span>
                                                                    <span className="on-img-date">
                                                                        <img src={DateIcon} alt="" />
                                                                        <span className="on-img-date-val">{onlyDayMonth(item.start_date)}</span>
                                                                    </span>
                                                                </div>
                                                                <div className="organizer-name-sec d-flex align-items-center px-2 py-2">
                                                                    <div className="d-inline-block mr-3">
                                                                        <img
                                                                            height={70}
                                                                            width={70}
                                                                            src={Eventlogo}
                                                                            alt=""
                                                                            className="organiger-logo"
                                                                        />
                                                                    </div>
                                                                    <div className="d-inline-block">
                                                                        <span className="organizer-by d-block">Organised by</span>
                                                                        <span className="organizer-name d-block">By {item.organizer_name}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="organizer-name-sec px-2 py-2">
                                                                    <div className="d-inline-flex align-items-center border-right event-time-area">
                                                                        <div className="d-inline-block mr-1">
                                                                            <img height={30} width={30} src={Timelogo} alt="" />
                                                                        </div>
                                                                        <div className="d-inline-block">
                                                                            <span className="event-duration d-block">Event Time</span>
                                                                            <span className="event-time d-block">{item.start_time}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-inline-flex align-items-center">
                                                                        <div className="d-inline-block mr-1">
                                                                            <img height={30} width={30} src={Hourglasslogo} alt="" />
                                                                        </div>
                                                                        <div className="d-inline-block">
                                                                            <span className="event-duration d-block">
                                                                                Event Duration
                                                                            </span>
                                                                            <span className="event-time d-block">{item.event_duration}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="event-name">
                                                                        <span>{item.display_name}</span>
                                                                        <p>
                                                                            {shortPer(item.event_desc, 100)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="ticket-price-area mt-3">
                                                                    <Row>
                                                                        <Col md={7} xs={7} className="border-top-doted">
                                                                            <div className="location d-flex align-items-center text-center">
                                                                                <img height={30} width={30} src={LocationIcon} alt="" />{" "}
                                                                                <span>{item.location}</span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={5} xs={5}>
                                                                            <div className="price-section text-center">
                                                                                <p>Ticket Price</p>
                                                                                <span className="price">${item.displayprice}</span>
                                                                                <span className="cut-price">${item.displaycutprice}</span>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </div>
                                                        </Fade>
                                                    </Col>
                                                ))}
                                            </Row>
                                        ) : (
                                            <>
                                                <Col md={12}>
                                                    <Alert variant="danger">
                                                        No records available for the specified filter
                                                    </Alert>
                                                </Col>
                                            </>
                                        )}
                                    </>
                                )}
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Events;