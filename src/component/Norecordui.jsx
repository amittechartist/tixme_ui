import React from "react";
import NoResult from '../lotte/noresult.json';
import Lottie from "lottie-react";

const Component = ({ title }) => {
    const lottewidth = {
        width: 'auto',
        height: '320px'
    }
    return (
        <div className="no-result-div text-center">
            <Lottie className="no-result-img" animationData={NoResult} style={lottewidth} />
            <p>No record found</p>
        </div>
    )
}
export default Component;