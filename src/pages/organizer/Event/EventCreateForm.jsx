import React, { useEffect, useState } from "react";
import EventForm from '../../../component/event/eventform';
const Type = ({ title }) => {
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <EventForm/>
                </div>
            </div>

        </>
    )
}
export default Type;