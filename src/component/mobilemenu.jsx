import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom/dist';
import { app_url } from '../common/Helpers';
import AppLogo from '../common/logo.svg';

const Example = () => {
  const [show, setshow] = useState(false);

  return (
    <Menu isOpen={show} className='only-mobile'>
      <Link onClick={() => setshow(false)} to={app_url}><img className="header-logo-in-sidebar" src={AppLogo} alt="App Logo" /></Link>
      <Link onClick={() => setshow(false)} to={app_url + 'events'} className="menu-item">Events</Link>
      <Link onClick={() => setshow(false)} to={app_url + 'auth/organizer/login'} className="menu-item">List your event</Link>
      <Link onClick={() => setshow(false)} to={app_url + 'aboutus'} className="menu-item">About Us</Link>
      <Link onClick={() => setshow(false)} to={app_url + 'terms-and-conditions'} className="menu-item">Terms & conditions</Link>
      <Link onClick={() => setshow(false)} to={app_url + 'privacy-policy'} className="menu-item">Privacy policy</Link>
      <Link onClick={() => setshow(false)} to={app_url + 'faq'} className="menu-item">FAQ</Link>
      <Link onClick={() => setshow(false)} to={app_url + 'contact'} className="menu-item">Contact</Link>
      {/* <a onClick={showSettings} className="menu-item--small" style={{ color: '#000' }} href="">Settings</a> */}
    </Menu>
  );
};

export default Example;
