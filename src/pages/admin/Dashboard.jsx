import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { apiurl, app_url } from "../../common/Helpers";
import { FaDollarSign, FaCalendarAlt, FaTicketAlt, FaUsers } from 'react-icons/fa';
const Dashboard = ({ title }) => {
    const [Apiloader, setApiloader] = useState(false);
    const [fetchdata, setFetchdata] = useState([]);
    const fetchEvent = async () => {
        try {
            setApiloader(true)
            fetch(apiurl + 'admin/dashboard-analytics-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setFetchdata(data.data)
                    }
                    setApiloader(false)
                })
                .catch(error => {
                    console.error('error:', error);
                    setApiloader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiloader(false)
        }
    }
    useEffect(() => {
        fetchEvent();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div>
                                            <div class="media align-items-center">
                                                <span class="me-2 dash-icon">
                                                    <FaDollarSign />
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-1 text-capitalize">TOTAL REVENUE</p>
                                                    <h3 class="mb-0 text-black font-w600">{fetchdata ? fetchdata.totalRevenue : 0}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div>
                                            <div class="media align-items-center">
                                                <span class="me-2 dash-icon">
                                                    <FaCalendarAlt />
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-1 text-capitalize">TOTAL EVENTS HOSTED</p>
                                                    <h3 class="mb-0 text-black font-w600">{fetchdata ? fetchdata.TotalEventHosted : 0}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div>
                                            <div class="media align-items-center">
                                                <span class="me-2 dash-icon">
                                                    <FaTicketAlt />
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-1 text-capitalize">TOTAL TICKETS SOLD</p>
                                                    <h3 class="mb-0 text-black font-w600">{fetchdata ? fetchdata.TotalTicketSold : 0}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div>
                                            <div class="media align-items-center">
                                                <span class="me-2 dash-icon">
                                                    <FaUsers />
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-1 text-capitalize">TOTAL USERS</p>
                                                    <h3 class="mb-0 text-black font-w600">{fetchdata ? fetchdata.TotalUser : 0}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {Country.map((item, index) => (
                            <div class="col-xl-4">
                                <div class="card">
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
                                                <p class="mb-2 text-capitalize">Active organizers in {item.name}</p>
                                                <h3 class="mb-0 text-black font-w600">{countActiveOrganizers(item.name)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div class="col-xl-4">
                            <div class="card">
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
                                            <p class="mb-2">Pending organizers</p>
                                            <h3 class="mb-0 text-black font-w600">{pendingOrganizer}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4">
                            <div class="card">
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
                                            <p class="mb-2">Customers / members</p>
                                            <h3 class="mb-0 text-black font-w600">{Totalcustomer}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {Country.map((item, index) => (
                        <div class="col-xl-4">
                            <div class="card">
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
                                            <p class="mb-2 text-capitalize">Events Active in {item.name}</p>
                                            <h3 class="mb-0 text-black font-w600">{countActiveEvent(item.name)}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))} */}
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Dashboard;