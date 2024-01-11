import React, { useState, useEffect, useRef } from 'react';
import { app_url } from '../../common/Helpers';
import {useNavigate } from 'react-router-dom';
const QRCodeScanner = () => {
  const intervalRef = useRef(null); // Ref to hold the interval
  const navigate = useNavigate();
  useEffect(() => {
    reloadOneTime();
    intervalRef.current = setInterval(checkForResult, 1000); // Run checkForResult every second

    return () => clearInterval(intervalRef.current); // Clean up interval on component unmount
  }, []);

  const reloadOneTime = () => {
    if (!window.location.hash) {
      window.location = window.location + '##';
      window.location.reload();
    }
  };

  const checkForResult = () => {
    const resultElement = document.getElementById('camera-result');
    if (resultElement && resultElement.textContent.trim() !== '') {
      let maintext =  resultElement.textContent.trim();
      localStorage.setItem('scanlocation', maintext)
      navigate(app_url + 'homepage');
      clearInterval(intervalRef.current); // Stop the interval
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1">
            <h3 className="text-start text-md-center"></h3>
          </div>
          <div className="col-12">
            <div className="camera-off">
              <p id="message-denied">
                Please allow camera access to scan QR codes.
              </p>
              <p id="message-off" style={{ display: 'none' }}>
                Could not find a usable camera on this device to scan QR codes.
                Prefer using this site on your mobile phone.
              </p>
            </div>
            <div className="camera-on" style={{ display: 'none' }}>
              <div id="camera-preview"></div>
            </div>
            <div className="camera-result">
              <h2>Scan Result</h2>
              <p className="text-center" id="camera-result"></p>
              <div className="btn-toolbar">
                <button className="btn btn-primary mx-auto" id="redo-scan">New scan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRCodeScanner;
