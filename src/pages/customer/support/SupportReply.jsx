import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, getSupportbagecolor, shortPer, organizer_url } from '../../../common/Helpers';
import { Link, useParams } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select'
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import { FaCircle } from "react-icons/fa6";
const Dashboard = ({ title }) => {
    const OrganizerId = localStorage.getItem('organizerid');
    const [Loader, setLoader] = useState(true);
    const [BtnLoader, setBtnLoader] = useState(false);
    const [SupportData, setSupportData] = useState();
    const [Message, setMessage] = useState();
    const { id } = useParams();

    const [FormLoader, setFormLoader] = useState(false);
    const [EventData, setEventData] = useState();
    const fetchEventData = async (eventid) => {
        setFormLoader(true)
        try {
            const requestData = {
                id: eventid
            };
            fetch(apiurl + 'event/get-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setEventData(data.data);
                    } else {
                        toast.error(data.message);
                    }
                    setFormLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setFormLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setFormLoader(false)
        }
    }

    const GetSupportDetails = async () => {
        try {
            const requestData = {
                id: id
            };
            setLoader(true)
            fetch(apiurl + 'admin/support/view', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setSupportData(data.data)
                        if (data.data.eventid) {
                            fetchEventData(data.data.eventid);
                        }
                    } else {

                    }
                    setLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    const StoreTicketreply = async () => {
        try {
            if (!Message) {
                return toast.error('Type your Message');
            }
            setBtnLoader(true)
            const requestData = {
                replymessage: Message,
                id: id,
                usertype: "customer",
            };
            fetch(apiurl + 'website/support/store-replay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Successful')
                        setMessage('');
                        GetSupportDetails();
                    }
                    setBtnLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setBtnLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setBtnLoader(false)
        }

    }
    useEffect(() => {
        GetSupportDetails();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">

                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row>
                                        {Loader ? (
                                            <div className="linear-background w-100"> </div>
                                        ) : (
                                            <Col md={12}>
                                                <div className="reply-box-1">
                                                    <Row>
                                                        <Col md={6}>
                                                            <p><span className={`ticket-sts-icon ${getSupportbagecolor(SupportData.isclose)}`}><FaCircle /></span><span className="ticket-head-tt1">Ticket# {SupportData.uniqueid}</span></p>
                                                        </Col>
                                                        <Col md={6} className='text-end'>
                                                            <p>Posted at {SupportData.time}</p>
                                                        </Col>
                                                        {FormLoader ? (
                                                            <div className="linear-background w-100"> </div>
                                                        ) : (
                                                            <>
                                                                <Col md={6}>
                                                                    <div>
                                                                        {EventData ? (
                                                                            <div class="card">
                                                                                <div class="card-body">
                                                                                    <div class="profile-blog">
                                                                                        <div style={{flex: 1}}>
                                                                                            <h5 class="text-primary d-inline">Event details</h5>
                                                                                            <Link className="view-event-btn" to={`${organizer_url}event/view-event/${EventData._id}/${EventData.display_name}`}>View Event</Link>
                                                                                        </div>
                                                                                        <img src={EventData.thum_image} alt="" class="img-fluid mt-4 mb-4 w-100 rounded" />
                                                                                        <h4><a href="post-details.html" class="text-black">{EventData.display_name}</a></h4>
                                                                                        <p class="mb-0">{shortPer(EventData.event_desc, 100)}</p>
                                                                                        <p class="mb-0">Start From : <span className="text-warning">{EventData.start_date} {EventData.start_time}</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : ''}
                                                                    </div>
                                                                </Col>
                                                                <Col md={6}></Col>
                                                            </>
                                                        )}
                                                        <Col md={12}>
                                                            <div className="py-4">
                                                                <p className="ticket-type-12">{SupportData.tickettype}</p>
                                                                <p className="ticket-message7">{SupportData.message}</p>
                                                            </div>
                                                        </Col>
                                                        {SupportData.messagelog && SupportData.messagelog.map((item, index) => (
                                                            <Col md={12}>
                                                                <div className="reply-message-cs">
                                                                    <Row>
                                                                        <Col md={6}>
                                                                            {item.usertype == 'organizer' || item.usertype == 'customer'  || item.usertype == 'user' ? (
                                                                                <p><span className="bage-light-css" style={{textTransform: 'capitalize'}}>{item.usertype}</span></p>
                                                                            ) : (
                                                                                <p><span className="bage-danger-css">{item.usertype}</span></p>
                                                                            )}
                                                                        </Col>
                                                                        <Col md={6} className='text-end'>
                                                                            <p>Posted at {item.date} {item.time}</p>
                                                                        </Col>
                                                                        <Col md={12}>
                                                                            <p className="ticket-message7">{item.replymessage}</p>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        ))}
                                                        {SupportData.isclose != 2 ? (
                                                            <Col md={12}>
                                                                <div className="reply-area-1 border-light p-3" style={{ background: '#FCFCFC', border: '1px solid #FCFCFC', borderRadius: '10px' }}>
                                                                    <p className="mb-3" style={{ fontWeight: '600' }}>Reply to Ticket</p>
                                                                    <div className="form-group">
                                                                        <p className="mb-2">Ticket Body</p>
                                                                        <textarea class="form-control" rows="5" placeholder="Type ticket issue here.." value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                                                    </div>
                                                                    <div className="form-group text-end">
                                                                        {BtnLoader ? (
                                                                            <button className="btn btn-primary" type="button">Please wait...</button>
                                                                        ) : (
                                                                            <button className="btn btn-primary" onClick={StoreTicketreply} type="button">Submit Reply</button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ) : (
                                                            <Alert variant={'success'}>
                                                                This ticket has been successfully resolved.
                                                            </Alert>
                                                        )}

                                                    </Row>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
                                </Card.Body>
                            </Card >
                        </Col >
                    </Row >
                </div >
            </div >

        </>
    )
}
export default Dashboard;