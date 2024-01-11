import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import Searchicon from '../../../common/icon/searchicon.png';
import Norecord from '../../../component/Norecordui';
import Nouserphoto from '../../../common/image/nouser.png';
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Eimage from "../../../common/image/eimage.png";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Timelogo from "../../../common/icon/time 1.svg";
import withReactContent from 'sweetalert2-react-content';
import LocationIcon from "../../../common/icon/location.svg";
import Eimg from '../../../common/icon/Edit.svg';
import Hourglasslogo from "../../../common/icon/hourglass.svg";
import EditPng from '../../../common/icon/Edit.png';
import DateIcon from "../../../common/icon/date 2.svg";
import ArrowPng from "../../../common/icon/Arrow.svg";
import Noimg from "../../../common/image/noimg.jpg";
import { apiurl, imgurl, admin_url, organizer_url, shortPer, onlyDayMonth, app_url } from '../../../common/Helpers';
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";
import Select from 'react-select'
import { Link, useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const { id } = useParams();
    const [Loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const [Listitems, setListitems] = useState([]);
    const [OrganizerData, setOrganizerData] = useState();
    const [CategoryList, setCategoryList] = useState([]);
    const MySwal = withReactContent(Swal);

    const fetchmyEvent = async () => {
        try {
            setLoader(true)
            const requestData = {
                id: id,
            };
            fetch(apiurl + 'website/organizer-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.events);
                        setOrganizerData(data.data);
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
    useEffect(() => {
        fetchmyEvent();
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
                                    {Loader ? (
                                        <div className="linear-background w-100"> </div>
                                    ) : (
                                        <Row>
                                            <Col md={3}>
                                                <div className="my-follower-account-box text-center">
                                                    <img
                                                        height={70}
                                                        width={70}
                                                        src={OrganizerData.profile_picture ? OrganizerData.profile_picture : Nouserphoto}
                                                        alt=""
                                                        className="organiger-logo mb-2"
                                                    />
                                                    <p className="org-name">{OrganizerData.name}</p>
                                                    <p className="org-event-count">{Listitems.length} Events</p>
                                                </div>
                                            </Col>
                                            <Col md={9}></Col>
                                        </Row>
                                    )}
                                    <Row className="justify-content-center">
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
                                                                            <img src={item.thum_image ? item.thum_image : Noimg} className="list-thum-img" alt="" />
                                                                        </Col>
                                                                        <Col md={5} className="list-data">
                                                                            <div>
                                                                                <Link to={`${app_url}event/${item._id}/${item.display_name}`}><span className="list-event-name">{item.name}</span></Link>
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