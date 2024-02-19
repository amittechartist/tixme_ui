import React, { useEffect, useRef, useState } from "react";
import '../../common/css/autocompletestyle.css';
import GroupIcon from '../../common/icon/Group.svg';
import OnlineIcon from '../../common/icon/Host Online.svg';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import OffliveIcon from '../../common/icon/oflineeventlogo.svg';
import InfoIcon from "../../common/icon/info.svg";
import LockIcon from "../../common/icon/lock.svg";
import Table from 'react-bootstrap/Table';
import { FiDelete } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import WorldIcon from "../../common/icon/world.svg";
import DateIcon from "../../common/icon/date 1.svg";
import TimeIcon from "../../common/icon/time 1.svg";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Select from 'react-select'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import Lottie from "lottie-react";
import TicketLotte from '../../lotte/ticketanimation.json';
import '../../common/css/wiz.css';
import TimezoneSelect from 'react-timezone-select'
import { isEndDateValid, shortPer, apiurl, get_date_time, get_min_date, organizer_url, formatDateToYYYYMMDD } from '../../common/Helpers';
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap'
const Type = ({ title, editid, ticketeditid }) => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    // modal states
    const [EventsdateModal, setEventsdateModal] = useState(false);
    // Multiple event date and time states
    const [ESdate, setESdate] = useState(new Date());
    const [EStime, setEStime] = useState(new Date());
    const [EMDupid, setEMDupid] = useState();
    const [ListEDM, setListEDM] = useState([]);
    // Loader
    const [Loader, setLoader] = useState(false);
    const [ESLoader, setESLoader] = useState(false);
    const [ESListLoader, setESListLoader] = useState(false);
    const [Apiloader, setApiloader] = useState(false);

    const [Ticketshow, setTicketshow] = useState(false);
    const [FormSection, setFormSection] = useState(1);
    const [Eventtype, setEventtype] = useState();
    const [Name, setName] = useState();
    const [Displayname, setDisplayname] = useState();
    const [Displayprice, setDisplayprice] = useState();
    const [Displaycutprice, setDisplaycutprice] = useState();
    const [Type, setType] = useState(1);
    const [Category, setCategory] = useState();
    const [CategoryId, setCategoryId] = useState();
    const [Categoryname, setCategoryname] = useState();
    const [EventtypeCategoryId, setEventtypeCategoryId] = useState();
    const [EventtypeCategoryname, setEventtypeCategoryname] = useState();
    const [Visibility, setVisibility] = useState(2);
    const [Location, setLocation] = useState();
    const [LocationLat, setLocationLat] = useState('');
    const [GroupQty, setGroupQty] = useState('');
    const [LocationLag, setLocationLag] = useState('');
    const [eventjoinurl, seteventjoinurl] = useState('');
    const [EventSubtype, setEventSubtype] = useState(1);
    const [Startdateselect, setStartdateselect] = useState(new Date());
    const [Enddateselect, setEnddateselect] = useState(new Date());
    const [EventStarttime, setEventStarttime] = useState(new Date());
    const [EventEndtime, setEventEndtime] = useState(new Date());
    const [IsclockCountdown, setIsclockCountdown] = useState(false);
    const [IsSellingFast, setIsSellingFast] = useState(false);
    const [Isgrouptickets, setIsgrouptickets] = useState(false);
    const [Displaystarttime, setDisplaystarttime] = useState(false);
    const [EditApiloader, setEditApiloader] = useState(false);
    const [Displayendtime, setDisplayendtime] = useState(false);
    const [Eventdesc, setEventdesc] = useState();
    const [categoryList, setcategoryList] = useState([{ value: "", label: "Category" }]);
    const [countryList, setcountryList] = useState([{ value: "", label: "Country" }]);
    const [currencyList, setcurrencyList] = useState([{ value: "", label: "Currency" }]);
    const [MeDTOptionList, setMeDTOptionList] = useState([]);
    const [EventtypecategoryList, setEventtypecategoryList] = useState([{ value: "", label: "Type" }]);
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);

    const [IsEventTicket, setIsEventTicket] = useState(true);
    // event ticket 

    const [SelectedMEDT, setSelectedMEDT] = useState();
    const [SelectedMEDTId, setSelectedMEDTId] = useState();
    const [TicketList, setTicketList] = useState([]);
    const [Tickettype, setTickettype] = useState(1);
    const [Ticketname, setTicketname] = useState();
    const [Ticketdesc, setTicketdesc] = useState();
    const [displayaddress, setdisplayaddress] = useState();
    const [Quantity, setQuantity] = useState();
    const [TicketUid, setTicketUid] = useState();
    const [TicketStartdate, setTicketStartdate] = useState(new Date());
    const [TicketEndtdate, setTicketEndtdate] = useState(new Date());
    const [TicketEventdata, setTicketEventdata] = useState(new Date());
    const [Price, setPrice] = useState();
    const [Tax, setTax] = useState();
    const [Pricedisable, setPricedisable] = useState(false);
    const [EditId, setEditId] = useState();
    const [Currency, setCurrency] = useState();
    const [CurrencyId, setCurrencyId] = useState();
    const [Currencyname, setCurrencyname] = useState();
    const [Country, setCountry] = useState();
    const [CountryId, setCountryId] = useState();
    const [Countryname, setCountryname] = useState();
    const [Cityname, setCityname] = useState();
    const [Statename, setStatename] = useState();
    const [Pincode, setPincode] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [Bannerimg, setBannerimg] = useState(null);
    const organizerid = localStorage.getItem('organizerid')
    const [image, setImage] = useState(null);
    const [ThumbnailLoader, setThumbnailLoader] = useState(false);
    const [ThumbnailSuccess, setThumbnailSuccess] = useState(false);
    const [BannerLoader, setBannerLoader] = useState(false);
    const [BannerSuccess, setBannerSuccess] = useState(false);
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    // JSON.stringify(selectedTimezone, null, 2)
    const lottewidth = {
        width: '100%',
        height: '200px'
    }
    const handleSelect = async (selectedLocation) => {
        const results = await geocodeByAddress(selectedLocation);
        const latLng = await getLatLng(results[0]);
        setLocation(selectedLocation);
        setLocationLat(latLng.lat);
        setLocationLag(latLng.lng);
        const valLat = latLng.lat;
        const valLng = latLng.lng;
        if (valLat && valLng) {
            reverseGeocode(valLat, valLng);
        }
    };
    const reverseGeocode = (latitude, longitude) => {
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };

        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    // Extract address components from the results
                    const addressComponents = results[0].address_components;

                    // Initialize variables to store address details
                    let country, state, city, postalCode;

                    for (let component of addressComponents) {
                        if (component.types.includes('country')) {
                            country = component.long_name;
                        }
                        if (component.types.includes('administrative_area_level_1')) {
                            state = component.long_name;
                        }
                        if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
                            city = component.long_name;
                        }
                        if (component.types.includes('postal_code')) {
                            postalCode = component.long_name;
                        }
                    }
                    console.log("country", country);
                    console.log("state", state);
                    console.log("city", city);
                    console.log("postalCode", postalCode);
                    setCityname(city);
                    setStatename(state);
                    setPincode(postalCode);
                } else {
                    console.error('No results found for reverse geocoding.');
                }
            } else {
                console.error('Reverse geocoding failed due to:', status);
            }
        });
    };
    function HandelTicketDelete(editid, pricename) {
        MySwal.fire({
            title: 'Are you sure you want to remove?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                TicketDelete(editid, pricename)
            } else if (result.isDenied) {

            }
        })
    }
    const HandelUpdateNewThumbnail = async (name, type) => {
        try {
            const requestData = {
                updateid: EditId,
                name: name,
                type: type
            };
            fetch(apiurl + 'event/upload-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setThumbnailLoader(false);
                        setThumbnailSuccess(true);
                        return toast.success('Thumbnail uploaded');
                    } else {
                        toast.error('Image not uploaded try again');
                        setThumbnailLoader(false);
                    }
                })
                .catch(error => {
                    setThumbnailLoader(false);
                    console.error('Insert error:', error);
                    toast.error('Image not uploaded try again');
                });
        } catch (error) {
            console.error('Api error:', error);
            toast.error('Image not uploaded try again');
            setThumbnailLoader(false);
        }
    }
    const HandelUpdateNewBanner = async (name, type) => {
        try {
            const requestData = {
                updateid: EditId,
                name: name,
                type: type
            };
            fetch(apiurl + 'event/upload-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setBannerLoader(false);
                        setBannerSuccess(true);
                        return toast.success('Banner uploaded');
                    } else {
                        toast.error('Image not uploaded try again');
                        setBannerLoader(false);
                    }
                })
                .catch(error => {
                    setBannerLoader(false);
                    console.error('Insert error:', error);
                    toast.error('Image not uploaded try again');
                });
        } catch (error) {
            console.error('Api error:', error);
            toast.error('Image not uploaded try again');
            setBannerLoader(false);
        }
    }
    const fetchAllEventsDate = async () => {
        try {
            const requestData = {
                eupid: EditId
            };
            setESListLoader(true);
            fetch(apiurl + 'event/get/event-dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListEDM(data.data);
                        console.log("opo", data.data);
                        var CategoryOption = data.data.map(item => ({
                            value: item.id,
                            label: item.date + ' ' + item.time
                        }));
                        setMeDTOptionList(CategoryOption);
                    } else {
                        setListEDM([]);
                        setMeDTOptionList([]);
                    }
                    setESListLoader(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setESListLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setESListLoader(false);
        }
    }
    const HandelEMDTapi = async () => {
        try {
            const requestData = {
                startdate: get_date_time(ESdate)[0].Dateview,
                startmindate: ESdate,
                starttime: get_date_time(EStime)[0].Timeview,
                startmintime: EStime,
                upid: EMDupid,
                eupid: EditId
            };
            fetch(apiurl + 'event/create/event-dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setEventsdateModal(false);
                        toast.success('Date Insert successfully');
                        fetchAllEventsDate();
                        fetchAllTicket();
                    } else {

                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const HandelEditEMD = async (id) => {
        const filter = ListEDM.filter(item => item.id === id);
        if (filter && filter[0]) {
            setESdate(filter[0].mindate);
            setEStime(filter[0].mintime);
            setEMDupid(filter[0].id);
        } else {
            toast.error("No data found add new !");
        }
        setEventsdateModal(true);

    }
    const HandelDeletEMD = async (id) => {
        MySwal.fire({
            title: "Are you sure you want to delete?",
            text: "Are you sure you want to remove this date and time? Please be aware that deleting this date and time will deactivate all tickets associated with it. This action cannot be undone. Proceed with caution to ensure that you do not unintentionally impact attendees who have already made plans or purchases based on this schedule.",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const requestData = {
                        eventid: EditId,
                        id: id
                    };
                    fetch(apiurl + 'event/delete/event-dates', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set the Content-Type header to JSON
                        },
                        body: JSON.stringify(requestData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success == true) {
                                toast.success('Deleted successfully');
                                fetchAllEventsDate();
                                fetchAllTicket();
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                } catch (error) {
                    console.error('Api error:', error);
                }
            }
        })
    }
    const UpdateTicket = async (id) => {
        const getticketdata = TicketList.find(ticket => ticket.id === id);
        if (getticketdata) {
            setTickettype(getticketdata.ticket_type);
            setTicketname(getticketdata.name);
            setTicketdesc(getticketdata.description);
            setQuantity(getticketdata.quantity);
            setPrice(getticketdata.price);
            setIsgrouptickets(getticketdata.groupqty > 1 ? true : false);
            setGroupQty(getticketdata.groupqty);
            setTicketStartdate(getticketdata.scan_min_datetime[0]);
            if (getticketdata.datetimeid && EventSubtype == 2) {
                const filter = ListEDM.filter(item => item.id === getticketdata.datetimeid);
                if (filter && filter[0]) {
                    setSelectedMEDT([{ value: getticketdata.datetimeid, label: filter[0].date + ' ' + filter[0].time }]);
                    setSelectedMEDTId(filter[0].id)
                }
            }
            setTicketUid(getticketdata.id)
            setTicketshow(true);
        } else {
            toast.error("No ticket found");
        }
    };
    const TicketDelete = async (editid, id) => {
        try {
            const requestData = {
                updateid: editid,
                ticketid: id
            };
            fetch(apiurl + 'event/remove/price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Removed successfully');
                        fetchAllTicket();
                    } else {

                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const handleIsSellingFast = (event) => {
        setIsSellingFast(event.target.checked); // Update state based on checkbox checked status
    };
    const handleIsclockCountdown = (event) => {
        setIsclockCountdown(event.target.checked); // Update state based on checkbox checked status
    };
    const handleDisplaystarttime = (event) => {
        setDisplaystarttime(event.target.checked); // Update state based on checkbox checked status
    };
    const handleDisplayendtime = (event) => {
        setDisplayendtime(event.target.checked); // Update state based on checkbox checked status
    };
    const fromgetdate = get_date_time(Startdateselect);
    var startdate = '';
    var starttime = '';
    if (fromgetdate) {
        startdate = fromgetdate[0].Dateview;
        starttime = fromgetdate[0].Timeview;
    }
    const togetdate = get_date_time(Enddateselect);
    var Enddate = '';
    var Rndtime = '';
    if (togetdate) {
        Enddate = togetdate[0].Dateview;
        Rndtime = togetdate[0].Timeview;
    }

    const fromticketgetdate = get_date_time(TicketStartdate);
    var ticketstartdate = '';
    var ticketstarttime = '';
    if (fromticketgetdate) {
        ticketstartdate = fromticketgetdate[0].Dateview;
        ticketstarttime = fromticketgetdate[0].Timeview;
    }
    // console.log("date",get_date_time(TicketStartdate));
    const toticketgetdate = get_date_time(TicketEndtdate);
    var ticketenddate = '';
    var ticketendtime = '';
    if (toticketgetdate) {
        ticketenddate = toticketgetdate[0].Dateview;
        ticketendtime = toticketgetdate[0].Timeview;
    }
    // tag field start
    const handleTagInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (inputValue.trim() !== '' && tags.length < 10) {
                setTags([...tags, inputValue.trim()]);
                setInputValue('');
            }
        }
    };
    const handleDeleteTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };
    // tag field end
    // All event related apis start
    const updateTicketsType = async (id) => {
        if (EditId) {
            try {
                const requestData = {
                    editid: EditId,
                    id: id,
                };
                fetch(apiurl + 'event/update/eventtickettype', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })
                    .then(response => response.json())
                    .then(data => {
                        toast.success("Updated");
                        fetchAllTicket();
                    })
                    .catch(error => {

                    });
            } catch (error) {

            }
        }
    }
    const HandelUpdatedetails = async () => {
        try {
            var event_type_name = '';
            if (Eventtype == 1) {
                var event_type_name = 'Online Event';
            } else {
                var event_type_name = 'Offline Event';
            }
            if (!Name || !Displayname || !Category || !Currency || !selectedTimezone) {
                return toast.error("All field required");
            }
            if (Eventtype == 2) {
                if (!Location || !Country) {
                    return toast.error("All field required");
                }
            }
            const check = isEndDateValid(get_min_date(Startdateselect), get_date_time(EventStarttime)[0].Timeview, get_min_date(Enddateselect), get_date_time(EventEndtime)[0].Timeview);
            if (!check) {
                return toast.error("Event end date & time must be greater than start date & time");
            }
            setLoader(true);
            const requestData = {
                updateid: EditId,
                isdelete: 0,
                status: 0,
                displayprice: Displayprice > 0 ? Displayprice : 0,
                displaycutprice: Displaycutprice,
                eventtype: Eventtype,
                event_type_name: event_type_name,
                name: Name,
                display_name: Displayname,
                type: Type,
                category: CategoryId,
                category_name: Categoryname,
                eventtypecategory: EventtypeCategoryId,
                eventtypecategory_name: EventtypeCategoryname,
                tags: tags,
                visibility: Visibility,
                event_subtype_id: EventSubtype,

                start_date: startdate,
                start_mindate: get_min_date(Startdateselect),
                start_time: get_date_time(EventStarttime)[0].Timeview,
                start_time_min: EventStarttime,

                end_date: Enddate,
                end_mindate: get_min_date(Enddateselect),
                end_time: get_date_time(EventEndtime)[0].Timeview,
                end_time_min: EventEndtime,

                start_data_min: Startdateselect,
                end_data_min: Enddateselect,

                is_clock_countdown: IsclockCountdown,
                is_selling_fast: IsSellingFast,
                display_start_time: Displaystarttime,
                display_end_time: Displayendtime,
                countryname: Countryname,
                currencycode: CurrencyId,
                countrysymbol: Currencyname,
                timezone: selectedTimezone,
                lat: Eventtype == 2 ? LocationLat : null,
                Lag: Eventtype == 2 ? LocationLag : null,
                location: Eventtype == 2 ? Location : null,
                city: Eventtype == 2 ? Cityname : null,
                state: Eventtype == 2 ? Statename : null,
                pincode: Eventtype == 2 ? Pincode : null,
                eventjoinurl: Eventtype == 1 ? eventjoinurl : null,
            };
            fetch(apiurl + 'event/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Event updated successful', {
                            duration: 3000,
                        });
                        setFormSection(3);
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    const HandelUpdateEventDesc = async (updateid) => {
        try {
            if (!Eventdesc) {
                return toast.error("Event description require");
            }
            setLoader(true);
            const requestData = {
                event_desc: Eventdesc,
                updateid: updateid
            };
            fetch(apiurl + 'event/update/eventdesc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        toast.success('Updated', {
                            duration: 3000,
                        });
                        fetchAllTicket();
                        setFormSection(4);
                    } else {
                        toast.error(data.message);
                    }
                    setLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    const HandelSubmit = async () => {
        try {
            const check = isEndDateValid(get_min_date(Startdateselect), get_date_time(EventStarttime)[0].Timeview, get_min_date(Enddateselect), get_date_time(EventEndtime)[0].Timeview);
            if (!check) {
                return toast.error("Event end date & time must be greater than start date & time");
            }
            var event_type_name = '';
            if (Eventtype == 1) {
                var event_type_name = 'Offline Event';
            } else {
                var event_type_name = 'Online Event';
            }
            if (!Name || !Displayname || !Category || !Currency || !selectedTimezone) {
                return toast.error("All field required");
            }
            if (Eventtype == 2) {
                if (!Location || !Country) {
                    return toast.error("All field required");
                }
            }
            setLoader(true);
            const requestData = {
                updateid: 0,
                isdelete: 0,
                status: 0,
                displayprice: Displayprice > 0 ? Displayprice : 0,
                eventtype: Eventtype,
                event_type_name: event_type_name,
                name: Name,
                display_name: Displayname,
                type: Type,
                category: CategoryId,
                category_name: Categoryname,
                eventtypecategory: EventtypeCategoryId,
                eventtypecategory_name: EventtypeCategoryname,
                tags: tags,
                visibility: Visibility,
                event_subtype_id: EventSubtype,

                start_date: startdate,
                start_mindate: get_min_date(Startdateselect),
                start_time: get_date_time(EventStarttime)[0].Timeview,
                start_time_min: EventStarttime,

                end_date: Enddate,
                end_mindate: get_min_date(Enddateselect),
                end_time: get_date_time(EventEndtime)[0].Timeview,
                end_time_min: EventEndtime,

                is_clock_countdown: IsclockCountdown,
                is_selling_fast: IsSellingFast,
                display_start_time: Displaystarttime,
                display_end_time: Displayendtime,
                organizer_id: organizerid,
                countryname: Countryname,
                currencycode: CurrencyId,
                countrysymbol: Currencyname,
                timezone: selectedTimezone,
                lat: Eventtype == 2 ? LocationLat : null,
                Lag: Eventtype == 2 ? LocationLag : null,
                location: Eventtype == 2 ? Location : null,
                city: Eventtype == 2 ? Cityname : null,
                state: Eventtype == 2 ? Statename : null,
                pincode: Eventtype == 2 ? Pincode : null,
                pincode: Eventtype == 2 ? Pincode : null,
                eventjoinurl: Eventtype == 1 ? eventjoinurl : null,
            };
            fetch(apiurl + 'event/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Event Created successful', {
                            duration: 3000,
                        });
                        setEditId(data.data)
                        setFormSection(3);
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    function emptyPriceForm() {
        setTickettype(1);
        setTicketname('');
        setQuantity('');
        setPrice('');
        setIsgrouptickets(false);
        setTicketdesc('');
        setGroupQty('');
        setPricedisable(false);
    }
    // All event related apis end
    const fetchAllTicket = async () => {
        try {
            setApiloader(true);
            const requestData = {
                updateid: EditId
            };
            fetch(apiurl + 'event/ticket-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {

                    if (data.success == true) {
                        const fetchdata = data.data.allprice.filter(item => item.isdelete === 0);
                        setTicketList(fetchdata);
                        if (fetchdata.length > 0) {
                            setIsEventTicket(false);
                        } else {
                            setIsEventTicket(true);
                        }
                    }
                    setApiloader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);

                    setApiloader(false);

                });

        } catch (error) {
            console.error('Api error:', error);
            setApiloader(false);
        }
    }
    const HandelPriceform = async () => {
        MySwal.fire({
            title: "Good job!",
            text: "Your event is now published",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: 'View My All Events',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(organizer_url + 'event/all-event-list');
            }
        })
    }
    const handelCreateTicket = async (updateid) => {
        try {
            if (!Tickettype) {
                return toast.error('Select ticket type free or paid');
            }
            if (!Ticketname) {
                return toast.error('Enter ticket name');
            }
            if (!Quantity) {
                return toast.error('Enter available ticket quantity');
            }
            if (!Price && Tickettype == 1) {
                return toast.error('Enter ticket price');
            }
            if (Isgrouptickets && !GroupQty) {
                return toast.error('Enter group quantity');
            }
            if (!SelectedMEDTId && EventSubtype == 2) {
                return toast.error('Select Date & Time');
            }
            var date = '';
            var Time = '';
            var id = '';
            const filter = ListEDM.filter(item => item.id === SelectedMEDTId);
            if (EventSubtype == 2) {
                if (filter && filter[0]) {
                    date = filter[0].date;
                    Time = filter[0].time;
                    id = filter[0].id;
                } else {
                    return toast.error("No date & Time found.");
                }
            }
            setLoader(true);
            const requestData = {
                updateid: updateid,
                description: Ticketdesc,
                ticket_type: Tickettype,
                name: Ticketname,
                quantity: Quantity,
                startdate: EventSubtype == 2 ? date : get_date_time(Startdateselect)[0].Dateview,
                starttime: EventSubtype == 2 ? Time : get_date_time(Startdateselect)[0].Timeview,
                datetimeid: EventSubtype == 2 ? id : null,
                scanstartdate: get_date_time(TicketStartdate)[0].Dateview,
                scanstarttime: get_date_time(TicketStartdate)[0].Timeview,
                scan_min_datetime: TicketStartdate,
                event_min_datetime: EventSubtype == 2 ? TicketEventdata : Startdateselect,
                price: Price,
                groupqty: Isgrouptickets ? GroupQty : 1,
            };
            fetch(apiurl + 'event/create/event-ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Created', {
                            duration: 3000,
                        });
                        setTicketshow(false);
                        emptyPriceForm();
                        fetchAllTicket();
                    } else {
                        toast.error(data.message);
                    }
                    setLoader(false);
                })
                .catch(error => {
                    setLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    const handelUpdateTicket = async (updateid) => {
        try {
            if (!Tickettype) {
                return toast.error('Select ticket type free or paid');
            }
            if (!Ticketname) {
                return toast.error('Enter ticket name');
            }
            if (!Quantity) {
                return toast.error('Enter available ticket quantity');
            }
            if (!Price && Tickettype == 1) {
                return toast.error('Enter ticket price');
            }
            if (Isgrouptickets && !GroupQty) {
                return toast.error('Enter group quantity');
            }
            if (!SelectedMEDTId && EventSubtype == 2) {
                return toast.error('Select Date & Time');
            }
            var date = '';
            var Time = '';
            var id = '';
            const filter = ListEDM.filter(item => item.id === SelectedMEDTId);
            if (EventSubtype == 2) {
                if (filter && filter[0]) {
                    date = filter[0].date;
                    Time = filter[0].time;
                    id = filter[0].id;
                } else {
                    return toast.error("No date & Time found.");
                }
            }
            setLoader(true);
            const requestData = {
                updateid: updateid,
                ticketeditid: TicketUid,
                description: Ticketdesc,
                ticket_type: Tickettype,
                name: Ticketname,
                quantity: Quantity,
                startdate: EventSubtype == 2 ? date : get_date_time(Startdateselect)[0].Dateview,
                starttime: EventSubtype == 2 ? Time : get_date_time(Startdateselect)[0].Timeview,
                datetimeid: EventSubtype == 2 ? id : null,
                scanstartdate: get_date_time(TicketStartdate)[0].Dateview,
                scanstarttime: get_date_time(TicketStartdate)[0].Timeview,
                scan_min_datetime: TicketStartdate,
                event_min_datetime: EventSubtype == 2 ? TicketEventdata : Startdateselect,
                price: Price,
                groupqty: Isgrouptickets ? GroupQty : 1,
            };
            fetch(apiurl + 'event/edit/event-ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Created', {
                            duration: 3000,
                        });
                        setTicketshow(false);
                        emptyPriceForm();
                        fetchAllTicket();
                    } else {
                        toast.error(data.message);
                    }
                    setLoader(false);
                })
                .catch(error => {
                    setLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setSelectedImage(URL.createObjectURL(img));
            setImage(e.target.files[0]);
            uploadImageToServer(e.target.files[0]);
        }
    };
    const uploadImageToServer = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile); // 'image' is the parameter name expected by your API
        try {
            setThumbnailLoader(true);
            const response = await fetch('https://tixme.co/tixme_storage/api/upload-image', {
                method: 'POST',
                body: formData, // No headers needed, as FormData sets the Content-Type to multipart/form-data
            });

            if (!response.ok) {
                setSelectedImage(null);
                setThumbnailLoader(false);
                toast.error('Image not uploaded try again');
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Image uploaded successfully:', result);
            if (result) {
                HandelUpdateNewThumbnail(result.image_name, 'thumbnail');
            } else {
                setThumbnailLoader(false);
                setSelectedImage(null);
                return toast.error('Image not uploaded try again');
            }
            // Handle the response here (e.g., showing a success message, updating UI)
        } catch (error) {
            setSelectedImage(null);
            setThumbnailLoader(false);
            toast.error('Image not uploaded try again');
            console.error('Error uploading the image:', error);
            // Handle the error here (e.g., showing an error message)
        }
    };
    const handleBannerImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setBannerimg(URL.createObjectURL(img));
            uploadBannerToServer(e.target.files[0]);
        }
    };
    const uploadBannerToServer = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile); // 'image' is the parameter name expected by your API

        try {
            setBannerLoader(true);
            const response = await fetch('https://tixme.co/tixme_storage/api/upload-image', {
                method: 'POST',
                body: formData, // No headers needed, as FormData sets the Content-Type to multipart/form-data
            });

            if (!response.ok) {
                setBannerimg(null);
                setBannerLoader(false);
                toast.error('Image not uploaded try again');
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Image uploaded successfully:', result);
            if (result) {
                HandelUpdateNewBanner(result.image_name, 'banner');
            } else {
                setBannerLoader(false);
                setBannerimg(null);
                return toast.error('Image not uploaded try again');
            }
            // Handle the response here (e.g., showing a success message, updating UI)
        } catch (error) {
            setBannerimg(null);
            setBannerLoader(false);
            toast.error('Image not uploaded try again');
            console.error('Error uploading the image:', error);
            // Handle the error here (e.g., showing an error message)
        }
    };
    // all fetch apis start
    const fetchCategory = async () => {
        try {
            fetch(apiurl + 'category/get-category-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const categoryData = data.data;
                        const CategoryOption = categoryData.map(category => ({
                            value: category._id,
                            label: category.name
                        }));
                        setcategoryList(CategoryOption);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const fetchCountry = async () => {
        try {
            fetch(apiurl + 'admin/country-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const countryData = data.data;
                        const countryOption = countryData.map(item => ({
                            value: item.name,
                            label: item.name
                        }));
                        const currencyOption = countryData.map(item => ({
                            value: item.currency,
                            label: item.symbol
                        }));
                        setcountryList(countryOption);
                        setcurrencyList(currencyOption)
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const fetchEventtypeCategory = async () => {
        try {
            fetch(apiurl + 'category/get-event-type-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const categoryData = data.data;
                        const CategoryOption = categoryData.map(category => ({
                            value: category._id,
                            label: category.name
                        }));
                        setEventtypecategoryList(CategoryOption);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    }
    // all fetch apis end
    // select options states start
    const CategoryOption = [
        {
            options: categoryList
        }
    ]
    const CountryOption = [
        {
            options: countryList
        }
    ]
    const CurrencyOption = [
        {
            options: currencyList
        }
    ]
    const MeDTOption = [
        {
            options: MeDTOptionList
        }
    ]
    console.log("ss", MeDTOption);
    const selectCategory = (selectedValue) => {
        setCategory(selectedValue);
        setCategoryId(selectedValue.value);
        setCategoryname(selectedValue.label);
    };
    const selectCurrency = (selectedValue) => {
        setCurrency(selectedValue);
        setCurrencyId(selectedValue.value);
        setCurrencyname(selectedValue.label);
    };
    const selectCountry = (selectedValue) => {
        setCountry(selectedValue);
        setCountryId(selectedValue.value);
        setCountryname(selectedValue.label);
    };
    const selectMeDTOption = (selectedValue) => {
        setSelectedMEDT(selectedValue);
        setSelectedMEDTId(selectedValue.value);
    };
    // select options states end
    function OpenCreateTicketModal() {
        if (EventSubtype == 2 && !ListEDM.length > 0) {
            setFormSection(3);
            return toast.error("For events spanning multiple dates and times, please specify each date and time to create a new ticket.", {
                autoClose: 3000, // Toast is visible for 3000 milliseconds (3 seconds)
            });

        }
        setTicketshow(true);
    }
    const getEditdata = async (editid) => {
        try {
            setEditApiloader(true);
            const requestData = {
                id: editid
            };
            fetch(apiurl + 'event/get-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setName(data.data.name)
                        setEditId(data.data._id)
                        setDisplayname(data.data.display_name)
                        setType(data.data.eventtype)
                        setEventtype(data.data.eventtype)
                        setCategoryId(data.data.category)
                        setCategoryname(data.data.category_name)
                        setCategory([{ value: data.data.category, label: data.data.category_name }])
                        setCountry([{ value: data.data.countryname, label: data.data.countryname }])
                        setCurrency([{ value: data.data.currencycode, label: data.data.countrysymbol }])
                        setCurrencyname(data.data.countrysymbol)
                        setEventtypeCategoryId(data.data.eventtypecategory)
                        setEventtypeCategoryname(data.data.eventtypecategory_name)
                        setVisibility(data.data.visibility)
                        setLocation(data.data.location)
                        setCityname(data.data.city)
                        setStatename(data.data.state)
                        setPincode(data.data.pincode)
                        setEventSubtype(data.data.event_subtype_id)

                        setIsclockCountdown(data.data.is_clock_countdown)
                        setIsSellingFast(data.data.is_selling_fast)

                        setStartdateselect(data.data.start_data_min[0] || new Date())
                        setEnddateselect(data.data.end_data_min[0] || new Date())

                        
                        setEventStarttime(data.data.start_time_min[0] || new Date())
                        setEventEndtime(data.data.end_time_min[0] || new Date())

                        setDisplaystarttime(data.data.display_start_time)
                        setDisplayendtime(data.data.display_end_time)

                        setEventdesc(data.data.event_desc)
                        setSelectedImage(data.data.thum_image ? data.data.thum_image : null)
                        if (data.data.thum_image) {
                            setThumbnailSuccess(true);
                        }
                        if (data.data.banner_image) {
                            setBannerSuccess(true);
                        }
                        setBannerimg(data.data.banner_image ? data.data.banner_image : null)
                        setDisplayprice(data.data.displayprice)
                        setDisplaycutprice(data.data.displaycutprice)
                        setSelectedTimezone(data.data.timezone)
                        setTicketList(data.data.allprice)
                        setTicketList(data.data.allprice)
                        setTags(data.data.tags)
                        seteventjoinurl(data.data.eventjoinurl)
                        if (data.data.event_desc) {
                            setEventdesc(data.data.event_desc)
                        }
                        fetchAllTicket()
                    }
                    setEditApiloader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setEditApiloader(false);
                });

        } catch (error) {
            console.error('Api error:', error);
        }
    }
    useEffect(() => {
        if (ticketeditid) {
            setFormSection(4);
            fetchAllTicket();
        } else if (editid) {
            setFormSection(2);
            fetchAllTicket();
        }
    }, [ticketeditid]);
    useEffect(() => {
        if (ticketeditid || editid) {
            fetchAllTicket();
            fetchAllEventsDate();
        }
    }, [EditId]);
    useEffect(() => {
        fetchCategory();
        fetchCountry();
        fetchEventtypeCategory();
        if (editid) {
            getEditdata(editid)
        }
    }, []);
    return (
        <>
            {/* multiple date and time selector modal */}
            <Modal isOpen={EventsdateModal} className='modal-dialog-centered modal-xs'>
                <ModalHeader className='bg-transparent' toggle={() => setEventsdateModal(!EventsdateModal)}>Event Date & Time</ModalHeader>
                <ModalBody className=''>
                    <Row>
                        <div className="col-md-12">
                            <p>Event Starts From</p>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                <input type="text" class="pl-5 form-control date-border-redius date-border-redius-input bg-white" placeholder="Event Start Date" readOnly value={get_date_time(ESdate)[0].Dateview} />
                                <div className="date-style-picker">
                                    <Flatpickr
                                        value={ESdate}
                                        id='date-picker'
                                        options={{
                                            enableTime: false,
                                            minDate: "today",
                                        }}
                                        className='form-control'
                                        onChange={date => { setESdate(date) }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* start time */}
                        <div className="col-md-6">
                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                <input type="text" class="form-control date-border-redius date-border-redius-input bg-white pl-5" placeholder="Event Start Time" value={get_date_time(EStime)[0].Timeview} />
                                <div className="date-style-picker">
                                    <Flatpickr
                                        id='date-picker'
                                        className='form-control'
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:i",
                                            time_24hr: false,
                                        }}
                                        value={EStime}
                                        onChange={(time) => {
                                            setEStime(time);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {ESLoader ? (
                                <button type="button" className="btn text-white theme-bg w-100">Please Wait...</button>
                            ) : (
                                <button type="button" onClick={() => HandelEMDTapi()} className="btn text-white theme-bg w-100">{EMDupid ? 'Update' : 'Add'}</button>
                            )}

                        </div>
                    </Row>
                </ModalBody>
            </Modal>
            {EditApiloader ? (
                <div className="linear-background w-100"> </div>
            ) : (
                <Row className="pb-2">
                    <Col md={12}>
                        <Card>
                            <Card.Body className="py-5">
                                <Row>
                                    <Col md={12} className="text-center">
                                        {EditId ? (
                                            <div className="">
                                                <ul id="progressbar">
                                                    <li onClick={() => setFormSection(2)} className={FormSection === 2 ? "active yesedit" : 'yesedit'} id="account"><strong>Basic Info</strong></li>
                                                    <li onClick={() => setFormSection(3)} className={FormSection === 3 ? "active yesedit" : 'yesedit'} id="account"><strong>Details</strong></li>
                                                    <li
                                                        onClick={() => {
                                                            setFormSection(4);
                                                        }}
                                                        className={FormSection === 4 ? "active yesedit" : 'yesedit'} id="account"><strong>Tickets</strong></li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className="">
                                                <ul id="progressbar">
                                                    <li className={FormSection >= 1 ? "active noedit" : 'noedit'} id="account"><strong>Event Type</strong></li>
                                                    <li className={FormSection >= 2 ? "active noedit" : 'noedit'} id="account"><strong>Basic Info</strong></li>
                                                    <li className={FormSection >= 3 ? "active noedit" : 'noedit'} id="account"><strong>Details</strong></li>
                                                    <li className={FormSection >= 4 ? "active noedit" : 'noedit'} id="account"><strong>Tickets</strong></li>
                                                </ul>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                                {FormSection === 1 ?
                                    (
                                        <Row className="pb-5">
                                            <Col md={12} className="text-center mb-5">
                                                <h2 className="theme-color mb-2 ">Select Event Type</h2>
                                                <p className="text-black">Your one stop solution for managing and conducting events</p>
                                            </Col>
                                            <Col md={6} className="mt-5">
                                                <div className="event_category_box gradient-blue text-center float-right">
                                                    <h3 className="event-category-title theme-color">Online Event</h3>
                                                    <p className="event-category-desc text-black mb-4">Host online events using  Zoom, Google Meet, YouTube Live etc</p>
                                                    <button type="button" onClick={() => { setEventtype(1); setFormSection(2); }} className=" text-white btn theme-bg">Create Event</button>
                                                    <div className="icon_section">
                                                        <img src={GroupIcon} />
                                                        <img src={OnlineIcon} />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={6} className="mt-5">
                                                <div className="event_category_box gradient-grey text-center">
                                                    <h3 className="event-category-title theme-color">Physical Event</h3>
                                                    <p className="event-category-desc text-black mb-4">Host in-person or outdoor events using our event management platform</p>
                                                    <div className="button-group">
                                                        <button type="button" onClick={() => { setEventtype(2); setFormSection(2); }} className=" text-white btn theme-bg">Create Event</button>
                                                    </div>
                                                    <div className="icon_section">
                                                        <img src={GroupIcon} />
                                                        <img src={OffliveIcon} />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    ) : (<></>)}
                                {FormSection === 2 ? (
                                    <Row className="pb-5">
                                        <Col md={12} className="text-center mb-5">
                                            <h2 className="theme-color mb-2 ">Event Basic Info</h2>
                                        </Col>
                                        <div className="col-md-6">
                                            <label htmlFor="" className="text-black">Event Name<span className="text-danger">*</span></label>
                                            <input type="text" class="form-control input-default" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Enter Event Name" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="" className="text-black">Event Display Name<span className="text-danger">*</span> <img className="cursor-pointer" title="test" height={15} width={15} src={InfoIcon} /></label>
                                            <input type="text" class="form-control input-default " value={Displayname} onChange={(e) => setDisplayname(e.target.value)} placeholder="Enter Event Display Name" />
                                        </div>
                                        <div className="col-md-6 mt-4">
                                            <label htmlFor="" className="text-black">Select Category<span className="text-danger">*</span></label>
                                            <Select
                                                isClearable={false}
                                                options={CategoryOption}
                                                className='react-select select-theme'
                                                classNamePrefix='select'
                                                onChange={selectCategory}
                                                value={Category}
                                            />
                                        </div>
                                        <div className="col-md-3 mt-4">
                                            <label htmlFor="" className="text-black">Select Currency<span className="text-danger">*</span></label>
                                            <Select
                                                isClearable={false}
                                                options={CurrencyOption}
                                                className='react-select select-theme'
                                                classNamePrefix='select'
                                                onChange={selectCurrency}
                                                value={Currency}
                                            />
                                        </div>
                                        <div className="col-md-3 mt-4">
                                            <label htmlFor="" className="text-black">Display price<span className="text-danger">*</span></label>
                                            <input type="text" class="form-control input-default" value={Displayprice} onChange={(e) => setDisplayprice(e.target.value)} placeholder="Enter Amount" />
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <label htmlFor="">Tags</label>
                                            <p>Improve discoverability of your event by adding tags relevant to subject matter.</p>
                                            <input
                                                type="text"
                                                className="form-control input-default"
                                                placeholder="Add search keywords to your event"
                                                value={inputValue}
                                                onChange={handleTagInputChange}
                                                onKeyDown={handleTagInputKeyDown}
                                            />
                                            <span className="mt-2">{tags.length} / 10 tags.</span>
                                            <div className="tag-preview-option my-2">
                                                <ul className="pl-0">
                                                    {tags.map((tag, index) => (
                                                        <li key={index}>
                                                            {tag}
                                                            <button onClick={() => handleDeleteTag(index)} className="delete-button">
                                                                X
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-8"></div>
                                        <div className="col-md-8 mt-4">
                                            <label htmlFor="">Event Visibility<span className="text-danger">*</span></label>
                                            <div className="tab-button-box">
                                                {/* tab-button-active */}
                                                <span onClick={() => setVisibility(1)} className={Visibility == 1 ? "tab-button-active" : ""}><img src={WorldIcon} alt="" /> Public</span>
                                                <span onClick={() => setVisibility(2)} className={Visibility == 2 ? "tab-button-active" : ""}><img src={LockIcon} alt="" /> Private</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <label htmlFor="">Location</label>
                                            <p>Help people in the area discover your event and let attendees know where to show up.</p>
                                            <div className="tab-button-box">
                                                <span onClick={() => setEventtype(2)} className={Eventtype == 2 ? "tab-button-active" : "tab-button-grey-active"}>Venue</span>
                                                <span onClick={() => setEventtype(1)} className={Eventtype == 1 ? "tab-button-active" : "tab-button-grey-active"}> Online Event</span>
                                            </div>
                                        </div>
                                        {/* address part */}
                                        <div className="col-md-4 mt-4">
                                            <label htmlFor="" className="text-black">Select Country<span className="text-danger">*</span></label>
                                            <Select
                                                isClearable={false}
                                                options={CountryOption}
                                                className='react-select select-theme'
                                                classNamePrefix='select'
                                                onChange={selectCountry}
                                                value={Country}
                                            />
                                        </div>
                                        {Eventtype == 2 ? (<>
                                            <div className="col-md-4 mt-4">
                                                {/* ... (other code) */}
                                                <label htmlFor="" className="text-black">Address<span className="text-danger">*</span></label>
                                                <PlacesAutocomplete
                                                    value={Location}
                                                    onChange={(e) => setLocation(e)}
                                                    onSelect={handleSelect}
                                                >
                                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                        <div>
                                                            <input
                                                                {...getInputProps({
                                                                    placeholder: 'Search for venue or address',
                                                                    className: 'form-control',
                                                                })}
                                                            />
                                                            <div>
                                                                {loading ? <div>Loading...</div> : null}

                                                                {suggestions.map((suggestion) => (
                                                                    <div className="location-sugg" {...getSuggestionItemProps(suggestion)}>
                                                                        {suggestion.description}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </PlacesAutocomplete>
                                            </div>
                                            <div className="col-md-4 mt-4">
                                                <label htmlFor="" className="text-black">Display Address<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control input-default" value={displayaddress} onChange={(e) => setdisplayaddress(e.target.value)} placeholder="Enter Display Address" />
                                            </div>
                                            <div className="col-12 col-md-4 mt-4">
                                                <label htmlFor="" className="text-black">City</label>
                                                <input type="text" class="form-control input-default" value={Cityname} onChange={(e) => setCityname(e.target.value)} placeholder="Enter City Name" />
                                            </div>
                                            <div className="col-12 col-md-4 mt-4">
                                                <label htmlFor="" className="text-black">State</label>
                                                <input type="text" class="form-control input-default" value={Statename} onChange={(e) => setStatename(e.target.value)} placeholder="Enter State Name" />
                                            </div>
                                            <div className="col-12 col-md-4 mt-4">
                                                <label htmlFor="" className="text-black">Pincode</label>
                                                <input type="text" class="form-control input-default" value={Pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" />
                                            </div>
                                        </>) : (<>
                                            <div className="col-12 col-md-8 mt-4">
                                                <label htmlFor="" className="text-black">Online Meeting URL</label>
                                                <input type="text" class="form-control input-default" value={eventjoinurl} onChange={(e) => seteventjoinurl(e.target.value)} placeholder="Enter Online Meeting URL" />
                                            </div>
                                        </>)}
                                        <div className="col-md-12 pt-4">
                                            <p className="mb-0">Tell event-goers when your event starts and ends so they can make plans to attend.</p>
                                        </div>

                                        <div className="col-md-4 mt-2 d-flex align-items-end">
                                            <div className="select-wrapper w-100">
                                                <p>Select time zone<span className="text-danger">*</span></p>
                                                <TimezoneSelect
                                                    value={selectedTimezone}
                                                    onChange={setSelectedTimezone}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row mt-5">
                                                <div className="col-md-1">
                                                    <div class="input-group mb-3">
                                                        <input checked={IsclockCountdown} onChange={handleIsclockCountdown} type="checkbox" class="form-check-input" />
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <p className="mb-0">Clock Timer ( Countdown )</p>
                                                    <p className="mb-0">Clock timer of your event will be displayed to attendess.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <p>Event Starts</p>
                                        </div>
                                        {/* start date */}
                                        <div className="col-md-4">
                                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                <input type="text" class="pl-5 form-control date-border-redius date-border-redius-input bg-white" placeholder="" readOnly value={startdate} />
                                                <div className="date-style-picker">
                                                    <Flatpickr
                                                        value={Startdateselect}
                                                        id='date-picker'
                                                        options={{
                                                            enableTime: false,
                                                            minDate: "today",
                                                        }}
                                                        className='form-control'
                                                        onChange={date => { setStartdateselect(date); setTicketStartdate(date) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* start time */}
                                        <div className="col-md-4">
                                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                                <input type="text" class="form-control date-border-redius date-border-redius-input bg-white pl-5" placeholder="" value={get_date_time(EventStarttime)[0].Timeview} />
                                                <div className="date-style-picker">
                                                    <Flatpickr
                                                        id='date-picker'
                                                        className='form-control'
                                                        options={{
                                                            enableTime: true,
                                                            noCalendar: true,
                                                            dateFormat: "H:i",
                                                            time_24hr: false,
                                                        }}
                                                        value={EventStarttime}
                                                        onChange={(time) => {
                                                            setEventStarttime(time);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 checkout-style-bottom">
                                            <div className="row checkout-style-element">
                                                <div className="col-md-2 col-2">
                                                    <div class="input-group mb-3">
                                                        <input checked={Displaystarttime} onChange={handleDisplaystarttime} type="checkbox" class="form-check-input" />
                                                    </div>
                                                </div>
                                                <div className="col-md-10 col-10 Display-date-time-tic">
                                                    <p className="mb-0">Display start time.</p>
                                                    <p className="mb-0">The start time of your event will be displayed to attendess.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <p>Event Ends</p>
                                        </div>
                                        {/* end date */}
                                        <div className="col-md-4">
                                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                                <input type="text" class="form-control date-border-redius date-border-redius-input bg-white pl-5" placeholder="" readOnly value={Enddate} />
                                                <div className="date-style-picker">
                                                    <Flatpickr
                                                        value={Enddateselect}
                                                        options={{
                                                            enableTime: false,
                                                            minDate: formatDateToYYYYMMDD(Startdateselect),
                                                        }}
                                                        id='date-picker'
                                                        className='form-control'
                                                        onChange={date => setEnddateselect(date)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* enf time */}
                                        <div className="col-md-4">
                                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                                <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                                <input type="text" class="form-control date-border-redius date-border-redius-input bg-white pl-5" placeholder="" value={get_date_time(EventEndtime)[0].Timeview} />
                                                <div className="date-style-picker">
                                                    <Flatpickr
                                                        id='date-picker'
                                                        className='form-control'
                                                        options={{
                                                            enableTime: true,
                                                            noCalendar: true,
                                                            dateFormat: "H:i",
                                                            time_24hr: false,
                                                        }}
                                                        value={EventEndtime}
                                                        onChange={(time) => {
                                                            setEventEndtime(time);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 checkout-style-bottom">
                                            <div className="row checkout-style-element">
                                                <div className="col-md-2">
                                                    <div class="input-group mb-3">
                                                        <input checked={Displayendtime} onChange={handleDisplayendtime} type="checkbox" class="form-check-input" />
                                                    </div>
                                                </div>
                                                <div className="col-md-10 Display-date-time-tic">
                                                    <p className="mb-0">Display end time.</p>
                                                    <p className="mb-0">The end time of your event will be displayed to attendess.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2">
                                            <div className="button-group mt-10">
                                                <button type="button" onClick={() => setFormSection(1)} className="m-1 text-white btn theme-bg">Back</button>
                                                {Loader ? (
                                                    <button type="button" className="m-1 text-white btn theme-bg">Please wait...</button>
                                                ) : (
                                                    <>
                                                        {EditId ? (
                                                            <button type="button" onClick={() => HandelUpdatedetails()} className="m-1 text-white btn theme-bg">Update</button>
                                                        ) : (
                                                            <button type="button" onClick={() => HandelSubmit()} className="m-1 text-white btn theme-bg">Save</button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Row>
                                ) : (<></>)}
                                {FormSection === 3 ? (
                                    <Row>
                                        <Col md={12} className="text-center mb-5">
                                            <h2 className="theme-color mb-2 ">Event Images</h2>
                                        </Col>
                                        <div className="col-md-12 mb-5">
                                            <h4 className="mb-2">About this event</h4>
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <label htmlFor="">Event Tickets Type</label>
                                            <div className="tab-button-box">
                                                <span onClick={() => { setEventSubtype(1); updateTicketsType(1) }} className={EventSubtype == 1 ? "tab-button-active" : ""}>Single Event</span>
                                                <span onClick={() => { setEventSubtype(2); updateTicketsType(2) }} className={EventSubtype == 2 ? "tab-button-active" : ""}>Multiple Events</span>
                                            </div>
                                        </div>
                                        {EventSubtype == 2 && (
                                            <>
                                                <div className="col-md-12 mt-4">
                                                    <div className="multiple-date-selector">
                                                        <p className="mb-2">Select Events multiple date and time.</p>
                                                        <button onClick={() => setEventsdateModal(true)} type="button" className="btn text-white theme-bg">Select Date & Time</button>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-4">
                                                    <p className="mb-2">All event date & time.</p>
                                                    {ESListLoader ? (
                                                        <div className="linear-background w-100" style={{ height: '150px' }}> </div>
                                                    ) : (
                                                        <>
                                                            {ListEDM.length > 0 ? (
                                                                <div className="row">
                                                                    {ListEDM.map((item) => (
                                                                        <div className="col-md-4">
                                                                            <div className="events-date-time-box">
                                                                                <p className="mb-1"><img src={DateIcon} alt="" /> Date : {item.date}</p>
                                                                                <p className="mb-1"><img src={TimeIcon} alt="" /> Time : {item.time}</p>
                                                                                <div className="action-btn-box1">
                                                                                    <span onClick={() => HandelEditEMD(item.id)} className="m-2 cursor-pointre text-primary"><FiEdit /></span>
                                                                                    <span onClick={() => HandelDeletEMD(item.id)} className="m-2 cursor-pointre text-danger"><FiDelete /></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="text-center py-2 border border-redius">
                                                                    <p className="mb-0">No Date & Time Found</p>
                                                                </div>
                                                            )}

                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        <Col md={12} className="mt-2">
                                            <div className="">
                                                <p>Upload Event Thumbnail <span className="text-danger">*</span></p>
                                                {ThumbnailLoader ? (
                                                    <div className="linear-background w-100"> </div>
                                                ) : (
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dashed #d5d5d5', padding: '15px 0px', borderRadius: '15px' }}>
                                                        <div
                                                            style={{
                                                                width: '500px',
                                                                height: '300px',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                flexDirection: 'column',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => document.getElementById('imageInput').click()}
                                                        >
                                                            {selectedImage && ThumbnailSuccess ? (
                                                                <img src={selectedImage} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                            ) : (
                                                                <p>Upload Event Thumbnail</p>
                                                            )}
                                                            <input
                                                                type="file"
                                                                id="imageInput"
                                                                accept="image/*"
                                                                onChange={handleImageChange}
                                                                style={{ display: 'none' }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="mt-4">
                                                <p>Upload Event Banner <span className="text-danger">*</span></p>
                                                {BannerLoader ? (
                                                    <div className="linear-background w-100"> </div>
                                                ) : (
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dashed #d5d5d5', padding: '15px 0px', borderRadius: '15px' }}>
                                                        <div
                                                            style={{
                                                                width: '100%',
                                                                height: '300px',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                flexDirection: 'column',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => document.getElementById('imageInputbanner').click()}
                                                        >
                                                            {Bannerimg && BannerSuccess ? (
                                                                <img src={Bannerimg} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                            ) : (
                                                                <p>Upload Event Banner</p>
                                                            )}
                                                            <input
                                                                type="file"
                                                                id="imageInputbanner"
                                                                accept="image/*"
                                                                onChange={handleBannerImageChange}
                                                                style={{ display: 'none' }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col md={12} className="text-center mb-3 mt-4">
                                            <h2 className="theme-color mb-2 ">Event Description <span className="text-danger">*</span></h2>
                                        </Col>
                                        <div className="col-md-12">
                                            <h4 className="mb-2">About this event</h4>
                                            <textarea className="custome-text-area" placeholder="Description" value={Eventdesc} onChange={(e) => setEventdesc(e.target.value)}></textarea>
                                        </div>
                                        <div className="col-md-12 mt-2">
                                            <div className="col-md-12 mt-2">
                                                <div className="button-group mt-10">
                                                    <button type="button" onClick={() => setFormSection(2)} className="m-1 text-white btn theme-bg">Back</button>
                                                    {Loader ? (
                                                        <button type="button" className="m-1 text-white btn theme-bg">Please wait...</button>
                                                    ) : (
                                                        <>
                                                            {EditId ? (
                                                                <button type="button" onClick={() => HandelUpdateEventDesc(EditId)} className="m-1 text-white btn theme-bg">Update</button>
                                                            ) : (
                                                                <button type="button" onClick={() => HandelSubmit()} className="m-1 text-white btn theme-bg">Save</button>
                                                            )}
                                                        </>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                ) : (<></>)}
                                {FormSection === 4 ? (
                                    <Row>
                                        <Col md={12} className="text-center mb-5">
                                            <h2 className="theme-color mb-2 ">Event Tickets</h2>
                                        </Col>
                                        <Col md={12} className="text-end">
                                            <button type="button" onClick={() => { OpenCreateTicketModal(); emptyPriceForm(); setTicketUid(""); }} className="text-white btn theme-bg">Add Ticket</button>
                                        </Col>
                                        {Apiloader ? (
                                            <div className="linear-background w-100"> </div>
                                        ) : (
                                            <>
                                                {
                                                    IsEventTicket ? (
                                                        <Col md={12} className="mt-3 text-center" >
                                                            <div className="no-data-found">
                                                                <Lottie animationData={TicketLotte} style={lottewidth} />
                                                                <p className="no_ticket_added">Ticket has not been added yet !</p>
                                                            </div>
                                                        </Col>
                                                    ) : (
                                                        <Col md={12} className="mt-3 white-table">
                                                            <Table responsive className="dash-table-1">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="text-center" key={1}>Name</th>
                                                                        <th className="text-center" key={1}>Event date & time</th>
                                                                        <th className="text-center" key={1}>Price</th>
                                                                        <th className="text-center" key={1}>Group Qty</th>
                                                                        <th className="text-center" key={1}>Scan start in</th>
                                                                        <th className="text-center" key={1}>Description</th>
                                                                        <th className="text-center" key={1}>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {TicketList.map((item, index) => (
                                                                        <>
                                                                            {item.isdelete == 0 && (
                                                                                <tr className="text-center">
                                                                                    <td>{item.name}</td>
                                                                                    <td>{Eventtype == 2 ? item.startdate + ' ' + item.starttime : startdate + ' ' + get_date_time(EventStarttime)[0].Timeview}</td>
                                                                                    <td>{item.price ? (<>{Currencyname} {item.price}</>) : (Currencyname + '00')}</td>
                                                                                    <td>{item.groupqty}</td>
                                                                                    <td>{item.scanstartdate} {item.scanstarttime}</td>
                                                                                    <td>{shortPer(item.description, 20)}</td>
                                                                                    <td>
                                                                                        <button type="button" onClick={() => UpdateTicket(item.id)} className="p-2 m-1 btn theme-bg text-white"><FiEdit /></button>
                                                                                        <button type="button" onClick={() => HandelTicketDelete(EditId, item.id)} className="p-2 m-1 btn btn-danger text-white"><FiDelete /></button>
                                                                                    </td>
                                                                                </tr>
                                                                            )}
                                                                        </>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </Col>
                                                    )}
                                            </>
                                        )}
                                        <div className="col-md-12 mt-2">
                                            <div className="button-group mt-10">
                                                <button type="button" onClick={() => setFormSection(3)} className="m-1 text-white btn theme-bg">Back</button>
                                                {Loader ? (
                                                    <button type="button" className="m-1 text-white btn theme-bg">Please wait...</button>
                                                ) : (
                                                    <button onClick={HandelPriceform} type="button" className="m-1 text-white btn theme-bg">Update</button>
                                                )}
                                            </div>
                                        </div>
                                    </Row >
                                ) : (<></>)}
                            </Card.Body >
                        </Card >
                    </Col >
                </Row >
            )}
            <Modal isOpen={Ticketshow} className='modal-dialog-centered modal-xs'>
                <ModalHeader className='bg-transparent' toggle={() => setTicketshow(!Ticketshow)}>Create Event Ticket</ModalHeader>
                <ModalBody className=''>
                    <Row>
                        <Col md={12} className="justify-content-center d-flex">
                            <div className="tab-button-box">
                                {/* tab-button-active */}
                                <span onClick={() => { setTickettype(1); setPricedisable(false); }} className={Tickettype === 1 ? "tab-button-active" : ""}>Paid</span>
                                <span onClick={() => { setTickettype(2); setPricedisable(true); setPrice(''); }} className={Tickettype === 2 ? "tab-button-active" : ""}>Free</span>
                                {/* <span onClick={() => { setTickettype(3); setPricedisable(true); setPrice(''); }} className={Tickettype === 3 ? "tab-button-active" : ""}>Donation</span> */}
                            </div>
                        </Col>
                        <Col md={12} className="mb-2 mt-4">
                            <label htmlFor="" className="text-black">Ticket name</label>
                            <input type="text" class="form-control input-default" onChange={(e) => setTicketname(e.target.value)} value={Ticketname} placeholder="Ticket name" />
                        </Col>
                        <Col md={12} className="mb-2">
                            <label htmlFor="" className="text-black">Ticket short description</label>
                            <textarea type="text" class="form-control input-default" onChange={(e) => setTicketdesc(e.target.value)} placeholder="Ticket short description" >{Ticketdesc}</textarea>
                        </Col>
                        <Col md={6} className="mb-2">
                            <label htmlFor="" className="text-black">Available ticket quantity</label>
                            <input type="number" class="form-control input-default" onChange={(e) => setQuantity(e.target.value)} value={Quantity} placeholder="Available ticket quantity" />
                        </Col>
                        <Col md={6} className="mb-2">
                            <label htmlFor="" className="text-black">Ticket price</label>
                            <Input type="number" disabled={Pricedisable} class="form-control input-default" value={Price} onChange={(e) => setPrice(e.target.value)} placeholder="Ticket Price" />
                        </Col>
                        <div className="col-6">
                            <input
                                type="checkbox"
                                id={`checkbox-groupticket`}
                                checked={Isgrouptickets}
                                onChange={(event) => setIsgrouptickets(event.target.checked)}
                            />
                            <label style={{ marginLeft: '10px' }} htmlFor={`checkbox-groupticket`}>Create a group tickets ?</label>
                            <div>
                                {Isgrouptickets && (
                                    <>
                                        <input type="number" class="form-control input-default" onChange={(e) => setGroupQty(e.target.value)} value={GroupQty} placeholder="Enter group quantity" />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                {EventSubtype == 2 && (
                                    <>
                                        <div className="col-md-12 mt-4">
                                            <label htmlFor="" className="text-black">Select Date & Time<span className="text-danger">*</span></label>
                                            <Select
                                                isClearable={false}
                                                options={MeDTOption}
                                                className='react-select select-theme'
                                                classNamePrefix='select'
                                                onChange={selectMeDTOption}
                                                value={SelectedMEDT}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-12">
                            <p className="mb-0">Ticket Scan Start From</p>
                        </div>
                        <Col md={6} className="mb-2 mt-1">
                            <label htmlFor="" className="text-black">Date</label>
                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                <input type="text" class="form-control date-border-redius date-border-redius-input bg-white" placeholder="" readOnly value={get_date_time(TicketStartdate)[0].Dateview} />
                                <div className="date-style-picker">
                                    <Flatpickr
                                        value={TicketStartdate}
                                        data-enable-time
                                        id='date-picker'
                                        className='form-control'
                                        onChange={date => setTicketStartdate(date)}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="mb-2 mt-1">
                            <label htmlFor="" className="text-black">Time</label>
                            <div class="input-group mb-3 input-warning-o">
                                <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                <input type="text" class="form-control date-border-redius-input  bg-white" placeholder="" readOnly value={get_date_time(TicketStartdate)[0].Timeview} />
                            </div>
                        </Col>
                        <Col md={12} className="mb-2"></Col>
                        <Col md={12} className="text-center">
                            {EditId && (
                                <>
                                    {Loader ? (
                                        <button type="button" className="text-white btn theme-bg w-100 ">Please wait...</button>
                                    ) : (
                                        <>
                                            {TicketUid ? (
                                                <button type="button" onClick={() => handelUpdateTicket(EditId)} className=" w-100 text-white btn theme-bg">Update ticket</button>
                                            ) : (
                                                <button type="button" onClick={() => handelCreateTicket(EditId)} className=" w-100 text-white btn theme-bg">Add ticket</button>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}
export default Type;