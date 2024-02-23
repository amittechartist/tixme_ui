import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FailedLotte from '../../lotte/pay-falil.json';
import BannerComponent from '../../component/BannerTop';
import Whitebtn from '../../component/Whitestarbtn';
import SuccessLoaderLotte from '../../lotte/success-loader.json';
import PendingLotte from '../../lotte/pay-pending.json';
import SuccessLotte from '../../lotte/pay-success.json';
import Lottie from "lottie-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { admin_url, app_url, apiurl, customer_url } from '../../common/Helpers';
const Page = ({ title }) => {
    const navigate = useNavigate();
    const lottewidth = {
        width: 'auto',
        height: '200px'
    }
    const Successlottewidth = {
        width: 'auto',
        height: '200px'

    }
    return (
        <>
            <Container>
                <Row>
                    <Col md={2}></Col>
                    <Col md={8} className="my-5">
                        <div className="success-page-box">
                            <Card >
                                <Card.Body>
                                    <Row>
                                        <>
                                            <Col md={12} className="d-felx justify-content-center text-center">
                                                <p className="text-warning payment-page-title">Payment Failed !</p>
                                                <Lottie className="py-3" animationData={PendingLotte} style={lottewidth} />
                                            </Col>
                                            <Col md={12} className="mt-4">
                                                <div className="row">
                                                    <div className="col-md-12 text-center">
                                                        <p className="mb-0">Your transaction has failed.</p>
                                                        <p className="mb-0">Please try again or contact support if the problem persists.</p>
                                                        <p>If you have any questions, please don't hesitate to contact us at <span style={{ color: '#0047ab' }}>support@TIXME.com</span>.</p>
                                                    </div>
                                                    <Col md={12} className="mt-4 text-center">
                                                        <Link to={app_url} className="btn theme-bg text-white">Home</Link>
                                                    </Col>
                                                </div>

                                            </Col>
                                        </>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Page;