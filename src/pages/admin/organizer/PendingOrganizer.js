import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { FiEye } from "react-icons/fi";
import Select from 'react-select'
import { Country } from 'country-state-city';
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

    const [Listitemsfilter, setListitemsfilter] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countries, setCountries] = useState([]);
    const selectedCountryRef = useRef(selectedCountry);
    useEffect(() => {
        setCountries(Country.getAllCountries().map(({ isoCode, name }) => ({ value: isoCode, label: name })));
    }, []);

    const fetchList = async () => {
        try {
            const requestData = {
                isactive: 0,
            };
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
                        const currentSelectedCountry = selectedCountryRef.current;
                        console.log("dsd", currentSelectedCountry);
                        let Filterlist = data.data;
                        if (currentSelectedCountry && currentSelectedCountry.label) {
                            Filterlist = Filterlist.filter(item =>
                                item.countryname === currentSelectedCountry.label
                            );
                        }
                        console.log("Total Organizer", Filterlist.length);
                        setListitems(Filterlist);
                        setListitemsfilter(data.data);
                        setLoader(false)
                    } else {
                        setLoader(false);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const HandelCountrychange = (value) => {
        setSelectedCountry(value);
        if (value) {
            const Filterlist = Listitemsfilter.filter(item => item.countryname === value.label);
            setListitems(Filterlist);
        } else {
            setListitems(Listitemsfilter);
        }
    };
    const Delete = async (id) => {
        MySwal.fire({
            title: 'Are you sure to delete this?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Delete',  // Change this text for the confirm button
            denyButtonText: 'Cancel',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const requestData = {
                        upid: id
                    };
                    fetch(apiurl + 'admin/delete/organizer', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success == true) {
                                toast.success('Deleted', {
                                    duration: 6000,
                                });
                            }
                        })
                        .catch(error => {
                            toast.error(error.message, {
                                duration: 5000,
                            });
                        });
                } catch (error) {
                    console.error('Api error:', error);
                }
            } else if (result.isDenied) {

            }
        })
    }
    const ActiveOrganizer = async (id) => {
        try {
            const requestData = {
                id: id,
                isactive: 1,
                password: "12345678"
            };
            fetch(apiurl + 'admin/active-organizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success("Organizer status change to active");
                        fetchList();
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
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            fetchList();
        }, 3000);
        setIntervalId(interval);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        selectedCountryRef.current = selectedCountry;
    }, [selectedCountry]);
    const emptyData = () => {
        setSelectedCountry([]);
    }
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
                                    <div className="row">
                                        <div className="col-7">
                                            <h5 className="text-capitalize mb-0">Pending Organizers</h5>
                                        </div>
                                        <div className="col-3 d-flex justify-content-end">
                                            <Select
                                                options={countries}
                                                value={selectedCountry}
                                                className="w-100"
                                                onChange={HandelCountrychange}
                                                placeholder="Select Country"
                                            />
                                        </div>
                                        <div className="col-2 d-flex justify-content-end">
                                            <button type="button" onClick={() => emptyData()} className="btn btn-dark w-100">Reset</button>
                                        </div>
                                    </div>
                                    <hr></hr>
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
                                                                            <Link onClick={() => ActiveOrganizer(item._id)} class="dropdown-item">{item.issignupcomplete === 0 ? 'Active' : 'Resend Link'}</Link>
                                                                            <Link onClick={() => Delete(item._id)} class="dropdown-item">Delete</Link>
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