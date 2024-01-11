import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import whitestart from "../../common/icon/whitestart.svg";
import about2 from "../../common/image/about2.webp";
import about11 from "../../common/image/about11.webp";
import LogoIcon from "../../common/icon/logoicon.svg";
import { Link } from "react-router-dom";
import Tada from "react-reveal/Tada";
import Zoom from "react-reveal/Zoom";
import Slide from "react-reveal/Slide";
const Page = ({ title }) => {
  return (
    <div className="content-data content-data-about">
      <Container fluid>
        <Row className="about_top_section">
          <Col md={7}>
            <Tada>
              <img src={LogoIcon} className="web-icon-about" alt="" />
            </Tada>
            <Zoom>
              <img className="about11" src={about11} alt="" />
            </Zoom>
          </Col>
          <Col md={5}>
            {/* <Slide top cascade>
              <p className="about_banner_shop_desc">
                <span className="bullet-point"></span> Meet Cut the Code
              </p>
            </Slide> */}
            {/* <Slide top cascade>
              <p className="about_banner_text">
                Symbol for excellent customer support
              </p>
            </Slide> */}
            <Slide top cascade>
              <div>
                <p className="about_banner_short_text">
                  Welcome to TIXME, where every ticket tells a story! Our
                  mission is to redefine events, making each occasion an
                  unforgettable and cherished memory. We promise fair prices,
                  support event organizers with insights, and ensure secure
                  transactions. Our user-friendly website and interactive
                  features ensure simple ticketing and help curate extraordinary
                  events. TIXME creates a community, by rewarding and
                  incentivizing members with every ticket purchase. Our social
                  network enables us to reach a variety of customers. To bring
                  this vision to life, we seamlessly blend cutting-edge
                  technology with an unwavering commitment to prioritizing
                  customer satisfaction.
                </p>
              </div>
            </Slide>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="my-5">
            <div className="As_a_leading_sec">
              <Slide bottom cascade>
                <div>
                  <p className="mb-5">
                    Step with us into the spotlight of unforgettable moments
                    where the journey is secure, the path is clear, and the
                    memories are destined to be extraordinary!Seize the moment,
                    secure your ticket!
                  </p>
                  <p className="mb-5">
                    At TIXME, we believe in expressing our gratitude to our
                    valued customers for their ongoing support. Thereby, we are
                    proud to introduce our Loyalty and Rewards Program, designed
                    to enhance your experience and show appreciation for your
                    loyalty. As you embark on your ticket-buying journey with
                    us, you automatically become a part of our three-tiered
                    loyalty program: Silver, Gold and Platinum.
                  </p>
                  <p className="mb-5">
                    <b>Silver Tier : </b> The Beginning Of Your Journey <br />
                    As you make your initial purchases, you enter the Silver
                    Tier, unlocking a range of benefits. Enjoy exclusive
                    discounts on future ticket purchases, ensuring that your
                    loyalty is immediately rewarded.
                  </p>
                  <p className="mb-5">
                    <b>Gold Tier : </b> Ascending To Greater Rewards <br />
                    As you make your initial purchases, you enter the Silver
                    Tier, unlocking a range of benefits. Enjoy exclusive
                    discounts on future ticket purchases, ensuring that your
                    loyalty is immediately rewarded.
                  </p>
                  <p className="mb-5">
                    <b>Platinum Tier : </b> Achieving The Pinnacle Of Exclusive
                    Benefits <br />
                    As you make your initial purchases, you enter the Silver
                    Tier, unlocking a range of benefits. Enjoy exclusive
                    discounts on future ticket purchases, ensuring that your
                    loyalty is immediately rewarded.
                  </p>
                </div>
              </Slide>
              {/* <Link className="button-join" to={"/"}>
                <span>
                  <span className="bg-style btn-a">
                    <img height={30} width={30} src={whitestart} />
                  </span>
                  <span className="bg-style btn-b">Discover more</span>
                  <span className="bg-style btn-c">
                    <img height={30} width={30} src={whitestart} />
                  </span>
                </span>
              </Link> */}
            </div>
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          {/* <Col md={5}>
            <Zoom>
              <img className="about2" src={about2} alt="" />{" "}
            </Zoom>
          </Col> */}
          <Col md={7}>
            <div className="about2_box">
              {/* <Slide bottom cascade>
                <div>
                  <h3>Symbol for personalization</h3>
                </div>
              </Slide> */}
              {/* <Slide bottom cascade>
                <div>
                  <p>
                    At TIXME, we believe in expressing our gratitude to our
                    valued customers for their ongoing support. Thereby, we are
                    proud to introduce our Loyalty and Rewards Program, designed
                    to enhance your experience and show appreciation for your
                    loyalty. As you embark on your ticket-buying journey with
                    us, you automatically become a part of our three-tiered
                    loyalty program: Silver, Gold and Platinum.
                  </p>
                </div>
              </Slide> */}
            </div>
          </Col>
        </Row>
        {/* <Row className="our_values_div">
          <Col md={12}>
            <h3 className="sec-main-title">Our values</h3>
          </Col>
          <Col md={4} xs={12} className="mb-3">
            <Slide bottom>
              <div className="our_values_box mx-2">
                <p className="our_values_title">
                  The Beginning Of Your Journey
                </p>
                <p className="our_values_desc">
                  As you make your initial purchases, you enter the Silver Tier,
                  unlocking a range of benefits. Enjoy exclusive discounts on
                  future ticket purchases, ensuring that your loyalty is
                  immediately rewarded.
                </p>
              </div>
            </Slide>
          </Col>
          <Col md={4} xs={12} className="mb-3">
            <Slide bottom>
              <div className="our_values_box mx-2">
                <p className="our_values_title">Ascending To Greater Rewards</p>
                <p className="our_values_desc">
                  With continued engagement, your loyalty propels you into the
                  Gold Tier, where the rewards become even more enticing. In
                  addition to enhanced discounts, Gold members get early access
                  to select events, securing your spot before general sales
                  commence.
                </p>
              </div>
            </Slide>
          </Col>
          <Col md={4} xs={12} className="mb-3">
            <Slide bottom>
              <div className="our_values_box mx-2">
                <p className="our_values_title">
                  The Pinnacle Of Exclusive Benefits
                </p>
                <p className="our_values_desc">
                  TIXME’s platinum members receive the most substantial
                  discounts, priority access to special events, and exclusive
                  perks tailored to make your ticket-buying experience truly
                  exceptional.
                </p>
              </div>
            </Slide>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};
export default Page;