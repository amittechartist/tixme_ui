import React from 'react';
import DashboardIcon from '../../../common/icon/dashboardicon.svg';
import EventIcon from '../../../common/icon/event 1.svg';
import ticketIcon from '../../../common/icon/ticket 1.svg';
import walletIcon from '../../../common/icon/wallet 1.svg';
import scannerIcon from '../../../common/icon/scanner 1.svg';
import MenuIcon from '../../../common/icon/Menu sidebar.svg';
import peopleIcon from '../../../common/icon/people 1.svg';
import supportIcon from '../../../common/icon/support.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { FaHeadset } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaAward } from 'react-icons/fa';
import { organizer_url, app_url, customer_url } from '../../../common/Helpers';
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
    const navigate = useNavigate();
    function Logout() {
        localStorage.removeItem('userauth');
        localStorage.removeItem('user_role');
        localStorage.removeItem('username');
        navigate(app_url);
    }
    return (
        <>
            <div className="deznav">
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        <li onClick={() => d()}><Link to={customer_url + 'dashboard'} className="ai-icon" aria-expanded="false">
                            <span className='sidebar-icon'><FaHome /></span>
                            <span className="nav-text">Dashboard</span>
                        </Link>
                        </li>
                        <li onClick={() => d()}><Link to={customer_url + 'my-order-list'} className="ai-icon" aria-expanded="false">
                            <span className='sidebar-icon'><FaTicketAlt /></span>
                            <span className="nav-text">My tickets</span>
                        </Link>
                        </li>
                        <li onClick={() => d()}><Link to={customer_url + 'my-rewards'} className="ai-icon" aria-expanded="false">
                            <span className='sidebar-icon'><FaAward /></span>
                            <span className="nav-text">My Rewards</span>
                        </Link>
                        </li>
                        <li onClick={() => d()}><Link to={customer_url + 'following'} className="ai-icon" aria-expanded="false">
                            <span className='sidebar-icon'><FaUserFriends /></span>
                            <span className="nav-text">My Following</span>
                        </Link>
                        </li>
                        <li onClick={() => d()}><Link to={customer_url + 'savedevents'} className="ai-icon" aria-expanded="false">
                            <span className='sidebar-icon'><FaBookmark /></span>
                            <span className="nav-text">Saved Events</span>
                        </Link>
                        </li>
                        <li onClick={() => d()}><Link to={customer_url + 'support-tickets'} className="ai-icon" aria-expanded="false">
                            <span className='sidebar-icon'><FaHeadset /></span>
                            <span className="nav-text">Support</span>
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Sidebar;