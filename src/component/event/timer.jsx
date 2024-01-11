import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const Countdown = () => {
  // Set the target date for the countdown
  const targetDate = new Date('2023-12-31T23:59:59').getTime();

  // Calculate the remaining time in milliseconds
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // State variables
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Update the time remaining every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="right-box-con mt-4">
      <div className="time-box d-inline-block text-center">
        <p className="time-box-date">
          <CountUp separator="" end={timeRemaining.days} />
        </p>
        <p className="time-box-text">Days</p>
      </div>
      <div className="time-box d-inline-block text-center">
        <p className="time-box-date">
          <CountUp separator="" end={timeRemaining.hours} />
        </p>
        <p className="time-box-text">Hours</p>
      </div>
      <div className="time-box d-inline-block text-center">
        <p className="time-box-date">
          <CountUp separator="" end={timeRemaining.minutes} />
        </p>
        <p className="time-box-text">Minutes</p>
      </div>
      <div className="time-box d-inline-block text-center">
        <p className="time-box-date">
          <CountUp separator="" end={timeRemaining.seconds} />
        </p>
        <p className="time-box-text">Seconds</p>
      </div>
    </div>
  );
};

export default Countdown;
