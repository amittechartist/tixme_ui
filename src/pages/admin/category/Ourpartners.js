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
    const [Listitems, setListitems] = useState([]);
    const [Bannerimg, setBannerimg] = useState(null);
    const [image, setimage] = useState();
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'website/partnerslist', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
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
        fetchList();
    }, []);
    const emptyData = () => {
        setBannerimg(null);
    }
    const onsubmit = async (image) => {
        try {
            const requestData = {
                img_url: image
            };
            fetch(apiurl + 'admin/insert/partner', {
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
                        fetchList();
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
    const Delete = async (id) => {
        MySwal.fire({
            title: 'Are you sure to delete this?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Delete',  // Change this text for the confirm button
            denyButtonText: 'Cancel',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const requestData = {
                        upid: id
                    };
                    fetch(apiurl + 'admin/delete/partner', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success == true) {
                                toast.success('Deleted', {
                                    duration: 6000,
                                });
                                fetchList();
                            }
                        })
                        .catch(error => {
                            toast.error(error.message, {
                                duration: 5000,
                            });
                        });
                } catch (error) {
                    console.error('Api error:', error);
                }
            } else if (result.isDenied) {

            }
        })
    }
    const handleBannerImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setBannerimg(URL.createObjectURL(img));
            setimage(e.target.files[0]);
        }
    };
    const uploadBannerToServer = async () => {
        if (!image) {
            toast.error('Image not selected');
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
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'column',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => document.getElementById('imageInputbanner').click()}
                                                >
                                                    {Bannerimg ? (
                                                        <img src={Bannerimg} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                    ) : (
                                                        <p>Select Image</p>
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="imageInputbanner"
                                                        accept="image/*"
                                                        onChange={handleBannerImageChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                </div>

                                                <div className="">
                                                    {BtnLoader ? (
                                                        <button type="button" className="w-100 btn theme-bg text-white">Wait...</button>
                                                    ) : (
                                                        <button type="button" onClick={() => uploadBannerToServer()} className="w-100 btn theme-bg text-white">Submit</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <hr className="my-3"></hr>
                                    <div className="row">
                                        {Listitems && Listitems.map((item) => (
                                            <div className="col-md-4 mb-2">
                                                <div className="border p-5 text-center">
                                                    <img height={'50px'} width={'150px'} src={laravel_asset + item.img_url}></img>
                                                </div>
                                                <div>
                                                    <button type="button" className="btn btn-danger w-100 btn-sm" onClick={() => Delete(item._id)}><FaTrash /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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