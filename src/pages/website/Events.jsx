import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import NoRecord from '../../component/Norecordui'
import card from "../../assets/card.png";
import ArrowDown from '../../assets/arrowdrop.svg'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Select from 'react-select'
import calendar from "../../assets/calendar.svg";
import eventLogo from "../../assets/eventLogo.svg";
import clock from "../../assets/clock.svg";
import hourglass from "../../assets/hourglass.svg";
import location from "../../assets/location (5) 1.svg";
import InputSearchIcon from '../../assets/inputSearch.png'
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import MobileMenu from '../../components/mobilemenu';
import Alert from 'react-bootstrap/Alert';
import { Range, getTrackBackground } from "react-range";
import Whitestartbtn from "../../component/Whitestarbtn";
import DateIcon from "../../common/icon/date 2.svg";
import Nouserphoto from '../../common/image/nouser.png';
import Accordion from 'react-bootstrap/Accordion';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { apiurl, onlyDayMonth, shortPer, app_url, get_date_time } from "../../common/Helpers";
import { Link, useNavigate } from "react-router-dom";
import Noimg from "../../common/image/noimg.jpg";
import MultiRangeSlider from "../../component/multiRangeSlider/MultiRangeSlider";
const Home = () => {

    const [searchParams] = useSearchParams();
    const [minValue, setMinValue] = useState(1);
    const [maxValue, setMaxValue] = useState(1000);
    const [wantPricefilter, setWantPricefilter] = useState(false);
    const searchQuery = searchParams.get('query');
    const categoryid = searchParams.get('categoryId');
    useEffect(() => {
        if (searchQuery) {
            setSearchInput(searchQuery);
        }
        if (categoryid) {
            setFilterCategory(categoryid);
        }
    }, []);
    const navigate = useNavigate();
    const [Listitems, setListitems] = useState([]);
    const [Eventlist, setEventlist] = useState([]);
    const [Eventloader, setEventloader] = useState(false);
    const [filtercategory, setFilterCategory] = useState('');
    const [SearchInput, setSearchInput] = useState('');
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
                        const updatedList = [...data.data];
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
    const HandelPriceFilter = () => {
        setWantPricefilter(true);
        fetchEvent();
    }
    
    const fetchEvent = async () => {
        try {
            setEventloader(true)
            const requestData = {
                limit: 50,
                organizerid: null,
                category: filtercategory ? filtercategory : null,
                eventtype: Eventtype ? Eventtype : null,
                tickettype: Ticketstype ? Ticketstype : null,
                dateapitype: Dateapitype ? Dateapitype : null,
                onlydate: Datetype == "Pick a date" ? startdate : null,
                country: countryName ? null : null,
                display_name: SearchInput ? SearchInput : (searchQuery ? searchQuery : null),
                fromdate: Datetype == "Pick between two dates" ? rangestartdate : null,
                todate: Datetype == "Pick between two dates" ? enddate : null,
                minprice: wantPricefilter ? minValue : null,
                maxprice: wantPricefilter ? maxValue : null,

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
        setMinValue('1');
        setMaxValue('1000');
        setDatevalue({ value: "", label: "Select" });
        startdate = '';
        rangestartdate = '';
        enddate = '';
        setSearchInput('');
        setWantPricefilter(false);
        navigate(app_url + 'events')
        // fetchEvent()
        window.location.reload();
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
        if (selectedValue.value == 'Today' || selectedValue.value == 'Tomorrow' || selectedValue.value == 'This month' || selectedValue.value == 'Next month' || selectedValue.value == 'Next 7 days') {
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
    }, [filtercategory, Eventtype, Ticketstype, Dateapitype, startdate, enddate, wantPricefilter, countryName, searchQuery]);
    const [activeKey, setActiveKey] = useState(null);

    function handleEnterPress(event) {
        if (event.keyCode === 13 || event.which === 13) {
            fetchEvent();
        }
    }

    return (
        <>
            {" "}
            <HeaderMenu />
            <div className="mx-lg-4 my-lg-3 banner-events-page bg-primary-color rounded-8 position-relative">
                <MobileMenu />
                <h1 className="banner-h banner-h-events text-white text-start text-uppercase">Explore our events :</h1>
            </div>
            <div className="event-view-body">
                <Row className="mx-4" style={{ marginTop: '50px' }}>
                    <Col md={3} className="filter-according events-page-filter-box mb-4 mb-md-0">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="events-page-search" id="inputForm1Div" style={{ height: '40px' }}>
                                    <input
                                        type="search"
                                        id="form1"
                                        className="form-control mt-lg-0"
                                        placeholder="Search for Events"
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        value={SearchInput}
                                        onKeyDown={handleEnterPress}
                                        style={{ height: '40px', border: 'none' }}
                                    />
                                    <button className="dfssfdsfdsf" type="button" style={{ background: '#F6F6F6' }}>
                                        <img src={InputSearchIcon} alt="" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <div className="selectDiv" style={{ marginRight: '0px' }}>
                                    <select
                                        className="form-select category me-4"
                                        aria-label="Default select example"
                                        onChange={(event) => setFilterCategory(event.target.value)}
                                        style={{ paddingTop: '8px', height: '40px' }}
                                    >
                                        <option value=''>All</option>
                                        {Listitems.map((item, index) => (
                                            <option selected={filtercategory === item._id} value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                    <img src={ArrowDown} alt="" />
                                </div>
                            </div>
                            <Col md={12} xs={12} className=" mt-3">
                                <div>
                                    {/* <p className="mb-0">Event mode</p> */}
                                    <div className="filterbutton-container">
                                        <a onClick={() => setEventtype(Eventtype == 1 ? '' : 1)} className={Eventtype == 1 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Online</a>
                                        <a onClick={() => setEventtype(Eventtype == 2 ? '' : 2)} className={Eventtype == 2 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>In-Person</a>
                                        <a onClick={() => setTicketstype(Ticketstype == 2 ? '' : 2)} className={Ticketstype == 2 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Free</a>
                                        <a onClick={() => setTicketstype(Ticketstype == 1 ? '' : 1)} className={Ticketstype == 1 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Paid</a>
                                    </div>
                                </div>
                            </Col>

                            <Col md={12} xs={12} className="mt-3">
                                <div className="selectDiv" style={{ marginRight: '0px' }}>
                                    <select
                                        className="form-select category me-4"
                                        aria-label="Default select example"
                                        onChange={(event) => setDatetype(event.target.value)}
                                        style={{ paddingTop: '8px', height: '40px' }}
                                    >
                                        <option value=''>Date</option>
                                        <option value='Pick a date'>Pick a date</option>
                                        {/* <option value='Pick between two dates'>Pick Date Range</option> */}
                                    </select>
                                    <img src={ArrowDown} alt="" />
                                </div>
                            </Col>
                            {Datetype && (
                                <div className="col-md-12 mt-4">
                                    {Datetype == "Pick a date" ? (
                                        <>
                                            <div class="input-group input-warning-o" style={{ position: 'relative' }}>
                                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                <input type="text" class="form-control date-border-redius date-border-redius-input bg-white" placeholder="" readOnly value={startdate} />
                                                <div className="date-style-picker">
                                                    <Flatpickr
                                                        value={Startdateselect}
                                                        id='date-picker'
                                                        className='form-control'
                                                        onChange={date => setStartdateselect(date)}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : ''}
                                    {Datetype == "Pick between two dates" ? (
                                        <>
                                            <Col md={12} xs={12}>
                                                <p className="mb-1">Start Date</p>
                                                <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                    <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                    <input type="text" class="form-control date-border-redius date-border-redius-input bg-white" placeholder="" readOnly value={rangestartdate} />
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
                                            <Col md={12} xs={12}>
                                                <p className="mb-1">End Date</p>
                                                <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                    <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                    <input type="text" class="form-control date-border-redius date-border-redius-input bg-white" placeholder="" readOnly value={enddate} />
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
                                </div>
                            )}

                            {/* <Col md={12} xs={12} className="mt-2">
                            <div className="selectDiv" style={{ marginRight: '0px' }}>
                                <select
                                    className="form-select category me-4"
                                    aria-label="Default select example"

                                    style={{ paddingTop: '8px', height: '40px' }}
                                >
                                    <option value=''>Location</option>
                                </select>
                                <img src={ArrowDown} alt="" />
                            </div>
                        </Col> */}
                            <Col md={12} xs={12} className="mt-3">
                                <p className="mb-0 theme-color">Ticket Price</p>
                                <MultiRangeSlider
                                    min={1}
                                    max={1000}
                                    onChange={({ min, max }) => {
                                        setMinValue(min);
                                        setMaxValue(max);
                                    }}
                                />
                            </Col>
                            <div className="col-md-6 col-6 my-4 ">
                                <button className="btn theme-bg w-100 text-white" onClick={() => HandelPriceFilter()}>Apply Filter</button>
                            </div>
                            <div className="col-md-6 col-6 my-4 pb-4 pb-md-0">
                                <button type="button" className="btn theme-bg w-100 text-white" onClick={Resetfilter}>Reset</button>
                            </div>
                        </div>

                    </Col>
                    <Col md={9}>
                        <div className="event-category-section mb-5 in-event-page">
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
                                                    <div className="col-xl-4 col-xxl-4 col-md-4 col-12 mb-3">
                                                        <div className="bg-white rounded-10 shadow-bottom pb-3 cursor-pointer" onClick={() => viewEvent(item._id, item.name)} style={{ height: '100%' }}>
                                                            <div style={{ position: 'relative' }}>
                                                                <span className="event-category-img">{item.category_name}</span>
                                                                <img className="event-card-img" src={item.thum_image ? item.thum_image : Noimg} alt="" />
                                                                <div className="d-flex align-items-center event-date-small-box">
                                                                    <span className="event-date-small">
                                                                        <img className="card-icon me-2" src={calendar} alt="" />
                                                                        <span className="text-primary-color fw-bold me-0 mb-0 mt-md-0">
                                                                            {onlyDayMonth(item.start_date)}
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="row px-2 mt-2">
                                                                <div className="col-md-7 d-flex align-items-center col-7">
                                                                    <img className="card-icon-logo me-2" src={item.organizer_logo ? item.organizer_logo : Nouserphoto} alt="" />
                                                                    <div className="d-flex flex-column align-items-start justify-content-start">
                                                                        <small className="mb-0" style={{ fontSize: '12px' }}>Originated by</small>
                                                                        <p className="text-primary-color fw-bold mb-0 mt-n1 event-text-org-name">
                                                                            {item.organizer_name}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-5  col-5">
                                                                    <div className="bg-fade rounded pl-5 event-cart-price-box">
                                                                        <p className="small fw-bold mb-0 pb-0">Onwards</p>
                                                                        {/* <span className="line-through text-primary-color fw-bold mr-2">{item.countrysymbol} {item.displaycutprice}</span> */}
                                                                        <span className="text-primary-color fw-bold event-cart-display-price">{item.countrysymbol} {item.displayprice}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-1">
                                                                <div className="col-md-12">
                                                                    <div className="d-flex align-items-center justify-content-start my-2 mx-2">
                                                                        <img className="card-icon me-1" src={location} alt="" />
                                                                        <p className="text-primary-color fw-bold mb-0 event-cart-location ml-2">
                                                                            {item.city ? item.city + ',' : ''} {item.countryname ? item.countryname : ''}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="desc-h ms-3 fw-bold mb-0">{item.display_name}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Row>
                                        ) : (
                                            <>
                                                <Col md={12}>
                                                    <NoRecord />
                                                </Col>
                                            </>
                                        )}
                                    </>
                                )}
                            </Container>
                        </div>
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
};

export default Home;