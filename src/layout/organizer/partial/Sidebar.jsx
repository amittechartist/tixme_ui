import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail } from "react-icons/fi";
import { FaBarcode } from 'react-icons/fa';
import { organizer_url, app_url } from '../../../common/Helpers';
import { FaHeadset } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
const Sidebar = () => {
    function d() {
        const mainWrapperView = document.getElementById('main-wrapper view');
        const xyx = document.getElementsByClassName('hamburger');
        if (mainWrapperView) {
            mainWrapperView.classList.remove('show', 'menu-toggle');
            for (let i = 0; i < xyx.length; i++) {
                xyx[i].classList.remove('is-active');
            }
        }
    }
    return (
        <>
            <div className="deznav">
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        <li onClick={() => d()}><Link to={organizer_url + 'dashboard'} className="ai-icon" aria-expanded="false">
                        <span className='sidebar-icon'><FaHome /></span>
                            <span className="nav-text">Dashboard</span>
                        </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={organizer_url + 'event/all-event-list'} className="ai-icon" aria-expanded="false">
                            <span className='sidebar-icon'><FaTicketAlt /></span>
                                <span className="nav-text">Event Management</span>
                            </Link>
                        </li>
                        {/* <li onClick={() => d()}>
                            <Link to={organizer_url + 'tickets-list'} className="ai-icon" aria-expanded="false">
                                <img src={ticketIcon} alt="Your Logo" />
                                <span className="nav-text">Tickets list</span>
                            </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={organizer_url + 'ticket-sold-list'} className="ai-icon" aria-expanded="false">
                                <img src={ticketIcon} alt="Your Logo" />
                                <span className="nav-text">Attendees list</span>
                            </Link>
                        </li> */}
                        {/* <li><Link href="reports.html" className="ai-icon" aria-expanded="false">
                            <img src={ticketIcon} alt="Your Logo" />
                            <span className="nav-text">Event Bookings</span>
                        </Link>
                        </li> */}
                        {/* <li><Link href="reports.html" className="ai-icon" aria-expanded="false">
                            <img src={walletIcon} alt="Your Logo" />
                            <span className="nav-text">Finance</span>
                        </Link>
                        </li> */}
                        <li onClick={() => d()}><Link to={organizer_url + 'tixme-scanner'} className="ai-icon" aria-expanded="false">
                            <span className='sidebar-icon'><FaBarcode /></span>
                            <span className="nav-text">Tixme Scanner</span>
                        </Link>
                        </li>
                        {/* <li><Link href="reports.html" className="ai-icon" aria-expanded="false">
                            <img src={MenuIcon} alt="Your Logo" />
                            <span className="nav-text">Marketing</span>
                        </Link>
                        </li> */}
                        {/* <li><Link href="reports.html" className="ai-icon" aria-expanded="false">
                            <img src={peopleIcon} alt="Your Logo" />
                            <span className="nav-text">Manage Attendees</span>
                        </Link>
                        </li> */}
                        <li><Link to={organizer_url+ 'mailing'} className="ai-icon" aria-expanded="false">
                            {/* <img src={<FiMail />} alt="Your Logo" /> */}
                            <span className='sidebar-icon'><FiMail /></span>
                            <span className="nav-text">Mailing</span>
                        </Link>
                        </li>
                        <li><Link to={organizer_url+ 'support-tickets'} className="ai-icon" aria-expanded="false">
                        <span className='sidebar-icon'><FaHeadset /></span>
                            <span className="nav-text">Support</span>
                        </Link>
                        </li>
                        {/* <li><Link to={organizer_url+ 'payout-request'} className="ai-icon" aria-expanded="false">
                            <img src={supportIcon} alt="Your Logo" />
                            <span className="nav-text">Payout Request</span>
                        </Link>
                        </li> */}
                        {/* <li onClick={() => d()}><Link to={organizer_url+ 'my-profile'} className="ai-icon" aria-expanded="false">
                            <img src={supportIcon} alt="Your Logo" />
                            <span className="nav-text">Profile Managment</span>
                        </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Sidebar;