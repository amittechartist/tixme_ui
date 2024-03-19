import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url } from '../../../common/Helpers';
import { useNavigate } from "react-router-dom";
import Norecord from '../../../component/Norecordui';
import Select from 'react-select'
import { Country } from 'country-state-city';
import { AiFillEye } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toast from "react-hot-toast";
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const { countryid } = useParams();
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const [Listitemsfilter, setListitemsfilter] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countries, setCountries] = useState([]);
    const selectedCountryRef = useRef(selectedCountry);
    const membershipid = useRef(countryid);
    const MySwal = withReactContent(Swal);
    useEffect(() => {
        setCountries(Country.getAllCountries().map(({ isoCode, name }) => ({ value: isoCode, label: name })));
    }, []);
    const fetchList = async () => {
        try {
            setLoader(true)
            const currentMembershipId = membershipid.current;
            const requestData = {
                country: currentMembershipId
            };
            fetch(apiurl + 'admin/get-users', {
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
                        let Filterlist = data.data;
                        if (currentSelectedCountry && currentSelectedCountry.label) {
                            Filterlist = Filterlist.filter(item =>
                                item.country === currentSelectedCountry.label
                            );
                        }
                        console.log("Total user", Filterlist.length);
                        setListitems(Filterlist);
                        setListitemsfilter(data.data);
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
        membershipid.current = countryid;
        fetchList();
    }, [countryid]);
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


    const HandelCountrychange = (value) => {
        setSelectedCountry(value);
        if (value) {
            const Filterlist = Listitemsfilter.filter(item => item.country === value.label);
            setListitems(Filterlist);
        } else {
            setListitems(Listitemsfilter);
        }
    };

    const emptyData = () => {
        setSelectedCountry([]);
    }
    const HanelView = (id) => {
        localStorage.setItem("customerid", id);
        navigate(`${admin_url}user-details`);
    }
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
                    fetch(apiurl + 'admin/delete/customer', {
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

    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="">
                                <Card.Body className="py-4">
                                    <div className="row">
                                        <div className="col-7">
                                            <h5 className="text-capitalize mb-0">{countryid && countryid + ' Customers'}</h5>
                                        </div>
                                    </div>
                                    <hr></hr>
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
                                                                        <th><strong>Membership</strong></th>
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
                                                                            <td>{item.plan_name ? (<span className="badge badge-pill badge-warning">{item.plan_name}</span>) : 'N/A'}</td>
                                                                            <td>
                                                                                <span onClick={() => HanelView(item._id)} className="theme-text cursor-pointer mx-2"><AiFillEye size={20} /></span>
                                                                                <span onClick={() => HanelView(item._id)} className="text-success cursor-pointer mx-2"><AiFillEdit size={20} /></span>
                                                                                <span onClick={() => Delete(item._id)} className="text-danger cursor-pointer mx-2"><FaRegTrashCan size={20} /></span>
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