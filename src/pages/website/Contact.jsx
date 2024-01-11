import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LocationIcon from "../../common/icon/location.svg";
import MailIcon from "../../common/icon/mail.svg";
import toast from "react-hot-toast";
import BannerComponent from "../../component/BannerTop";
import WhiteBtn from "../../component/Whitestarbtn";
import { Link } from "react-router-dom/dist";
import { apiurl, app_url, isEmail } from "../../common/Helpers";
const Page = ({ title }) => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [subject, setsubject] = useState();
  const [message, setmessage] = useState();
  const [Loader, setLoader] = useState(false);
  const HandelContactform = async () => {
    try {
      if (!name) {
        return toast.error("Name must not be empty");
      }
      if (!email) {
        return toast.error("Email must not be empty");
      }
      if (!subject) {
        return toast.error("Subject must not be empty");
      }
      if (!message) {
        return toast.error("Message must not be empty");
      }
      if (!isEmail(email)) {
        return toast.error("Enter valid email address");
      }
      setLoader(true);
      const requestData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
      };
      fetch(apiurl + "website/contact-store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            toast.success(data.data);
            setname("");
            setemail("");
            setsubject("");
            setmessage("");
          } else {
            toast.error(data.data);
          }
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          toast.error(error);
          console.error("Insert error:", error);
        });
    } catch (error) {
      console.error("Login api error:", error);
    }
  };
  return (
    <div className="content-data">
      <Container>
        <Row>
          <BannerComponent title={title} />
          <Col md={12} className="p-5 mt-5 mb-5">
            <Row>
              <Col md={4}>
                <div className="d-flex align-items-center contact-left-boxes mb-4">
                  <div className="d-inline-block">
                    <img height={30} width={30} src={LocationIcon} alt="" />
                  </div>
                  <div className="d-inline-block">
                    <h4 className="contact-title">Our Address</h4>
                    <p className="contact-desc">
                      <b>India Address : </b>Office 3N, Vijay Chambers, Grant
                      Road, Mumbai, Maharashtra 400004
                    </p>
                    <p className="contact-desc">
                      <b>USA Address : </b>660 Washington Street, Boston, MA
                      02111
                    </p>
                    <p className="contact-desc">
                      <b>Singapore Address : </b>10 Jalan Besar, #17-02, Sim Lim
                      Tower, Singapore 208787
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center contact-left-boxes mb-4">
                  <div className="d-inline-block">
                    <img height={30} width={30} src={MailIcon} alt="" />
                  </div>
                  <div className="d-inline-block">
                    <h4 className="contact-title">Our Email</h4>
                    <p className="contact-desc">
                      <b>India Email : </b>tixme.india@gmail.com
                    </p>
                    <p className="contact-desc">
                      <b>USA Email : </b> tixme.usa@gmail.com
                    </p>
                    <p className="contact-desc">
                      <b>Singapore Email : </b>tixme.sg@gmail.com
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center contact-left-boxes mb-4">
                  <div className="d-inline-block">
                    <img height={30} width={30} src={MailIcon} alt="" />
                  </div>
                  <div className="d-inline-block">
                    <h4 className="contact-title">Our Phone</h4>
                    <p className="contact-desc">
                      <b>India Phone : </b>+91 8080292007 (WhatsApp)
                    </p>
                    <p className="contact-desc">
                      <b>USA Phone : </b>+1 (617) 775 0311
                    </p>
                    <p className="contact-desc">
                      <b>Singapore Phone : </b>+65 90288903 (WhatsApp)
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <div className="contact-form-box">
                  <Row>
                    <Col md={12} className="">
                      <div className="right-box-title py-4">
                        <p className="pb-3 mx-3">Send A Message</p>
                      </div>
                    </Col>
                    <Col md={6} className="contact-1">
                      <input
                        type="text"
                        onChange={(e) => setname(e.target.value)}
                        value={name}
                        className="theme-input-custome"
                        placeholder="Enter your first name"
                      />
                    </Col>
                    <Col md={6} className="contact-2">
                      <input
                        type="text"
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        className="theme-input-custome "
                        placeholder="Enter your email"
                      />
                    </Col>
                    <Col md={12} className="contact-3">
                      <input
                        type="text"
                        onChange={(e) => setsubject(e.target.value)}
                        value={subject}
                        className="theme-input-custome"
                        placeholder="Enter email subject"
                      />
                    </Col>
                    <Col md={12} className="contact-4 mb-4">
                      <textarea
                        rows="5"
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                        className="form-control theme-textarea-custome"
                        placeholder="Enter your message"
                      ></textarea>
                    </Col>
                    <Col md={12} className="mb-4 contact-5">
                      {Loader ? (
                        <span>
                          <WhiteBtn title={"Please wait..."} />
                        </span>
                      ) : (
                        <span onClick={() => HandelContactform()}>
                          <WhiteBtn title={"Submit"} />
                        </span>
                      )}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Page;