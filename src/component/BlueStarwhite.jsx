import React from "react";
import Whitestar from '../common/icon/bluestarsvg.png';
const Component = ({ title }) => {
    return (
        <div className="button-join button-join-white">
            <span className="mob-sc-css-head-btn whiteblueicon_box">
                <span className="whiteblueicontitle">{title}</span>
                <span className="whiteblueicon whitestar-icon"><img height={30} width={30} src={Whitestar} /></span>
            </span>
        </div>
    )
}
export default Component;