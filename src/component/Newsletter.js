import React, { useState, useEffect } from "react";
import { apiurl, isEmail } from '../common/Helpers';
import arrow from "../assets/arrow.svg";
import newsMan from "../common/newsletter.svg";
import toast from "react-hot-toast";
const Component = ({ title }) => {
    const [UpdatesLoader, setUpdatesLoader] = useState(false);
    const [Updatesprivacy, setUpdatesprivacy] = useState(false);
    const [UpdatesName, setUpdatesName] = useState();
    const [UpdatesEmail, setUpdatesEmail] = useState();
    const HandelUpdatesForm = async (e) => {
        e.preventDefault();
        try {
            if (!UpdatesName) {
                return toast.error('Enter your name');
            }
            if (!UpdatesEmail || !isEmail(UpdatesEmail)) {
                return toast.error('Enter valid email id');
            }
            if (!Updatesprivacy) {
                return toast.error('Please agree to the privacy statement.');
            }
            setUpdatesLoader(true);
            const requestData = {
                name: UpdatesName,
                email: UpdatesEmail,
            }
            fetch(apiurl + "website/subscribe-insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success === true) {
                        toast.success(data.message);
                        setUpdatesprivacy(false);
                        setUpdatesName('');
                        setUpdatesEmail('');
                    } else {
                        toast.error(data.message);
                    }
                    setUpdatesLoader(false);
                })
                .catch((error) => {
                    console.error("Insert error:", error);
                    setUpdatesLoader(false);
                });
        } catch (error) {
            console.error("Login api error:", error);
            setUpdatesLoader(false);
        }
    };

    return (
        <div className="newsletter-sec pb-4 position-relative mt-3 mt-md-0">
        <div className="newsletter-sec-bg">
            <form onSubmit={HandelUpdatesForm}>
                <div className="md-absolute news-form">
                    <h5 className="fw-bold text-primary-color mb-0 pt-2 animate__animated animate__bounce">
                        Stay in the loop & receive event updates!
                    </h5>
                    <div className="d-flex my-2 mt-md-1 mt-lg-3 mt-xl-3 flex-md-row flex-column">
                        <input
                            className="w-auto form-control rounded me-md-3 me-5 mb-md-0 mb-3"
                            type="text"
                            name=""
                            id=""
                            onChange={(e) => setUpdatesName(e.target.value)}
                            value={UpdatesName}
                            placeholder="Name"
                        />
                        <input
                            className="w-auto form-control rounded me-md-0 me-5"
                            type="text"
                            name=""
                            id=""
                            onChange={(e) => setUpdatesEmail(e.target.value)}
                            value={UpdatesEmail}
                            placeholder="Email ID"
                        />
                    </div>
                    <div className="form-check mt-md-2 mb-md-2 my-xl-4  my-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={Updatesprivacy}
                            onChange={(e) => setUpdatesprivacy(e.target.checked)}
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" for="flexCheckDefault">
                            I agree with the{" "}
                            <span className="text-primary-color">privacy statement</span> <span className="text-danger">*</span>
                        </label>
                    </div>
                    {UpdatesLoader ? (
                        <button className="GetLatestUpdateButton">
                            <div className="left">
                                <small className="ms-2">Please wait...</small>
                            </div>
                            <div className="right">
                                <img style={{ width: "18px" }} src={arrow} alt="" />
                            </div>
                        </button>
                    ) : (
                        <button type="submit" className="GetLatestUpdateButton">
                            <div className="left">
                                <small className="ms-2 me-2">Get TIXED!</small>
                            </div>
                            <div className="right">
                                <img style={{ width: "18px" }} src={arrow} alt="" />
                            </div>
                        </button>
                    )}

                </div>
            </form>
            <img className="newsMan" src={newsMan} alt="newsMan" />
        </div>
        </div>
    )
}
export default Component;