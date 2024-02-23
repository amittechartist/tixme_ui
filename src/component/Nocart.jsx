import React from "react";
import NoResult from '../lotte/nocart.json';
import Lottie from "lottie-react";

const Component = ({ title }) => {
    const lottewidth = {
        width: 'auto',
        height: '320px'
    }
    return (
        <div className="no-result-div text-center">
            <Lottie className="no-result-img" animationData={NoResult} style={lottewidth} />
            <p>Your Cart Is Empty</p>
        </div>
    )
}
export default Component;