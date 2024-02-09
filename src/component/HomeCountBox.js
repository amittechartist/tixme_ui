import React, { useState, useEffect } from "react";
import { apiurl } from '../common/Helpers';
const Component = ({ title }) => {
    const [EventsHosted, setEventsHosted] = useState(0);
    const [TicketsSold, setTicketsSold] = useState(0);
    const [Organizer, setOrganizer] = useState(0);
    const Homecountdata = async () => {
        try {
            fetch(apiurl + 'website/homecountdata', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setEventsHosted(data.data.EventsHosted);
                        setTicketsSold(data.data.TicketsSold);
                        setOrganizer(data.data.OrganizerCount);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    useEffect(() => {
        Homecountdata();
    }, []);
    return (
        <div className="count-sec">
            <div className="row">
                <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
                    <div className="border-style-home-page pb-md-0 pb-2 pb-mb-4">
                        <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">Events Hosted</h6>
                        <p className="mb-0 fs-3 text-primary-color fw-bold">{EventsHosted}+</p>
                    </div>
                </div>
                <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
                    <div className="border-style-home-page pb-md-0 pb-2 pb-mb-4">
                        <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">Tickets Sold</h6>
                        <p className="mb-0 fs-3 text-primary-color fw-bold">{TicketsSold}+</p>
                    </div>
                </div>
                <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
                    <div>
                        <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">
                            Partners & Organizers
                        </h6>
                        <p className="mb-0 fs-3 text-primary-color fw-bold">{Organizer}+</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Component;