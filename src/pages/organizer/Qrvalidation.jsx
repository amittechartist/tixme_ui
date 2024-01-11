import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import QrcodeLotte from '../../lotte/qr-code-scaner-gif.json'
import Lottie from "lottie-react";
import FailedLotte from '../../lotte/faild.json';
import Whitebtn from '../../component/Whitestarbtn';
import toast from "react-hot-toast";
import SuccessLotte from '../../lotte/qrsuccess.json';
import { admin_url, app_url, apiurl, customer_url, organizer_url } from '../../common/Helpers';
import { Link, useNavigate } from 'react-router-dom';
const Dashboard = ({ title }) => {
    const id = localStorage.getItem('scandata');
    const [Apiloader, setApiloader] = useState(true);
    const [Failedloader, setFailedloader] = useState(false);
    const [Failed, setFailed] = useState(false);
    const [Failedmessage, setFailedmessage] = useState('');
    const organizerid = localStorage.getItem('organizerid');
    const navigate = useNavigate();
    const checkQR = async () => {
        try {
            if (!id || !organizerid) {
                // navigate(organizer_url + 'tixme-scanner');
                // return;
            }
            const requestData = {
                id: id,
                organizerid: organizerid
            }
            setApiloader(true)
            fetch(apiurl + 'order/qr-code-validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success(data.data);
                        setApiloader(false)
                    } else {
                        setFailedmessage(data.data)
                        setFailed(false)
                        setFailedloader(true)
                        setApiloader(false)
                    }
                    localStorage.removeItem('scandata');
                })
                .catch(error => {
                    setFailedloader(true)                    
                    setFailedmessage(error.data)
                    setFailed(false)
                    setApiloader(false)
                    console.error('error:', error);

                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    useEffect(() => {
        checkQR();
    }, []);
    const lottewidth = {
        width: 'auto',
        height: '400px'
    }
    const Successlottewidth = {
        width: 'auto',
        height: '200px'
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

                    {Apiloader ? (
                        <Row className="justify-content-center">
                            <Col md={12}>
                                <div className="mt-5 mb-3 l-background w-100" style={{ height: '150px' }}> </div>
                            </Col>
                        </Row>
                    ) : (
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <Card>
                                    <Card.Body className="text-center">
                                        {Failedloader ? (
                                            <div>
                                                <p className="text-warning payment-page-title">{Failedmessage}</p>
                                                <Lottie className="py-3" animationData={FailedLotte} style={lottewidth} />
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-success payment-page-title">Scanned successful</p>
                                                <Lottie animationData={SuccessLotte} style={Successlottewidth} />
                                            </div>
                                        )}
                                        <div className='text-center'>
                                            <Link to={organizer_url + 'tixme-scanner-page'}>
                                                <Whitebtn title={'Scan again'} />
                                            </Link>
                                            <Link to={organizer_url + 'tixme-scanner'}>
                                                <Whitebtn title={'Back'} />
                                            </Link>
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