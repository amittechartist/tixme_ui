import React from "react";
import AllEventlist from '../../organizer/Event/List';
import { useParams } from 'react-router-dom';
const Dashboard = ({ title }) => {
    const { countryname } = useParams();
    return (
        <>
            <AllEventlist Country={countryname} />
        </>
    )
}
export default Dashboard;