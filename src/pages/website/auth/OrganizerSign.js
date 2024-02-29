import React, { useEffect, useState } from "react";
import Footer from '../../../components/footer';
import HeaderMenu from '../../../components/headermenu';
import MobileMenu from '../../../components/mobilemenu';
import toast from 'react-hot-toast';
import { apiurl, organizer_url } from '../../../common/Helpers';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Country } from "country-state-city";
import 'react-phone-input-2/lib/style.css';
import SignupImg from '../../../common/image/signup.svg';
import Select from "react-select";
const About = () => {
    const lottewidth = {
        width: 'auto',
        height: '320px'
    }
    const { orgid } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        setCountries(
            Country.getAllCountries().map(({ isoCode, name }) => ({
                value: isoCode,
                label: name,
            }))
        );
    }, []);
    const [Loader, setLoader] = useState(false);
    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    const [uBankaccount, setuBankaccount] = useState();
    const [uConfirmBankaccount, setuConfirmBankaccount] = useState();
    const [uBankname, setuBankname] = useState();
    const [uHoldername, setuHoldername] = useState();
    const [uSwift, setuSwift] = useState();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countries, setCountries] = useState([]);

    const HandelLogin = async (e) => {
        e.preventDefault();
        try {
            if (
                !Password ||
                !ConfirmPassword ||
                !uBankaccount ||
                !uConfirmBankaccount ||
                !uBankname ||
                !uHoldername ||
                !uSwift ||
                !selectedCountry
            ) {
                return toast.error('Required field must not be empty');
            }
            if (Password.length > 7) {
            } else {
                return toast.error("Password must be at least 8 characters long");
            }
            if (Password === ConfirmPassword) {
            } else {
                return toast.error("Password and confirm password not match");
            }
            if (uBankaccount == uConfirmBankaccount) {

            } else {
                return toast.error('Account no and confirm account no not match');
            }
            setLoader(true);
            const requestData = {
                id: orgid,
                bankaccount: uBankaccount,
                bankname: uBankname,
                holdername: uHoldername,
                swiftcode: uSwift,
                bank_country_value: selectedCountry.value,
                bank_country_label: selectedCountry.label,
                password: Password,
            };
            fetch(apiurl + 'auth/organizer-account-active', {
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
                        localStorage.setItem('organizerid', data.data._id);
                        localStorage.setItem('organizername', data.data.name);
                        localStorage.setItem('organizer_role', 1);
                        toast.success('Login successful', {
                            duration: 3000,
                        });
                        navigate(organizer_url + 'dashboard');
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    };


    return (
        <>
            {/* <!-- mobile nav --> */}
            <HeaderMenu />
            <div class="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
                <MobileMenu />
                <h1 class="banner-h fw-bold text-white text-uppercase mb-0 pb-0 animate__animated animate__bounce">
                    Activate Your Account
                </h1>
                <div class="banner-child bg-white px-0" style={{ border: '1px solid #eee' }}>
                    <form onSubmit={HandelLogin}>
                        <div className='row form-area'>
                            <div className="col-md-6">
                                <div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <p>
                                                    Password <span className="text-danger">*</span>
                                                </p>
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={Password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <p>
                                                    Confirm Password <span className="text-danger">*</span>
                                                </p>
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    value={ConfirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <p>Account no <span className="text-danger">*</span></p>
                                                <input className="form-control" type="text" placeholder="Account no" value={uBankaccount} onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} onChange={(e) => setuBankaccount(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <p>Confirm Account no <span className="text-danger">*</span></p>
                                                <input className="form-control" type="text" placeholder="Confirm Account no" value={uConfirmBankaccount} onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} onChange={(e) => setuConfirmBankaccount(e.target.value)}></input>
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
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <p>Bank Country <span className="text-danger">*</span></p>
                                                <Select
                                                    options={countries}
                                                    value={selectedCountry}
                                                    onChange={setSelectedCountry}
                                                    placeholder="Select Bank Country"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='button-area mt-4'>

                                        {Loader ? (
                                            <button type='button' className="signup-page-button">Please wait...</button>
                                        ) : (
                                            <button type='submit' className="signup-page-button">Submit</button>
                                        )}

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="text-center">
                                    <img className="no-result-img admin-login-img" src={SignupImg} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* </div> */}
            <div class="space-height" style={{ height: '600px' }}></div>
            <Footer />
        </>
    );
};

export default About;
