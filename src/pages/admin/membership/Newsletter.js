import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Whitestarbtn from '../../../component/Whitestarbtn';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Dashboard = ({ title }) => {
    const MySwal = withReactContent(Swal);
    const [Loader, setLoader] = useState(false);
    const [BtnLoader, setBtnLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);

    const [planName, setplanName] = useState();
    const [planpurchaseamount, setplanpurchaseamount] = useState();
    const [Discountamount, setDiscountamount] = useState();
    const [Editid, setEditid] = useState();
    const [modal, setModal] = useState(false);
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'admin/newsletterlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
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
                                                                <th><strong>Email Id</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Listitems.map((item, index) => (
                                                                <tr className="blr2s">
                                                                    <td><strong>{index + 1}</strong></td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.email}</td>
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