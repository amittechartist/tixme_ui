import React, { useEffect, useState } from "react";
import Btn from '../../../component/BlueStarwhite';
import UserImg from '../../../common/image/Ellipse 73.png';
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { organizer_url, app_url, apiurl } from '../../../common/Helpers';
import Nouserphoto from '../../../common/image/nouser.png';
import toast from "react-hot-toast";
const Header = ({ title }) => {
    const [Username, setUsername] = useState();
    const [picture, setpicture] = useState();
    function Logout() {
        localStorage.removeItem('organizerauth');
        localStorage.removeItem('organizerid');
        localStorage.removeItem('organizername');
        localStorage.removeItem('organizer_role');
        toast.success('Logout successfully');
    }
    const GetOrganizer = async () => {
        try {
            const requestData = {
                id: localStorage.getItem('organizerid')
            };
            fetch(apiurl + 'auth/organizer/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setUsername(data.data.name);
                        setpicture(data.data.profile_picture);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('organizerid')) {
            GetOrganizer();
        }
    }, []);
    return (
        <>
            <div className="header">
                <span className="user_type_btn user_type_btn_position">Organizer</span>
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <div class="dashboard_bar mt-4">
                                    {title}
                                </div>
                            </div>
                            <ul className="navbar-nav header-right" style={{ marginTop: '50px' }}>
                                <li className="nav-item dropdown notification_dropdown dash-header-btns">
                                    <Link className="button-join" to={app_url}>
                                        <Btn title={'Home'} />
                                    </Link>
                                </li>
                                <li class="nav-item dropdown header-profile">
                                    <a class="nav-link new_user_menu_header" href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                                        <img src={picture ? picture : Nouserphoto} width="20" alt="" />
                                        <span className="user_name">{Username ? Username : 'Your Name'}</span>
                                        <span className="user_drop_icon"><FiChevronDown /></span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <Link to={organizer_url + 'my-profile'} class="dropdown-item ai-icon">
                                            <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" class="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            <span class="ms-2">Profile </span>
                                        </Link>
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