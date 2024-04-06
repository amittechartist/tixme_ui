import React, { useEffect, useState } from "react";
import RewardComponent from './MyrewardsComponent';
const Dashboard = ({ title }) => {
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <RewardComponent />
                </div>
            </div>
        </>
    )
}
export default Dashboard;