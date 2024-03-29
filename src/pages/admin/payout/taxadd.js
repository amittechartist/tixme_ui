import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import whitestar from '../../../common/icon/whitestar.svg';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
const Dashboard = ({ title }) => {

    const [EditTitle, setEditTitle] = useState();
    const [EditAmount, setEditAmount] = useState();
    const [EditId, setEditId] = useState();
    const [EditModal, setEditModal] = useState(false);

    const [Categoryname, setCategoryname] = useState();
    const [Listitem, setListitem] = useState([]);
    const [taxtitle, setTaxtitle] = useState();
    const [taxamount, setTaxamount] = useState();
    const [Loader, setLoader] = useState(false);
    const [Listloader, setListloader] = useState(false);
    const HandelFormsubmit = async () => {
        try {
            if (!taxtitle || !taxamount) {
                return toast.error('All field is required');
            }
            setLoader(true);
            const requestData = {
                name: taxtitle,
                taxamount: taxamount
            };
            fetch(apiurl + 'admin/tax-insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Created successful', {
                            duration: 3000,
                        });
                        fetchTaxlist();
                        setTaxtitle('');
                        setTaxamount('');
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    };
    const HandelFormupdate = async () => {
        try {
            setLoader(true);
            const requestData = {
                name: EditTitle ? EditTitle : null,
                taxamount: EditAmount ? EditAmount : null,
                id: EditId
            };
            fetch(apiurl + 'admin/tax-update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Updated successful', {
                            duration: 3000,
                        });
                        fetchTaxlist();
                        setTaxtitle('');
                        setTaxamount('');
                        setEditModal(!EditModal);
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    };
    const fetchTaxlist = async () => {
        try {
            setListloader(true);
            fetch(apiurl + 'admin/tax-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setListloader(false);
                    if (data.success == true) {
                        setListitem(data.data);
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setListloader(false);
                    console.error('Api error:', error);
                });
        } catch (error) {
            setListloader(false);
            console.error('Api error:', error);
        }
    };
    const HandelOpenEditmodal = async (id, titleis, amountis ) => {
        setEditTitle(titleis)
        setEditAmount(amountis)
        setEditId(id);
        setEditModal(!EditModal);
    };

    useEffect(() => {
        fetchTaxlist();
    }, []);
    return (
        <>
            <Modal isOpen={EditModal} toggle={() => setEditModal(!EditModal)} centered>
                <ModalHeader toggle={!EditModal}>Select date</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <label htmlFor="" className="text-black">Tax title</label>
                                <input type="text" class="form-control input-default" placeholder="Enter title" value={EditTitle} onChange={(e) => setEditTitle(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="" className="text-black">Tax percentage (%)</label>
                                <input type="text" class="form-control input-default" placeholder="Enter tax amount" value={EditAmount} onChange={(e) => setEditAmount(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                {Loader ? (
                                    <button className="w-100 theme-btn">
                                        <span className="theme-btn-icon"><FiPlus /></span> <span>Please wait...</span>
                                    </button>
                                ) : (
                                    <button className="w-100 theme-btn" onClick={() => HandelFormupdate()}>
                                        <span className="theme-btn-icon"><FiPlus /></span> <span>Update</span>
                                    </button>
                                )}

                            </div>

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
                                        {Listitem.length > 0 ? (
                                            <>
                                                {Listloader ? (
                                                    <div className="linear-background w-100"> </div>
                                                ) : (
                                                    <>
                                                        {Listitem.map((item, index) => (
                                                            <Col md={6}>
                                                                <div>
                                                                    <label htmlFor="" className="text-black">Tax title</label>
                                                                    <input type="text" readOnly class="form-control input-default" placeholder="Enter title" value={taxtitle ? taxtitle : item.name} onChange={(e) => setTaxtitle(e.target.value ? e.target.value : item.name)} />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="" className="text-black">Tax percentage (%)</label>
                                                                    <input type="text" readOnly class="form-control input-default" placeholder="Enter tax amount" value={taxamount ? taxamount : item.taxamount} onChange={(e) => setTaxamount(e.target.value ? e.target.value : item.taxamount)} />
                                                                </div>
                                                                <div className="mt-3">
                                                                    {Loader ? (
                                                                        <button className="w-100 theme-btn">
                                                                            <span className="theme-btn-icon"><FiPlus /></span> <span>Please wait...</span>
                                                                        </button>
                                                                    ) : (
                                                                        <button className="w-100 theme-btn" onClick={() => HandelOpenEditmodal(item._id, item.name, item.taxamount)}>
                                                                            <span className="theme-btn-icon"><FiPlus /></span> <span>Edit</span>
                                                                        </button>
                                                                    )}

                                                                </div>
                                                            </Col>
                                                        ))}
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <Col md={4}>
                                                <div>
                                                    <label htmlFor="" className="text-black">Tax title</label>
                                                    <input type="text" class="form-control input-default" placeholder="Enter title" value={taxtitle} onChange={(e) => setTaxtitle(e.target.value)} />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="text-black">Tax percentage (%)</label>
                                                    <input type="text" class="form-control input-default" placeholder="Enter tax amount" value={taxamount} onChange={(e) => setTaxamount(e.target.value)} />
                                                </div>
                                                <div className="mt-3">
                                                    {Loader ? (
                                                        <button className="w-100 theme-btn">
                                                            <span className="theme-btn-icon"><FiPlus /></span> <span>Please wait...</span>
                                                        </button>
                                                    ) : (
                                                        <button className="w-100 theme-btn" onClick={() => HandelFormsubmit()}>
                                                            <span className="theme-btn-icon"><FiPlus /></span> <span>Add Tax</span>
                                                        </button>
                                                    )}

                                                </div>
                                            </Col>
                                        )}

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