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
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const { id, name } = useParams();
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const [Listitemsfilter, setListitemsfilter] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countries, setCountries] = useState([]);
    const selectedCountryRef = useRef(selectedCountry);
    const membershipid = useRef(id);
    useEffect(() => {
        setCountries(Country.getAllCountries().map(({ isoCode, name }) => ({ value: isoCode, label: name })));
    }, []);
    const fetchList = async () => {
        try {
            setLoader(true)
            const currentMembershipId = membershipid.current;
            const requestData = {
                membershipid: currentMembershipId
            };
            fetch(apiurl + 'admin/get-customer-list', {
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
                        if (currentMembershipId) {
                            Filterlist = Filterlist.filter(item =>
                                item.planid === currentMembershipId
                            );
                        }
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
        membershipid.current = id;
        fetchList();
    }, [id]);
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
        localStorage.setItem("customerid",id);
        navigate(`${admin_url}user-details`);
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
                                            <h5 className="text-capitalize mb-0">{name && name + ' Customers'}</h5>
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
                                                                        <th><strong>Country</strong></th>
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
                                                                            <td>{item.country}</td>
                                                                            <td>
                                                                                <button onClick={() => HanelView(item._id)} type="button" class="btn theme-bg text-white light sharp m-1"><AiFillEye size={20} /></button>
                                                                                <button onClick={() => HanelView(item._id)} type="button" class="btn theme-bg text-white light sharp m-1"><AiFillEdit size={20} /></button>
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