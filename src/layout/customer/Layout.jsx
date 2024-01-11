import React from "react";
import Header from './partial/Header';
import Sidebar from './partial/Sidebar';
import Footer from './partial/Footer';
import Logo from '../../common/logo.svg';
import { Link } from "react-router-dom";
const Layout = ({ children, title  }) => {
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
    return (
        <>
            <div id="main-wrapper view">
                <div className="nav-header">
                    <Link className="brand-logo">
                        <img src={Logo} className="admin-panel-logo" alt="Your Logo" />
                    </Link>
                    <div class="nav-control" onClick={() => d()}>
                        <div class="hamburger">
                            <span class="line"></span><span class="line"></span><span class="line"></span>
                        </div>
                    </div>
                </div>
                <Header title={title}  />
                <Sidebar />
                {children}
                <Footer />
            </div>
        </>
    )
}
export default Layout;