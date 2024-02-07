import React, { useState } from "react";
import Indiaflag from "../common/image/India.svg";
import Usaflag from "../common/image/usaf.svg";
import Singapureflag from "../common/image/singapur.svg";
const ContactDetails = () => {
    const [tabno, setTabno] = useState(2);
    return (
        <>
            <div className="address-sec banner-child-address py-5 px-md-0 px-3">
                <div className="d-flex justify-content-center">
                    <div onClick={() => setTabno(2)} className={tabno == 2 ? 'mx-lg-4 mx-2 animate__animated animate__bounce xyss xxx-conta' : 'mx-lg-4 mx-2 animate__animated animate__bounce xxx-conta'}>
                        <p className="sssas">singapore</p>
                        <img className="flag-icon" src={Singapureflag}></img>
                    </div>
                    <div onClick={() => setTabno(3)} className={tabno == 3 ? 'mx-lg-4 mx-2 animate__animated animate__bounce xyss xxx-conta' : 'mx-lg-4 mx-2 animate__animated animate__bounce xxx-conta'}>
                        <p className="sssas">USA</p>
                        <img className="flag-icon" src={Usaflag}></img>
                    </div>
                    <div onClick={() => setTabno(1)} className={tabno == 1 ? 'mx-lg-4 mx-2 animate__animated animate__bounce xyss xxx-conta' : 'mx-lg-4 mx-2 animate__animated animate__bounce xxx-conta'}>
                        <p className="sssas">India</p>
                        <img className="flag-icon" src={Indiaflag}></img>
                    </div>
                </div>
                <div className="contact-sec contact-sec-box m-auto px-2 px-lg-5 py-4 mt-4">
                    {
                        tabno === 1 && (
                            <>
                                <div>
                                    <span className="text-primary-color text-uppercase fw-bold">Address:{" "}</span>
                                    <span>
                                        Office No 3N, Vijay Chambers
                                        Premises CHS LTD, Grant Road, Tribhuvan
                                        Road, Mumbai, Maharashtra 400004
                                    </span>
                                </div>
                                <div>
                                    <span className="text-primary-color text-uppercase fw-bold">Email:{" "}</span>
                                    <span>tixme.india@gmail.com</span>
                                </div>
                                <div>
                                    <span className="text-primary-color text-uppercase fw-bold">Phone:{" "}</span>
                                    <span>+91 8080292007 (WhatsApp)</span>
                                </div>
                            </>
                        )
                    }
                    {
                        tabno === 2 && (
                            <>
                                <div>
                                    <span className="text-primary-color text-uppercase fw-bold">Address:{" "}</span>
                                    <span>
                                        10 Jalan Besar, #17-02 Sim Lim 
                                        Tower, Singapore 208787
                                    </span>
                                </div>
                                <div>
                                    <span className="text-primary-color text-uppercase fw-bold">Email:{" "}</span>
                                    <span> tixme.sg@gmail.com</span>
                                </div>
                                <div>
                                    <span className="text-primary-color text-uppercase fw-bold">Phone:{" "}</span>
                                    <span>+65 90288903 (WhatsApp)</span>
                                </div>

                            </>
                        )
                    }
                    {
                        tabno === 3 && (
                            <>
                                <div>
                                    <span className="text-primary-color text-uppercase fw-bold">Address:{" "}</span>
                                    <span>
                                        660 Washington Street, Boston, MA 02111

                                    </span>
                                </div>
                                <div>
                                    <span className="text-primary-color text-uppercase fw-bold">Email:{" "}</span>
                                    <span>tixme.usa@gmail.com</span>
                                </div>
                                <div>
                                    <span className="text-primary-color text-uppercase fw-bold">Phone:{" "}</span>
                                    <span>+1 (617) 775-0311</span>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default ContactDetails;