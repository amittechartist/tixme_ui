import React from "react";
import PersonIcon from '../common/icon/person 1.svg';
const Component = ({ title }) => {
    return (
        <div className="button-join">
            <span className="mob-sc-css-head-btn">
                <span className="bg-style btn-a whitestar-icon"><img height={30} width={30} src={PersonIcon} /></span>
                <span className="bg-style btn-b">{title}</span>
                <span className="bg-style btn-c whitestar-icon"><img height={30} width={30} src={PersonIcon} /></span>
            </span>
        </div>
    )
}
export default Component;