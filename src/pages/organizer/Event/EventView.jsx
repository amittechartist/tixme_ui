import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { apiurl } from '../../../common/Helpers';
import Nouserphoto from '../../../common/image/nouser.png';
const Type = ({ title }) => {
    const { id, name } = useParams();
    const [Loader, setLoader] = useState(false);
    const [ApiLoader, setApiLoader] = useState(false);
    const [OrderapiLoader, setOrderapiLoader] = useState(false);
    const [OrdersView, setOrdersView] = useState(false);
    const [Eventdata, setEventdata] = useState([]);
    const [Ticketlist, setTicketlist] = useState([]);
    const [Organizer, setOrganizer] = useState([]);
    const [Orderitem, setOrderitem] = useState([]);
    const [TicketBookinglist, setTicketBookinglist] = useState([]);
    const [Listitems, setListitems] = useState([]);

    const fetchData = async () => {
        try {
            setApiLoader(true)
            const requestData = {
                id: id,
            };
            fetch(apiurl + 'event/get-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setEventdata(data.data)
                        setTicketlist(data.data.allprice);
                        setTicketBookinglist(data.bookinglist);
                        setOrganizer(data.organizer);
                        setApiLoader(false)
                    } else {
                        setApiLoader(false)

                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiLoader(false)
        }
    }
    const countTicketsold = (ticketName) => {
        const count = TicketBookinglist.filter(item => item.ticket_name === ticketName).length;
        return count;
    };
    const countTicketRevenue = (ticketName, price) => {
        const count = Ticketlist.filter(item => item.name === ticketName).length;
        return count * price;
    };
    const showOrderitemList = async (name) => {
        try {
            const requestData = {
                eventid: id,
                ticketname: name
            };
            setOrdersView(true)
            setOrderapiLoader(true)
            fetch(apiurl + 'order/ticket-list-by-event-tickets', {
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
                    } else {

                    }
                    setOrderapiLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setOrderapiLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setOrderapiLoader(false)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Title</li>
                        </ol>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="profile card card-body px-3 pt-3 pb-0">
                                <div className="profile-head">
                                    <div className="photo-content">
                                        <div className="cover-photo rounded"></div>
                                    </div>
                                    <div className="profile-info">
                                        <div className="profile-photo">
                                            <img src={Nouserphoto} className="img-fluid rounded-circle" alt="" />
                                        </div>
                                        <div className="profile-details">

                                            {ApiLoader ? (<div className="mt-5 mb-3 l-background w-100" style={{ height: '100px' }}> </div>) : (
                                                <>
                                                    <div className="profile-name px-3 pt-2">
                                                        <h4 className="text-primary mb-0">{Organizer.name}</h4>
                                                        <p>Phone : {Organizer.phone_number}</p>
                                                    </div>
                                                    <div className="profile-email px-2 pt-2">
                                                        <h4 className="text-muted mb-0">Email</h4>
                                                        <p>{Organizer.email}</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="profile-tab">
                                                {ApiLoader ? (<div className="mt-5 mb-3 l-background w-100" style={{ height: '200px' }}> </div>) : (
                                                    <div className="custom-tab-1">
                                                        <ul className="nav nav-tabs">
                                                            <li className="nav-item"><a href="#about-me" data-bs-toggle="tab" className="nav-link active show">Event Details</a></li>
                                                            <li className="nav-item"><a href="#price" data-bs-toggle="tab" className="nav-link">Event Tickets</a></li>
                                                        </ul>
                                                        <div className="tab-content pt-5">
                                                            <div id="about-me" className="tab-pane active show">

                                                                <div className="profile-personal-info">
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500"> Type <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Eventdata.event_type_name}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500"> Name <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Eventdata.name}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500"> Display Name <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Eventdata.display_name}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500"> Category <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Eventdata.category_name}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500"> Location<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Eventdata.location}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500"> Country<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Eventdata.countryname}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Start Date<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Eventdata.start_date} {Eventdata.start_time}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">End Date<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Eventdata.end_date} {Eventdata.end_time}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Display Price<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span> {Eventdata.countrysymbol} {Eventdata.displayprice}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500"> Display Cut Price <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Eventdata.countrysymbol} {Eventdata.displaycutprice}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="profile-skills mb-5">
                                                                    <h4 class="text-primary mb-2">Tags</h4>
                                                                    {Eventdata.tags ? (
                                                                        <>
                                                                            {Eventdata.tags.map((item, index) => (
                                                                                <span class="btn btn-primary light btn-xs mb-1 mx-1">{item}</span>
                                                                            ))}
                                                                        </>
                                                                    ) : (
                                                                        <span class="btn btn-primary light btn-xs mb-1">No tags found</span>
                                                                    )}
                                                                </div>
                                                                <div class="profile-about-me">
                                                                    <div class="pt-1 border-bottom-1 pb-3">
                                                                        <h4 class="text-primary">Event description</h4>
                                                                        <p class="mb-2">
                                                                            {Eventdata.event_desc ? Eventdata.event_desc : 'No description'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id="price" className="tab-pane">
                                                                <div className="profile-personal-info">


                                                                    <div className="row mb-2">
                                                                        {Ticketlist.map((item, index) => (
                                                                            <div className="col-md-4">
                                                                                <div class="card" style={{ border: '1px solid #eee' }}>
                                                                                    <div class="card-header border-0 pb-0">
                                                                                        <h2 class="card-title">{item.name}</h2>
                                                                                    </div>
                                                                                    <div class="card-body pb-0">
                                                                                        <ul class="list-group list-group-flush">
                                                                                            <li class="list-group-item d-flex px-0 justify-content-between">
                                                                                                <strong>Price</strong>
                                                                                                <span class="mb-0">{item.price ? <>{Eventdata.countrysymbol} {item.price}</> : 'Free'}</span>
                                                                                            </li>
                                                                                            <li class="list-group-item d-flex px-0 justify-content-between">
                                                                                                <strong>Start date</strong>
                                                                                                <span class="mb-0">{item.startdate} {item.starttime}</span>
                                                                                            </li>
                                                                                            <li class="list-group-item d-flex px-0 justify-content-between">
                                                                                                <strong>End date</strong>
                                                                                                <span class="mb-0">{item.endtdate} {item.endttime}</span>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div class="card-footer pt-0 pb-0 text-center">
                                                                                        <div class="row">
                                                                                            <div class="col-4 pt-3 pb-3 border-end">
                                                                                                <h3 class="mb-1 text-primary">{item.quantity}</h3>
                                                                                                <span style={{font: '7px'}}>Quantity</span>
                                                                                            </div>
                                                                                            <div class="col-4 pt-3 pb-3 border-end">
                                                                                                <h3 class="mb-1 text-primary">{countTicketsold(item.name)}</h3>
                                                                                                <span style={{font: '7px'}}>Sold</span>
                                                                                            </div>
                                                                                            <div class="col-4 pt-3 pb-3">
                                                                                                <h3 class="mb-1 text-primary">{Eventdata.countrysymbol} {countTicketRevenue(item.name, item.price)}</h3>
                                                                                                <span style={{font: '7px'}}>Revenue</span>
                                                                                            </div>
                                                                                            <div class="col-12 pt-3 pb-3">
                                                                                                <button onClick={() => showOrderitemList(item.name)} type="button" class="btn btn-success">View History</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    {OrdersView ? (
                                                                        <Row className="justify-content-center">
                                                                            <Col md={12}>
                                                                                {OrderapiLoader ? (
                                                                                    <div className="linear-background w-100"> </div>
                                                                                ) : (
                                                                                    <>
                                                                                        {Listitems.length > 0 ? (
                                                                                            <>
                                                                                                <div class="table-responsive">
                                                                                                    <table class="table table-responsive-md">
                                                                                                        <thead>
                                                                                                            <tr className="bb2s">
                                                                                                                <th style={{ width: '80px' }}><strong>#</strong></th>
                                                                                                                <th><strong>Customer Name</strong></th>
                                                                                                                <th><strong>Date</strong></th>
                                                                                                                <th><strong>Status</strong></th>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {Listitems.map((item, index) => (
                                                                                                                <tr className="blr2s">
                                                                                                                    <td><strong>{index + 1}</strong></td>
                                                                                                                    <td>
                                                                                                                        {item.owner_name} <br />
                                                                                                                        {item.owner_email}
                                                                                                                    </td>
                                                                                                                    <td>{item.date}</td>
                                                                                                                    <td>
                                                                                                                        {item.scan_status ? (
                                                                                                                            <span class="badge light badge-info">Scann Pending</span>
                                                                                                                        ) : (
                                                                                                                            <span class="badge light badge-success">Scanned</span>
                                                                                                                        )}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            ))}
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                            </>
                                                                                        ) : (
                                                                                            <div class="no-data-box">
                                                                                                <p>No Data Found !</p>
                                                                                            </div>
                                                                                        )}
                                                                                    </>
                                                                                )}

                                                                            </Col>
                                                                        </Row>
                                                                    ) : ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Type;