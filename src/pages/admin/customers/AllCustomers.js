import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
import Norecord from '../../../component/Norecordui';
const Dashboard = ({ title }) => {
    const { id, name } = useParams();
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'admin/get-customer-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
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
    const fetchListWithfilter = async () => {
        try {
            setLoader(true)
            const requestData = {
                membershipid: id,
            };
            fetch(apiurl + 'admin/get-customer-list-with-filter', {
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
        if (id) {
            fetchListWithfilter();
        } else {
            fetchList();
        }
        const interval = setInterval(() => {
            if (id) {
                fetchListWithfilter();
            } else {
                fetchList();
            }
        }, 3000);

        // Save the interval ID so it can be cleared later
        setIntervalId(interval);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [id]);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="">
                                <Card.Header>
                                    <h5 className="text-capitalize">{name && name + ' Customers'}</h5>
                                </Card.Header>
                                <Card.Body className="py-4">
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            {/* {Loader ? (
                                                <div className="linear-background w-100"> </div>
                                            ) : ( */}
                                                <>
                                                    {Listitems.length > 0 ? (
                                                        <>
                                                            <div class="table-responsive">
                                                                <table class="table table-responsive-md">
                                                                    <thead>
                                                                        <tr className="bb2s">
                                                                            <th style={{ width: '80px' }}><strong>#</strong></th>
                                                                            <th><strong>Name</strong></th>
                                                                            <th><strong>Email</strong></th>
                                                                            <th><strong>Phone Number</strong></th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {Listitems.map((item, index) => (
                                                                            <tr className="blr2s">
                                                                                <td><strong>{index + 1}</strong></td>
                                                                                <td>{item.name}</td>
                                                                                <td>{item.email}</td>
                                                                                <td>+{item.phone_number}</td>
                                                                                <td>
                                                                                    <div class="dropdown">
                                                                                        <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                                                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" /></g></svg>
                                                                                        </button>
                                                                                        <div class="dropdown-menu">
                                                                                            <Link to={`${admin_url}user-details/${item._id}/${item.name}`} class="dropdown-item">View</Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <Norecord />
                                                    )}
                                                </>
                                            {/* )} */}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Dashboard;