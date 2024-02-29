import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { apiurl, app_url } from "../../common/Helpers";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FaTicket } from "react-icons/fa6";
const Dashboard = ({ title }) => {
    const organizerid = localStorage.getItem('organizerid');
    const navigate = useNavigate();
    const [Eventlist, setEventlist] = useState([]);
    const [Apiloader, setApiloader] = useState([]);
    const [Totalevent, setTotalevent] = useState(0);
    const [Totalincome, setTotalincome] = useState(0);
    const [Totalticket, setTotalticket] = useState(0);

    // Highcharts.chart('openinterest', {

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Ticket Sales and Revenue for 2023',
            align: 'left'
        },
        subtitle: {
            text: 'Source: Company Data',
            align: 'left'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true,
            accessibility: {
                description: 'Months'
            }
        },
        yAxis: [{
            min: 0,
            title: {
                text: 'Number of Tickets'
            }
        }, {
            title: {
                text: 'Revenue (USD)'
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tickets Booked',
            data: [1200, 1100, 1500, 1400, 1300, 1600, 1700, 1800, 1900, 2000, 2100, 2200] // Replace with your data
        }, {
            name: 'Revenue',
            yAxis: 1,
            data: [12000, 11000, 15000, 14000, 13000, 16000, 17000, 18000, 19000, 20000, 21000, 22000], // Replace with your data
            tooltip: {
                valuePrefix: '$'
            }
        }]
    };



    const fetchEvent = async () => {
        try {
            setApiloader(true)
            const requestData = {
                organizerid: organizerid
            };
            fetch(apiurl + 'event/upcoming-events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setEventlist(data.data)
                    } else {

                    }
                    setApiloader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiloader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiloader(false)
        }
    }
    const AnalyticsData = async () => {
        try {
            setApiloader(true)
            const requestData = {
                organizerid: organizerid
            };
            fetch(apiurl + 'event/analytics-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setTotalevent(data.totalevents)
                        setTotalincome(data.totalincome)
                        setTotalticket(data.totalticketsold)
                    } else {

                    }
                    setApiloader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiloader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiloader(false)
        }
    }


    useEffect(() => {
        if (!organizerid) {
            navigate(app_url);
            return;
        }
        fetchEvent();
        AnalyticsData();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>

                <div className="container-fluid">
                    <Row>
                        {Apiloader ? (
                            <div className="linear-background w-100" style={{ height: '200px' }}> </div>
                        ) : (
                            <>

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
                                                    <p class="mb-2">Income</p>
                                                    <h3 class="mb-0 text-black font-w600">{Totalincome}</h3>
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
                                                    <svg class="primary-icon" width="51" height="31" viewBox="0 0 51 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M49.3228 0.840214C50.7496 2.08096 50.9005 4.24349 49.6597 5.67035L34.6786 22.8987C32.284 25.6525 28.1505 26.0444 25.281 23.7898L18.1758 18.2072L5.77023 29.883C4.3933 31.1789 2.22651 31.1133 0.930578 29.7363C-0.365358 28.3594 -0.299697 26.1926 1.07723 24.8967L13.4828 13.2209C15.9494 10.8993 19.7428 10.7301 22.4063 12.8229L29.5115 18.4055L44.4926 1.1772C45.7334 -0.249661 47.8959 -0.400534 49.3228 0.840214Z" fill="var(--primary)"></path>
                                                    </svg>
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-2">Total Event</p>
                                                    <h3 class="mb-0 text-black font-w600">{Totalevent}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media align-items-center">
                                                <span class="me-4 dash-box-icon">
                                                    <FaTicket/>
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-2">Total ticket sold</p>
                                                    <div class="d-flex align-items-center">
                                                        <h3 class="mb-0 me-3 text-black font-w600">{Totalticket}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="col-md-12 mb-5">
                            <HighchartsReact highcharts={Highcharts} options={options} />
                        </div>
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Dashboard;