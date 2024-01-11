import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BannerComponent from '../../component/BannerTop';
import WhiteButton from '../../component/Whitestarbtn';
import PersonIcon from '../../common/icon/person 1.svg';
import { useState } from "react";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button } from "react-bootstrap";
import { apiurl, app_url, isEmail, organizer_url } from '../../common/Helpers';
const Page = ({ title }) => {
    const MySwal = withReactContent(Swal)
    const [Email, setEmail] = useState();
    const [Title, setTitle] = useState();
    const [Message, setMessage] = useState();
    const [Loader, setLoader] = useState(false);
    const Handelform = async () => {
        try {
            if (!Email) {
                return toast.error('Email is required');
            }
            if (!isEmail(Email)) {
                return toast.error('Enter valid email address');
            }
            if (!Title) {
                return toast.error('Title is required');
            }
            if (!Message) {
                return toast.error('Message is required');
            }
            const requestData = {
                email: Email,
                title: Title,
                message: Message
            };
            setLoader(true);
            fetch(apiurl + 'website/support/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }).then(response => response.json()).then(data => {
                setLoader(false);
                if (data.success == true) {
                    // toast.success('Support ticket submitted successfully!', {
                    //     duration: 3000,
                    // });
                    MySwal.fire({
                        text: "Support ticket submitted successfully!",
                        icon: "success"
                    });
                    setEmail('');
                    setTitle('');
                    setMessage('');
                } else {
                    toast.error(data.message);
                }
                setLoader(false);
            }).catch(error => {
                setLoader(false);
                toast.error('Insert error: ' + error.message);
                console.error('Insert error:', error);
            });

        } catch (error) {

        }
    };
    return (
        <div className="content-data">
            <Container>
                <Row className="signup-form-box  mt-5">
                    <Col md={12} className="login-area signup-page-padding">
                        <Row>
                            <Col md={3}></Col>
                            <Col md={6}>
                                <div className="login-area-sec">
                                    <h3 className="signup-page-title">Raise Ticket</h3>
                                </div>
                                <div className="login-area-form-sec">
                                    <div className="form-group">
                                        <p>Email address  <span className="text-danger">*</span></p>
                                        <input className="form-control" type="text" value={Email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                    <div className="form-group">
                                        <p>Title <span className="text-danger">*</span></p>
                                        <input className="form-control" type="text" value={Title} placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}></input>
                                    </div>
                                    <div className="form-group">
                                        <p>Message <span className="text-danger">*</span></p>
                                        <textarea class="form-control" rows="3" value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        {Loader ? (
                                            <Button className='signup-page-btn'>Please wait...</Button>
                                        ) : (
                                            <span onClick={Handelform}><WhiteButton title={'Submit'} /></span>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Page;