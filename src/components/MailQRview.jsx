import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiurl, app_url } from "../common/Helpers";
import toast from "react-hot-toast";
import Card from 'react-bootstrap/Card';
import { Col, Row } from "react-bootstrap";
import Logo from '../assets/Logo.svg';
import { FaClock } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

import QRsuccess from '../common/icon/qr-code-pay.png';
import QRCode from 'react-qr-code';
const Component = () => {
    const { ordreid } = useParams();
    const [Loader, setLoader] = useState(false);
    const [OrderData, setOrderData] = useState();
    const [ORData, setORData] = useState([]);
    console.log(ORData);
    const fetchData = async () => {
        try {
            setLoader(true);
            const requestData = {
                orderid: ordreid,
            };
            fetch(apiurl + 'order/mail-order-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setOrderData(data.order);
                        setORData(data.qr);
                    }
                    setLoader(false);
                })
                .catch(error => {
                    console.error('error:', error);
                    setLoader(false);
                });
        } catch (error) {
            toast.error(error);
            setLoader(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Card className="grey-bg">
                            <Card.Header className="text-center">
                                Your Event Tickets
                            </Card.Header>
                            <Card.Body>
                                <Row className="text-center">
                                    <Col md={12}>
                                        <Link to={app_url}> <img src={Logo} height={'auto'} width={'200px'}></img></Link>
                                    </Col>
                                </Row>
                                {Loader ? (
                                    <></>
                                ) : (
                                    <Row className="pt-2 py-4 ">
                                        {ORData.map((item, index) => (
                                            <Col md={3}>
                                                <div className="ticket-box">
                                                    <div className="ticket-qr text-center">
                                                        {item.is_transfer == 1 ? (
                                                            <>
                                                                <img src={QRsuccess} className="qr-scanner-success dashqrbig" alt="" />
                                                                <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                <p className="mb-0 mt-4" style={{ fontWeight: 600, color: '#000' }}>Transferred to</p>
                                                                <span class="mt-0 badge-theme-success badge-theme mt-3 mb-3 d-block w-100"><FaCircleCheck /> {item.owner_email}</span>
                                                            </>
                                                        ) : (
                                                            <div className="text-center">
                                                                {item.scan_status == 0 ? (
                                                                    <>
                                                                        <div className="transfer_box" style={{ position: 'relative' }}>
                                                                            <QRCode className="dashqrbig" value={JSON.stringify({ id: item._id, time: 1, index: index })} />
                                                                            <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                            <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                            <p className="mb-0 mt-1" style={{ fontWeight: 600, color: '#000' }}>Scan status</p>
                                                                            <span class="mt-0 badge-theme-warning badge-theme mt-3 mb-3 d-block w-100"><FaClock /> Pending</span>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <img src={QRsuccess} className="qr-scanner-success dashqrbig" alt="" />
                                                                        <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                        <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                        <p className="mb-0 mt-1" style={{ fontWeight: 600, color: '#000' }}>Scan status</p>
                                                                        <span class="mt-0 badge-theme-success badge-theme mt-3 mb-3 d-block w-100"><FaCircleCheck /> Success</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                        {/* {checkedItemIds.length > 0 ? (
                                        <>
                                            <Col md={12}></Col>
                                            <Col md={3}>
                                                <button type="button" onClick={() => { setModal(!modal); setModalTT(!modalTT); setModalLoader(false) }} className="w-100 btn btn-success">Transfer</button>
                                            </Col>
                                        </>
                                    ) : ''} */}
                                    </Row>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Component;