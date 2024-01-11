import React from "react";
import PersonIcon from '../common/icon/location-pin.png';
const Component = ({ title }) => {
    return (
        <div className="button-join">
            <span className="mob-sc-css-head-btn">
                <span className="bg-style btn-a whitestar-icon"><img height={30} width={30} src={PersonIcon} alt=""/></span>
                <span className="bg-style btn-b">{title}</span>
                <span className="bg-style btn-c whitestar-icon"><img height={30} width={30} src={PersonIcon} alt=""/></span>
            </span>
        </div>
    )
}
export default Component;