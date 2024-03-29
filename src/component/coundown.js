import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Newclockeventpage from "../common/image/newclockeventpage.svg";
const CountdownTimer = ({date, time}) => {
    const targetDateTime = moment(`${date} ${time}`, 'YYYYMMDD hh:mm A');
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPast: false
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            const duration = moment.duration(targetDateTime.diff(now));
            console.log("dsd",date);
            if (duration.asSeconds() <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
            } else {
                setTimeLeft({
                    days: duration.days(),
                    hours: duration.hours(),
                    minutes: duration.minutes(),
                    seconds: duration.seconds(),
                    isPast: false
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDateTime]);

    const renderCountdown = () => {
        if (timeLeft.isPast) {
            return <p>The event has already started!</p>;
        } else {
            return (
                <div className="coundown-box mt-4 d-flex justify-content-center align-items-center">
                    <div>
                        <img src={Newclockeventpage} className='coundown-clock'></img>
                    </div>
                    {Object.entries(timeLeft).map(([unit, value]) => {
                        if (unit !== 'isPast') {
                            return (
                                <div className={`d-inline-block text-center coundown-number-box ${unit}`} key={unit}>
                                    <p className="mb-0 cowndown-val">{value}</p>
                                    <p className="mb-0 cowndown-lable">{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            );
        }
    };

    return (
        <div className="start-in-box eventpage-box-style-event-view mb-5">
            <div className="right-box-title text-left">
                <p>Starts In</p>
            </div>
            {renderCountdown()}
        </div>
    );
};

export default CountdownTimer;
