import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import Searchicon from '../../../common/icon/searchicon.png';
import Norecord from '../../../component/Norecordui';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Timelogo from "../../../common/icon/time 1.svg";
import withReactContent from 'sweetalert2-react-content';
import LocationIcon from "../../../common/icon/location.svg";
import Eimage from "../../../common/image/eimage.png";
import Eimg from '../../../common/icon/Edit.svg';
import Hourglasslogo from "../../../common/icon/hourglass.svg";
import EditPng from '../../../common/icon/Edit.png';
import DateIcon from "../../../common/icon/date 2.svg";
import ArrowPng from "../../../common/icon/Arrow.svg";
import { apiurl, imgurl, admin_url, organizer_url, shortPer, onlyDayMonth } from '../../../common/Helpers';
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";
import Select from 'react-select'
import { Link, useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const [Loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [Listitems, setListitems] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const MySwal = withReactContent(Swal);
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

    const [SelectCategoryValue, setSelectCategoryValue] = useState();
    const HandelselectCategory = (selectedValue) => {
        setSelectCategoryValue(selectedValue);
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
                            <Card className="py-4 grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12} style={{ position: 'relative', zIndex: '2' }}>
                                            <Row>
                                                <Col md={5}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                        <input type="text" class="form-control" placeholder="Search events" />
                                                    </div>
                                                </Col>
                                                <Col md={3} className="react-select-h mb-3">
                                                    <Select
                                                        isClearable={false}
                                                        options={CategoryOption}
                                                        className='react-select'
                                                        classNamePrefix='select'
                                                        placeholder='Select Category'
                                                        onChange={HandelselectCategory}
                                                        value={SelectCategoryValue}
                                                    />
                                                    {/* <select name="" id="" className="theme-dropdown dropdown-custome category-select">
                                                        <option value=''>Category</option>
                                                        {CategoryList.map((item, index) => (
                                                            <option value={item._id}>{item.name}</option>
                                                        ))}
                                                    </select> */}
                                                </Col>
                                                <Col md={2}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text search-box-icon-1"><FiClock /></span>
                                                        <input type="text" class="form-control" placeholder="Date range" />
                                                        <span class="input-group-text search-box-icon-1"><FiChevronDown /></span>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text search-box-icon-1"><  FiFlag /></span>
                                                        <input type="text" class="form-control" placeholder="Status" />
                                                        <span class="input-group-text search-box-icon-1"><FiChevronDown /></span>
                                                    </div>
                                                </Col>
                                                
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
                                                                <div className="event_list_box">
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            <img src={Eimage} className="list-thum-img" alt="" />
                                                                        </Col>
                                                                        <Col md={5} className="list-data">
                                                                            <div>
                                                                                <span className="list-event-name">{item.name}</span> <span className="cursor-pointre list-event-edit-btn"><img onClick={() => EditEvent(item._id, item.name)} src={EditPng} alt="" /></span>
                                                                                <p className="list-event-desc mb-0">{shortPer(item.event_desc, 100)}</p>
                                                                            </div>
                                                                            <div className="list-event-location">
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
                                                                                    <div className="d-inline-flex align-items-center time-ticket-sold-box">
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
                                                                                        {item.allprice ? (
                                                                                            <>
                                                                                                <div className="list-ticket-count">
                                                                                                    <p className="mb-0 list-Total-Ticket">Total Ticket</p>
                                                                                                    <span className="list-Ticket-amount">{item.OrderItem ? item.OrderItem.length : 0} / {item.allprice.reduce((total, price) => total + parseInt(price.quantity, 10), 0)}</span> <span className="list-Ticket-sold">SOLD</span>
                                                                                                </div>
                                                                                            </>
                                                                                        ) : ''}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={3} className="py-3">
                                                                            <div className="mob-style">
                                                                                <div className="text-end mr-5">
                                                                                    <span className="list-event-category-img">{item.category_name}</span>
                                                                                </div>
                                                                                <div className="text-end mr-5 mt-3 mb-3">
                                                                                    <span className="mb-5">
                                                                                        <img src={DateIcon} alt="" />
                                                                                        <span className="on-img-date-val">{onlyDayMonth(item.start_date)}</span>
                                                                                    </span>
                                                                                </div>
                                                                                <div className="text-end mr-5">
                                                                                    <p className="mb-0 mr-5 list-Ticket-1">Ticket</p>
                                                                                    <button className="btn btn-success list-Ticket-mng-1" type="button" onClick={() => navigate(`${admin_url}event/manage-ticket/${item._id}/${item.name}`)}>Manage</button>
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