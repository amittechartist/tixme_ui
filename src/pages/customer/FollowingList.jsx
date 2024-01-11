import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, customer_url, isEmail, app_url } from '../../common/Helpers';
import Searchicon from '../../common/icon/searchicon.png';
import Norecord from '../../component/Norecordui';
import Eventlogo from "../../common/icon/eventlogo.svg";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import QRCode from 'react-qr-code';
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const Beartoken = localStorage.getItem('userauth');

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Now filter the events based on the search term
        if (value) {
            const filteredEvents = Alllist.filter(event =>
                event.organizername.toLowerCase().includes(value.toLowerCase()));
            setListitems(filteredEvents);
        } else {
            // If the search term is empty, reset to show all events
            setListitems(Alllist);
        }
    };

    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const [Alllist, setAlllist] = useState([]);
    const MySwal = withReactContent(Swal);
    function CheckDelete(id) {
        MySwal.fire({
            title: 'Are you sure you want to unfollow?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Unfollow(id)
            } else if (result.isDenied) {

            }
        })
    }
    const Unfollow = async (organizerid) => {
        try {
            setLoader(true)
            const requestData = {
                organizerid: organizerid
            }
            fetch(apiurl + "website/follow-organizer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success == true) {
                        fetchList()
                    } else {

                    }
                })
                .catch((error) => {
                    console.error("Insert error:", error);
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false)
        }
    }
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'website/following-organizer-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                        console.log("s",data.data);
                        setAlllist(data.data);
                    } else {
                    }
                    setLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false)
        }

    }


    useEffect(() => {
        if (!Beartoken) {
            toast.error("Login to your account");
            navigate(app_url + 'auth/customer/signup');
            return;
        }
        fetchList();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4  grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            <Row>
                                                <Col md={6}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search Organizer"
                                                            value={searchTerm}
                                                            onChange={handleSearchChange}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={12}>
                                            {Loader ? (
                                                <div className="linear-background w-100"> </div>
                                            ) : (
                                                <>
                                                    <Row>
                                                        {Listitems.length > 0 ? (
                                                            <>
                                                                {
                                                                    Listitems.map((item, index) => (
                                                                        <Col md={3}>
                                                                            <div className="my-follower-account-box text-center">
                                                                                <img
                                                                                    height={70}
                                                                                    width={70}
                                                                                    src={Eventlogo}
                                                                                    alt=""
                                                                                    className="organiger-logo mb-2"
                                                                                />
                                                                                {/* <p className="org-name">{item.organizername}</p> */}
                                                                                <Link to={`${customer_url}organizer-events/${item.organizerid}`}><p className="org-name">{item.organizername}</p></Link>
                                                                                <p className="org-event-count">{item.eventDataCount} Events</p>
                                                                                <button onClick={() => CheckDelete(item.organizerid)} type="button" class="Unfollow-btn-1">Unfollow</button>
                                                                            </div>
                                                                        </Col>
                                                                    ))
                                                                }
                                                            </>
                                                        ) : (
                                                            <Norecord />
                                                        )}
                                                    </Row>
                                                </>
                                            )}

                                        </Col>
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