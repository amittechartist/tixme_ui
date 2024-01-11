import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import QrcodeLotte from '../../lotte/qr-code-scaner-gif.json'
import Lottie from "lottie-react";
import Whitebtn from '../../component/Whitestarbtn';
import { admin_url, app_url, apiurl, customer_url, organizer_url } from '../../common/Helpers';
import { Link, useNavigate } from 'react-router-dom';
const Dashboard = ({ title }) => {
    const [openQrcode, setopenQrcode] = useState(false);
    const [scanLocation, setScanLocation] = useState('');
    const intervalRef = useRef(null); // Ref to hold the interval
    const navigate = useNavigate();
    const openscanner = () => {
        // setopenQrcode(true)
        navigate(organizer_url + 'tixme-scanner-page')
    }
    const lottewidth = {
        width: 'auto',
        height: '400px'
    }
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>

                    {openQrcode ? (
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <div>{scanLocation}</div>
                                <Card>
                                    <Card.Body className="text-center">
                                        <section>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-12 col-md-10 offset-md-1">
                                                        <h3 className="text-start text-md-center"></h3>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="camera-off">
                                                            <p id="message-denied">
                                                                Please allow camera access to scan QR codes.
                                                            </p>
                                                            <p id="message-off" style={{ display: 'none' }}>
                                                                Could not find a usable camera on this device to scan QR codes.
                                                                Prefer using this site on your mobile phone.
                                                            </p>
                                                        </div>
                                                        <div className="camera-on" style={{ display: 'none' }}>
                                                            <div id="camera-preview"></div>
                                                            <div className='py-2'>

                                                            </div>
                                                        </div>
                                                        <div className="camera-result">
                                                            <h2>Scan Result</h2>
                                                            <p className="text-center" id="camera-result"></p>

                                                        </div>
                                                    </div>
                                                    <div className='col-12'>
                                                        <div className="btn-toolbar" onClick={() => setopenQrcode(false)}>
                                                            <button className="btn btn-primary mx-auto" id="redo-scan">Back</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>

                                                </div>
                                            </div>
                                        </section>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <Card>

                                    <Card.Body className="text-center">
                                        <div>
                                            <h2 className="">{title}</h2>
                                            <Lottie className="py-2" animationData={QrcodeLotte} style={lottewidth} />
                                            <span className="ml-5" onClick={() => openscanner()}>
                                                <Whitebtn title={'Scan QR'} />
                                            </span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>

        </>
    )
}
export default Dashboard;