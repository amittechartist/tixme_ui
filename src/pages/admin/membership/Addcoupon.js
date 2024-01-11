import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import whitestar from '../../../common/icon/whitestar.svg';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Norecord from '../../../component/Norecordui';
import toast from 'react-hot-toast';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
import Select from 'react-select'
import { FiPlus } from "react-icons/fi";
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FiTrash2 } from "react-icons/fi";
const Dashboard = ({ title }) => {
    const [Loader, setLoader] = useState(false);
    const [BtnLoader, setBtnLoader] = useState(false);
    const [Addnewmodal, setAddnewmodal] = useState(false);
    const [List, setList] = useState([]);
    const [name, setname] = useState();
    const [point, setpoint] = useState();
    const [discount, setdiscount] = useState();
    const [currencyList, setcurrencyList] = useState([{ value: "", label: "Currency" }]);
    const [Currency, setCurrency] = useState();
    const [CurrencyId, setCurrencyId] = useState();
    const CurrencyOption = [
        {
            options: currencyList
        }
    ]
    const fetchCountry = async () => {
        try {
            fetch(apiurl + 'admin/country-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const countryData = data.data;
                        const currencyOption = countryData.map(item => ({
                            value: item.currency,
                            label: item.symbol
                        }));
                        setcurrencyList(currencyOption)
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const selectCurrency = (selectedValue) => {
        setCurrency(selectedValue);
        setCurrencyId(selectedValue.label);
    };
    const Fetchlist = async () => {
        try {
            setLoader(true);
            fetch(apiurl + 'admin/get-coupon-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setList(data.data);
                    } else {
                        toast.error(data.message);
                    }
                    setLoader(false);
                })
                .catch(error => {
                    setLoader(false);
                    toast.error('error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            setLoader(false);
            console.error('Api error:', error);
        }
    };
    useEffect(() => {
        fetchCountry();
        Fetchlist();
    }, []);
    const HandelCreateCoupon = async () => {
        try {
            if (!name || !point || !discount || !CurrencyId) {
                return toast.error('All field is required');
            }
            setBtnLoader(true);
            const requestData = {
                name: name,
                point: point,
                discount: discount,
                currency: CurrencyId
            };
            fetch(apiurl + 'admin/coupon-insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Created successful', {
                            duration: 3000,
                        });
                        setname('');
                        setpoint('');
                        setdiscount('');
                        setCurrencyId('');
                        setCurrency('');
                        Fetchlist();
                    } else {
                        toast.error(data.message);
                    }
                    setBtnLoader(false);
                })
                .catch(error => {
                    setBtnLoader(false);
                    toast.error('error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            setBtnLoader(false);
            console.error('Api error:', error);
        }
    };
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
                HandelDelete(id)
            } else if (result.isDenied) {

            }
        })
    }
    const HandelDelete = async (id) => {
        try {
            setLoader(true)
            const requestData = {
                id: id
            };
            fetch(apiurl + 'admin/coupon-delete', {
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
                        Fetchlist();
                    } else {
                        toast.error(data.error);
                    }
                    setLoader(false)
                })
                .catch(error => {
                    console.error('error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false)
        }
    }
    return (
        <>
            <Modal isOpen={Addnewmodal} toggle={() => setAddnewmodal(!Addnewmodal)} className='modal-dialog-centered'>
                <ModalHeader className='bg-transparent'>Add New Coupon</ModalHeader>
                <ModalBody className=''>
                    {Loader ? (
                        <div className="linear-background w-100"> </div>
                    ) : (
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <label htmlFor="" className="text-black">Coupon name</label>
                                <input type="text" class="form-control input-default" placeholder="Enter coupon name" value={name} onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div className="col-md-12 mb-2">
                                <label htmlFor="" className="text-black">Point</label>
                                <input type="number" class="form-control input-default" placeholder="Enter point amount" value={point} onChange={(e) => setpoint(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="" className="text-black">Select Currency</label>
                                <Select
                                    isClearable={false}
                                    options={CurrencyOption}
                                    className='react-select select-theme'
                                    classNamePrefix='select'
                                    onChange={selectCurrency}
                                    value={Currency}
                                />
                            </div>
                            <div className="col-md-8">
                                <label htmlFor="" className="text-black">Discount amount</label>
                                <input type="number" class="form-control input-default" placeholder="Enter point amount" value={discount} onChange={(e) => setdiscount(e.target.value)} />
                            </div>
                            <div className="col-md-12 mt-3">
                                {BtnLoader ? (
                                    <button className="w-100 theme-btn">
                                        <span>Please wait...</span>
                                    </button>
                                ) : (
                                    <button className="w-100 theme-btn" onClick={() => HandelCreateCoupon()}>
                                        <span className="theme-btn-icon"><FiPlus /></span> <span>Create coupon</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </ModalBody >
            </Modal >
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <button type="button" className="page-theme-btn position-right" onClick={() => setAddnewmodal(!Addnewmodal)}><span className="theme-btn-icon"><FiPlus /></span> Add New</button>
                    </div>
                    <Row className="mt-2">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row className="">
                                        {Loader ? (
                                            <div className="linear-background w-100"> </div>
                                        ) : (
                                            <>
                                                {List.length > 0 ? (
                                                    <>
                                                        {List.map((item, index) => (
                                                            <Col md={4} className="mb-3">
                                                                <div className="coupon-page-ui shadow">
                                                                    <div className="row align-items-stretch align-items-center">
                                                                        <div className="d-flex align-items-center col-md-4 text-center justify-content-center">
                                                                            <p className="coupon-amount">{item.currency}{item.discount}</p>
                                                                        </div>
                                                                        <div className="col-md-8 p-2">
                                                                            <p className="mb-0 coupon-name w-100" style={{ fontSize: '16px', fontWeight: '600' }}>{item.name}</p>
                                                                            <p className="mb-0 coupon-point" style={{ fontSize: '14px', fontWeight: '600' }}>{item.point} Points</p>
                                                                            <div className="action-btn-div float-end mr-3" onClick={() => CheckDelete(item._id)} style={{cursor: 'pointer'}}>
                                                                                <span className="text-danger" style={{ border: '1px solid red', borderRadius: '20px', padding: '2px 20px', fontSize: '18px' }}><FiTrash2 /></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <Norecord />
                                                )}
                                            </>
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