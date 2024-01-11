import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Locationstart from '../../../common/icon/locationstart.svg';
import { app_url } from '../../../common/Helpers';
const Sidebar = () => {
    return (
        <>
            <Col md={8} className="pt-3 pb-3 only-pc">
                <ul className="website_top_menu float-right">
                    {/* <li className="nav-item">
                        <Link to={app_url + 'event'}>
                            <span>
                                Events <img src={Locationstart} />
                            </span>
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="button-join" to={app_url + 'aboutus'}>
                            <span>
                                About Us <img src={Locationstart} />
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="button-join" to={app_url + 'events'}>
                            <span>
                                Events
                            </span>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="button-join" to={app_url + 'terms-and-conditions'}>
                            <span>
                                Terms & conditions
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="button-join" to={app_url + 'privacy-policy'}>
                            <span>
                                Privacy policy
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="button-join" to={app_url + 'faq'}>
                            <span>
                                FAQ
                            </span>
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="button-join" to={app_url + 'contact'}>
                            <span>
                                Contact
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="button-border" to={app_url + 'auth/organizer/signup'}>
                            <span>
                                List your event
                            </span>
                        </Link>
                    </li>
                </ul>
            </Col>
        </>
    )
}
export default Sidebar;