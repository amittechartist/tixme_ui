import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import WhiteButton from '../../../component/Whitestarbtn';
import { useParams } from 'react-router-dom';
import Timelogo from "../../../common/icon/time 1.svg";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Norecord from '../../../component/Norecordui';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LocationIcon from "../../../common/icon/location.svg";
import withReactContent from 'sweetalert2-react-content';
import Eimage from "../../../common/image/eimage.png";
import Hourglasslogo from "../../../common/icon/hourglass.svg";
import EditPng from '../../../common/icon/Edit.png';
import DateIcon from "../../../common/icon/date 2.svg";
import ArrowPng from "../../../common/icon/Arrow.svg";
import { apiurl, admin_url, organizer_url, shortPer, onlyDayMonth } from '../../../common/Helpers';
import { Link, useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const { id, name } = useParams();
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    // const fetchList = async () => {
    //     try {
    //         setLoader(true)
    //         const requestData = {
    //             country: name,
    //         };
    //         fetch(apiurl + 'admin/payout-request-list', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json', // Set the Content-Type header to JSON
    //             },
    //             body: JSON.stringify(requestData),
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.success == true) {
    //                     setListitems(data.data);
    //                 }
    //                 setLoader(false)
    //             })
    //             .catch(error => {
    //                 console.error('Insert error:', error);
    //                 setLoader(false)
    //             });
    //     } catch (error) {
    //         console.error('Api error:', error);
    //         setLoader(false)
    //     }
    // }

    const HandelPayoutStatuschange = async (id) => {
        try {
            setLoader(true)
            const requestData = {
                id: id,
            };
            fetch(apiurl + 'admin/get-payout-request-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
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
    const fetchList = async () => {
        try {
            setLoader(true)
            const requestData = {
                country: name,
            };
            fetch(apiurl + 'admin/get-payout-request-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
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
        fetchList();
    }, [name]);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
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
                                                                            <img src={item.eventdata[0].thum_image ? item.eventdata[0].thum_image : Eimage} className="list-thum-img" alt="" />
                                                                        </Col>
                                                                        <Col md={5} className="list-data">
                                                                            <div>
                                                                                <p className="list-event-desc mb-0">{shortPer(item.eventdata[0].event_desc, 100)}</p>
                                                                            </div>
                                                                            <div className="list-event-location">
                                                                                <div className="d-flex align-items-center text-center location-name">
                                                                                    <img
                                                                                        height={30}
                                                                                        width={30}
                                                                                        src={LocationIcon}
                                                                                        alt=""
                                                                                    />{" "}
                                                                                    <span>{item.eventdata[0].location}</span>
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
                                                                                            <span className="event-time d-block">{item.eventdata[0].start_time}</span>
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
                                                                                            <span className="event-time d-block">{item.eventdata[0].event_duration}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={3} className="py-3">
                                                                            <div className="mob-style">
                                                                                <div className="text-end mr-5">
                                                                                    <span className="list-event-category-img">{item.eventdata[0].category_name}</span>
                                                                                </div>
                                                                                <div className="text-end mr-5 mt-3 mb-3">
                                                                                    <span className="mb-5">
                                                                                        <img src={DateIcon} alt="" />
                                                                                        <span className="on-img-date-val">{onlyDayMonth(item.eventdata[0].start_date)}</span>
                                                                                    </span>
                                                                                </div>
                                                                                <div className="text-end mr-5">
                                                                                    <p className="mb-0 mr-5 list-Ticket-1">Ticket</p>
                                                                                    <button className="btn btn-success list-Ticket-mng-1" type="button" onClick={() => navigate(`${admin_url}event/manage-ticket/${item.eventdata[0]._id}/${item.eventdata[0].name}`)}>Manage</button>
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
                                        </Col>
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