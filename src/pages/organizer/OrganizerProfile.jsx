import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url, isEmail, app_url } from '../../common/Helpers';
import Whitebtn from '../../component/Whitestarbtn';
import PhoneInput from 'react-phone-input-2';
import Nouserphoto from '../../common/image/nouser.png';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(false);
    const [ApiLoader, setApiLoader] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);
    const organizerid = localStorage.getItem('organizerid')
    const [name, setname] = useState();
    const [fname, setfname] = useState();
    const [lname, setlname] = useState();
    const [email, setemail] = useState();
    const [message, setmessage] = useState();
    const [badge, setbadge] = useState();
    const [phone_number, setphone_number] = useState();
    const [whatsapp_number, setwhatsapp_number] = useState();
    const [address, setaddress] = useState();
    const [city, setcity] = useState();
    const [state, setstate] = useState();
    const [country, setcountry] = useState();
    const [pincode, setpincode] = useState();
    const [Bankaccount, setBankaccount] = useState();
    const [Bankname, setBankname] = useState();
    const [Holdername, setHoldername] = useState();
    const [Swift, setSwift] = useState();

    const [ufname, setufname] = useState();
    const [ulname, setulname] = useState();
    const [uemail, setuemail] = useState();
    const [uBankaccount, setuBankaccount] = useState();
    const [uConfirmBankaccount, setuConfirmBankaccount] = useState();
    const [uBankname, setuBankname] = useState();
    const [uHoldername, setuHoldername] = useState();
    const [uSwift, setuSwift] = useState();

    const [uwhatsapp_number, setuwhatsapp_number] = useState();
    const [uaddress, setuaddress] = useState();
    const [upincode, setupincode] = useState();
    const [userHobbies, setuserHobbies] = useState([]);

    const [password, setpassword] = useState();
    const [confirmpassword, setconfirmpassword] = useState();
    const [oldpassword, setoldpassword] = useState();
    const [picture, setpicture] = useState();

    const [Hobby, setHobby] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const fetchData = async () => {
        try {
            setApiLoader(true)
            const requestData = {
                id: organizerid,
            };
            fetch(apiurl + 'admin/get-organizer-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setname(data.data.name);
                        setfname(data.data.first_name);
                        setlname(data.data.last_name);
                        setemail(data.data.email);
                        setufname(data.data.first_name);
                        setulname(data.data.last_name);
                        setuemail(data.data.email);
                        setpicture(data.data.profile_picture);
                        setSelecteDp(null);
                        setphone_number(data.data.phone_number);
                        setBankaccount(data.data.bankaccount);
                        setBankname(data.data.bankname);
                        setHoldername(data.data.holdername);
                        setSwift(data.data.swiftcode);

                        setuBankaccount(data.data.bankaccount);
                        setuConfirmBankaccount(data.data.bankaccount);
                        setuBankname(data.data.bankname);
                        setuHoldername(data.data.holdername);
                        setuSwift(data.data.swiftcode);

                    }
                    setApiLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiLoader(false)
        }
    }
    const Handelchangeemail = async () => {
        try {
            if (!isEmail(uemail)) {
                return toast.error('Enter valid email address');
            }
            if (!oldpassword) {
                return toast.error('Enter valid password');
            }
            setLoader(true);
            const requestData = {
                email: uemail,
                password: oldpassword,
                id: organizerid,
            }
            fetch(apiurl + 'website/update-organizer-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success(data.data);
                        setuemail('');
                        setoldpassword('')
                        setLoader(false)
                        fetchData();
                    } else {
                        toast.error(data.message);
                    }

                })
                .catch(error => {
                    setLoader(false)
                    toast.error(error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            setLoader(false)
            toast.error(error.message);
            console.error('Api error:', error);
        }
    }
    const Handelprofileupdate = async () => {
        try {
            if (!ufname || !ulname || !uemail || !uBankaccount || !uBankname || !uConfirmBankaccount || !uHoldername || !uSwift) {
                return toast.error('Required field must not be empty');
            }
            if (uBankaccount == uConfirmBankaccount) {

            } else {
                return toast.error('Account no and confirm account no not match');
            }
            setLoader(true);
            const requestData = {
                first_name: ufname,
                last_name: ulname,
                id: organizerid,
                bankaccount: uBankaccount,
                bankname: uBankname,
                holdername: uHoldername,
                swiftcode: uSwift,
                profile_picture: Dpname
            }
            fetch(apiurl + 'website/update-organizer-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success(data.data);
                        setufname('');
                        setulname('');
                        setuemail('');
                        setLoader(false)
                        fetchData();
                    } else {
                        toast.error(data.message);
                    }

                })
                .catch(error => {
                    setLoader(false)
                    toast.error(error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            setLoader(false)
            toast.error(error.message);
            console.error('Api error:', error);
        }
    }
    const Handelchangepassword = async () => {
        try {
            if (!password || !confirmpassword || !oldpassword) {
                return toast.error('Required field must not be empty');
            }
            if (password.length > 7) {

            } else {
                return toast.error('Password must be at least 8 characters long');
            }
            if (password === confirmpassword) {

            } else {
                return toast.error('Password and confirm password not match');
            }
            setLoader(true);
            const requestData = {
                password: password,
                id: organizerid,
                oldpassword: oldpassword
            }
            fetch(apiurl + 'website/update-organizer-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success(data.data);
                        setpassword('');
                        setconfirmpassword('');
                        setoldpassword('');
                        setLoader(false)
                    } else {
                        toast.error(data.message)
                    }
                })
                .catch(error => {
                    setLoader(false)
                    toast.error(error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            setLoader(false)
            console.error('Api error:', error);
        }
    }

    const [selecteDp, setSelecteDp] = useState(null);
    const [Dpname, setDpname] = useState();
    const handleBannerImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setSelecteDp(URL.createObjectURL(img));
            uploadBannerToServer(e.target.files[0]);
        }
    };
    const uploadBannerToServer = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile); // 'image' is the parameter name expected by your API
            const response = await fetch('https://tixme.co/tixme_storage/api/upload-image', {
                method: 'POST',
                body: formData, // No headers needed, as FormData sets the Content-Type to multipart/form-data
            });
            if (!response.ok) {
                toast.error('Image not uploaded try again');
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            if (result) {
                setDpname(result.image_name);
                setpicture(selecteDp);
            } else {
                return toast.error('Image not uploaded try again');
            }
        } catch (error) {
            toast.error('Image not uploaded try again');
            console.error('Error uploading the image:', error);

        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="profile card card-body px-3 pt-3 pb-0">
                                <div className="profile-head">
                                    <div className="photo-content">
                                        <div className="cover-photo rounded"></div>
                                    </div>
                                    <div className="profile-info">
                                        <div className="profile-photo">
                                            <img src={picture ? picture : Nouserphoto} style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '100%' }} alt="" />
                                        </div>
                                        <div className="profile-details">

                                            {ApiLoader ? (<div className="mt-5 mb-3 l-background w-100" style={{ height: '100px' }}> </div>) : (
                                                <>
                                                    <div className="profile-name px-3 pt-2">
                                                        <h4 className="text-primary mb-0">{name}</h4>
                                                        <p>{phone_number ? '+' + phone_number : 'No phone number'}</p>
                                                    </div>
                                                    <div className="profile-email px-2 pt-2">
                                                        <h4 className="text-muted mb-0">{email}</h4>
                                                        <p>Email</p>
                                                    </div>

                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="profile-tab">
                                                {ApiLoader ? (<div className="mt-5 mb-3 l-background w-100" style={{ height: '200px' }}> </div>) : (
                                                    <div className="custom-tab-1">
                                                        <ul className="nav nav-tabs">
                                                            <li className="nav-item"><a href="#about-me" data-bs-toggle="tab" className="nav-link  active show">Personal Information</a>
                                                            </li>
                                                            <li className="nav-item"><a href="#profile-settings" data-bs-toggle="tab" className="nav-link">Setting</a>
                                                            </li>
                                                            <li className="nav-item"><a href="#email-settings" data-bs-toggle="tab" className="nav-link">Change Email</a>
                                                            </li>
                                                            <li className="nav-item"><a href="#password-settings" data-bs-toggle="tab" className="nav-link">Change Password</a>
                                                            </li>
                                                        </ul>

                                                        <div className="tab-content pt-5">
                                                            <div id="email-settings" className="tab-pane">
                                                                <div className="pt-3">
                                                                    <div className="settings-form">
                                                                        <h4 className="text-primary">Edit Email Id</h4>
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <Row>
                                                                                        <Col md={12}>
                                                                                            <div className="form-group">
                                                                                                <p className="mb-0">Email address <span className="text-danger">*</span></p>
                                                                                                <input className="form-control" type="text" placeholder="Email Address" value={uemail} onChange={(e) => setuemail(e.target.value)}></input>
                                                                                            </div>
                                                                                        </Col>
                                                                                        <Col md={12}>
                                                                                            <div className="form-group">
                                                                                                <p className="mb-0">Password<span className="text-danger">*</span></p>
                                                                                                <input className="form-control" type="password" placeholder="Enter password" value={oldpassword} onChange={(e) => setoldpassword(e.target.value)}></input>
                                                                                            </div>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </div>
                                                                            </div>
                                                                            {Loader ? (
                                                                                <span>
                                                                                    <Whitebtn title={'Please wait...'} />
                                                                                </span>
                                                                            ) : (
                                                                                <span onClick={Handelchangeemail}>
                                                                                    <Whitebtn title={'Update email'} />
                                                                                </span>
                                                                            )}
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id="about-me" className="tab-pane active show">
                                                                <div className="profile-personal-info">

                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Name <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{name}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Email <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{email}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Phone Number <span className="pull-end">:</span></h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{phone_number ? '+' + phone_number : 'No phone number'}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Account no<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Bankaccount}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Bank name<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Bankname}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Account holder name<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Holdername}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">SWIFT code<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Swift}</span>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div id="profile-settings" className="tab-pane">
                                                                <div className="pt-3">
                                                                    <div className="settings-form">
                                                                        <h4 className="text-primary">Account Setting</h4>
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Upload your Icon<span className="text-danger">*</span></p>
                                                                                        <input
                                                                                            type="file"
                                                                                            id="imageInputbanner"
                                                                                            accept="image/*"
                                                                                            className="form-control"
                                                                                            onChange={handleBannerImageChange}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    {selecteDp ? (
                                                                                        <img src={selecteDp} alt="Uploaded" style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '100%' }} />
                                                                                    ) : ''}
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>First Name <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="First Name" value={ufname} onChange={(e) => setufname(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Last Name <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Last Name" value={ulname} onChange={(e) => setulname(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <h3>Bank Details</h3>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Account no <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Account no" value={uBankaccount} onChange={(e) => setuBankaccount(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Confirm Account no <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Confirm Account no" value={uConfirmBankaccount} onChange={(e) => setuConfirmBankaccount(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Bank name <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Bank name" value={uBankname} onChange={(e) => setuBankname(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Account holder name <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Account holder name" value={uHoldername} onChange={(e) => setuHoldername(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>SWIFT code <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="SWIFT code" value={uSwift} onChange={(e) => setuSwift(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {Loader ? (
                                                                                <span>
                                                                                    <Whitebtn title={'Please wait...'} />
                                                                                </span>
                                                                            ) : (
                                                                                <span onClick={Handelprofileupdate}>
                                                                                    <Whitebtn title={'Update'} />
                                                                                </span>
                                                                            )}
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id="password-settings" className="tab-pane">
                                                                <div className="pt-3">
                                                                    <div className="settings-form">
                                                                        <h4 className="text-primary">Change Password</h4>
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Old Password<span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="password" placeholder="Enter old password" value={oldpassword} onChange={(e) => setoldpassword(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6"></div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">

                                                                                        <p>Password <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="password" placeholder="Enter password" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6"></div>
                                                                                <div className="col-md-6">

                                                                                    <div className="form-group">
                                                                                        <p>Confirm Password <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Enter confirm password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {Loader ? (
                                                                                <span>
                                                                                    <Whitebtn title={'Please wait...'} />
                                                                                </span>
                                                                            ) : (
                                                                                <span onClick={Handelchangepassword}>
                                                                                    <Whitebtn title={'Update password'} />
                                                                                </span>
                                                                            )}
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Dashboard;