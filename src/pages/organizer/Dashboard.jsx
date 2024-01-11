import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { apiurl, app_url } from "../../common/Helpers";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
const Dashboard = ({ title }) => {
    const organizerid = localStorage.getItem('organizerid');
    const navigate = useNavigate();
    const [Eventlist, setEventlist] = useState([]);
    const [Apiloader, setApiloader] = useState([]);
    const [Totalevent, setTotalevent] = useState();
    const [Totalincome, setTotalincome] = useState();
    const [Totalticket, setTotalticket] = useState();

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
                        setTotalevent(data.totalevent)
                        setTotalincome(data.orderincome)
                        setTotalticket(data.totalticket)
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
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                        <span>Welcome Back, TIXME</span>
                    </div>
                    <Row>
                        {Apiloader ? (
                            <div className="linear-background w-100" style={{height: '200px'}}> </div>
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
                                                <span class="me-4">
                                                    <svg class="primary-icon" width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5 43C34.8888 43 42.5 35.3888 42.5 26C42.5 16.6112 34.8888 9 25.5 9C16.1112 9 8.5 16.6112 8.5 26C8.5 35.3888 16.1112 43 25.5 43ZM25.5 51.5C39.5833 51.5 51 40.0833 51 26C51 11.9167 39.5833 0.5 25.5 0.5C11.4167 0.5 0 11.9167 0 26C0 40.0833 11.4167 51.5 25.5 51.5Z" fill="white" fill-opacity="0.18"></path>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M33.9997 1.95836C31.2809 0.997147 28.4073 0.5 25.4997 0.5V8.86605C28.5687 8.86605 31.5815 9.6904 34.223 11.253C36.8645 12.8155 39.0379 15.0589 40.5159 17.7486C41.9939 20.4384 42.7223 23.4757 42.625 26.5433C42.5277 29.6108 41.6082 32.5959 39.9627 35.1866C38.3172 37.7772 36.006 39.8783 33.2707 41.2703C30.5355 42.6623 27.4766 43.294 24.4136 43.0995C21.3507 42.905 18.3963 41.8913 15.8591 40.1645C13.3219 38.4376 11.2952 36.061 9.99062 33.283L2.41797 36.8391C3.65388 39.4709 5.32535 41.8607 7.35106 43.9131C8.50759 45.0848 9.77958 46.1466 11.1519 47.0806C14.9279 49.6506 19.3249 51.1592 23.8834 51.4487C28.4418 51.7382 32.9943 50.798 37.0652 48.7264C41.136 46.6548 44.5756 43.5277 47.0246 39.6721C49.4736 35.8165 50.842 31.3739 50.9868 26.8085C51.1317 22.2432 50.0476 17.7228 47.8479 13.7197C45.6482 9.71663 42.4137 6.37787 38.4824 4.05236C37.0536 3.2072 35.5519 2.50715 33.9997 1.95836Z" fill="var(--primary)"></path>
                                                    </svg>
                                                </span>
                                                <div class="media-body ms-1">
                                                    <p class="mb-2">Total ticket sold</p>
                                                    <div class="d-flex align-items-center">
                                                        <h3 class="mb-0 me-3 text-black font-w600">{Totalticket}</h3>
                                                        <svg width="29" height="15" viewBox="0 0 29 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 15L14.5 -1.27353e-06L29 15" fill="var(--primary)"></path>
                                                        </svg>
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