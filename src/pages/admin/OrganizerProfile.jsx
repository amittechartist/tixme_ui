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
    const [ApiLoader, setApiLoader] = useState(true);

    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);
    const { id, username } = useParams();
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
    const [picture, setpicture] = useState();

    const [ufname, setufname] = useState();
    const [ulname, setulname] = useState();
    const [uemail, setuemail] = useState();
    const [uwhatsapp_number, setuwhatsapp_number] = useState();
    const [uaddress, setuaddress] = useState();
    const [upincode, setupincode] = useState();
    const [userHobbies, setuserHobbies] = useState([]);

    const [password, setpassword] = useState();
    const [confirmpassword, setconfirmpassword] = useState();

    const [Hobby, setHobby] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [Orgdata, setOrgdata] = useState();

    const fetchData = async () => {
        try {
            setApiLoader(true)
            const requestData = {
                id: id,
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
                        setOrgdata(data.data); 
                        setApiLoader(false)
                    }
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
    console.log("x",Orgdata);
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
                                            <img src={Orgdata.picture ? Orgdata.picture : Nouserphoto} className="img-fluid rounded-circle" alt="" />
                                        </div>
                                        <div className="profile-details">

                                            {ApiLoader ? (<div className="mt-5 mb-3 l-background w-100" style={{ height: '100px' }}> </div>) : (
                                                <>
                                                    <div className="profile-name px-3 pt-2">
                                                        <h4 className="text-primary mb-0">{Orgdata.name}</h4>
                                                        <p>{Orgdata.phone_number ? '+' + Orgdata.phone_number : 'No phone number'}</p>
                                                    </div>
                                                    <div className="profile-email px-2 pt-2">
                                                        <h4 className="text-muted mb-0">{Orgdata.email}</h4>
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
                                                        </ul>

                                                        <div className="tab-content pt-5">
                                                            <div id="about-me" className="tab-pane active show">
                                                                
                                                                <div className="profile-personal-info">
                                                                    
                                                                <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Name <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Orgdata.name}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Email <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Orgdata.email}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Phone Number <span className="pull-end">:</span></h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Orgdata.phone_number ? '+' + Orgdata.phone_number : 'No phone number'}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Account no<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Orgdata.Bankaccount}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Bank name<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Orgdata.Bankname}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Account holder name<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Orgdata.Holdername}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">SWIFT code<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Orgdata.Swift}</span>
                                                                        </div>
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