import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import NoRecord from '../../component/Noeventsdui'
import ArrowDown from '../../assets/arrowdrop.svg'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from 'moment';
import Container from "react-bootstrap/Container";
import calendar from "../../assets/calendar.svg";
import location from "../../assets/location (5) 1.svg";
import InputSearchIcon from '../../assets/inputSearch.png'
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import MobileMenu from '../../components/mobilemenu';
import DateIcon from "../../common/icon/date 2.svg";
import Nouserphoto from '../../common/image/nouser.png';
import Flatpickr from "react-flatpickr";
import { FaTimes } from 'react-icons/fa';
import "flatpickr/dist/themes/material_green.css";
import { apiurl, onlyDayMonth, app_url, get_date_time, get_min_date } from "../../common/Helpers";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import Noimg from "../../common/image/noimg.jpg";
import toast from "react-hot-toast";
import { FaFilter } from "react-icons/fa6";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
const Home = () => {
    const animatedComponents = makeAnimated();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [searchParams] = useSearchParams();
    const [minValue, setMinValue] = useState(1);
    const [CatDropdownopen, setCatDropdownopen] = useState(false);
    const [CategoryList, setCategoryList] = useState([]);
    const [zzz, setzzz] = useState(false);
    const [maxValue, setMaxValue] = useState(1000);
    const [wantPricefilter, setWantPricefilter] = useState(false);
    const [CountryList, setCountryList] = useState();
    const [CountryListLoader, setCountryListLoader] = useState(true);
    const searchQuery = searchParams.get('query');
    const categoryid = searchParams.get('categoryId');
    const country_params = searchParams.get('country');
    function getCountryFlagImage(country) {
        if (country == "India") {
            // return <img className="event-card-flag" src={Indiaflag} />;
        } else if (country == "United states") {
            // return <img className="event-card-flag" src={Usaflag} />;
        } else if (country == "Singapore") {
            // return <img className="event-card-flag" src={Singapureflag} />;
        } else {
            return null;
        }
    }
    const navigate = useNavigate();
    const [Listitems, setListitems] = useState([]);
    const [Eventlist, setEventlist] = useState([]);
    const [Eventloader, setEventloader] = useState(false);
    const [filtercategory, setFilterCategory] = useState('');
    const [FiltersearchQuery, setFiltersearchQuery] = useState(false);
    const [SearchInput, setSearchInput] = useState('');
    const [SInput, setSInput] = useState(true);
    const [alreadyusersearcher, setalreadyusersearcher] = useState(false);
    const [CountryFilter, setCountryFilter] = useState('');
    const [Ticketstype, setTicketstype] = useState('');
    const [Dateapitype, setDateapitype] = useState('');
    const [Eventtype, setEventtype] = useState('');
    const [Minprice, setMinprice] = useState('');
    const [Maxprice, setMaxprice] = useState('');
    const [Startdateselect, setStartdateselect] = useState(moment());
    const [RangeStartdateselect, setRangeStartdateselect] = useState(moment());
    const [Enddateselect, setEnddateselect] = useState(moment());
    const [values, setValues] = useState([0]);
    const [Datevalue, setDatevalue] = useState();
    const [PriceFilter, setPriceFilter] = useState();
    const [Datetype, setDatetype] = useState();
    const [Singapur, setSingapur] = useState();
    const [India, setIndia] = useState();
    const [Usa, setUsa] = useState();
    const [Isany, setIsany] = useState(false);
    const [renderSecond, setrenderSecond] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const visibleItems = Listitems;
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [FStartdate, setFStartdate] = useState(moment());
    const [FEndtdate, setFEndtdate] = useState(moment());
    const GetCategoryName = (id) => {
        const category = CategoryList.find(item => item.value === id);
        return category ? category.label : 'loading...';
    }

    const handleCheckboxChange = (id) => {
        if (id == 'any') {
            setSelectedCategories([]);
            setIsany(!Isany);
        } else {
            if (selectedCategories.includes(id)) {
                // Remove id from the selectedCategories array if it's already there (deselect)
                setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id));
            } else {
                // Add id to the selectedCategories array if it's not there (select)
                setSelectedCategories([...selectedCategories, id]);
            }
            setIsany(false);
        }
    };

    const handleCountrychange = (id) => {
        if (selectedCountry.includes(id)) {
            setSelectedCountry(selectedCountry.filter((categoryId) => categoryId !== id));
        } else {
            setSelectedCountry([...selectedCountry, id]);
        }
    };
    const [Onlydatevalue, setOnlydatevalue] = useState();

    const fromgetdate = get_date_time(Startdateselect);
    const endgetdate = get_date_time(Enddateselect);
    const filer_start_date = FStartdate && get_date_time(FStartdate);
    const filer_end_date = FEndtdate && get_date_time(FEndtdate);
    console.log([FStartdate, FEndtdate]);
    const STEP = 1;
    const MIN = 0;
    const MAX = 100;
    var startdate = '';
    var rangestartdate = '';
    var enddate = '';
    if (fromgetdate) {
        startdate = fromgetdate[0].Dateview;
    }
    const handelDaterange = (date) => {
        if (date[0] && date[1]) {
            setFStartdate(date[0]);
            setRangeStartdateselect(date[0]);
            setEnddateselect(date[1]);
            // const get_start_date = get_date_time(date[0]);
            // setviewStartdate(get_start_date[0].Dateview);
            // setvalueStartdate(get_min_date(date[0]));
            setFEndtdate(date[1]);
            // const get_end_date = get_date_time(date[1]);
            // setviewEndtdate(get_end_date[0].Dateview);
            // setvalueEndtdate(get_min_date(date[1]));
        }
    }
    if (filer_start_date) {
        rangestartdate = filer_start_date[0].Dateview;
    }
    if (filer_end_date) {
        enddate = filer_end_date[0].Dateview;
    }

    const viewEvent = async (id, name) => {
        const formattedName = name.replace(/\s+/g, '-');
        navigate(`${app_url}event/${id}/${formattedName}`)
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
                        const CategoryOption = data.data.map(category => ({
                            value: category._id,
                            label: category.name
                        }));
                        setCategoryList(CategoryOption);
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
    const EventCategoryOption = [
        {
            options: CategoryList
        }
    ]
    const fetchEvent = async (e) => {
        if (e) e.preventDefault();
        try {
            if (Minprice && Maxprice) {
                if (parseFloat(Minprice) >= parseFloat(Maxprice)) {
                    return toast.error("The minimum price must be below the maximum price");
                }
            }
            setEventloader(true)
            window.scrollTo(0, 0);
            const requestData = {
                limit: 50,
                organizerid: null,
                category: selectedCategories ? selectedCategories : null,
                eventtype: Eventtype ? Eventtype : null,
                tickettype: Ticketstype ? Ticketstype : null,
                dateapitype: Dateapitype ? Dateapitype : null,
                onlydate: Datetype === "Pick a date" ? startdate : null,
                display_name: SearchInput ? SearchInput : searchQuery && SInput ? searchQuery : null,
                fromdate: Datetype === "Pick between two dates" ? get_min_date(RangeStartdateselect) : null,
                todate: Datetype === "Pick between two dates" ? get_min_date(Enddateselect) : null,
                minprice: Minprice ? Minprice : 1,
                maxprice: Maxprice ? Maxprice : 100000000000000000000000000000000000000000000000000000000,
                country_filter: selectedCountry.length > 0 ? selectedCountry : country_params ? [country_params] : null,
            }
            const response = await fetch(apiurl + "website/all-events-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                // If the response is not ok, throw an error
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.success === true) {
                setEventlist(data.data);
                setrenderSecond(true);
                if (renderSecond) {
                    navigate(app_url + 'events');
                }
            } else {
                // Handle the case where data.success is not true
                console.error("Error: ", data.message);
            }
        } catch (error) {
            console.error("Error: ", error.message || "An error occurred");
        } finally {
            // Set loading to false regardless of outcome
            setEventloader(false);
            setMobilefilter(false);
        }
    };

    const Resetfilter = async () => {
        window.scrollTo(0, 0);
        setDatetype('');
        setEventtype('');
        setTicketstype('');
        setDateapitype('');
        setDatevalue({ value: "", label: "Select" });
        navigate(app_url + 'events')
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
    const fetchCountry = async () => {
        try {
            setCountryListLoader(true);
            fetch(apiurl + 'admin/country-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setCountryList(data.data);
                    }
                    setCountryListLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setCountryListLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setCountryListLoader(false);
        }
    }
    useEffect(() => {
        fetchCategory();
    }, []);
    useEffect(() => {
        if (categoryid && categoryid.length > 0) {
            handleCheckboxChange(categoryid)
        }
        // if (country_params && country_params.length > 0) {
        //     handleCountrychange(country_params);
        // }
        if (searchQuery && searchQuery.length > 0) {
            // setFiltersearchQuery(true);
            setSInput(true);
            // setSearchInput(searchQuery);
        }
    }, []);

    useEffect(() => {
        fetchEvent();
        // India, Singapur, Usa,
        // startdate, enddate
        // Dateapitype
        // wantPricefilter

    }, [selectedCategories, Eventtype, Ticketstype, FiltersearchQuery, selectedCountry, startdate, enddate, rangestartdate, Datetype]);
    const [mobilefilter, setMobilefilter] = useState(false);
    return (
        <>
            <Modal isOpen={mobilefilter} toggle={() => setMobilefilter(!mobilefilter)} centered>
                <ModalHeader>Filter
                    <button className="close p-0" onClick={() => setMobilefilter(!mobilefilter)} style={{ position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'transparent' }}>
                        <FaTimes />
                    </button>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <form onSubmit={fetchEvent}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="events-page-search" id="inputForm1Div" style={{ height: '40px' }}>
                                        <input
                                            type="search"
                                            id="form1"
                                            className="form-control mt-lg-0"
                                            placeholder="Search"
                                            onChange={(e) => { setSearchInput(e.target.value); setSInput(false); setalreadyusersearcher(true); }}
                                            value={SearchInput ? SearchInput : SInput ? searchQuery : ''}
                                            style={{ height: '40px', border: 'none' }}
                                        />
                                        <button className="dfssfdsfdsf" onClick={() => fetchEvent()} type="button" style={{ background: '#F6F6F6' }}>
                                            <img src={InputSearchIcon} alt="" />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <p className="mb-0 theme-color">Country</p>
                                    <a style={{ fontSize: '13px' }} onClick={() => handleCountrychange("Singapore")} className={selectedCountry.length > 0 ? selectedCountry.includes("Singapore") ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n ggg' : country_params == "Singapore" ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Singapore</a>
                                    <a style={{ fontSize: '13px' }} onClick={() => handleCountrychange("India")} className={selectedCountry.length > 0 ? selectedCountry.includes("India") ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n ggg' : country_params == "India" ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>India</a>
                                    <a style={{ fontSize: '13px' }} onClick={() => handleCountrychange("United states")} className={selectedCountry.length > 0 ? selectedCountry.includes("United states") ? 'tag-active hobby-box copy-n ggg' : 'hobby-box copy-n' : country_params == "United states" ? 'tag-active hobby-box copy-n'  : 'hobby-box copy-n'}>United states</a>
                                </div>
                                <div className="col-md-12 mt-3">

                                    <p className="mb-0 theme-color">Genres</p>
                                    <div style={{ position: 'relative' }}>
                                        <div className="event-page-category-filter-box event-page-category-filter-box1" onClick={() => setCatDropdownopen(!CatDropdownopen)}>
                                            {selectedCategories.length > 0 ? (
                                                <>
                                                    {selectedCategories.map((item, index) => (
                                                        <span onClick={() => handleCheckboxChange(item)}>{GetCategoryName(item)}</span>
                                                    ))}
                                                </>
                                            ) : (
                                                <p className="mb-0 theme-color">Select Category</p>
                                            )}
                                            <img src={ArrowDown} alt="" />
                                        </div>
                                        {CatDropdownopen && (
                                            <div className="category-box-new">
                                                <div>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id={`checkbox-any`}
                                                            name={'any'}
                                                            checked={Isany}
                                                            onChange={() => handleCheckboxChange('any')}
                                                        />
                                                        <label style={{ marginLeft: '10px' }} htmlFor={`checkbox-any`}>Any</label>
                                                    </div>
                                                    {visibleItems.map((item) => (
                                                        <div key={item._id}>
                                                            <input
                                                                type="checkbox"
                                                                id={`checkbox-${item._id}`}
                                                                name={item.name}
                                                                checked={selectedCategories.includes(item._id)}
                                                                onChange={() => handleCheckboxChange(item._id)}
                                                            />
                                                            <label style={{ marginLeft: '10px' }} htmlFor={`checkbox-${item._id}`}>{item.name}</label>
                                                        </div>
                                                    ))}
                                                    {Listitems.length > 5 && (
                                                        <button className="filter-show-cat-btn" onClick={() => setShowAll(!showAll)}>
                                                            {showAll ? 'Show Less' : 'Show More'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Col md={12} xs={12} className=" mt-3">
                                    <div>
                                        <p className="mb-0 theme-color">Mode</p>
                                        <div className="filterbutton-container">
                                            <a style={{ paddingLeft: "16px", paddingRight: "16px" }} onClick={() => setEventtype(Eventtype == 1 ? '' : 1)} className={Eventtype == 1 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Online</a>
                                            <a onClick={() => setEventtype(Eventtype == 2 ? '' : 2)} className={Eventtype == 2 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>In-Person</a>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12} xs={12} className="">
                                    <div>
                                        <p className="mb-0 theme-color">Admission</p>
                                        <div className="filterbutton-container">
                                            <a style={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => setTicketstype(Ticketstype == 2 ? '' : 2)} className={Ticketstype == 2 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Free</a>
                                            <a style={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => setTicketstype(Ticketstype == 1 ? '' : 1)} className={Ticketstype == 1 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Paid</a>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12} xs={12} className="mt-3">
                                    <div className="selectDiv" style={{ marginRight: '0px' }}>
                                        <select
                                            className="form-select category me-4"
                                            aria-label="Default select example"
                                            onChange={(event) => setDatetype(event.target.value)}
                                            style={{ paddingTop: '8px', height: '40px', color: '#0047ab' }}
                                        >
                                            <option value=''>Date</option>
                                            <option value='Pick a date'>Date Picker</option>
                                            <option value='Pick between two dates'>Date Range Picker</option>
                                        </select>
                                        <img src={ArrowDown} alt="" />
                                    </div>
                                </Col>
                                {Datetype && (
                                    <>
                                        <div className="col-md-12 mt-4">
                                            <div class="input-group input-warning-o" style={{ position: 'relative' }}>
                                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                <input type="text" class="form-control date-border-redius date-border-redius-input bg-white" placeholder="" readOnly value={Datetype == "Pick between two dates" ? rangestartdate + ' - ' + enddate : startdate} />
                                                <div className="date-style-picker">
                                                    {Datetype == "Pick a date" && (
                                                        <Flatpickr
                                                            id='date-picker-singel'
                                                            className='form-control'
                                                            onChange={date => setStartdateselect(date)}
                                                        />
                                                    )}
                                                    {Datetype == "Pick between two dates" && (
                                                        <Flatpickr
                                                            id='date-picker'
                                                            options={{ mode: "range" }}
                                                            className='form-control'
                                                            onChange={date => handelDaterange(date)}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <Col md={12} xs={12} className="mt-3">
                                    <p className="mb-0 theme-color">Price Range</p>
                                </Col>
                                <Col md={6} className="mt-3">
                                    <input className="form-control" type="number" placeholder="Min price" min={1} onChange={(e) => setMinprice(e.target.value)}></input>
                                </Col>
                                <Col md={6} className="mt-3">
                                    <input className="form-control" type="number" placeholder="Max price" min={1} onChange={(e) => setMaxprice(e.target.value)}></input>
                                </Col>
                                <div className="col-md-6 col-6 my-4 ">
                                    <button className="btn theme-bg w-100 text-white" type="submit">Apply</button>
                                </div>
                                <div className="col-md-6 col-6 my-4 pb-4 pb-md-0">
                                    <button type="button" className="btn theme-bg w-100 text-white" onClick={Resetfilter}>Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
            </Modal>
            <div className="content-area">
                {" "}
                <HeaderMenu />
                <div className="mx-lg-4 my-lg-3 banner-events-page bg-primary-color rounded-8 position-relative">
                    <MobileMenu />
                    <h1 className="banner-h banner-h-events text-white text-start text-uppercase animate__animated animate__bounce">Explore our events</h1>
                </div>
                <div className="event-view-body">
                    <div className="event-page-mergin-currect">
                        <Row className="my-3 my-md-5">
                            <Col md={3} xl={3} lg={4} className="col-xl-3 col-lg-4 col-md-3 col-12 d-md-inline d-none filter-according events-page-filter-box mb-4 mb-md-0" style={{ height: "100%" }}>
                                <form onSubmit={fetchEvent}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="events-page-search" id="inputForm1Div" style={{ height: '40px' }}>
                                                <input
                                                    type="search"
                                                    id="form1"
                                                    className="form-control mt-lg-0"
                                                    placeholder="Search"
                                                    onChange={(e) => { setSearchInput(e.target.value); setSInput(false); setalreadyusersearcher(true); }}
                                                    value={SearchInput ? SearchInput : SInput ? searchQuery : ''}
                                                    style={{ height: '40px', border: 'none' }}
                                                />
                                                <button className="dfssfdsfdsf" onClick={() => fetchEvent()} type="button" style={{ background: '#F6F6F6' }}>
                                                    <img src={InputSearchIcon} alt="" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            <p className="mb-0 theme-color">Country</p>
                                            <a style={{ fontSize: '13px' }} onClick={() => handleCountrychange("Singapore")} 
                                            className={selectedCountry.length > 0 ? selectedCountry.includes("Singapore") ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n' : country_params == "Singapore" ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Singapore</a>
                                            <a style={{ fontSize: '13px' }} onClick={() => handleCountrychange("India")} className={selectedCountry.length > 0 ? selectedCountry.includes("India") ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n' : country_params == "India" ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>India</a>
                                            <a style={{ fontSize: '13px' }} onClick={() => handleCountrychange("United states")} className={selectedCountry.length > 0 ? selectedCountry.includes("United states") ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n' : country_params == "United states" ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>United states</a>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            <p className="mb-0 theme-color">Genres</p>
                                            {/* <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                options={EventCategoryOption}
                                            /> */}
                                            <div style={{ position: 'relative' }}>
                                                <div className="event-page-category-filter-box event-page-category-filter-box1" onClick={() => setCatDropdownopen(!CatDropdownopen)}>
                                                    {selectedCategories.length > 0 ? (
                                                        <>
                                                            {selectedCategories.map((item, index) => (
                                                                <span onClick={() => handleCheckboxChange(item)}>{GetCategoryName(item)}</span>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <p className="mb-0 theme-color">Select Category</p>
                                                    )}
                                                    <img src={ArrowDown} alt="" />
                                                </div>
                                                {CatDropdownopen && (
                                                    <div className="category-box-new">
                                                        <div>
                                                            <div>
                                                                <input
                                                                    type="checkbox"
                                                                    id={`checkbox-any`}
                                                                    name={'any'}
                                                                    checked={Isany}
                                                                    onChange={() => handleCheckboxChange('any')}
                                                                />
                                                                <label style={{ marginLeft: '10px' }} htmlFor={`checkbox-any`}>Any</label>
                                                            </div>
                                                            {visibleItems.map((item) => (
                                                                <div key={item._id}>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`checkbox-${item._id}`}
                                                                        name={item.name}
                                                                        checked={selectedCategories.includes(item._id)}
                                                                        onChange={() => handleCheckboxChange(item._id)}
                                                                    />
                                                                    <label style={{ marginLeft: '10px' }} htmlFor={`checkbox-${item._id}`}>{item.name}</label>
                                                                </div>
                                                            ))}
                                                            {/* {Listitems.length > 5 && (
                                                                <button className="filter-show-cat-btn" onClick={() => setShowAll(!showAll)}>
                                                                    {showAll ? 'Show Less' : 'Show More'}
                                                                </button>
                                                            )} */}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Col md={12} xs={12} className=" mt-3">
                                            <div>
                                                <p className="mb-0 theme-color">Mode</p>
                                                <div className="filterbutton-container">
                                                    <a style={{ paddingLeft: "16px", paddingRight: "16px" }} onClick={() => setEventtype(Eventtype == 1 ? '' : 1)} className={Eventtype == 1 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Online</a>
                                                    <a onClick={() => setEventtype(Eventtype == 2 ? '' : 2)} className={Eventtype == 2 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>In-Person</a>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} xs={12} className="">
                                            <div>
                                                <p className="mb-0 theme-color">Admission</p>
                                                <div className="filterbutton-container">
                                                    <a style={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => setTicketstype(Ticketstype == 2 ? '' : 2)} className={Ticketstype == 2 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Free</a>
                                                    <a style={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => setTicketstype(Ticketstype == 1 ? '' : 1)} className={Ticketstype == 1 ? 'tag-active hobby-box copy-n' : 'hobby-box copy-n'}>Paid</a>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} xs={12} className="mt-3">
                                            <div className="selectDiv" style={{ marginRight: '0px' }}>
                                                <select
                                                    className="form-select category me-4"
                                                    aria-label="Default select example"
                                                    onChange={(event) => setDatetype(event.target.value)}
                                                    style={{ paddingTop: '8px', height: '40px', color: '#0047ab' }}
                                                >
                                                    <option value=''>Date</option>
                                                    <option value='Pick a date'>Date Picker</option>
                                                    <option value='Pick between two dates'>Date Range Picker</option>
                                                </select>
                                                <img src={ArrowDown} alt="" />
                                            </div>
                                        </Col>
                                        {Datetype && (
                                            <>
                                                <div className="col-md-12 mt-4">
                                                    <div class="input-group input-warning-o" style={{ position: 'relative' }}>
                                                        <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                        <input type="text" class="form-control date-border-redius date-border-redius-input bg-white" placeholder="" readOnly value={Datetype == "Pick between two dates" ? rangestartdate + ' - ' + enddate : startdate} />
                                                        <div className="date-style-picker">
                                                            {Datetype == "Pick a date" && (
                                                                <Flatpickr
                                                                    id='date-picker-singel'
                                                                    className='form-control'
                                                                    onChange={date => setStartdateselect(date)}
                                                                />
                                                            )}
                                                            {Datetype == "Pick between two dates" && (
                                                                <Flatpickr
                                                                    id='date-picker'
                                                                    options={{ mode: "range" }}
                                                                    className='form-control'
                                                                    onChange={date => handelDaterange(date)}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <Col md={12} xs={12} className="mt-3">
                                            <p className="mb-0 theme-color">Price Range</p>
                                        </Col>
                                        <Col md={6} className="mt-3">
                                            <input className="form-control" type="number" placeholder="Min price" min={1} onChange={(e) => setMinprice(e.target.value)}></input>
                                        </Col>
                                        <Col md={6} className="mt-3">
                                            <input className="form-control" type="number" placeholder="Max price" min={1} onChange={(e) => setMaxprice(e.target.value)}></input>
                                        </Col>
                                        <div className="col-md-6 col-6 my-4 ">
                                            <button className="btn theme-bg w-100 text-white" type="submit">Apply</button>
                                        </div>
                                        <div className="col-md-6 col-6 my-4 pb-4 pb-md-0">
                                            <button type="button" className="btn theme-bg w-100 text-white" onClick={Resetfilter}>Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                            <div className="col-12 d-inline d-md-none d-flex justify-content-start mb-2 sticky-mobile-e-filter">
                                <p onClick={() => setMobilefilter(!mobilefilter)} className="filter-btn-for-mob"><FaFilter className="filter-icon" /> Filter</p>
                            </div>
                            <Col md={9} xl={9} lg={8} className="col-xl-9 col-lg-8 col-md-9 col-12 scrollable-column">
                                <div className="event-category-section mb-5 in-event-page">
                                    <Container fluid className="">
                                        {Eventloader ? (
                                            <>
                                                <Row>
                                                    <Col md={4} className="mb-5">
                                                        <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                                                    </Col>
                                                    <Col md={4} className="mb-5">
                                                        <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                                                    </Col>
                                                    <Col md={4} className="mb-5">
                                                        <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                                                    </Col>
                                                    <Col md={4} className="mb-5">
                                                        <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                                                    </Col>
                                                    <Col md={4} className="mb-5">
                                                        <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                                                    </Col>
                                                    <Col md={4} className="mb-5">
                                                        <div className="linear-background w-100" style={{ height: '300px' }}> </div>
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : (
                                            <>
                                                {Eventlist.length > 0 ? (
                                                    <Row className="event-box-mobile">
                                                        {Eventlist.map((item, index) => (
                                                            <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-3">
                                                                <div className="bg-white rounded-10 shadow-bottom pb-3 cursor-pointer overflow-hidden" onClick={() => viewEvent(item._id, item.name)} style={{ height: '100%' }}>
                                                                    <div style={{ position: 'relative' }}>
                                                                        <span className="event-category-img">{item.category_name}</span>
                                                                        {getCountryFlagImage(item.countryname)}
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
                                                                                <small className="mb-0 wspace-no" style={{ fontSize: '12px' }}>Originated by</small>
                                                                                <p className="text-primary-color fw-bold mb-0 mt-n1 event-text-org-name">
                                                                                    {item.organizer_name}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-5  col-5">
                                                                            <div className="bg-fade rounded text-center event-cart-price-box">
                                                                                <span className="text-primary-color fw-bold event-cart-display-price">{item.isfreeticket == 1 ? 'FREE' : item.countrysymbol + item.displayprice + '.00'}</span>
                                                                                <p className="small fw-bold mb-0 pb-0">Onwards</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-1">
                                                                        <div className="col-md-12">
                                                                            <div className="d-flex align-items-center justify-content-start my-2 mx-2">
                                                                                <img className="card-icon me-1" src={location} alt="" />
                                                                                <p className="text-primary-color fw-bold mb-0 event-cart-location">
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
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;