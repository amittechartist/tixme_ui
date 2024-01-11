import React, { useState } from "react";
import Whitestar from "../common/icon/whitestart.svg";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MdMyLocation } from "react-icons/md";

const Component = ({ title }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState(false);

  const showLocation = (e) => {
    setShow(true);
    e.preventDefault();
  };

  const getLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          const url = `https://www.google.com/maps/@?api=1&map_action=map=${latitude},${longitude}`;
          window.open(url, "_blank");
        },
        () => {
          alert(
            "Could not get your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    setLocation(true);
  };
  return (
    <>
      <div className="button-join">
        <span className="mob-sc-css-head-btn">
          <span className="bg-style btn-a whitestar-icon">
            <img height={30} width={30} src={Whitestar} />
          </span>
          <span className="bg-style btn-b" onClick={showLocation}>
            {title}
          </span>
          <span className="bg-style btn-c whitestar-icon">
            <img height={30} width={30} src={Whitestar} />
          </span>
          {show && (
            <>
              <p className="" onClick={getLocation}>
                <MdMyLocation />
                My Current Location
              </p>
              {location && (
                <div style={{ height: "400px", width: "100%" }}>
                  <LoadScript googleMapsApiKey="AIzaSyDhWeUv_PRpblvaIoascl69mpTFEE7F2kc">
                    <GoogleMap
                      mapContainerStyle={{ height: "100%", width: "100%" }}
                      center={currentLocation}
                      zoom={15}
                    >
                      {currentLocation && <Marker position={currentLocation} />}
                    </GoogleMap>
                  </LoadScript>
                </div>
              )}
            </>
          )}
        </span>
      </div>
    </>
  );
};
export default Component;