import React, { useEffect, useState } from "react";
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
const Component = () => {
    // STATE
    const [modal, setModal] = useState(false);
    const [ModalLoader, setModalLoader] = useState(true);
    const [CustomerData, setCustomerData] = useState();

    const removeQrlocaldata = () => {
        localStorage.removeItem("qrid");
        localStorage.removeItem("qrtype");
    }
    
    const handelQrviewModal = () => {
        setModal(!modal);
        removeQrlocaldata();
    }
    return (
        <>
            <Modal isOpen={modal} toggle={() => handelQrviewModal()} centered size={'xl'}>
                <ModalHeader toggle={() => handelQrviewModal()}>Order Details
                </ModalHeader>
                <ModalBody>
                    <Row className="justify-content-center">
                        {ModalLoader && !localStorage.getItem("qrid") ? (
                            <>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                            </>
                        ) : (
                            <>
                                <Col md={6} xl={2} className="tickets-data-text">
                                    <div>
                                        <h5 className="text-bold">Email :</h5>
                                        <p>{CustomerData.email}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">Phone :</h5>
                                        <p>{CustomerData.phone_number}</p>
                                    </div>
                                    {/* <div>
                                        <h5 className="text-bold">Address :</h5>
                                        <p>{CustomerData.address} {CustomerData.address ? (',' + CustomerData.address) : ''}</p>
                                    </div> */}
                                </Col>
                                <Col md={6} xl={2} className="tickets-data-text">
                                    {/* <div>
                                        <h5 className="text-bold">Event Name :</h5>
                                        <p>{OrderData.name ? OrderData.name : '--'}</p>
                                    </div> */}
                                    {/* <div>
                                        <h5 className="text-bold">State :</h5>
                                        <p>{CustomerData.state ? CustomerData.state : '--'}</p>
                                    </div> */}
                                    <div>
                                        <h5 className="text-bold">Country :</h5>
                                        <p>{CustomerData.country ? CustomerData.country : '--'}</p>
                                    </div>
                                </Col>
                                <Col md={6} xl={3} className="tickets-data-text">
                                    <div>
                                        <h5 className="text-bold">BOOKING ID :</h5>
                                        <p>{Ordersavedata.bookingid}</p>
                                    </div>
                                    {/* <div>
                                        <h5 className="text-bold">TYPE :</h5>
                                        <p>{Ordersavedata.order_amount && Ordersavedata.order_amount > 0 ? 'Paid' : 'Free'}</p>
                                    </div> */}
                                    <div>
                                        <h5 className="text-bold">Total Ticket :</h5>
                                        <p>{Orderitemlist.length}</p>
                                    </div>
                                    {/* {Orderitemlist.length > 0 ? (
                                        <div>
                                            {ShowQr ? (
                                                <button className="btn btn-success list-Ticket-mng-1" onClick={() => setShowQr(!ShowQr)} type="button">Hide All Scanners</button>
                                            ) : (
                                                <button className="btn btn-success list-Ticket-mng-1" onClick={() => setShowQr(!ShowQr)} type="button">View All Scanners</button>
                                            )}
                                        </div>
                                    ) : ''} */}
                                </Col>
                                {/* <Col md={6} xl={4}>
                                    <div className="tickets-data-text-last">
                                        <h4 style={{ fontWeight: '700' }}>Tickect Scan Status</h4>
                                        {Isscan ? (
                                            <span class="badge-theme-success badge-theme"><FaCircleCheck /> Success</span>
                                        ) : (
                                            <span class="badge-theme-warning badge-theme"><FaClock /> Pending</span>
                                        )}
                                    </div>
                                    <div className="d-none">
                                        <div className="row my-2">
                                            {Orderitemlist.map((item, index) => (
                                                <div className="col-6 col-md-4 col-lg-3 col-xl-3">
                                                    <div className="m-2 text-center">
                                                        {item.is_transfer == 1 ? (
                                                            <img style={{ height: "auto", width: "50px" }} src={QRsuccess} className="qr-scanner-success" alt="" />
                                                        ) : (
                                                            <>
                                                                {item.scan_status == 0 ? (
                                                                    <QRCode style={{ height: "auto", width: "50px" }} value={JSON.stringify({ id: item._id, time: 1, index: index })} />
                                                                ) : (
                                                                    <img style={{ height: "auto", width: "50px" }} src={QRsuccess} className="qr-scanner-success" alt="" />
                                                                )
                                                                }
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Col> */}
                                <Col md={12}>
                                    <Row className="pt-2 mt-4 justify-content-center" style={{ borderTop: '1px solid #eee' }}>
                                        <h4 style={{ fontWeight: '700' }}>Tickect Scan Status</h4>
                                        {Orderitemlist.map((item, index) => (
                                            <Col md={3}>
                                                <div className="ticket-box">
                                                    <div className="ticket-qr text-center">
                                                        {item.is_transfer == 1 ? (
                                                            <>
                                                                <img src={QRsuccess} className="qr-scanner-success dashqrbig" alt="" />
                                                                <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                <p className="mb-0 mt-4" style={{ fontWeight: 600, color: '#000' }}>Transferred to</p>
                                                                <span class="mt-0 badge-theme-success badge-theme mt-3 mb-3 d-block w-100"><FaCircleCheck /> {item.owner_email}</span>
                                                            </>
                                                        ) : (
                                                            <div className="text-center">
                                                                {item.scan_status == 0 ? (
                                                                    <>
                                                                        <div className="transfer_box" style={{ position: 'relative' }}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={checkedItemIds.includes(item._id)}
                                                                                onChange={() => handleCheckboxChange(item._id)}
                                                                                style={{ position: 'absolute', top: '10px', left: '10px' }}
                                                                            />
                                                                            <QRCode className="dashqrbig" value={JSON.stringify({ id: item._id, time: 1, index: index })} />
                                                                            <p className="mb-0 mt-1" style={{ fontSize: '12px', fontWeight: 400, color: '#000', textTransform: 'capitalize' }}>{item._id}</p>
                                                                            <p className="mb-0 mt-3" style={{ fontWeight: 500, color: '#000', textTransform: 'capitalize' }}><span style={{ textTransform: 'capitalize' }}>{item.ticket_name}</span> Ticket : {index + 1}</p>
                                                                            <p className="mb-0 mt-1" style={{ fontWeight: 600, color: '#000' }}>Scan status</p>
                                                                            <span class="mt-0 badge-theme-warning badge-theme mt-3 mb-3 d-block w-100"><FaClock /> Pending</span>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <img src={QRsuccess} className="qr-scanner-success dashqrbig" alt="" />
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
                                        {checkedItemIds.length > 0 ? (
                                            <>
                                                <Col md={12}></Col>
                                                <Col md={3}>
                                                    <button type="button" onClick={() => { setModal(!modal); setModalTT(!modalTT); setModalLoader(false) }} className="w-100 btn btn-success">Transfer</button>
                                                </Col>
                                            </>
                                        ) : ''}
                                    </Row>
                                </Col>
                            </>
                        )}
                    </Row>
                </ModalBody>
            </Modal>
        </>
    );
}
export default Component;