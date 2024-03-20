import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { admin_url, apiurl, app_url } from "../../common/Helpers";
import { FaDollarSign, FaCalendarAlt, FaTicketAlt, FaUsers } from 'react-icons/fa';
import { Link, useNavigate, useParams } from "react-router-dom";
const Dashboard = ({ title }) => {
    const { name } = useParams();
    const [Apiloader, setApiloader] = useState(false);
    const [fetchdata, setFetchdata] = useState([]);
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1); // Increment the counter to trigger a re-render
        }, 3000); // 3000 milliseconds = 3 seconds

        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, []);
    const fetchEvent = async () => {
        try {
            setApiloader(true)
            const requestData = {
                country: name,
            }
            fetch(apiurl + 'admin/country-dash-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
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
    }, [counter, name]);
    const navigate = useNavigate();
    const HandelViewOrganizer = (type) => {
        localStorage.setItem("filtercountry", name);
        if (type == 0) {
            navigate(admin_url + 'pending-organizer');
        } else {
            navigate(admin_url + 'active-organizer');
        }
    }
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row>
                        <div className="col-md-6 col-lg-12 col-xl-12">
                            <div class="card">
                                <div class="card-body">
                                    <h5 className="text-capitalize mb-0">{name} Dashboard</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <Link to={admin_url + 'all-events-list/' + name}>
                                <div class="card">
                                    <div class="card-body">
                                        <div class="media align-items-center">
                                            <div>
                                                <div class="media align-items-center">
                                                    <span class="me-2 dash-icon">
                                                        <FaDollarSign />
                                                    </span>
                                                    <div class="media-body ms-1">
                                                        <p class="mb-1 text-capitalize">TOTAL ACTIVE EVENTS</p>
                                                        <h3 class="mb-0 text-black font-w600">{fetchdata ? fetchdata.ActiveEvent : 0}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <Link to={admin_url + 'all-events-list/' + name}>
                                <div class="card">
                                    <div class="card-body">
                                        <div class="media align-items-center">
                                            <div>
                                                <div class="media align-items-center">
                                                    <span class="me-2 dash-icon">
                                                        <FaCalendarAlt />
                                                    </span>
                                                    <div class="media-body ms-1">
                                                        <p class="mb-1 text-capitalize">TOTAL UPCOMING EVENTS</p>
                                                        <h3 class="mb-0 text-black font-w600">{fetchdata ? fetchdata.UpcomingEvents : 0}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <Link to={admin_url + 'users/' + name}>
                                <div class="card">
                                    <div class="card-body">
                                        <div class="media align-items-center">
                                            <div>
                                                <div class="media align-items-center">
                                                    <span class="me-2 dash-icon">
                                                        <FaTicketAlt />
                                                    </span>
                                                    <div class="media-body ms-1">
                                                        <p class="mb-1 text-capitalize">TOTAL ACTIVE USERS</p>
                                                        <h3 class="mb-0 text-black font-w600">{fetchdata ? fetchdata.Activeuser : 0}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div class="card cursor-pointer" onClick={() => { HandelViewOrganizer(1) }}>
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div>
                                            <div class="media align-items-center">
                                                <span class="me-2 dash-icon">
                                                    <FaUsers />
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-1 text-capitalize">TOTAL ACTIVE ORGANIZERS</p>
                                                    <h3 class="mb-0 text-black font-w600">{fetchdata ? fetchdata.ActiveOrganizer : 0}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div class="card  cursor-pointer" onClick={() => { HandelViewOrganizer(0) }}>
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div>
                                            <div class="media align-items-center">
                                                <span class="me-2 dash-icon">
                                                    <FaUsers />
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-1 text-capitalize">TOTAL PENDING ORGANZIERS</p>
                                                    <h3 class="mb-0 text-black font-w600">{fetchdata ? fetchdata.PendingOrganizer : 0}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Dashboard;