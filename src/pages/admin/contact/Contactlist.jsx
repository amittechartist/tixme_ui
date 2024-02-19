import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
const Dashboard = ({ title }) => {
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const fetchList = async () => {
        try {
            // const requestData = {
            //     isclose: 0
            // };
            fetch(apiurl + 'admin/contact-us/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                // body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                        setLoader(false)
                    } else {

                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }

    }
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            <div class="table-responsive">
                                                {Loader ? (
                                                    <div className="linear-background w-100"> </div>
                                                ) : (
                                                    <table class="table table-responsive-md">
                                                        <thead>
                                                            <tr className="bb2s">
                                                                <th style={{ width: '80px' }}><strong>#</strong></th>
                                                                <th><strong>Name</strong></th>
                                                                <th><strong>Email</strong></th>
                                                                <th><strong>Phone</strong></th>
                                                                <th><strong>Date</strong></th>
                                                                <th><strong>Subject</strong></th>
                                                                <th><strong>Message</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Listitems.map((item, index) => (
                                                                <tr className="blr2s">
                                                                    <td><strong>{index + 1}</strong></td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.phone && '+' + item.phone}</td>
                                                                    <td>{item.date}</td>
                                                                    <td>{item.subject}</td>
                                                                    <td>{item.message}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </div>
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