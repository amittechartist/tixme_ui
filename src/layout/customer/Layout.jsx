import React, { useEffect, useState } from "react";
import Header from './partial/Header';
import Sidebar from './partial/Sidebar';
import Footer from './partial/Footer';
import Logo from '../../common/logo.svg';
import { Link, useLocation } from "react-router-dom";
import { app_url } from "../../common/Helpers";
const Layout = ({ children, title  }) => {
    useEffect(() => {
        // Create the script element
        const script = document.createElement('script');
        script.src = '//js-na1.hs-scripts.com/45446390.js';
        script.async = true;
        script.defer = true;
        script.id = 'hs-script-loader';

        // Append the script to the document body
        document.body.appendChild(script);

        // Remove the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const [name, setname] = useState('');
    const location = useLocation(); 
    function d() {
        const mainWrapperView = document.getElementById('main-wrapper view');
        const xyx = document.getElementsByClassName('hamburger');
    
        // Check if the element is found
        if (mainWrapperView) {
            // Toggle the 'show' and 'menu-toggle' classes on mainWrapperView
            mainWrapperView.classList.toggle('show');
            mainWrapperView.classList.toggle('menu-toggle');
    
            // Loop through the collection and toggle the 'is-active' class on each element with the class 'hamburger'
            for (let i = 0; i < xyx.length; i++) {
                xyx[i].classList.toggle('is-active');
            }
        }
    }
    const isDashboard = location.pathname;
    useEffect(() => {
        if(isDashboard == '/tixme_ui/organizer/dashboard' || isDashboard == '/tixme_ui/customer/dashboard' || isDashboard == '/organizer/dashboard' || isDashboard == '/organizer/dashboard' && localStorage.getItem('organizername')){
            setname('Hi, ' + localStorage.getItem('username'));
        }else{
            setname("");
        }
    }, [isDashboard]);
    return (
        <>
            <div id="main-wrapper view">
                <div className="nav-header">
                    <Link className="brand-logo" to={app_url}>
                        <img src={Logo} className="admin-panel-logo" alt="Your Logo" />
                    </Link>
                    <div class="nav-control" onClick={() => d()}>
                        <div class="hamburger">
                            <span class="line"></span><span class="line"></span><span class="line"></span>
                        </div>
                    </div>
                </div>
                <Header title={name || title}  />
                <Sidebar />
                {children}
                <Footer />
            </div>
        </>
    )
}
export default Layout;