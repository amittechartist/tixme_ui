import React from "react";
const Dashboard = ({ title }) => {
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
                    <div className="row">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="theme-color mb-3">Your Next Event is in 20 day</h3>
                            </div>
                            <div className="col-md-12 event-list-details mb-5">
                                <div className="event-list-box">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="theme-color text-bold-600">Event Name</h5>
                                            <p><span className="theme-color text-bold-600">LIVE</span> · Starts Oct 15, 2023 at 07:00 PM</p>
                                        </div>
                                        <div className="col-md-6">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="event-ticket-box">
                                    <p className="text-white"><span className="mr-5">40 / 200</span><span>Tickets Sold</span></p>
                                </div>
                            </div>
                            <div className="col-md-12 event-list-details mb-5">
                                <div className="event-list-box">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="theme-color text-bold-600">Event Name</h5>
                                            <p><span className="theme-color text-bold-600">LIVE</span> · Starts Oct 15, 2023 at 07:00 PM</p>
                                        </div>
                                        <div className="col-md-6">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="event-ticket-box">
                                    <p className="text-white"><span className="mr-5">40 / 200</span><span>Tickets Sold</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Dashboard;