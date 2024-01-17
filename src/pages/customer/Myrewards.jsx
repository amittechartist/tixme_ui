import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl } from '../../common/Helpers';
import Nouserphoto from '../../common/image/nouser.png';
import RewardBg from '../../common/image/reqard.svg';
import Silver from '../../common/image/star/Group 1171274979.svg';
import Gold from '../../common/image/star/Group 1171274980.svg';
import Prem from '../../common/image/star/Group 1171274981.svg';
import Swal from 'sweetalert2';
import Norecord from '../../component/Norecordui';
import withReactContent from 'sweetalert2-react-content';
import Ticketimg from '../../assets/ticketbox.png';
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";
const Dashboard = ({ title }) => {
    const MySwal = withReactContent(Swal);
    const Beartoken = localStorage.getItem('userauth');
    const [name, setName] = useState();
    const [picture, setpicture] = useState();
    const [userdata, setuserdata] = useState();

    const [packages, setPackages] = useState([]);
    const [loader, setLoader] = useState(true);
    const [CouponLoader, setCouponLoader] = useState(false);
    const [CouponLoaderTwo, setCouponLoaderTwo] = useState(false);
    const [CouponList, setCouponList] = useState([]);
    const [Packloader, setPackloader] = useState(true);
    const [Packloaderxxx, setPackloaderxxx] = useState(true);

    const [Percentage, setPercentage] = useState();
    const [mypoint, setmypoint] = useState();
    const [currentPackage, setcurrentPackage] = useState();
    const [nextTarget, setnextTarget] = useState();
    const [Couponstate, setCouponstate] = useState('new');

    const [MyCouponList, setMyCouponList] = useState([]);
    const [MyCouponlistLoader, setMyCouponlistLoader] = useState(true);


    const [Packagelist, setPackagelist] = useState([]);


    const fetchData = async () => {
        try {
            setLoader(true);
            fetch(apiurl + 'website/get-user-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setpicture(data.data.picture);
                        setName(data.data.first_name);
                        setuserdata(data.data);
                        setLoader(false);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    const fetchcouponData = async () => {
        try {
            setCouponLoaderTwo(true);
            fetch(apiurl + 'website/get-coupon-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setCouponList(data.data);
                    }
                    setCouponLoaderTwo(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setCouponLoaderTwo(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setCouponLoaderTwo(false);
        }
    }
    const fetchMycouponList = async () => {
        try {
            setMyCouponlistLoader(true);
            fetch(apiurl + 'website/get-redeem-coupon-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setMyCouponList(data.data);
                        setMyCouponlistLoader(false);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setMyCouponlistLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setMyCouponlistLoader(false);
        }
    }

    const fetchPackage = async () => {
        try {
            setPackloader(true)
            setPackloaderxxx(true)
            fetch(apiurl + 'order/calculate-per', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setPercentage(data.data);
                        setmypoint(data.mypoint);
                        setnextTarget(data.nextTarget);
                        setcurrentPackage(data.currentPackage);
                    } else {

                    }
                    setPackloader(false)
                    setPackloaderxxx(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setPackloader(false)
                    setPackloaderxxx(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setPackloader(false)
            setPackloaderxxx(false)
        }
    }
    const fetchAllpackage = async () => {
        try {
            setPackloader(true)
            fetch(apiurl + 'order/get-package-withpercentage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setPackagelist(data.data);
                    } else {

                    }
                    setPackloader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setPackloader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setPackloader(false)
        }
    }
    useEffect(() => {
        fetchData();
        fetchPackage();
        fetchcouponData(); //list of active coupon
        fetchMycouponList(); // my redeem coupon list
        // get-pachage-withpercentage
        fetchAllpackage();
    }, []);
    function CheckRedeem(id) {
        MySwal.fire({
            title: 'Are you sure you want to redeem this coupon?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                HandelDoRedeem(id);
            } else if (result.isDenied) {

            }
        })
    }
    const HandelDoRedeem = async (id) => {
        try {
            setCouponLoader(true);
            const requestData = {
                id: id
            };
            fetch(apiurl + 'website/redeem-coupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success("Redeem successfully")
                        fetchData();
                        fetchPackage();
                        fetchcouponData();
                        fetchMycouponList();
                    } else {
                        toast.error(data.message);
                    }
                    setCouponLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setCouponLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setCouponLoader(false);
        }
    }
    const getItemClass = (itemName) => {
        return `px-3 flex-item under_line_css ${Couponstate === itemName ? 'under_line_css_active' : ''}`;
    }
    const HandelCopyTxt = (itemName) => {
        navigator.clipboard.writeText(itemName);
        toast.success('Copied');
    }

    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4 grey-bg">
                                <Card.Body>
                                    <Row>
                                        <Col md={12}>
                                            <div className="reward-ui-box p-4">
                                                <Row>
                                                    {loader || Packloader ? (
                                                        <div className="linear-background w-100"> </div>
                                                    ) : (
                                                        <>
                                                            <Col md={6}>
                                                                <img src={picture ? picture : Nouserphoto} height={50} width={50} alt="" /> <span className="rewrd-user-name1">Hi <span style={{ textTransform: 'capitalize' }}>{name}</span></span>
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className="text-end">
                                                                    <p className="reward-point-count">{userdata.wallet ? userdata.wallet : 0}</p>
                                                                </div>
                                                            </Col>
                                                            {Packloaderxxx ? (
                                                                <></>
                                                            ) : (
                                                                <>
                                                                <Col md={12} className="pb-3">
                                                                    <Row style={{ borderBottom: '1px solid #000' }}>
                                                                        <Col md={4} xl={4} sm={4} className="text-center">
                                                                            <div className="border-right" style={{ borderColor: '#000', borderWidth: '1px' }}>
                                                                                <p className="rewarx-box-c-title">Your status</p>
                                                                                <p className="rewarx-box-c-sts"><span>{currentPackage.name ? currentPackage.name + ' TIER' : ''}</span></p>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={4} xl={4} sm={4} className="text-center">
                                                                            <div className="border-right" style={{ borderColor: '#000', borderWidth: '1px' }}>
                                                                                <p className="rewarx-box-c-title">Points to reach {nextTarget.name}</p>
                                                                                <p className="rewarx-box-c-sts">{nextTarget.pointsToNextTarget}</p>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={4} className="text-center">
                                                                            <div>
                                                                                <p className="rewarx-box-c-title">Next TIER</p>
                                                                                <p className="rewarx-box-c-sts">{nextTarget.name} TIER</p>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            

                                                            <Col md={6}>
                                                                <p className="Booking-progress-towards">Booking progress towards  <span>{nextTarget.name} TIER</span></p>
                                                            </Col>
                                                            <Col md={6} className="text-end">
                                                                <p className="Booking-progress-towards"><span>{nextTarget.purchaseAmount}</span> Points for {nextTarget.name} TIER</p>
                                                            </Col>
                                                            </>
                                                            )}
                                                            {Packloader ? '' : (
                                                                <Col md={12} className="mt-4">
                                                                    <div className="reward-box" style={{ position: 'relative' }}>
                                                                        <span className="reward_star" style={{ left: Percentage }}>
                                                                            <img src={Silver} alt="" />
                                                                            <p className="reward_star_text" style={{ fontSize: '18px' }}>{userdata.plan_name ? userdata.plan_name + ' TIER' : 'Next ' + nextTarget.name}</p>
                                                                        </span>
                                                                        {/* fetch scal data     */}
                                                                        {Packagelist.map((item, index) => (
                                                                            item.name === "Gold" && (
                                                                                <span className="reward_star" style={{ left: `${parseInt(item.percentage) - 7}%` }}>
                                                                                    <img src={Gold} alt="" />
                                                                                    <p className="reward_star_text" style={{ fontSize: '13px', textAlign: 'center' }}>Gold TIER</p>
                                                                                </span>
                                                                            )
                                                                            ||
                                                                            item.name === "Platinum" && (
                                                                                <span className="reward_star" style={{ left: `${parseInt(item.percentage) - 7}%` }}>
                                                                                    <img src={Prem} alt="" />
                                                                                    <p className="reward_star_text" style={{ fontSize: '13px', textAlign: 'center' }}>Platinum TIER</p>
                                                                                </span>
                                                                            )
                                                                        ))}

                                                                        <img src={RewardBg} style={{ height: '100%', width: '100%', objectFit: 'contain' }} alt="" />
                                                                    </div>
                                                                </Col>
                                                            )}
                                                        </>
                                                    )}
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col md={12} className="mt-5">
                                            {CouponLoader ? (
                                                <div className="linear-background w-100"> </div>
                                            ) : (
                                                <Row>
                                                    <Col md={12} className="mt-4">
                                                        <h3 className="ml-3" style={{ fontWeight: '600' }}>COUPON</h3>
                                                    </Col>
                                                    <Col md={12} className="mt-4">
                                                        <div className="navigation-box">
                                                            <ul className="d-flex flex-row">
                                                                <li className={getItemClass('new')} onClick={() => setCouponstate('new')}>New Coupon</li>
                                                                <li className={getItemClass('old')} onClick={() => setCouponstate('old')}>My redeem coupon</li>
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                    {Couponstate == 'new' ? (
                                                        <>
                                                            {CouponLoaderTwo ? (
                                                                <div className="linear-background w-100"> </div>
                                                            ) : (
                                                                <>
                                                                    {CouponList.length == 0 ? (
                                                                        <Norecord />
                                                                    ) : (
                                                                        <>
                                                                            {CouponList.map((item, index) => (
                                                                                <Col md={6} className="mb-5">
                                                                                    <div className="tickret-show-box">
                                                                                        <img src={Ticketimg} alt="" className="ticketimg-bg" />
                                                                                        <p className="mb-0" style={{ fontSize: '25px', fontWeight: '600', color: '#000', textTransform: 'uppercase' }}>{item.name}</p>
                                                                                        <p className="">Points amount {item.point}</p>
                                                                                        <button onClick={() => CheckRedeem(item._id)} className="redem-btn">Redeem</button>
                                                                                    </div>
                                                                                </Col>
                                                                            ))}
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    ) : ''}
                                                    {Couponstate == 'old' ? (
                                                        <>
                                                            {MyCouponlistLoader ? (
                                                                <div className="linear-background w-100"> </div>
                                                            ) : (
                                                                <>
                                                                    {MyCouponList.length > 0 ? (
                                                                        <>
                                                                            {
                                                                                MyCouponList.map((item, index) => (
                                                                                    <Col md={6} className="mb-5">
                                                                                        <div className="tickret-show-box">
                                                                                            <img src={Ticketimg} alt="" className="ticketimg-bg" />
                                                                                            <p className="mb-0" style={{ fontSize: '25px', fontWeight: '600', color: '#000', textTransform: 'uppercase' }}>{item.coupondata[0].name}</p>
                                                                                            <p className="">Points amount {item.coupondata[0].point}</p>
                                                                                            <span className="token-no-span">{item.tokenno}</span>
                                                                                            {item.isvalid == 0 ? (<button type="button" onClick={() => HandelCopyTxt(item.tokenno)} className="redem-copy-btn"><FiCopy /> Copy</button>) : (<button type="button" disabled className="btn btn-dark">Expired</button>)}

                                                                                        </div>
                                                                                    </Col>
                                                                                ))
                                                                            }
                                                                        </>

                                                                    ) : (
                                                                        <Norecord />
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    ) : ''}

                                                </Row>
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >

        </>
    )
}
export default Dashboard;