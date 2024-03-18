import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url, laravelapi, laravel_asset } from '../../../common/Helpers';
import { useNavigate } from "react-router-dom";
import Norecord from '../../../component/Norecordui';
import Select from 'react-select'
import { Country } from 'country-state-city';
import { AiFillEye } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { FaPenClip, FaRegTrashCan, FaTrash } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toast from "react-hot-toast";
const Dashboard = ({ title }) => {
    const MySwal = withReactContent(Swal);
    const [Loader, setLoader] = useState(false);
    const [BtnLoader, setBtnLoader] = useState(false);
    const [admindata, setadmindata] = useState();
    const [Bannerimg, setBannerimg] = useState(null);
    const [upid, setupid] = useState();
    const [userid, setuserid] = useState();
    const [newpassword, setnewpassword] = useState();
    const [connewpassword, setconnewpassword] = useState();
    const [oldpassword, setoldpassword] = useState();

    const [image, setimage] = useState();
    const fetchDetails = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'admin/get-admin-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setadmindata(data.data);
                        setupid(data.data._id);
                        setBannerimg(data.data.picture ? laravel_asset + data.data.picture : null);
                        setuserid(data.data.username ? data.data.username : '');
                    } else {
                        toast.error(data.message)
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
        fetchDetails();
    }, []);
    const emptyData = () => {
        setnewpassword("");
        setconnewpassword("");
        setoldpassword("");
        setimage("");
    }
    const onsubmit = async (image) => {
        try {
            const requestData = {
                img_url: image ? image : null,
                userid: userid,
                upid: upid
            };
            fetch(apiurl + 'admin/update-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Created', {
                            duration: 6000,
                        });
                        emptyData();
                        fetchDetails();
                    }
                    setBtnLoader(false);
                })
                .catch(error => {
                    toast.error(error.message, {
                        duration: 5000,
                    });
                    setBtnLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setBtnLoader(false);
        }
    }
    const Passwordupdate = async () => {
        if (!newpassword || newpassword.length <= 4) {
            toast.error('New password must be at least 5 characters long');
            return;
        }
        if (!connewpassword || connewpassword.length <= 4) {
            toast.error('Confirm new password must be at least 5 characters long');
            return;
        }
        if (newpassword === connewpassword) {

        } else {
            toast.error('New Password and confirm new password not match');
            return;
        }
        if (!oldpassword || oldpassword.length <= 4) {
            toast.error('Old password must be at least 5 characters long');
            return;
        }
        try {
            setBtnLoader(true);
            const requestData = {
                newpass: connewpassword,
                oldpass: oldpassword,
                upid: upid
            };
            fetch(apiurl + 'admin/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Password changed successfully', {
                            duration: 6000,
                        });
                        emptyData();
                    }else{
                        toast.error(data.message, {
                            duration: 5000,
                        });
                    }
                    setBtnLoader(false);
                })
                .catch(error => {
                    toast.error(error.message, {
                        duration: 5000,
                    });
                    setBtnLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setBtnLoader(false);
        }
    }
    const handleBannerImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setBannerimg(URL.createObjectURL(img));
            setimage(e.target.files[0]);
        }
    };
    const uploadBannerToServer = async () => {
        if (!image && !Bannerimg) {
            toast.error('Image not selected');
            return;
        }
        if (!userid) {
            toast.error('Enter userid');
            return;
        }
        setBtnLoader(true);
        const formData = new FormData();
        formData.append('image', image); // 'image' is the parameter name expected by your API
        try {
            const response = await fetch(laravelapi + 'upload-image', {
                method: 'POST',
                body: formData, // No headers needed, as FormData sets the Content-Type to multipart/form-data
            });

            if (!response.ok) {
                setBtnLoader(false);
                setBannerimg(null);
                toast.error('Image not uploaded try again');
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Image uploaded successfully:', result);
            if (result) {
                onsubmit(result.image_name);
            } else {
                setBannerimg(null);
                setBtnLoader(false);
                return toast.error('Image not uploaded try again');
            }

            // Handle the response here (e.g., showing a success message, updating UI)
        } catch (error) {
            setBannerimg(null);
            toast.error('Image not uploaded try again');
            console.error('Error uploading the image:', error);
            setBtnLoader(false);
        }
    };
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="">
                                <Card.Body className="py-4">
                                    <form>
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-12 col-lg-4 border p-2">
                                                <div className="text-center mb-2">
                                                    <h4>Update Profile</h4>
                                                    <hr className="my-0"></hr>
                                                </div>
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'column',
                                                        cursor: 'pointer',
                                                        border: '3px dashed #eee'
                                                    }}
                                                    onClick={() => document.getElementById('imageInputbanner').click()}
                                                >
                                                    {Bannerimg ? (
                                                        <img src={Bannerimg} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                    ) : (
                                                        <p className="mb-0">Select Profile Picture</p>
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="imageInputbanner"
                                                        accept="image/*"
                                                        onChange={handleBannerImageChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                </div>
                                                <div className="col-md-12 mb-2">
                                                    <label htmlFor="" className="text-black">Userid <span className="text-danger">*</span></label>
                                                    <input type="text" class="form-control input-default" placeholder="Enter userid" value={userid} onChange={(e) => setuserid(e.target.value)} />
                                                </div>
                                                <div className="">
                                                    {BtnLoader ? (
                                                        <button type="button" className="w-100 btn theme-bg text-white">Wait...</button>
                                                    ) : (
                                                        <button type="button" onClick={() => uploadBannerToServer()} className="w-100 btn theme-bg text-white">Update</button>
                                                    )}
                                                </div>
                                                <hr></hr>
                                                <div className="col-md-12 mb-2">
                                                    <label htmlFor="" className="text-black">New Password <span className="text-danger">*</span></label>
                                                    <input type="text" class="form-control input-default" placeholder="Enter new password" value={newpassword} onChange={(e) => setnewpassword(e.target.value)} />
                                                </div>
                                                <div className="col-md-12 mb-2">
                                                    <label htmlFor="" className="text-black">Confirm New Password <span className="text-danger">*</span></label>
                                                    <input type="text" class="form-control input-default" placeholder="Enter confirm new password" value={connewpassword} onChange={(e) => setconnewpassword(e.target.value)} />
                                                </div>
                                                <div className="col-md-12 mb-2">
                                                    <label htmlFor="" className="text-black">Old Password <span className="text-danger">*</span></label>
                                                    <input type="text" class="form-control input-default" placeholder="Enter old password" value={oldpassword} onChange={(e) => setoldpassword(e.target.value)} />
                                                </div>
                                                <div className="">
                                                    {BtnLoader ? (
                                                        <button type="button" className="w-100 btn theme-bg text-white">Wait...</button>
                                                    ) : (
                                                        <button type="button" onClick={() => Passwordupdate()} className="w-100 btn theme-bg text-white">Update Password</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <hr className="my-3"></hr>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>_
            </div>

        </>
    )
}
export default Dashboard;