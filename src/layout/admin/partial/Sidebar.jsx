import React, { useEffect, useState } from "react";
import DashboardIcon from '../../../common/icon/dashboardicon.svg';
import EventIcon from '../../../common/icon/event 1.svg';
import ticketIcon from '../../../common/icon/ticket 1.svg';
import walletIcon from '../../../common/icon/wallet 1.svg';
import scannerIcon from '../../../common/icon/scanner 1.svg';
import MenuIcon from '../../../common/icon/Menu sidebar.svg';
import peopleIcon from '../../../common/icon/people 1.svg';
import supportIcon from '../../../common/icon/support.svg';
import { Link, useNavigate } from 'react-router-dom';
import { admin_url, app_url, apiurl } from '../../../common/Helpers';

import { FaUsers } from "react-icons/fa6";

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
    return (
        <>
            <div className="deznav">
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        <li onClick={() => d()}><Link to={admin_url + 'dashboard'} className="ai-icon" aria-expanded="false">
                            <img src={DashboardIcon} alt="Your Logo" />
                            <span className="nav-text">Dashboard</span>
                        </Link>
                        </li>
                        <li onClick={() => { d(); setCustomerDropdown(!CustomerDropdown) }}>
                            <a href="javascript:void(0);" class="has-arrow ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span class="nav-text">Customers</span>
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
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'all-category'} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Category</span>
                            </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'all-event-type'} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Event Type</span>
                            </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'active-organizer'} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Active Organizer</span>
                            </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'pending-organizer'} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Pending Organizer</span>
                            </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'all-events-list'} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">All Event</span>
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
                                <img src={DashboardIcon} alt="Your Logo" />
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
                                <img src={DashboardIcon} alt="Your Logo" />
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
                                <img src={EventIcon} alt="Your Logo" />
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
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Newsletter</span>
                            </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={admin_url + 'contact-us'} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Contact us</span>
                            </Link>
                        </li >
                        <li onClick={() => d()}>
                            <a onClick={() => Logout()} className="ai-icon" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
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