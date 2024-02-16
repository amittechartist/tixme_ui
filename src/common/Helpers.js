import React from 'react';
export const app_url = '/tixme_ui/';
export const admin_url = app_url + 'admin/';
export const organizer_url = app_url + 'organizer/';
export const customer_url = app_url + 'customer/';

// export const apiurl = 'http://localhost:5001/api/v1/';
// export const imgurl = 'http://localhost:5001/uploads/';
// export const qr_url = 'http://localhost:3002/scanner/organizer/tixme-scanner-page/';


export const apiurl = 'https://nodejsapidev.vercel.app/api/v1/';
export const imgurl = 'https://nodejsapidev.vercel.app/uploads/';
export const qr_url = 'https://tixme.co/scanner/organizer/tixme-scanner-page';



export function get_percentage(per, total) {
    const TotalTax = Math.round((total * per) / 100);
    return TotalTax;
}

export function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
export const get_date_time = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const dateParts = new Intl.DateTimeFormat('en-US', options).formatToParts(new Date(date));

    const Dateview = dateParts[2].value + ' ' + dateParts[0].value + ' ' + dateParts[4].value;
    const Timeview = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return [{ Dateview, Timeview }];
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
    } else if(status == 1){
        return 'text-primary';
    }else if(status == 2){
        return 'text-success';
    }else{
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
