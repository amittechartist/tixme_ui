import React, { useEffect, useState } from "react";
import { apiurl, organizer_url, getSupportbagecolor, get_date_time, get_min_date, shortPer } from '../../common/Helpers';
import { Col, Row } from "react-bootstrap";
import arrow from "../../assets/arrow.svg";
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Select from 'react-select'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
// component
import ContactDetails from '../../component/ContactDetails';
const Dashboard = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)

    const [EventList, setEventList] = useState([]);
    const [Eventselected, setEventselected] = useState();

    const EventOption = [
        {
            options: EventList
        }
    ]
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
                                                        <div className="mail-body-org">
                                                            <div>
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
                                                        </div>
                                                        <h4>Body</h4>
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="9" placeholder="Enter your message"></textarea>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div className="col-md-6">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title className="border-bottom pb-2">Customer</Card.Title>
                                                    <Card.Text>
                                                        <div className="mail-body-org">
                                                            <div className="d-flex justify-content-end">
                                                                <button type="button" className="GetLatestUpdateButton">
                                                                    <div className="left px-0 px-md-4">
                                                                        <small className="ms-2">Select All Attendance</small>
                                                                    </div>
                                                                    <div className="right">
                                                                        <img style={{ width: "18px" }} src={arrow} alt="" />
                                                                    </div>
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <div className="form-group">
                                                                    <p>My Previous Events</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={EventOption}
                                                                        className='react-select'
                                                                        classNamePrefix='select'
                                                                        onChange={setEventselected}
                                                                        value={Eventselected}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <p>My Event Attendance</p>
                                                                    <Select
                                                                        isClearable={false}
                                                                        options={EventOption}
                                                                        className='react-select'
                                                                        classNamePrefix='select'
                                                                        onChange={setEventselected}
                                                                        value={Eventselected}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <button type="button" className="GetLatestUpdateButton">
                                                                                <div className="left px-0 px-md-4">
                                                                                    <small className="ms-2">Send Mail</small>
                                                                                </div>
                                                                                <div className="right">
                                                                                    <img style={{ width: "18px" }} src={arrow} alt="" />
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <button type="button" className="GetLatestUpdateButton">
                                                                                <div className="left px-0 px-md-4">
                                                                                    <small className="ms-2">Schedule Mail</small>
                                                                                </div>
                                                                                <div className="right">
                                                                                    <img style={{ width: "18px" }} src={arrow} alt="" />
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>
                </div >
            </div >

        </>
    )
}
export default Dashboard;