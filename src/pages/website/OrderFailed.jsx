import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import BannerComponent from '../../component/BannerTop';
import Whitebtn from '../../component/Whitestarbtn';
import SuccessLoaderLotte from '../../lotte/success-loader.json';
import PendingLotte from '../../lotte/pay-pending.json';
import FailedLotte from '../../lotte/pay-falil.json';
import SuccessLotte from '../../lotte/pay-success.json';
import Lottie from "lottie-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { admin_url, app_url, customer_url, apiurl } from '../../common/Helpers';
const Page = ({ title }) => {
    const navigate = useNavigate();
    const lottewidth = {
        width: 'auto',
        height: '400px'
    }
    return (
        <>
            <Container>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6} className="my-5">
                        <div className="success-page-box">
                            <Card >
                                <Card.Body>
                                    <Row className="text-center">
                                        <Col md={12} className="">
                                            <Lottie className="py-3" animationData={FailedLotte} style={lottewidth} />
                                        </Col>
                                        <Col md={12} className="mt-4">
                                            <Link to={customer_url + 'my-order-list'}>
                                                <Whitebtn title={'View Order'} />
                                            </Link>
                                            <Link to={app_url}>
                                                <Whitebtn title={'Home'} />
                                            </Link>
                                        </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container >
        </>
    )
}
export default Page;