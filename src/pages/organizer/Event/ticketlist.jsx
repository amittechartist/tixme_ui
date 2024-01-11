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
            fetch(apiurl + 'event/organizer/ticket-list', {
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
                                                                            <th><strong>Event name</strong></th>
                                                                            <th><strong>Ticket type</strong></th>
                                                                            <th><strong>Ticket name</strong></th>
                                                                            <th><strong>Ticket price</strong></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {Listitems.map((item, index) => (
                                                                            <>
                                                                                {item.allprice.map((list, keyindex) => (
                                                                                    <tr>
                                                                                        <td><strong>{keyindex + 1}</strong></td>
                                                                                        <td>{item.display_name}</td>
                                                                                        <td>
                                                                                            {list.ticket_type == 1 ? (
                                                                                                <span class="badge light badge-warning">Paid</span>
                                                                                            ) : (
                                                                                                <span class="badge light badge-success">Free</span>
                                                                                            )}
                                                                                        </td>
                                                                                        <td>{list.name}</td>
                                                                                        <td>{list.price ? (<>{item.countrysymbol} {list.price}</>) : (<><span class="badge light badge-success">Free</span></>)}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </>
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