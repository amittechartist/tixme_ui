import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { apiurl, app_url } from "../../common/Helpers";
const Dashboard = ({ title }) => {
    const [Apiloader, setApiloader] = useState([]);
    const [Eventlist, setEventlist] = useState([]);
    const [Organizerlist, setOrganizerlist] = useState([]);
    const [Country, setCountry] = useState([]);
    const [Totalcustomer, setTotalcustomer] = useState(0);
    const [pendingOrganizer, setpendingOrganizer] = useState(0);
    const fetchEvent = async () => {
        try {
            setApiloader(true)
            fetch(apiurl + 'admin/analytics-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setOrganizerlist(data.data)
                        setEventlist(data.event)
                        setTotalcustomer(data.totalcustomer);
                        const Events = data.data;
                        setpendingOrganizer(Events.filter(organizer => organizer.isactive === 0).length);
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
    const countActiveOrganizers = (name) => {
        const filteredOrganizers = Organizerlist.filter(organizer => organizer.isactive === 1 && organizer.countryname === name);
        return filteredOrganizers.length;
    };
    const countActiveEvent = (name) => {
        const filteredEvent = Organizerlist.filter(item => item.isdelete === 0 && item.countryname === name);
        return filteredEvent.length;
    };
    const fetchCountry = async () => {
        try {
            fetch(apiurl + 'admin/country-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setCountry(data.data)
                    }
                })
                .catch(error => {
                    console.error('error:', error);

                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    useEffect(() => {
        fetchEvent();
        fetchCountry();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>

                <div className="container-fluid">
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                        <span>Welcome Back, TIXME</span>
                    </div>
                    <Row>
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
                        ))}
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Dashboard;