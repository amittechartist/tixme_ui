import React, { useEffect, useState } from "react";
import WhitestarBtn from '../../../component/Whitestarbtn';
import Btn from '../../../component/BlueStarwhite';
import UserImg from '../../../common/image/Ellipse 73.png';
import Nouserphoto from '../../../common/image/nouser.png';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronDown } from "react-icons/fi";
import { admin_url, apiurl, app_url, laravel_asset } from '../../../common/Helpers';
const Header = ({ title }) => {
    const navigate = useNavigate();

    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setCounter((prevCounter) => prevCounter + 1); // Increment the counter to trigger a re-render
        }, 3000); // 3000 milliseconds = 3 seconds
    
        return () => clearInterval(interval); // Clear the interval when the component unmounts
      }, []);

    function Logout() {
        localStorage.removeItem('adminauth');
    }
    const [Bannerimg, setBannerimg] = useState(null);
    useEffect(() => {
        fetchDetails();
    }, [counter]);
    const fetchDetails = async () => {
        try {
            fetch(apiurl + 'admin/get-admin-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setBannerimg(data.data.picture ? laravel_asset + data.data.picture : null);
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
        fetchDetails();
    }, []);
    return (
        <>
            <div className="header">
                <span className="user_type_btn user_type_btn_position">Admin</span>
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left d-flex align-items-end">
                                <div class="dashboard_bar" style={{ lineHeight: '15px' }}>
                                    {title}
                                </div>
                            </div>
                            <ul className="navbar-nav header-right" style={{ marginTop: '50px' }}>
                                <li className="nav-item dropdown notification_dropdown">
                                    <Link className="button-join" to={app_url}>
                                        <Btn title={'Home'} />
                                    </Link>
                                </li>
                                <li class="nav-item dropdown header-profile">
                                    <a class="nav-link new_user_menu_header" href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                                        <img src={Bannerimg ? Bannerimg : Nouserphoto} width="20" alt="" />
                                        <span className="user_name">Admin</span>
                                        <span className="user_drop_icon"><FiChevronDown /></span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <Link onClick={() => Logout()} to={app_url} class="dropdown-item ai-icon">
                                            <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" class="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                            <span class="ms-2">Logout </span>
                                        </Link  >
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default Header;