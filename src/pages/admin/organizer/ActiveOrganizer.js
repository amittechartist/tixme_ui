import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { FiEye } from "react-icons/fi";
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
const Dashboard = ({ title }) => {
    const MySwal = withReactContent(Swal)
    // modal
    const [MessageModal, setMessageModal] = useState(false);

    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const [orgMessage, setorgMessage] = useState("");
    const [intervalId, setIntervalId] = useState(null);
    const fetchList = async () => {
        try {
            const requestData = {
                isactive: 1,
            };
            setLoader(true)
            fetch(apiurl + 'admin/get-organizer-list', {
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
                        setLoader(false)
                    } else {
                        setLoader(false)
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const ActiveOrganizer = async (id) => {
        try {
            setLoader(true)
            const requestData = {
                id: id,
                isactive: 0
            };
            fetch(apiurl + 'admin/deactive-organizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success("Organizer status change to deactive");
                        fetchList();
                    } else {
                        setLoader(false)
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    function updateIsactive(id) {
        MySwal.fire({
            title: 'Are you sure you want to deactive?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                ActiveOrganizer(id);
            } else if (result.isDenied) {

            }
        })
    }
    const ViewMessage = (message) => {
        setorgMessage(message);
        setMessageModal(true);
    }
    useEffect(() => {
        fetchList();
        const interval = setInterval(() => {
            fetchList();
        }, 3000);

        // Save the interval ID so it can be cleared later
        setIntervalId(interval);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <Modal isOpen={MessageModal} toggle={() => setMessageModal(!MessageModal)} centered>
                <ModalHeader toggle={() => setMessageModal(!MessageModal)}>Organizer Message</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-12">
                            <p>
                                {orgMessage}
                            </p>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            <div class="table-responsive">
                                                {/* {Loader ? (
                                                    <div className="linear-background w-100"> </div>
                                                ) : ( */}
                                                <table class="table table-responsive-md">
                                                    <thead>
                                                        <tr className="bb2s">
                                                            <th style={{ width: '80px' }}><strong>#</strong></th>
                                                            <th><strong>Name</strong></th>
                                                            <th><strong>Email</strong></th>
                                                            <th><strong>Phone Number</strong></th>
                                                            <th><strong>Country</strong></th>
                                                            <th><strong>Message</strong></th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Listitems.map((item, index) => (
                                                            <tr className="blr2s">
                                                                <td><strong>{index + 1}</strong></td>
                                                                <td>{item.name}</td>
                                                                <td>{item.email}</td>
                                                                <td>+{item.phone_number}</td>
                                                                <td>{item.countryname}</td>
                                                                <td>
                                                                    {item.message && (
                                                                        <button type="button" onClick={() => ViewMessage(item.message)} className="theme-bg text-white btn btn-sm">
                                                                            <FiEye />
                                                                        </button>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <div class="dropdown">
                                                                        <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" /></g></svg>
                                                                        </button>
                                                                        <div class="dropdown-menu">
                                                                            <Link to={`${admin_url}organizer-details/${item._id}/${item.name}`} class="dropdown-item">View</Link>
                                                                            <Link onClick={() => updateIsactive(item._id)} class="dropdown-item">Deactive</Link>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                {/* )} */}
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