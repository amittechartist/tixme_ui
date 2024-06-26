import React from 'react';
import moment from 'moment';
export const app_url = '/tixme_ui/';
export const admin_url = app_url + 'admin/';
export const organizer_url = app_url + 'organizer/';
export const customer_url = app_url + 'customer/';
export const laravelapi = 'https://tixme.co/tixme_storage/api/';
export const laravel_asset = 'https://tixme.co/tixme_storage/storage/app/public/';

export const apiurl = 'http://localhost:5001/api/v1/';
export const imgurl = 'http://localhost:5001/uploads/';
export const qr_url = 'http://localhost:3001/scanner/organizer/qr/';

// export const apiurl = 'https://nodejsapidev.vercel.app/api/v1/';
// export const imgurl = 'https://nodejsapidev.vercel.app/uploads/';
// export const qr_url = 'https://tixme.co/scanner/organizer/qr/';

export function RemoveSession() {
    localStorage.removeItem('userauth');
    localStorage.removeItem('username');
    localStorage.removeItem('customerid');
    localStorage.removeItem('user_role');
    localStorage.removeItem('organizerid');
    localStorage.removeItem('organizername');
    localStorage.removeItem('organizer_role');
    localStorage.removeItem('adminauth');
    localStorage.removeItem('admin_role');
}

export function get_percentage(per, type, total) {
    let TotalTax = 0;
    if (type == "Amount") {
        TotalTax = per;
    } else {
        TotalTax = ((total * per) / 100).toFixed(2);
    }
    return TotalTax; // Returns a string with two decimal places
}


export function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
export const get_date_time = (date) => {
    if (date) {

        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const dateParts = new Intl.DateTimeFormat('en-US', options).formatToParts(new Date(date));

        const Dateview = dateParts[2].value + ' ' + dateParts[0].value + ' ' + dateParts[4].value;
        const Timeview = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return [{ Dateview, Timeview }];
    } else {
        return null;
    }
};
export const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2); // Add leading 0 if needed
    const day = (`0${d.getDate()}`).slice(-2); // Add leading 0 if needed
    return `${year}-${month}-${day}`;
};
export const get_min_date = (date) => {
    const year = new Date(date).getFullYear();
    const month = (new Date(date).getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = new Date(date).getDate().toString().padStart(2, '0');

    return year + month + day;
};

export const shortPer = (paragraph, maxLength) => {
    if (paragraph) {
        if (paragraph.length <= maxLength) {
            return paragraph; // No need to truncate if the text is already short
        } else {
            const truncatedText = paragraph.substring(0, maxLength).trim();
            return truncatedText + '...';
        }
    } else {
        return '...';
    }
}
export const getSupportbagecolor = (status) => {
    if (status == 0) {
        return 'text-warning';
    } else if (status == 1) {
        return 'text-primary';
    } else if (status == 2) {
        return 'text-success';
    } else {
        return '';
    }
}
export const onlyDayMonth = (dateString) => {
    const dateArray = dateString.split(' ');
    if (dateArray.length === 3) {
        const day = dateArray[0];
        const month = dateArray[1];
        return `${day} ${month}`;
    } else { return dateString; }
}

// helper.js

export const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const getDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
};

export const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long' });
};
// export const isEndDateValid = (startDate, startTime, endDate, endTime) => {
//     const formattedStartDate = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6)}`;
//     const formattedEndDate = `${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6)}`;

//     const startDateTime = new Date(`${formattedStartDate} ${startTime}`);
//     const endDateTime = new Date(`${formattedEndDate} ${endTime}`);

//     return endDateTime > startDateTime;
// }
export const isEndDateValid = (startDate, startTime, endDate, endTime) => {
    const startDateTime = moment(`${startDate} ${startTime}`, 'YYYYMMDD HH:mm A');
    const endDateTime = moment(`${endDate} ${endTime}`, 'YYYYMMDD HH:mm A');

    return endDateTime.isAfter(startDateTime);
};
// export const isTickettimeValid = (startDate, startTime, endDate, endTime, ticketDate, ticketTime) => {
//     const formattedStartDate = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6)}`;
//     const formattedEndDate = `${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6)}`;
//     const formattedTicketDate = `${ticketDate.slice(0, 4)}-${ticketDate.slice(4, 6)}-${ticketDate.slice(6)}`;

//     const startDateTime = new Date(`${formattedStartDate} ${startTime}`);
//     const endDateTime = new Date(`${formattedEndDate} ${endTime}`);
//     const ticketDateTime = new Date(`${formattedTicketDate} ${ticketTime}`);

//     return (ticketDateTime >= startDateTime) && (ticketDateTime <= endDateTime);
// }
export const isTickettimeValid = (startDate, startTime, endDate, endTime, ticketDate, ticketTime) => {
    const startDateTime = moment(`${startDate} ${startTime}`, 'YYYYMMDD HH:mm A');
    const endDateTime = moment(`${endDate} ${endTime}`, 'YYYYMMDD HH:mm A');
    const ticketDateTime = moment(`${ticketDate} ${ticketTime}`, 'YYYYMMDD HH:mm A');

    return ticketDateTime.isBetween(startDateTime, endDateTime, undefined, '[]');
};
