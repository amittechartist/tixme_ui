import React, { useState, useEffect } from 'react';
import moment from 'moment';

const CountdownTimer = ({props}) => {
    const targetDate = moment(props, 'YYYYMMDD');
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
            const duration = moment.duration(targetDate.diff(now));

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
    }, [targetDate]);

    const renderCountdown = () => {
        if (timeLeft.isPast) {
            return <p>The event has already started!</p>;
        } else {
            return (
                <div className="right-box-con mt-4">
                    {Object.entries(timeLeft).map(([unit, value]) => {
                        if (unit !== 'isPast') {
                            return (
                                <div className="time-box d-inline-block text-center" key={unit}>
                                    <p className="time-box-date">{value}</p>
                                    <p className="time-box-text">{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
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
        <div className="start-in-box eventpage-box-style mb-5">
            <div className="right-box-title">
                <p>Starts In</p>
            </div>
            {renderCountdown()}
        </div>
    );
};

export default CountdownTimer;
