import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import SeatmapComponent from '../../../component/event/SeatmapComponent';
const Type = ({ title }) => {
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <SeatmapComponent/>
                </div>
            </div>

        </>
    )
}
export default Type;