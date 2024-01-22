import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import NoRecord from '../../component/Norecordui'
import card from "../../assets/card.png";
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
                country: countryName ? countryName : null,
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
            <div className="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
                <MobileMenu />
                <h1 className="banner-h banner-h-events text-white text-start text-uppercase">Explore our events :</h1>
                <div className="banner-child keywordsBannerIndex">
                    <div className="row mx-lg-3 mx-1 mb-4 mt-4 gx-md-4 gx-2">
                        <div className="col-md-12">
                            <Accordion defaultActiveKey="0" activeKey={activeKey} onSelect={(newKey) => setActiveKey(newKey)}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Search Keywords</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="categories-container pt-4">
                                            {
                                                Listitems.map((item, index) => {
                                                    const isFirstItem = filtercategory === item._id;
                                                    const className = isFirstItem ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n';
                                                    return <a className={className} onClick={(newKey) => {setFilterCategory(item._id); setActiveKey(newKey)}} key={index}>{item.name}</a>;
                                                })
                                            }
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
            <Row className="mx-4" style={{ marginTop: '50px' }}>
                <Col md={3} className="filter-according">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Event Filters</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col md={12} xs={12}>
                                        <div>
                                            <p className="mb-0">Search anything</p>
                                            <div id="inputForm1Div">
                                                <input
                                                    type="text"
                                                    id="form1"
                                                    className="form-control border-b5 mt-lg-0"
                                                    placeholder="Search anything"
                                                    onChange={(e) => setSearchInput(e.target.value)}
                                                    value={SearchInput}
                                                    onKeyDown={handleEnterPress}
                                                />
                                                <button className="dfssfdsfdsf" type="button" onClick={() => fetchEvent()}>
                                                    <img src={InputSearchIcon} alt="" />
                                                </button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div>
                                            <p className="mb-0">Event mode</p>
                                            <div className="filterbutton-container">
                                                <a onClick={() => setEventtype(Eventtype == 1 ? '' : 1)} className={Eventtype == 1 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Online</a>
                                                <a onClick={() => setEventtype(Eventtype == 2 ? '' : 2)} className={Eventtype == 2 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>In-Person</a>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div>
                                            <p className="mb-0">Price</p>
                                            <div className="filterbutton-container">
                                                <a onClick={() => setTicketstype(Ticketstype == 2 ? '' : 2)} className={Ticketstype == 2 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Free</a>
                                                <a onClick={() => setTicketstype(Ticketstype == 1 ? '' : 1)} className={Ticketstype == 1 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Paid</a>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className="">
                                            <p className="mb-2">Date</p>
                                            <div style={{position: 'relative', zIndex: '9'}}>
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
                                        <Col md={12} xs={12}>
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
                                    <Col md={12}>
                                        <p className="mb-0">Select Price rage</p>
                                        {/* <div
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
                                                    <>
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
                                                        <p style={{ float: 'right' }} className="mt-4">$ {values[0].toFixed(0)}</p>
                                                    </>
                                                )}
                                            />

                                        </div> */}
                                        <MultiRangeSlider
                                            min={1}
                                            max={1000}
                                            onChange={({ min, max }) => {
                                                setMinValue(min);
                                                setMaxValue(max);
                                            }}
                                        />
                                    </Col>
                                    <Col md={12} className="mt-5">
                                        <button className="btn btn-primary mx-1" onClick={() => HandelPriceFilter()}>Filter price</button>
                                        <button className="btn btn-dark  mx-1" onClick={Resetfilter}>Reset filter</button>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
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
                                                <div className="col-xl-4 col-md-3 col-12 cursor-pointer" onClick={() => viewEvent(item._id, item.name)}>
                                                    <div className="bg-white rounded-10 shadow-bottom pb-3" style={{ height: '100%' }}>
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
                                                            <div className="col-md-7 d-flex align-items-center">
                                                                <img className="card-icon-logo me-2" src={item.organizer_logo ? item.organizer_logo : Nouserphoto} alt="" />
                                                                <div className="d-flex flex-column align-items-start justify-content-start">
                                                                    <small className="mb-0" style={{ fontSize: '12px' }}>Originated by</small>
                                                                    <p className="text-primary-color fw-bold mb-0 mt-n1 event-text-org-name">
                                                                        By {item.organizer_name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="bg-fade rounded pl-5 event-cart-price-box">
                                                                    <p className="small fw-bold mb-0 pb-0">Onwards</p>
                                                                    {/* <span className="line-through text-primary-color fw-bold mr-2">{item.countrysymbol} {item.displaycutprice}</span> */}
                                                                    <span className="text-primary-color fw-bold event-cart-display-price">{item.countrysymbol} {item.displayprice}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-1">
                                                            <div className="col-md-12">
                                                                <div className="d-flex align-items-center justify-content-start my-2">
                                                                    <img className="card-icon me-1" src={location} alt="" />
                                                                    <p className="text-primary-color fw-bold mb-0 event-cart-location ml-2">
                                                                    {item.city ? item.city : ''}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        {/* <div className="d-flex justify-content-start align-items-start">
                          <div
                            className="d-flex align-items-center justify-content-start w-origin ms-3 pb-2 border-end pe-3"
                            style={{ flexShrink: 0, width: "auto" }}
                          >
                            <img className="card-icon2 me-2" src={clock} alt="" />
                            <div>
                              <p className="small text-primary-color fw-bold mb-0 pb-0">
                                Event Time
                              </p>
                              <p className="small mb-0">{item.start_time}</p>
                            </div>
                          </div>
                          <div
                            className="d-flex align-items-center justify-content-start w-origin ms-3 pb-2"
                            style={{ flexShrink: 0, width: "auto" }}
                          >
                            <img className="card-icon2 me-2" src={hourglass} alt="" />
                            <div>
                              <p className="small text-primary-color fw-bold mb-0 pb-0">
                                Event Duration
                              </p>
                              <p className="small mb-0">{item.event_duration}</p>
                            </div>
                          </div>
                        </div> */}
                                                        <div className="desc-h ms-3 fw-bold mb-0">{item.display_name}</div>
                                                        {/* <p className="desc mx-3 pb-3">
                          {shortPer(item.event_desc, 100)}
                        </p> */}
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
            <Footer />
        </>
    );
};

export default Home;