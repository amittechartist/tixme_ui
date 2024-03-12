import React, { useEffect, useState } from "react";
import DashboardIcon from '../../../common/icon/dashboardicon.svg';
import EventIcon from '../../../common/icon/event 1.svg';
import { FiMail } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { admin_url, app_url, apiurl } from '../../../common/Helpers';
import { FaHeadset } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa6";
import { MdEvent } from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa';

import { FaHome, FaListAlt, FaUserClock, FaCalendarAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import { FiFlag } from "react-icons/fi";
import { MdAddCircleOutline, MdCardMembership, MdMailOutline, MdContactMail, MdExitToApp } from 'react-icons/md';
const Sidebar = () => {
    const [Listitems, setListitems] = useState([]);
    const [Countrylist, setCountrylist] = useState([]);
    const [CustomerDropdown, setCustomerDropdown] = useState(false);
    const fetchList = async () => {
        try {

            fetch(apiurl + 'admin/package-plan-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                    }

                })
                .catch(error => {
                    console.error('Insert error:', error);

                });
        } catch (error) {
            console.error('Api error:', error);

        }

    }
    const fetchCountrylist = async () => {
        try {

            fetch(apiurl + 'admin/country-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setCountrylist(data.data);
                    }

                })
                .catch(error => {
                    console.error('Insert error:', error);

                });
        } catch (error) {
            console.error('Api error:', error);

        }

    }
    useEffect(() => {
        fetchList();
        fetchCountrylist()
    }, []);
    const navigate = useNavigate();
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
    function Logout() {
        localStorage.removeItem('adminauth');
        navigate(app_url);
    }
    const [openDropdown, setOpenDropdown] = useState(null);
    const handleDropdown = (dropdownId) => {
        if (openDropdown === dropdownId) {
            // If the clicked dropdown is already open, close it
            setOpenDropdown(null);
        } else {
            // Open the clicked dropdown
            setOpenDropdown(dropdownId);
        }
    };
    const HandelCountry = (name) => {
        localStorage.setItem('fcountry', name);
    }
    return (
        <>
            <div className="deznav">
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        <li onClick={() => d()}><Link to={admin_url + 'dashboard'} className="ai-icon" aria-expanded="false">
                            <span className='sidebar-icon'><FaHome /></span>
                            <span className="nav-text">Dashboard</span>
                        </Link>
                        </li>
                        {Countrylist && Countrylist.map((item, index) => (
                            <li onClick={() => { d(); handleDropdown("country-" + index); }} key={index}>
                                <Link to={admin_url + 'countrydashboard/' + item.name} class="ai-icon" aria-expanded="false">
                                    <span className='sidebar-icon'><FaHome /></span>
                                    <span class="nav-text text-capitalize">{item.name}</span>
                                </Link>
                                {openDropdown === "country-" + index && (
                                    <ul aria-expanded="false">
                                        <li>
                                            <Link className='text-black text-capitalize' >Ticket Managment</Link>
                                        </li>
                                        <li>
                                            <Link className='text-black text-capitalize'>Events Managment</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ))}
                        <li onClick={() => { d(); setCustomerDropdown(!CustomerDropdown) }}>
                            <a href="javascript:void(0);" class="has-arrow ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><FaUsers /></span>
                                <span class="nav-text">User Managment</span>
                            </a>
                            {CustomerDropdown && (
                                <ul aria-expanded="false">
                                    {Listitems.map((item, index) => (
                                        <li onClick={() => setCustomerDropdown(!CustomerDropdown)}>
                                            <Link className='text-black' to={`${admin_url}customers/${item._id}/${item.name}`}>{item.name}</Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link className='text-black' to={admin_url + 'all-customers'}>No Membership</Link></li>
                                </ul>
                            )}
                        </li>
                        <li onClick={() => { d(); handleDropdown("organizer-menu"); }}>
                            <Link class="has-arrow ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><FaUserClock /></span>
                                <span class="nav-text text-capitalize">Organizers</span>
                            </Link>
                            {openDropdown === "organizer-menu" && (
                                <ul aria-expanded="false">
                                    <li>
                                        <Link to={admin_url + 'active-organizer'} className='text-black text-capitalize' >Active Organizer</Link>
                                    </li>
                                    <li>
                                        <Link to={admin_url + 'pending-organizer'} className='text-black text-capitalize'>Pending Organizer</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'all-category'} className="ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><FaListAlt /></span>
                                <span className="nav-text">Category</span>
                            </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'all-event-type'} className="ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><MdEvent /></span>
                                <span className="nav-text">Event Type</span>
                            </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'all-events-list'} className="ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><FaCalendarAlt /></span>
                                <span className="nav-text">All Event</span>
                            </Link>
                        </li>
                        <li><Link to={admin_url + 'mailing'} className="ai-icon" aria-expanded="false">
                            {/* <img src={<FiMail />} alt="Your Logo" /> */}
                            <span className='sidebar-icon'><FiMail /></span>
                            <span className="nav-text">Mailing</span>
                        </Link>
                        </li>
                        {/* <li onClick={() => d()}>
                            <Link to={admin_url + 'support-tickets'} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Support</span>
                            </Link>
                        </li > */}
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'addcoupon'} className="ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><MdAddCircleOutline /></span>
                                <span className="nav-text">Add Coupon</span>
                            </Link>
                        </li>
                        {/* <li onClick={() => d()}>
                            <Link to={admin_url + 'taxadd'} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Add Tax</span>
                            </Link>
                        </li> */}
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'membership'} className="ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><MdCardMembership /></span>
                                <span className="nav-text">Membership</span>
                            </Link>
                        </li>
                        {/* <li onClick={() => d()}>
                            <Link to={admin_url + 'payout-request'} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Payout request</span>
                            </Link>
                        </li > */}
                        <li onClick={() => d()} className="d-none">
                            <a href="javascript:void(0);" class="has-arrow ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><FaMoneyCheckAlt /></span>
                                <span class="nav-text">Payout request</span>
                            </a>
                            <ul aria-expanded="false">
                                {Countrylist.map((item, index) => (
                                    <li>
                                        <Link className='text-black' to={`${admin_url}payout-request/${item._id}/${item.name}`}>{item.name}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'newsletter'} className="ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><MdMailOutline /></span>
                                <span className="nav-text">Newsletter</span>
                            </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'contact-us'} className="ai-icon" aria-expanded="false">
                                <span className='sidebar-icon'><MdContactMail /></span>
                                <span className="nav-text">Contact Us</span>
                            </Link>
                        </li >
                        <li onClick={() => d()}>
                            <a onClick={() => Logout()} className="ai-icon cursor-pointer" aria-expanded="false">
                                <span className='sidebar-icon'><MdExitToApp /></span>
                                <span className="nav-text">Logout</span>
                            </a>
                        </li >
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Sidebar;