import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
    const payment_id = localStorage.getItem('paymentid_token');
    const CustomerName = localStorage.getItem('username');
    const [ApiLoader, setApiLoader] = useState(true);
    const [pendingLoader, setpendingLoader] = useState(false);
    const [name, setname] = useState();
    const [tnsid, settnsid] = useState();
    const [email, setemail] = useState();
    const [amount, setamount] = useState();
    const [date, setdate] = useState();
    const [time, settime] = useState();
    const lottewidth = {
        width: 'auto',
        height: '200px'
    }
    const Successlottewidth = {
        width: 'auto',
        height: '200px'

    }
    const checkMembership = async (id) => {
        try {
            const requestData = {
                customerId: id,
            }
            fetch(apiurl + 'order/membership-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {

                    } else {

                    }
                })
                .catch(error => {
                    console.error('error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const checkPayment = async () => {
        try {
            if (!payment_id) {
                toast.error("Payment id not found");
                navigate(app_url);
                return;
            }
            const requestData = {
                paymentid: payment_id,
            }
            fetch(apiurl + 'order/stripe/success-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setname(data.data.name);
                        settnsid(data.data.tnsid);
                        setemail(data.data.email);
                        setamount(data.data.amount);
                        setdate(data.data.date);
                        settime(data.data.time);
                        checkMembership(data.data.userid);
                        HandeSendMail(data.data.main_orderid);
                        setApiLoader(false);
                    } else {
                        toast.error(data.data)
                        setpendingLoader(true)
                    }
                    localStorage.removeItem('cart');
                    localStorage.removeItem('selectedSeats');
                    localStorage.removeItem('paymentid_token')
                })
                .catch(error => {
                    console.error('error:', error);

                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const HandeSendMail = async (id) => {
        try {
            const requestData = {
                id: id,
            }
            fetch(apiurl + 'order/order-confirmation-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {

                    }
                })
                .catch(error => {
                    console.error('error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }

    useEffect(() => {
        checkPayment();
    }, []);
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
                                        {pendingLoader ? (
                                            <>
                                                <Col md={12} className="text-center">
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
                                        ) : (
                                            <>
                                                {ApiLoader ? (
                                                    <Col md={12} className="text-center">
                                                        <p className="text-success payment-page-title">Payment checking</p>
                                                        <Lottie className="py-3" animationData={SuccessLoaderLotte} style={lottewidth} />
                                                        <div className="mt-5 mb-3 l-background w-100" style={{ height: '150px' }}> </div>
                                                    </Col>
                                                ) : (
                                                    <Col md={12} className="text-center">
                                                        <p className="text-success payment-page-title">Congratulation !</p>
                                                        <Lottie animationData={SuccessLotte} style={Successlottewidth} />
                                                        <div className="order-data d-none">
                                                            <Row className="mx-2">
                                                                <Col md={4}><p className="data-title text-start">Payment type</p></Col>
                                                                <Col md={8}><p className="data-value text-end">Online</p></Col>

                                                                <Col md={4}><p className="data-title text-start">Name</p></Col>
                                                                <Col md={8}><p className="data-value text-end">{name}</p></Col>

                                                                <Col md={4}><p className="data-title text-start">Email</p></Col>
                                                                <Col md={8}><p className="data-value text-end">{email}</p></Col>

                                                                <Col className="mb-3" md={6}><p className="data-title amount-desc text-start">Amount paid</p></Col>
                                                                <Col className="mb-3" md={6}><p className="data-value amount-desc text-end">{amount}.00</p></Col>

                                                                <Col md={4}><p className="data-title text-start">Transaction Id</p></Col>
                                                                <Col md={8}><p className="data-value text-end">{tnsid}</p></Col>

                                                                <Col md={4}><p className="data-title text-start">Date</p></Col>
                                                                <Col md={8}><p className="data-value text-end">{date} {time}</p></Col>

                                                            </Row>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12 text-center">
                                                                <p className="mb-0">Your transaction was successful.</p>
                                                                <p className="mb-0">We have sent you a confirmation to <span style={{ color: '#0047ab' }}>{email}</span>.</p>
                                                                <p>If you could not find an email from <span style={{ color: '#0047ab' }}>TIXME</span>, check your spam or junk email folder.</p>
                                                            </div>
                                                            <Col md={12} className="mt-4">
                                                                {CustomerName && (
                                                                    <span>
                                                                        <Link to={customer_url + 'my-order-list'} className="btn text-white theme-bg m-2">
                                                                            View Order
                                                                        </Link>
                                                                    </span>
                                                                )}
                                                                <span>
                                                                    <Link to={app_url} className="btn text-white theme-bg m-2">
                                                                        Home
                                                                    </Link>
                                                                </span>
                                                            </Col>
                                                        </div>
                                                    </Col>
                                                )}
                                            </>
                                        )}
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