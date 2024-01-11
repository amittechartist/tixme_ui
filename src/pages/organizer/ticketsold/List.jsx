import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import whitestar from '../../../common/icon/whitestar.svg';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiurl, admin_url, organizer_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
const Dashboard = ({ title }) => {
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const organizerid = localStorage.getItem('organizerid')
    const MySwal = withReactContent(Swal);
    function CheckDelete(id) {
        MySwal.fire({
            title: 'Are you sure you want to delete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Delete(id)
            } else if (result.isDenied) {

            }
        })
    }
    const Delete = async (id) => {
        try {
            setLoader(true)
            const requestData = {
                id: id,
                isdelete: 1
            };
            fetch(apiurl + 'category/delete-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Deleted successfully');
                        fetchmyEvent();
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
    const fetchmyEvent = async () => {
        try {
            setLoader(true)
            const requestData = {
                id: organizerid,
            };
            fetch(apiurl + 'event/organizer/ticket-sold', {
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
    useEffect(() => {
        fetchmyEvent();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <Link className="page-theme-btn position-right" to={organizer_url + 'event/add-event'}>Add new</Link>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            {Loader ? (
                                                <div className="linear-background w-100"> </div>
                                            ) : (
                                                <>
                                                    {Listitems.length > 0 ? (
                                                        <>
                                                            <div class="table-responsive">
                                                                <table class="table table-responsive-md">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: '80px' }}><strong>#</strong></th>
                                                                            <th><strong>Customer Name</strong></th>
                                                                            <th><strong>Event name</strong></th>
                                                                            <th><strong>Ticket name</strong></th>
                                                                            <th><strong>Ticket price</strong></th>
                                                                            <th><strong>Date</strong></th>
                                                                            <th><strong>Status</strong></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {Listitems.map((item, index) => (
                                                                            <tr>
                                                                                <td><strong>{index + 1}</strong></td>
                                                                                <td>
                                                                                    {item.owner_name} <br />
                                                                                    {item.owner_email}
                                                                                </td>
                                                                                <td>
                                                                                    <p>{item.eventdata.display_name}</p>
                                                                                    <span class="badge light badge-success">{item.eventdata.eventtype == 1 ? 'Offline Event' : 'Online Event' }</span>
                                                                                    </td>
                                                                                <td>{item.ticket_name}</td>
                                                                                <td>{item.ticket_price ? item.ticket_price : 'FREE'}</td>
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
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >

        </>
    )
}
export default Dashboard;