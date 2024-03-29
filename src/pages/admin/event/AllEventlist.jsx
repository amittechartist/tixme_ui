import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import Searchicon from '../../../common/icon/searchicon.png';
import Noimg from "../../../common/image/noimg.jpg";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import ArrowDown from '../../../assets/arrowdrop.svg'
import Norecord from '../../../component/Norecordui';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Timelogo from "../../../common/icon/time 1.svg";
import withReactContent from 'sweetalert2-react-content';
import LocationIcon from "../../../common/icon/location.svg";
import Eimage from "../../../common/image/eimage.png";
import EditPng from '../../../common/icon/Edit.png';
import DateIcon from "../../../common/icon/date 2.svg";
import ArrowPng from "../../../common/icon/Arrow.svg";
import { apiurl, imgurl, admin_url, organizer_url, shortPer, onlyDayMonth, get_date_time, get_min_date } from '../../../common/Helpers';
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import Select from 'react-select'
import { Link, useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const statusOptions = [
        { value: '', label: 'Any' },
        { value: '1', label: 'Active' },
        { value: '2', label: 'Deactive' }
    ];
    const [Loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [Listitems, setListitems] = useState([]);
    const [allEvents, setAllEvents] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [visibilityFilter, setVisibilityFilter] = useState('');
    const [CatDropdownopen, setCatDropdownopen] = useState(false);
    const [CategoryList, setCategoryList] = useState([]);
    const organizerid = localStorage.getItem('organizerid')
    const orgfilterId = localStorage.getItem('orgId')
    const MySwal = withReactContent(Swal);

    const [Startdate, setStartdate] = useState(new Date());
    const [Endtdate, setEndtdate] = useState(new Date());
    const [viewStartdate, setviewStartdate] = useState();
    const [viewEndtdate, setviewEndtdate] = useState();
    const [valueStartdate, setvalueStartdate] = useState();
    const [valueEndtdate, setvalueEndtdate] = useState();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [Isany, setIsany] = useState(false);

    // TAX
    const [taxEventid, settaxEventid] = useState();
    const [EventCurrecy, setEventCurrecy] = useState();
    const [Taxuid, setTaxuid] = useState();
    const [Taxbtnloader, setTaxbtnloader] = useState(false);
    const [Taxlistloader, setTaxlistloader] = useState(false);
    const [Taxlist, setTaxlist] = useState([]);
    const [taxTitle, settaxTitle] = useState();
    const [taxAmount, settaxAmount] = useState();
    const [selecttaxType, setselecttaxType] = useState();
    const [taxTypeOption, settaxTypeOption] = useState([
        { value: 'Percentage', label: 'Percentage' },
        { value: 'Amount', label: 'Amount' }
    ]);
    const HandelTaxform = async (e) => {
        e.preventDefault();
        try {
            if (!taxTitle || !taxAmount || !selecttaxType) { return toast.error("All field require") }
            if (taxAmount && taxAmount <= 0) { return toast.error("Enter valid amount") }
            setTaxbtnloader(true);
            const requestData = {
                uid: Taxuid ? Taxuid : '',
                eventid: taxEventid,
                taxtitle: taxTitle,
                taxtype: selecttaxType.value,
                taxamount: taxAmount
            };
            fetch(apiurl + 'admin/insert/event-tax', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success("Tax added successfully");
                        setTaxlist(data.data);
                        Taxempty();
                    } else {
                        toast.error(data.message);
                    }
                    setTaxbtnloader(false);
                })
                .catch(error => {
                    setTaxbtnloader(false);
                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            toast.error(error.message);
            setTaxbtnloader(false);
        }
    }
    const GetTaxUpdatedata = async (id) => {
        try {
            setTaxlistloader(true);
            const requestData = {
                id: id,
            };
            fetch(apiurl + 'admin/fetch/event-tax', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        settaxAmount(data.data.taxamount);
                        settaxTitle(data.data.taxtitle)
                        setselecttaxType([{ value: data.data.taxtype, label: data.data.taxtype }]);
                        setTaxuid(data.data._id);
                    } else {
                        toast.error(data.message);
                    }
                    setTaxlistloader(false);
                })
                .catch(error => {
                    setTaxlistloader(false);
                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            toast.error(error.message);
            setTaxlistloader(false);
        }
    }
    const DeleteTax = async (id, eventid) => {
        try {
            setTaxlistloader(true);
            const requestData = {
                id: id,
            };
            fetch(apiurl + 'admin/delete/event-tax', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        GetTaxlist(eventid);
                    } else {
                        toast.error(data.message);
                    }
                    setTaxlistloader(false);
                })
                .catch(error => {
                    setTaxlistloader(false);
                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            toast.error(error.message);
            setTaxlistloader(false);
        }
    }
    const GetTaxlist = async (id) => {
        try {
            setTaxlistloader(true);
            const requestData = {
                id: id,
            };
            fetch(apiurl + 'admin/fetch/event-tax-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setTaxlist(data.data);
                    } else {
                        toast.error(data.message);
                    }
                    setTaxlistloader(false);
                })
                .catch(error => {
                    setTaxlistloader(false);
                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            toast.error(error.message);
            setTaxlistloader(false);
        }
    }
    const HandelUpdateTax = (id, currency) => {
        settaxEventid(id);
        setEventCurrecy(currency);
        GetTaxlist(id);
        settaxaddModal(true);
    }
    const Taxempty = () => {
        settaxAmount("");
        settaxTitle("");
        setselecttaxType("");
    }
    const handleCategoryChange = (id) => {
        if (id == 'all') {
            setSelectedCategories([]);
            setIsany(!Isany);
        } else {
            if (selectedCategories.includes(id)) {
                setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id));
            } else {
                setSelectedCategories([...selectedCategories, id]);
            }
            setIsany(false);
        }
    };
    useEffect(() => {
        if (selectedCategories.length > 0 && allEvents.length > 0) {
            const filteredEvents = allEvents.filter(event =>
                event.category && selectedCategories.includes(event.category.toString())
            );
            setListitems(filteredEvents);
        } else if (selectedCategories.length === 0) {
            setListitems(allEvents);
        }
    }, [selectedCategories, allEvents]);

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
        setListitems(allEvents);
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
            const filteredEvents = allEvents.filter(event => {
                const eventStart = event.start_mindate;
                const eventEnd = event.end_mindate;

                // Check if the event's date range is within the given date range
                return eventStart >= startDate && eventEnd <= endDate;
            });
            setListitems(filteredEvents);
        } else {
            // If either startDate or endDate is missing, reset to show all events
            setListitems(allEvents);
        }
        setDaterange(!Daterange);
    };

    function CheckDelete(id) {
        MySwal.fire({
            title: 'Are you sure you want to delete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Delete(id)
            } else if (result.isDenied) {

            }
        })
    }
    function HandelChangeStatus(id) {
        MySwal.fire({
            title: 'Are You Ready to Update the Event Visibility?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Active',  // Change this text for the confirm button
            denyButtonText: 'Deactive',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                HandelStatusChange(id, 1);
            } else if (result.isDenied) {
                HandelStatusChange(id, 2);
            }
        })
    }

    const HandelStatusChange = async (id, type) => {
        try {
            const requestData = {
                id: id,
                isstatus: type,
                is_admin: 1
            };
            fetch(apiurl + 'event/update-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Status updated')
                        fetchmyEvent();
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const Delete = async (id) => {
        try {
            setLoader(true)
            const requestData = {
                id: id,
                isdelete: 1
            };
            fetch(apiurl + 'category/delete-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Deleted successfully');
                        fetchmyEvent();
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
    const fetchmyEvent = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'admin/event-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                        setAllEvents(data.data);
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
                        const transformedCategories = data.data.map(category => ({
                            value: category._id,
                            label: category.name
                        }));
                        const allOption = { value: 'all', label: 'All' };
                        transformedCategories.unshift(allOption);

                        // Update CategoryList state
                        setCategoryList(transformedCategories);
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
    const EditEvent = async (id, name) => {
        navigate(`${admin_url}event/edit-event/${id}/${name}`);
    }
    useEffect(() => {
        fetchmyEvent();
        fetchCategory();
    }, []);


    const handleVisibilityChange = (selectedVisibility) => {
        if (selectedVisibility.value !== '') {
            const filteredEvents = allEvents.filter(event =>
                event.visibility.toString() === selectedVisibility.value);
            setListitems(filteredEvents);
        } else {
            // If no option is selected, show all events
            setListitems(allEvents);
            console.log("sss");
        }
    };


    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Now filter the events based on the search term
        if (value) {
            const filteredEvents = allEvents.filter(event =>
                event.display_name.toLowerCase().includes(value.toLowerCase()));
            setListitems(filteredEvents);
        } else {
            // If the search term is empty, reset to show all events
            setListitems(allEvents);
        }
    };

    const [SelectCategoryValue, setSelectCategoryValue] = useState();

    const HandelselectCategory = (selectedValue) => {
        setSelectCategoryValue(selectedValue);
        if (selectedValue && selectedValue.value !== 'all') {
            // Filter events based on the selected category
            const filteredEvents = allEvents.filter(event =>
                event.category && event.category === selectedValue.value);
            setListitems(filteredEvents);
        } else {
            // If 'All' is selected or no category is selected, show all events
            setListitems(allEvents);
        }
    };


    const CategoryOption = [
        {
            options: CategoryList
        }
    ]
    const [taxaddModal, settaxaddModal] = useState(false);
    const [Tixmefee, setTixmefee] = useState();
    const [Platformfee, setPlatformfee] = useState();
    const [EventId, setEventId] = useState();
    const HandelTaxaddform = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                eventid: EventId,
                tixmefee: Tixmefee,
                platformfee: Platformfee
            };
            fetch(apiurl + 'admin/update-event-tax', {
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
                        settaxaddModal(false);
                        setTixmefee();
                        setPlatformfee();
                        setEventId();
                        fetchmyEvent();
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
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

            <Modal isOpen={taxaddModal} toggle={() => settaxaddModal(!taxaddModal)} centered size="xs">
                <ModalHeader toggle={() => settaxaddModal(!taxaddModal)}>Add Tax</ModalHeader>
                <ModalBody>
                    <form onSubmit={HandelTaxform}>
                        <Row>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="">Tax Title <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            class="form-control input-default"
                                            value={taxTitle}
                                            onChange={(e) => settaxTitle(e.target.value)}
                                            placeholder="Enter Tax Title"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Tax Type <span className="text-danger">*</span></label>
                                        <Select
                                            className="react-select"
                                            onChange={setselecttaxType}
                                            value={selecttaxType}
                                            options={taxTypeOption}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Tax Amount<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            class="form-control input-default"
                                            value={taxAmount}
                                            onChange={(e) => settaxAmount(e.target.value)}
                                            onInput={(e) => {
                                                const value = e.target.value;
                                                // Allow only numbers and a single decimal point with up to two decimal places
                                                e.target.value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2})\d+/, '$1');
                                            }}
                                            placeholder="Enter Tixme Fee"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-2">
                                <button type={Taxbtnloader ? 'button' : 'submit'} className="w-100 btn theme-bg text-white">{Taxbtnloader ? 'Please Wait...' : 'Submit'}</button>
                            </div>
                        </Row>
                    </form>
                    { }
                    <Row>
                        <div className="col-12">
                            <h4>Tax List</h4>
                            <hr className="my-2"></hr>
                        </div>
                        <div className="col-12">
                            {Taxlistloader ? (
                                <div className="linear-background w-100" style={{ height: '200px' }}> </div>
                            ) : (
                                <>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Tax Value</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Taxlist && Taxlist.map((item) => (
                                                <>
                                                    <tr>
                                                        <td scope="col">{item.taxtitle}</td>
                                                        <td scope="col">{item.taxtype != "Percentage" && EventCurrecy}{item.taxamount} {item.taxtype == "Percentage" && '(%)'}</td>
                                                        <td scope="col">
                                                            <span onClick={() => GetTaxUpdatedata(item._id)} className="text-theme m-2 cursor-pointer"><FiEdit size={25} /></span>
                                                            <span onClick={() => DeleteTax(item._id, item.eventid)} className="text-danger m-2 cursor-pointer"><FiTrash size={25} /></span>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </Row>
                </ModalBody>
            </Modal>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4 grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12} style={{ position: 'relative', zIndex: '2' }}>
                                            <Row>
                                                <Col md={6} xl={3}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search"
                                                            value={searchTerm}
                                                            onChange={handleSearchChange}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6} xl={3} className="react-select-h mb-3 dash-select-box">
                                                    <div style={{ position: 'relative' }}>
                                                        <div className="event-page-category-filter-box" onClick={() => setCatDropdownopen(!CatDropdownopen)}>
                                                            <p className="mb-0 theme-color">Select Category</p>
                                                            <img src={ArrowDown} alt="" />
                                                        </div>
                                                        {CatDropdownopen && (
                                                            <div className="category-box-new-for-dashboard">
                                                                <div>
                                                                    {CategoryList.map((item) => (
                                                                        <div key={item.value}>
                                                                            <input
                                                                                type="checkbox"
                                                                                id={`checkbox-${item.value}`}
                                                                                name={item.label}
                                                                                checked={selectedCategories.includes(item.value)}
                                                                                onChange={() => handleCategoryChange(item.value)}
                                                                            />
                                                                            <label style={{ marginLeft: '10px' }} htmlFor={`checkbox-${item.value}`}>{item.label}</label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col md={4} xl={3}>
                                                    <div class="input-group mb-3 input-warning-o" onClick={() => setDaterange(!Daterange)}>
                                                        <span class="input-group-text search-box-icon-1"><FiClock /></span>
                                                        <input type="text" class="form-control" value={viewStartdate && viewEndtdate ? viewStartdate + '-' + viewEndtdate : ''} placeholder="Date range" />
                                                        <span class="input-group-text search-box-icon-1"><FiChevronDown /></span>
                                                    </div>
                                                </Col>
                                                <Col md={4} xl={3} className="react-select-h mb-3 theme-border">
                                                    <Select
                                                        className="react-select"
                                                        onChange={handleVisibilityChange}
                                                        options={statusOptions}
                                                        menuIsOpen={isDropdownVisible} // Control the menu visibility
                                                        onMenuOpen={() => setIsDropdownVisible(true)}
                                                        onMenuClose={() => setIsDropdownVisible(false)}
                                                    />
                                                </Col>

                                                {/* <Col md={4} xl={2}>
                                                    <button className="w-100 theme-btn" onClick={() => navigate(organizer_url + 'event/add-event')}>
                                                        <span className="theme-btn-icon"><FiPlus /></span> <span>Add event</span>
                                                    </button>
                                                </Col> */}
                                            </Row>
                                        </Col>
                                        {Loader ? (
                                            <div className="linear-background w-100"> </div>
                                        ) : (
                                            <>
                                                {Listitems.length > 0 ? (
                                                    <>
                                                        {Listitems.map((item, index) => (
                                                            <Col md={12} className="event_list_box_main">
                                                                <button onClick={() => HandelChangeStatus(item._id)} className="list-active-ticket-btn" type="button">{item.visibility == 1 ? 'Active' : 'Deactive'}<img src={ArrowPng} className="arraw-svg ml-3" alt="" /></button>
                                                                <div className="event_list_box">
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            <div className="dash-list-banner-1">
                                                                                <img src={item.thum_image ? item.thum_image : Noimg} className="list-thum-img" alt="" />
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={5} className="list-data">
                                                                            <div>
                                                                                <span className="list-event-name text-capitalize">{shortPer(item.name, 30)}</span> <span className="cursor-pointre list-event-edit-btn"><img onClick={() => EditEvent(item._id, item.name)} src={EditPng} alt="" /></span>
                                                                                <p className="list-event-desc mb-0">{shortPer(item.event_desc, 30)}</p>
                                                                            </div>
                                                                            <div className="my-2">
                                                                                {item.eventtype == 2 ? (
                                                                                    <div className="list-event-location">
                                                                                        <div className="d-flex align-items-center text-center location-name">
                                                                                            <img
                                                                                                height={30}
                                                                                                width={30}
                                                                                                src={LocationIcon}
                                                                                                alt=""
                                                                                            />{" "}
                                                                                            <span>{item.city ? item.city + ',' : ''} {item.countryname ? item.countryname : ''}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div>
                                                                                        <span>This is a online event</span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div className="d-inline-flex align-items-center event-time-area my-2">
                                                                                <div className="d-inline-block mr-1">
                                                                                    <img height={30} width={30} src={DateIcon} alt="" />
                                                                                </div>
                                                                                <div className="d-inline-block">
                                                                                    <span className="event-time d-block">{item.start_date ? item.start_date : 'No date selected'}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-inline-flex align-items-center event-time-area my-2">
                                                                                <div className="d-inline-block mr-1">
                                                                                    <img height={30} width={30} src={Timelogo} alt="" />
                                                                                </div>
                                                                                <div className="d-inline-block">
                                                                                    <span className="event-time d-block">{item.start_time ? item.start_time : 'No Time selected'}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                {item.allprice ? (
                                                                                    <>
                                                                                        <div className="">
                                                                                            {/* list-ticket-count */}
                                                                                            <p className="mb-0 list-Total-Ticket">Total Ticket
                                                                                                <span className="list-Ticket-amount">
                                                                                                    {item.eventData
                                                                                                        .filter(price => price.status === "1") // Filter items where isdelete == 0
                                                                                                        .reduce((total, price) => total + parseInt(price.quantity, 10), 0)}
                                                                                                    /
                                                                                                    {item.allprice
                                                                                                        .filter(price => price.isdelete === 0) // Filter items where isdelete == 0
                                                                                                        .reduce((total, price) => total + parseInt(price.quantity, 10), 0)}
                                                                                                </span> <span className="list-Ticket-sold">SOLD</span>
                                                                                            </p>

                                                                                        </div>
                                                                                    </>
                                                                                ) : ''}
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={3} className="py-3">
                                                                            <div className="mob-style">
                                                                                <div className="text-end mr-5 mb-2">
                                                                                    <span className="list-event-category-img">{item.category_name}</span>
                                                                                </div>
                                                                                <div className="text-end mr-5">
                                                                                    <button style={{ fontSize: '14px' }} className="btn theme-bg text-white my-1 w-100" type="button" onClick={() => navigate(`${admin_url}event/manage-ticket/${item._id}/${item.name}`)}>TICKETS</button>
                                                                                </div>
                                                                                <div className="text-end mr-5">
                                                                                    <button style={{ fontSize: '14px' }} className="btn theme-bg text-white my-1 w-100" type="button" onClick={() => navigate(`${admin_url}event/mange-attendee/${item._id}/${item.name}`)}>ATTENDEES</button>
                                                                                </div>
                                                                                <div className="text-end mr-5">
                                                                                    {/* {!item.tixmefee || !item.platformfee ? (
                                                                                        <button style={{ fontSize: '14px' }} className="btn btn-danger text-white my-1 w-100" type="button" onClick={() => HandelUpdateTax(item._id, item.tixmefee ? item.tixmefee : 1, item.platformfee ? item.platformfee : 1)}>ADD TAX</button>
                                                                                    ) : (
                                                                                        <button style={{ fontSize: '14px' }} className="btn theme-bg text-white my-1 w-100" type="button" onClick={() => HandelUpdateTax(item._id, item.tixmefee ? item.tixmefee : 1, item.platformfee ? item.platformfee : 1)}>UPDATE TAX</button>
                                                                                    )} */}
                                                                                    <button style={{ fontSize: '14px' }} className="btn btn-danger text-white my-1 w-100" type="button" onClick={() => HandelUpdateTax(item._id, item.countrysymbol)}>ADD TAX</button>
                                                                                </div>
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

        </>
    )
}
export default Dashboard;