import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import whitestar from '../../../common/icon/whitestar.svg';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Link, useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(false);
    const [Countdata, setCountdata] = useState([]);
    const MySwal = withReactContent(Swal);
    const handelEventList = async () => {
        navigate(admin_url + 'all-events-list');
    }
    const fetchEventCount = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'event/event-data-count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setCountdata(data.data);
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
    console.log("s",Countdata.OfflineEventpending)
    useEffect(() => {
        fetchEventCount();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <Link className="page-theme-btn position-right" to={admin_url + 'add-event-type'}>Add Event Type</Link>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>
                    <Row className="justify-content-center">
                        {Loader ? (
                            <div className="linear-background w-100"> </div>
                        ) : (
                            <>
                                <div class="col-xl-6" >
                                    <div class="card cursor-pointer" onClick={() => handelEventList()}>
                                        <div class="card-body">
                                            <div class="media align-items-center">
                                                <span class="me-4">
                                                    <svg class="primary-icon" width="50" height="53" viewBox="0 0 50 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="7.11688" height="52.1905" rx="3" transform="matrix(-1 0 0 1 49.8184 0)" fill="var(--primary)"></rect>
                                                        <rect width="7.11688" height="37.9567" rx="3" transform="matrix(-1 0 0 1 35.585 14.2338)" fill="var(--primary)"></rect>
                                                        <rect width="7.11688" height="16.6061" rx="3" transform="matrix(-1 0 0 1 21.3516 35.5844)" fill="var(--primary)"></rect>
                                                        <rect width="8.0293" height="32.1172" rx="3" transform="matrix(-1 0 0 1 8.0293 20.0732)" fill="var(--primary)"></rect>
                                                    </svg>
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-2">Online event pending</p>
                                                    <h3 class="mb-0 text-black font-w600">{Countdata.OfflineEventpending}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="card  cursor-pointer" onClick={() => handelEventList()}>
                                        <div class="card-body">
                                            <div class="media align-items-center">
                                                <span class="me-4">
                                                    <svg class="primary-icon" width="50" height="53" viewBox="0 0 50 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="7.11688" height="52.1905" rx="3" transform="matrix(-1 0 0 1 49.8184 0)" fill="var(--primary)"></rect>
                                                        <rect width="7.11688" height="37.9567" rx="3" transform="matrix(-1 0 0 1 35.585 14.2338)" fill="var(--primary)"></rect>
                                                        <rect width="7.11688" height="16.6061" rx="3" transform="matrix(-1 0 0 1 21.3516 35.5844)" fill="var(--primary)"></rect>
                                                        <rect width="8.0293" height="32.1172" rx="3" transform="matrix(-1 0 0 1 8.0293 20.0732)" fill="var(--primary)"></rect>
                                                    </svg>
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-2">Online event completed</p>
                                                    <h3 class="mb-0 text-black font-w600">{Countdata.OfflineEventcomplete}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="card  cursor-pointer" onClick={() => handelEventList()}>
                                        <div class="card-body">
                                            <div class="media align-items-center">
                                                <span class="me-4">
                                                    <svg class="primary-icon" width="50" height="53" viewBox="0 0 50 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="7.11688" height="52.1905" rx="3" transform="matrix(-1 0 0 1 49.8184 0)" fill="var(--primary)"></rect>
                                                        <rect width="7.11688" height="37.9567" rx="3" transform="matrix(-1 0 0 1 35.585 14.2338)" fill="var(--primary)"></rect>
                                                        <rect width="7.11688" height="16.6061" rx="3" transform="matrix(-1 0 0 1 21.3516 35.5844)" fill="var(--primary)"></rect>
                                                        <rect width="8.0293" height="32.1172" rx="3" transform="matrix(-1 0 0 1 8.0293 20.0732)" fill="var(--primary)"></rect>
                                                    </svg>
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-2">Physical event pending</p>
                                                    <h3 class="mb-0 text-black font-w600">{Countdata.OnlineEventpending}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="card  cursor-pointer" onClick={() => handelEventList()}>
                                        <div class="card-body">
                                            <div class="media align-items-center">
                                                <span class="me-4">
                                                    <svg class="primary-icon" width="50" height="53" viewBox="0 0 50 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="7.11688" height="52.1905" rx="3" transform="matrix(-1 0 0 1 49.8184 0)" fill="var(--primary)"></rect>
                                                        <rect width="7.11688" height="37.9567" rx="3" transform="matrix(-1 0 0 1 35.585 14.2338)" fill="var(--primary)"></rect>
                                                        <rect width="7.11688" height="16.6061" rx="3" transform="matrix(-1 0 0 1 21.3516 35.5844)" fill="var(--primary)"></rect>
                                                        <rect width="8.0293" height="32.1172" rx="3" transform="matrix(-1 0 0 1 8.0293 20.0732)" fill="var(--primary)"></rect>
                                                    </svg>
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-2">Physical event completed</p>
                                                    <h3 class="mb-0 text-black font-w600">{Countdata.OnlineEventcomplete}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Dashboard;