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
    const HandelPlancreate = async () => {
        try {
            if (!planName || !planpurchaseamount) {
                toast.error("All field is require");
            }
            setBtnLoader(true)
            const requestData = {
                name: planName,
                purchase_amount: planpurchaseamount,
                discount_amount: Discountamount
            };
            fetch(apiurl + 'admin/create-package-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success("Plan created successfully");
                        setModal(false)
                        fetchList();
                        setplanName('')
                        setplanpurchaseamount('')
                        setDiscountamount('')
                        setEditid('')
                    } else {

                    }
                    setBtnLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setBtnLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setModal(false)
            setBtnLoader(false)
        }
    }
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'admin/package-plan-list', {
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
    function HandelDelete(id) {
        MySwal.fire({
            title: 'Are you sure you want to delete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                DoDelete(id)
            } else if (result.isDenied) {

            }
        })
    }
    const DoDelete = async (id) => {
        try {
            const requestData = {
                id: id,
                isdelete: 1
            };
            fetch(apiurl + 'admin/delete-package-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success(data.message);
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
    const HandelEdit = async (id) => {
        try {
            const requestData = {
                id: id
            };
            fetch(apiurl + 'admin/package-plan-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setplanName(data.data.name)
                    setplanpurchaseamount(data.data.purchase_amount)
                    setDiscountamount(data.data.discount_amount)
                    setEditid(data.data._id)
                    setModal(true)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const DoEdit = async () => {
        try {
            if (!planName || !planpurchaseamount) {
                toast.error("All field is require");
            }
            setBtnLoader(true)
            const requestData = {
                name: planName,
                purchase_amount: planpurchaseamount,
                discount_amount: Discountamount,
                id: Editid
            };
            fetch(apiurl + 'admin/update-package-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    toast.success(data.message);
                    setModal(false)
                    fetchList();
                    setBtnLoader(false)
                    setplanName('')
                    setplanpurchaseamount('')
                    setDiscountamount('')
                    setEditid('')
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setBtnLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setModal(false)
            setBtnLoader(false)
        }
    }
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={!modal}>Create new plan</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <div className="form-group">
                                <p>Plan name <span className="text-danger">*</span></p>
                                <input placeholder="Plan name" class="form-control" value={planName} onChange={(e) => setplanName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <p>Plan active point<span className="text-danger">*</span></p>
                                <input placeholder="Plan purchase amount" class="form-control" value={planpurchaseamount} onChange={(e) => setplanpurchaseamount(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <p>Reward point<span className="text-danger">*</span></p>
                                <input placeholder="Plan Reward point" class="form-control" value={Discountamount} onChange={(e) => setDiscountamount(e.target.value)} />
                            </div>
                        </Col>
                        {BtnLoader ? (
                            <Col md={12}>
                                <span>
                                    <Whitestarbtn title={'Please wait...'} />
                                </span>
                            </Col>
                        ) : (
                            <Col md={12}>
                                {Editid ? (
                                    <span onClick={() => DoEdit()}>
                                        <Whitestarbtn title={'Update plan'} />
                                    </span>
                                ) : (
                                    <span onClick={() => HandelPlancreate()}>
                                        <Whitestarbtn title={'Create plan'} />
                                    </span>
                                )}
                            </Col>
                        )}
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setModal(!modal)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <span onClick={() => setModal(true)} className="position-right"><Whitestarbtn title={'Add plan'} /></span>
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
                                            <div class="table-responsive">
                                                {Loader ? (
                                                    <div className="linear-background w-100"> </div>
                                                ) : (
                                                    <table class="table table-responsive-md">
                                                        <thead>
                                                            <tr className="bb2s">
                                                                <th style={{ width: '80px' }}><strong>#</strong></th>
                                                                <th><strong>Plan name</strong></th>
                                                                <th><strong>Plan active point</strong></th>
                                                                <th><strong>Plan reward point</strong></th>
                                                                <th><strong>Total User</strong></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Listitems.map((item, index) => (
                                                                <tr className="blr2s">
                                                                    <td><strong>{index + 1}</strong></td>
                                                                    <td><strong className="text-capitalize">{item.name}</strong></td>
                                                                    <td>{item.purchase_amount}</td>
                                                                    <td>{item.discount_amount}</td>
                                                                    <td>{item.userCount}</td>
                                                                    <td>
                                                                        <div class="dropdown">
                                                                            <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" /></g></svg>
                                                                            </button>
                                                                            <div class="dropdown-menu">
                                                                                <Button onClick={() => HandelEdit(item._id)} variant="link" class="dropdown-item">Edit</Button>
                                                                                <Button onClick={() => HandelDelete(item._id)} variant="link" class="dropdown-item">Delete</Button>
                                                                            </div>
                                                                        </div>
                                                                    </td>
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