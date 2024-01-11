import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Norecord from '../../component/Norecordui';
import Searchicon from '../../common/icon/searchicon.png';
import LocationIcon from "../../common/icon/location.svg";
import Eimg from '../../common/icon/Edit.svg';
import EditPng from '../../common/icon/Edit.png';
import Timelogo from "../../common/icon/time 1.svg";
import DateIcon from "../../common/icon/date 2.svg";
import Savesvg from "../../common/icon/savesvh.svg";
import { apiurl, admin_url, isEmail, app_url, shortPer, onlyDayMonth, imgurl } from '../../common/Helpers';
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import Hourglasslogo from "../../common/icon/hourglass.svg";
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";
import withReactContent from 'sweetalert2-react-content'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import QRCode from 'react-qr-code';
import { Link, useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const Beartoken = localStorage.getItem('userauth');
    const [Loader, setLoader] = useState(false);
    const [CategoryList, setCategoryList] = useState([]);
    const [Listitems, setListitems] = useState([]);
    const [allEvents, setallEvents] = useState([]);
    const MySwal = withReactContent(Swal);
    function CheckDelete(eventid) {
        MySwal.fire({
            title: 'Are you sure you want to remove?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteData(eventid)
            } else if (result.isDenied) {

            }
        })
    }
    const deleteData = async (eventid) => {
        try {
            setLoader(true)
            const requestData = {
                eventid: eventid
            }
            fetch(apiurl + "website/delete-saved-event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success == true) {
                        fetchList()
                        toast.error("Removed");
                    } else {

                    }
                })
                .catch((error) => {
                    console.error("Insert error:", error);
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
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'website/savedevents-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data)
                        setallEvents(data.data)
                    } else {
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

    const viewEvent = async (id, name) => {
        navigate(`${app_url}event/${id}/${name}`);
    }
    useEffect(() => {
        if (!Beartoken) {
            toast.error("Login to your account");
            navigate(app_url + 'auth/customer/signup');
            return;
        }
        fetchList();
        fetchCategory();
    }, []);


    const [searchTerm, setSearchTerm] = useState('');
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

    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4  grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}  style={{ position: 'relative', zIndex: '2' }}>
                                            <Row>
                                                <Col md={4}>
                                                <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search events"
                                                            value={searchTerm}
                                                            onChange={handleSearchChange}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={4} className='react-select-h mb-3'>
                                                <Select
                                                        isClearable={false}
                                                        options={CategoryOption}
                                                        className='react-select'
                                                        classNamePrefix='select'
                                                        placeholder='Select Category'
                                                        onChange={HandelselectCategory}
                                                        value={SelectCategoryValue}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={12}>
                                            {Loader ? (
                                                <div className="linear-background w-100"> </div>
                                            ) : (
                                                <>
                                                    {Listitems.length > 0 ? (
                                                        <>
                                                            <div class="table-responsive">
                                                                {Loader ? (
                                                                    <div className="linear-background w-100"> </div>
                                                                ) : (
                                                                    <>
                                                                        {Listitems.map((item, index) => (
                                                                            <Col md={12} className="event_list_box_main">
                                                                                <div className="event_list_box">
                                                                                    <Row>
                                                                                        <Col md={5}>
                                                                                            <img src={item.thum_image}  className="list-thum-img" alt="" />
                                                                                        </Col>
                                                                                        <Col md={4} className="list-data pt-3">
                                                                                            <div className="mb-4">
                                                                                                <Link to={`${app_url}event/${item._id}/${item.name}`}><span className="list-event-name">{item.display_name}</span> </Link>
                                                                                                <p className="list-event-desc mb-0">{shortPer(item.event_desc, 100)}</p>
                                                                                            </div>
                                                                                            <div className="list-event-location mb-4">
                                                                                                <div className="d-flex align-items-center text-center location-name">
                                                                                                    <img
                                                                                                        height={30}
                                                                                                        width={30}
                                                                                                        src={LocationIcon}
                                                                                                        alt=""
                                                                                                    />{" "}
                                                                                                    <span>{item.location}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="desc_data">
                                                                                                <div className="organizer-name-sec px-2 py-2">
                                                                                                    <div className="d-inline-flex align-items-center border-right event-time-area">
                                                                                                        <div className="d-inline-block mr-1">
                                                                                                            <img height={30} width={30} src={Timelogo} alt="" />
                                                                                                        </div>
                                                                                                        <div className="d-inline-block">
                                                                                                            <span className="event-duration d-block">
                                                                                                                Event Time
                                                                                                            </span>
                                                                                                            <span className="event-time d-block">{item.start_time}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="d-inline-flex align-items-center">
                                                                                                        <div className="d-inline-block mr-1">
                                                                                                            <img
                                                                                                                height={30}
                                                                                                                width={30}
                                                                                                                src={Hourglasslogo}
                                                                                                                alt=""
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div className="d-inline-block">
                                                                                                            <span className="event-duration d-block">
                                                                                                                Event Duration
                                                                                                            </span>
                                                                                                            <span className="event-time d-block">{item.event_duration}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Col>
                                                                                        <Col md={3} className="py-3">
                                                                                            <div>
                                                                                            <div className="text-end mr-5 mb-5 cursor-pointer">
                                                                                                    <img onClick={() => CheckDelete(item._id)} src={Savesvg} className="" height={'30px'} width={'30px'} alt="" />
                                                                                                </div>
                                                                                                <div className="text-end mr-5 mt-5">
                                                                                                    <span className="list-event-category-img">{item.category_name}</span>
                                                                                                </div>
                                                                                                
                                                                                                <div className="text-end mr-5 mt-3 mb-3">
                                                                                                    <span className="mb-5">
                                                                                                        <img src={DateIcon} alt="" />
                                                                                                        <span className="on-img-date-val">{onlyDayMonth(item.start_date)}</span>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </div>
                                                                            </Col>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <Norecord/>
                                                    )}
                                                </>
                                            )}

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