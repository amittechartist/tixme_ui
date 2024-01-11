import React, { useState, useEffect } from "react";
import AppLogo from '../../../common/logo.svg';
import Whitestart from '../../../common/icon/whitestart.svg';
import BluestarBtn from '../../../component/Bluestarbtn';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BluestarIcon from '../../../common/icon/locationstart.svg';
import facebookicon from '../../../common/icon/social/facebookicon.svg';
import Instagramicon from '../../../common/icon/social/instagramicon.svg';
import Whatsappicon from '../../../common/icon/social/whatsappicon.svg';
import Youtubeicon from '../../../common/icon/social/youtubeicon.svg';
import whitestart from '../../../common/icon/whitestart.svg';
import EllipseIcon from '../../../common/icon/Ellipse 5.svg';
import SubscribeBg from '../../../common/icon/Subscribe.svg';
import CheckboxIcon from '../../../common/icon/checkbox.svg';
import LogoIcon from '../../../common/icon/logoicon.svg';
import Whitestarbtn from '../../../component/Whitestarbtn';
import Tada from "react-reveal/Tada";
import Lottie from "lottie-react";
import TicketCart from '../../../lotte/ticketcart.json';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { app_url } from '../../../common/Helpers';
const Footer = () => {
    const navigate = useNavigate();
    const lottewidth = {
        width: 'auto',
        height: '120px'
    }
    const [ShowCart, setShowCart] = useState(false);
    function checkCart() {
        const cartCheck = localStorage.getItem('cart');
        if (cartCheck) {
            const { items, quantities } = JSON.parse(cartCheck);
            if (items.length > 0) {
                setShowCart(true)
            } else {
                setShowCart(false)
            }
        } else {
            setShowCart(false)
        }
    }
    setInterval(checkCart, 1000);
    function viewcart() {
        navigate(app_url + 'cart-details');
    }
    return (
        <>
            {ShowCart ? (<Lottie className="cart-box-show" onClick={() => viewcart()} title="View Cart" animationData={TicketCart} style={lottewidth} />) : ''}
            <Container>
                <div className="subsacribe-box">
                    <Tada><img src={LogoIcon} className="LogoIcon-footer" alt="" /></Tada>
                    <img src={SubscribeBg} className="SubscribeBg" alt="" />
                    <Row className="subsacribe-content">
                        <Col md={12}>
                            <div className="subsscribe-box-style">
                                <span>
                                    <img src={EllipseIcon} alt="" />
                                </span>
                                <span className="Want-to-receive"><span> Stay in the Loop: Subscribe to TIXME<br />  for ExclusiveEvents, News, and Updates!</span></span>
                            </div>
                            <div className="ml-5">
                                <div className="mt-4 mb-4 subsscribe-form-input-area">
                                    <input className="footer-input" type="text" placeholder="Name" />
                                    <input className="footer-input" type="text" placeholder="Email ID" />
                                </div>
                                <div className="mb-4">
                                    <span><img className="mr-4" src={CheckboxIcon} alt="" />I agree with the <span className="theme-color">privacy statement</span></span>
                                </div>
                                <div className="subscribe-btn">
                                    <Link className="button-join" to={'/'}>
                                        <Whitestarbtn title={'Stay TIXED!'} />
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <footer className="footer-container">
                <div className="footer-head">
                    <Container fluid>
                        <Row className="mb-5">
                            <Col md={12} className="">
                                <ul className="website_top_menu website_top_menu-footer text-center ">
                                    <li className="nav-item">
                                    </li>
                                    <li className="nav-item">
                                        <Link className="button-join" to={'/'}>
                                            <Link to={app_url + 'auth/organizer/signup'}>
                                                <BluestarBtn title={'List Event'} />
                                            </Link>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className="button-join" to={'/'}>
                                            <span>
                                                <span className="bg-style-white btn-a"><img height={30} width={30} src={BluestarIcon} /></span>
                                                <span className="bg-style-white btn-b">Find Events</span>
                                                <span className="bg-style-white btn-c"><img height={30} width={30} src={BluestarIcon} /></span>
                                            </span>
                                        </Link>
                                    </li> */}
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid>
                        <Row className="footer-bottom-container">
                            <Col className="left-footer-logo-box" md={5}>
                                <div className="footer-left-box footer-box-style">
                                    <div className="mb-3"><img src={AppLogo} className="footer-logo" alt="" /></div>
                                    <div><p className="Welcome_to_text">Welcome to TIXME, where every ticket tells a story! Our<br />mission is to redefine events, making each occasion an<br />unforgettable and cherished memory.</p></div>
                                    <div className="footer-icon-container">
                                        <ul>
                                            <li className="d-inline-block">
                                                <img src={facebookicon} alt="" />
                                            </li>
                                            <li className="d-inline-block ml-3">
                                                <img src={Instagramicon} alt="" />
                                            </li>
                                            <li className="d-inline-block ml-3">
                                                <img src={Whatsappicon} alt="" />
                                            </li>
                                            <li className="d-inline-block ml-3">
                                                <img src={Youtubeicon} alt="" />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="footer-short-text">
                                        <p>© 2023 Tixme</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={7} className="right-footer-logo-box">
                                <Row className="footer-right-box  footer-box-style">
                                    <Col md={6}>
                                        <span className="footer-box-style-title">Connect With Us</span>
                                        <ul>
                                            {/* <li>Report This Event</li>
                                            <li>Help Center</li> */}
                                            <li><Link className="text-dark" to={app_url + 'contact'}>Contact us</Link></li>
                                            <li><Link className="text-dark" to={app_url + 'faq'}>Chat Support</Link></li>
                                            <li><Link className="text-dark" to={app_url + 'privacy-policy'}>Privacy</Link></li>
                                            <li><Link className="text-dark" to={app_url + 'faq'}>FAQ</Link></li>
                                            <li><Link className="text-dark" to={app_url + 'terms-and-conditions'}>Terms</Link></li>
                                            {/* <li>Accessibility</li>
                                            <li>Community Guidelines</li> */}
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>
        </>
    )
}
export default Footer;