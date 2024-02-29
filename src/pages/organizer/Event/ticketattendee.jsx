import React, { useEffect, useState } from "react";
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import DateIcon from "../../../common/icon/date 2.svg";
import Norecord from '../../../component/Norecordui';
import QRsuccess from '../../../common/icon/qr-code-pay.png';
import toast from 'react-hot-toast';
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { FiClock, FiChevronDown } from "react-icons/fi";
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { FaRegCreditCard } from "react-icons/fa";
import Searchicon from '../../../common/icon/searchicon.png';
import { apiurl, shortPer, get_date_time, get_min_date } from '../../../common/Helpers';
import Table from 'react-bootstrap/Table';
import { FaCircleCheck } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const ExcelJS = require("exceljs");
const Dashboard = ({ title }) => {
    const { id, name, ticket_id } = useParams();
    const [Loader, setLoader] = useState(false);
    const [ModalLoader, setModalLoader] = useState(true);
    const [Listitems, setListitems] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [Tickettype, setTickettype] = useState();
    const [activeItem, setActiveItem] = useState('all');

    const [Ordersavedata, setOrdersavedata] = useState();
    const [Orderitemlist, setOrderitemlist] = useState();
    const [OrderData, setOrderData] = useState();
    const [CustomerData, setCustomerData] = useState();
    const [Isscan, setIsscan] = useState(false);
    const [modal, setModal] = useState(false);
    const [ShowQr, setShowQr] = useState(false);

    const [Startdate, setStartdate] = useState(new Date());
    const [Endtdate, setEndtdate] = useState(new Date());
    const [viewStartdate, setviewStartdate] = useState();
    const [viewEndtdate, setviewEndtdate] = useState();
    const [valueStartdate, setvalueStartdate] = useState();
    const [valueEndtdate, setvalueEndtdate] = useState();
    const [EventData, setEventData] = useState();
    const [OrderItemslist, setOrderItemslist] = useState([]);
    const handelStartdatechange = (date) => {
        setStartdate(date);
        const get_start_date = get_date_time(date);
        setviewStartdate(get_start_date[0].Dateview);
        setvalueStartdate(get_min_date(date));
    }
    const products = [{
        "id": "test",
        "title": "test",
        "brand": "test",
        "category": "test",
        "price": "test",
        "rating": "test",
    }]
    const handelEnddatechange = (date) => {
        setEndtdate(date);
        const get_end_date = get_date_time(date);
        setviewEndtdate(get_end_date[0].Dateview);
        setvalueEndtdate(get_min_date(date));
    }

    const [Daterange, setDaterange] = useState(false);
    const HandelDatefilterreset = () => {
        setviewStartdate('');
        setviewEndtdate('');
        setvalueStartdate('');
        setvalueEndtdate('');
        setListitems(dataList);
        setDaterange(!Daterange);
    }
    const HandelDatefilter = () => {
        if (!valueStartdate) {
            return toast.error('Start date is requied')
        }
        if (!valueEndtdate) {
            return toast.error('End date is requied')
        }
        handleDateRangeChange(valueStartdate, valueEndtdate);
    }
    const handleDateRangeChange = (startDate, endDate) => {
        if (startDate && endDate) {
            const filteredEvents = dataList.filter(event => {
                const eventDate = event.mindate; // Date of the event

                // Check if the event's date is within the given date range
                return eventDate >= startDate && eventDate <= endDate;
            });
            setListitems(filteredEvents);
        } else {
            // If either startDate or endDate is missing, reset to show all events
            setListitems(dataList);
        }
        setDaterange(!Daterange);
    };



    const generateRandomNumber = () => {
        return Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    };
    const fetchOrders = async () => {
        try {
            setLoader(true);
            const requestData = {
                eventid: id,
                // ticket_id: ticket_name ? ticket_name : null
            };
            fetch(apiurl + 'order/event/orders-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        if (ticket_id) {
                            const filteredEvents = data.data.filter(event =>
                                event.ordersevent.some(orderEvent => orderEvent.ticket_id == ticket_id)
                            );
                            setListitems(filteredEvents);
                        } else {
                            setListitems(data.data);
                        }
                        setDataList(data.data);
                        setEventData(data.eventdata);
                        setOrderItemslist(data.orderitems);
                    }
                    setLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false);
                });
        } catch (error) {
            toast.error(error);
            setLoader(false);
        }
    }
    const filterData = (status) => {
        setActiveItem(status);
        if (status === 'all') {
            setLoader(true);
            setListitems(dataList);
            setLoader(false);
        } else {
            setLoader(true);
            const filteredData = dataList.filter(item => {
                if (status === 'pending') return item.payment_status == 0;
                if (status === 'succeeded') return item.payment_status == 1;
                if (status === 'declined') return item.payment_status == 2;
            });
            setListitems(filteredData);
            setLoader(false);
        }
    };
    const getItemClass = (itemName) => {
        return `px-3 flex-item under_line_css ${activeItem === itemName ? 'under_line_css_active' : ''}`;
    }
    const fetchOrderData = async (id) => {
        try {
            setModalLoader(true);
            setShowQr(false);
            const requestData = {
                id: id
            };
            fetch(apiurl + 'order/organization/get-order-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        // setOrdersavedata(data.data.ordersavedata);
                        setOrderitemlist(data.data.orderitemlist);
                        if (data.data.orderitemlist.length > 0) {
                            const check = data.data.orderitemlist.every(item => item.scan_status === 1);
                            setIsscan(check);
                        } else {
                            setIsscan(false);
                        }
                        setOrderData(data.data.orderData);
                        setCustomerData(data.data.customerData);
                    }
                    setModalLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setModalLoader(false);
                });
        } catch (error) {
            toast.error(error);
            setModalLoader(false);
        }
    }
    useEffect(() => {
        fetchOrders();
        setTickettype(ticket_id);
    }, [ticket_id]);
    console.log(ticket_id);
    useEffect(() => {
        handleVisibilityChange();
    }, [Tickettype]);

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Now filter the events based on the search term across multiple fields
        if (value) {
            const filteredEvents = dataList.filter(event =>
                event._id.toLowerCase().includes(value.toLowerCase()) ||
                event.amount.toString().toLowerCase().includes(value.toLowerCase()) ||
                event.name.toLowerCase().includes(value.toLowerCase()));
            setListitems(filteredEvents);
        } else {
            // If the search dataList is empty, reset to show all events
            setListitems(dataList);
        }
    };

    const handleVisibilityChange = () => {
        // if (selectedVisibility === '1') {
        //     const filteredEvents = dataList.filter(event =>
        //         event.order_amount != null && event.order_amount > 0);
        //     setListitems(filteredEvents);
        // } else if (selectedVisibility === '2') {
        //     const filteredEvents = dataList.filter(event =>
        //         event.order_amount == null);
        //     setListitems(filteredEvents);
        // } else {
        //     setListitems(dataList);
        // }
        if (Tickettype) {
            const filteredEvents = dataList.filter(event =>
                event.ordersevent.some(orderEvent => orderEvent.ticket_id == Tickettype)
            );
            setListitems(filteredEvents);

        } else {
            setListitems(dataList);
        }
    };


    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("My Sheet");


        sheet.getRow(1).font = {
            name: 'Calibri',
            family: 4,
            size: 16,
            bold: true,
        };

        sheet.columns = [
            {
                header: "Sl No",
                key: "id",
                width: 10,
            },
            { header: "Customer Name", key: "CustomerName", width: 32 },
            { header: "Customer Email", key: "CustomerEmail", width: 32 },
            { header: "Booking ID", key: "Bookingid", width: 32 },
            { header: "Ticket Name", key: "NumberofTickets", width: 32 },
            { header: "Is Scan", key: "Status", width: 32 },
            { header: "Date", key: "Creationdate", width: 40 },
        ];

        const filteredOrderItemslist = OrderItemslist.filter(item => {
            if (Tickettype || ticket_id) {
                return item.ticket_id === ticket_id || item.ticket_type === Tickettype;
            }
            return true;
        });

        const promise = Promise.all(
            filteredOrderItemslist?.map(async (product, index) => {
                const rowNumber = index + 1;
                sheet.addRow({
                    id: rowNumber,
                    CustomerName: product?.owner_name,
                    CustomerEmail: product?.owner_email,
                    Bookingid: product?._id,
                    NumberofTickets: product?.ticket_name,
                    Status: product?.scan_status == "1" ? 'Yes' : 'No',
                    Creationdate: product?.date + '  ' + product?.time,
                });
            })
        );

        promise.then(() => {
            const priceCol = sheet.getColumn(5);

            // iterate over all current cells in this column
            priceCol.eachCell((cell) => {
                const cellValue = sheet.getCell(cell?.address).value;
                // add a condition to set styling
                if (cellValue > 50 && cellValue < 1000) {
                    sheet.getCell(cell?.address).fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FF0000" },
                    };
                }
            });

            workbook.xlsx.writeBuffer().then(function (data) {
                const blob = new Blob([data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = "download.xlsx";
                anchor.click();
                window.URL.revokeObjectURL(url);
            });
        });
    };

    const exportPdf = () => {
        const doc = new jsPDF();

        const tableColumn = [
            "Sl No",
            "Customer Name",
            "Customer Email",
            "Booking ID",
            "Ticket Name",
            "Is Scan",
            "Date",
        ]; // Define your table headers
        const filteredOrderItemslist = OrderItemslist.filter(item => {
            if (Tickettype || ticket_id) {
                return item.ticket_id === ticket_id || item.ticket_type === Tickettype;
            }
            return true;
        });
        const tableRows = filteredOrderItemslist.map((item, index) => [
            index + 1,
            item.owner_name,
            item.owner_email,
            item._id,
            item.ticket_name,
            item.scan_status === "1" ? "Yes" : "No",
            `${item.date} ${item.time}`,
        ]);

        // Add the header and table data to the PDF
        doc.autoTable(tableColumn, tableRows, { startY: 20 });

        // Add a title to the PDF
        doc.text(`Order Items List`, 14, 15);

        // Save the PDF
        doc.save("order-items-list.pdf");
    };

    return (
        <>
            <Modal isOpen={Daterange} toggle={() => setDaterange(!Daterange)} centered>
                <ModalHeader toggle={!Daterange}>Select date</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6} className="mb-2 mt-0">
                            <label htmlFor="" className="text-black">Start Date</label>
                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                <input type="text" class="pl-5 form-control date-border-redius date-border-redius-input date_filter" placeholder="Select date" readOnly value={viewStartdate} />
                                <div className="date-style-picker">
                                    <Flatpickr
                                        value={Startdate}
                                        id='date-picker'
                                        className='form-control'
                                        onChange={date => handelStartdatechange(date)}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="mb-2 mt-0">
                            <label htmlFor="" className="text-black">End Date</label>
                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                <input type="text" class="pl-5 form-control date-border-redius date-border-redius-input date_filter" placeholder="Select date" readOnly value={viewEndtdate} />
                                <div className="date-style-picker">
                                    <Flatpickr
                                        value={Endtdate}
                                        id='date-picker'
                                        className='form-control'
                                        onChange={date => handelEnddatechange(date)}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <button onClick={HandelDatefilter} className="mb-0 mr-5  btn btn-success list-Ticket-mng-1 w-100" type="button">Filter</button>
                        </Col>
                        <Col md={6}>
                            <button onClick={HandelDatefilterreset} className="mb-0 mr-5  btn btn-dark list-Ticket-mng-1 w-100" type="button">Reset</button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>

            <Modal isOpen={modal} toggle={() => setModal(!modal)} centered size={'xl'}>
                <ModalHeader toggle={() => setModal(!modal)}></ModalHeader>
                <ModalBody>
                    <Row className="justify-content-center">
                        {ModalLoader ? (
                            <>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                            </>
                        ) : (
                            <>
                                <Col md={12} className="text-center">
                                    <h5 className="modal-title mb-3">Order Details</h5>
                                </Col>
                                <Col md={3} className="tickets-data-text">
                                    <div>
                                        <h5 className="text-bold">Email :</h5>
                                        <p>{CustomerData.email}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">Phone :</h5>
                                        <p>{CustomerData.phone_number}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">Country :</h5>
                                        <p>{CustomerData.country ? CustomerData.country : '--'}</p>
                                    </div>
                                </Col>
                                <Col md={3} className="tickets-data-text">
                                    <div>
                                        <h5 className="text-bold">BOOKING ID :</h5>
                                        <p>{OrderData._id}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">TYPE :</h5>
                                        <p>{OrderData.amount && Number(OrderData.amount) > 0 ? 'Paid' : 'Free'}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">total Ticket :</h5>
                                        <p>{Orderitemlist.length}</p>
                                    </div>
                                </Col>
                                {/* <Col md={4}>
                                    <div className="tickets-data-text-last">
                                        <h4 style={{ fontWeight: '700' }}>Tickect Scan Status</h4>
                                        {Isscan ? (
                                            <span class="badge-theme-success badge-theme"><FaCircleCheck /> Success</span>
                                        ) : (
                                            <span class="badge-theme-warning badge-theme"><FaClock /> Pending</span>
                                        )}
                                    </div>
                                </Col> */}
                                <Col md={12}>
                                    <Row className="pt-2 mt-4 justify-content-center text-center" style={{ borderTop: '1px solid #eee' }}>
                                        <h5 className="modal-title my-2">Tickect Scan Status</h5>
                                        {Orderitemlist.map((item, index) => (
                                            <Col md={3}>
                                                <div className="ticket-box">
                                                    <div className="ticket-qr text-center">
                                                        {item.is_transfer == 1 ? (
                                                            <>
                                                                <img style={{ height: "auto", width: "150px" }} src={QRsuccess} className="qr-scanner-success" alt="" />
                                                                <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                <p className="mb-0 mt-4" style={{ fontWeight: 600, color: '#000' }}>Transferred to</p>
                                                                <span class="mt-0 badge-theme-success badge-theme mt-3 mb-3 d-block w-100"><FaCircleCheck /> {item.owner_email}</span>
                                                            </>
                                                        ) : (
                                                            <div className="text-center">
                                                                {item.scan_status == 0 ? (
                                                                    <>
                                                                        <QRCode style={{ height: "auto", width: "150px" }} value={JSON.stringify({ id: item._id, time: generateRandomNumber(), index: index })} />
                                                                        <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                        <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                        <p className="mb-0 mt-1" style={{ fontWeight: 600, color: '#000' }}>Scan status</p>
                                                                        <span class="mt-0 badge-theme-warning badge-theme mt-3 mb-3 d-block w-100"><FaClock /> Pending</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <img style={{ height: "auto", width: "150px" }} src={QRsuccess} className="qr-scanner-success" alt="" />
                                                                        <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                        <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                        <p className="mb-0 mt-1" style={{ fontWeight: 600, color: '#000' }}>Scan status</p>
                                                                        <span class="mt-0 badge-theme-success badge-theme mt-3 mb-3 d-block w-100"><FaCircleCheck /> Success</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>

                            </>
                        )}
                    </Row>
                </ModalBody>
            </Modal>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-1 grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            <h3>{name}</h3>
                                        </Col>
                                        <Col md={6} className="text-end">
                                            {/* <button className="theme-btn-light px-2 mr-3">
                                                <span className="theme-btn-icon"><FiDownloadCloud /></span> <span>Export</span>
                                            </button>
                                            <button className="theme-btn px-2">
                                                <span className="theme-btn-icon"><FiPlus /></span> <span>Add Attendee</span>
                                            </button> */}
                                        </Col>
                                        <Col md={12} className="mt-4">
                                            <div className="navigation-box">
                                                <ul className="d-flex flex-row">
                                                    <li className={getItemClass('all')} onClick={() => filterData('all')}>All payments</li>
                                                    <li className={getItemClass('succeeded')} onClick={() => filterData('succeeded')}>Succeeded</li>
                                                    <li className={getItemClass('pending')} onClick={() => filterData('pending')}>Pending</li>
                                                    <li className={getItemClass('declined')} onClick={() => filterData('declined')}>Declined</li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col md={12} className="py-3">
                                            <Row>
                                                <Col md={3}>
                                                    <div class="input-group mb-3 input-warning-o" onClick={() => setDaterange(!Daterange)}>
                                                        <span class="input-group-text search-box-icon-1"><FiClock /></span>
                                                        <input type="text" class="form-control" value={viewStartdate && viewEndtdate ? viewStartdate + '-' + viewEndtdate : ''} placeholder="Date range" />
                                                        <span class="input-group-text search-box-icon-1"><FiChevronDown /></span>
                                                    </div>
                                                </Col>

                                                <Col md={3}>
                                                    {Loader ? '' : (
                                                        <div className="input-group mb-3 input-warning-o">
                                                            <select
                                                                className="form-select"
                                                                onChange={e => setTickettype(e.target.value)}
                                                                value={Tickettype || ticket_id}
                                                                defaultValue=""
                                                            >
                                                                <option value="">Select Ticket Type</option>
                                                                {EventData && EventData.allprice.map((item) => (
                                                                    <>
                                                                        {item.isdelete == 0 && (
                                                                            <option value={item.id}>{item.name}</option>
                                                                        )}
                                                                    </>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}
                                                </Col>
                                                <Col md={4}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search by amount , booking id, customer name..."
                                                            value={searchTerm}
                                                            onChange={handleSearchChange}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={1}>
                                                    <buttom onClick={exportPdf} type="button" class="text-white btn theme-bg w-100"><FaFilePdf /></buttom>
                                                </Col>
                                                <Col md={1}>
                                                    <buttom onClick={exportExcelFile} type="button" class="text-white btn theme-bg w-100"><FaFileExcel /></buttom>
                                                </Col>
                                            </Row>
                                        </Col>
                                        {Loader ? (
                                            <div className="linear-background w-100"></div>
                                        ) : (
                                            <>
                                                {Listitems.length > 0 ? (
                                                    <Col md={12} className="white-table">
                                                        <Table responsive>
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-center" key={1}>Customer Name</th>
                                                                    <th className="text-center" key={1}>Membership</th>
                                                                    <th className="text-center" key={1}>Booking ID</th>
                                                                    <th className="text-center" key={1}>Number of Tickets</th>
                                                                    <th className="text-center" key={1}>Status</th>
                                                                    <th className="text-center" key={1}>Amount</th>
                                                                    <th className="text-center" key={1}>Applied Coupon</th>
                                                                    <th className="text-center" key={1}>Creation date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Listitems.map((item, index) => (
                                                                    <tr>
                                                                        <td>

                                                                            {item.name}

                                                                        </td>
                                                                        <td>
                                                                            {item.userdetails.length > 0 && item.userdetails[0].login_type === "Guest" ? (
                                                                                <h5><span class="badge badge-info  text-uppercase">Guest</span></h5>
                                                                            ) : (
                                                                                <h5><span class="badge badge-warning text-uppercase">{item.userdetails[0].plan_name}</span></h5>
                                                                            )}
                                                                        </td>
                                                                        <td>{shortPer(item._id, 20)}</td>
                                                                        <td>{item.orderitems && item.orderitems.length}</td>
                                                                        <td>
                                                                            {item.payment_status == 0 ? (
                                                                                <><span class="badge-theme-warning badge-theme"> Pending</span></> //<FaClock />
                                                                            ) : ''}

                                                                            {item.payment_status == 1 ? (
                                                                                <><span class="badge-theme-success badge-theme"> Success</span></> //<FaCircleCheck />
                                                                            ) : ''}

                                                                            {item.payment_status == 2 ? (
                                                                                <><span class="badge-theme-danger badge-theme"> Declined</span></> //<FaCircleMinus />
                                                                            ) : ''}

                                                                        </td>
                                                                        <td>
                                                                            {Number(item.amount) && Number(item.amount) > 0 ? (
                                                                                <>{EventData && EventData.countrysymbol} {item.amount}</>
                                                                            ) : (
                                                                                'Free'
                                                                            )}
                                                                        </td>
                                                                        <td>{item.couponid ? (<><span class="badge-theme-success badge-theme">Yes</span></>) : (<span class="badge-theme-danger badge-theme">No</span>)}</td>
                                                                        <td>{item.date} {item.time} <span onClick={() => { setModal(!modal); fetchOrderData(item._id) }} className="order-view-btn"><FaChevronDown /></span></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                ) : (
                                                    <Norecord />
                                                )}
                                            </>
                                        )}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default Dashboard;