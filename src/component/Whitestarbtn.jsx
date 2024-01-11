import React from "react";
import Whitestar from '../common/icon/whitestart.svg';
const Component = ({ title }) => {
    return (
        <div className="button-join">
            <span className="mob-sc-css-head-btn">
                <span className="bg-style btn-a whitestar-icon"><img height={30} width={30} src={Whitestar} /></span>
                <span className="bg-style btn-b">{title}</span>
                <span className="bg-style btn-c whitestar-icon"><img height={30} width={30} src={Whitestar} /></span>
            </span>
        </div>
    )
}
export default Component;