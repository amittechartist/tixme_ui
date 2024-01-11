import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import BannerComponent from "../../component/BannerTop";
import Fade from "react-reveal/Fade";
const Page = ({ title }) => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <div className="content-data">
      <Container>
        <Row>
          <BannerComponent title={title} />
          <Col md={12} className="p-5 mt-5 mb-5">
            <div className="faq-box">
              <Accordion open={open} toggle={toggle}>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="1">
                      <span className="faq-sl-no">01</span>{" "}
                      <span className="faq-title">
                        How can I purchase tickets?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                      <p className="faq-text">
                        You can purchase tickets on our website or through our
                        mobile app.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="2">
                      <span className="faq-sl-no">02</span>{" "}
                      <span className="faq-title">
                        What payment methods do you accept?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="2">
                      <p className="faq-text">
                        We accept Visa, Mastercard, American Express, and
                        others.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="3">
                      <span className="faq-sl-no">03</span>{" "}
                      <span className="faq-title">
                        How will I receive my tickets?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="3">
                      <p className="faq-text">
                        E-tickets will be emailed to you in the form of QR
                        codes. You can also find your tickets under “My Orders”
                        section on your profile in the form of a QR code.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="4">
                      <span className="faq-sl-no">04</span>{" "}
                      <span className="faq-title">
                        What is your refund/exchange policy?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="4">
                      <p className="faq-text">
                        Tickets are non-refundable. In case the event gets
                        canceled, the tickets will be refunded from the
                        organizer’s end. In case the event gets postponed, the
                        tickets will be valid for the next selected date of the
                        event. TIXME fee is non-refundable in all circumstances.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="5">
                      <span className="faq-sl-no">05</span>{" "}
                      <span className="faq-title">
                        My event was postponed/rescheduled. Can I get a refund?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="5">
                      <p className="faq-text">
                        If an event is rescheduled, your ticket will be valid
                        for the new date. If you cannot attend the new date, you
                        can request a full refund. You will, however, not
                        receive a refund on the TIXME service fees.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="6">
                      <span className="faq-sl-no">06</span>{" "}
                      <span className="faq-title">
                        I lost my tickets. Can I get replacements?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="6">
                      <p className="faq-text">
                        Lost or misplaced tickets can be reissued for a $5 fee
                        per ticket. Provide your order confirmation number when
                        you contact us. However, your ticket should always be
                        available in your account under the section “My Orders”
                        electronically.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="7">
                      <span className="faq-sl-no">07</span>{" "}
                      <span className="faq-title">
                        How do I know if my tickets are valid?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="7">
                      <p className="faq-text">
                        Check your tickets carefully to ensure the event name,
                        date, seat location and barcode match your purchase
                        confirmation. Contact us immediately if there are any
                        discrepancies and we will help you resolve the issue.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="8">
                      <span className="faq-sl-no">08</span>{" "}
                      <span className="faq-title">
                        How do I know about any change in event notifications?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="8">
                      <p className="faq-text">
                        Keep a look at your mailbox to know any changes to the
                        event from your event organizer. You will also receive
                        emails from us in case of any changes.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="9">
                      <span className="faq-sl-no">09</span>{" "}
                      <span className="faq-title">
                        What is your policy for lost and found items?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="9">
                      <p className="faq-text">
                        If you lose an item at one of our venues, please check
                        with guest services or the ushers in the area you were
                        sitting. They will assist you in retrieving your lost
                        item if it has been turned in. TIXME takes no
                        responsibility for any lost item at any of our events.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="10">
                      <span className="faq-sl-no">10</span>{" "}
                      <span className="faq-title">
                        Can I transfer my tickets to someone else?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="10">
                      <p className="faq-text">
                        Yes, tickets are transferable. Contact our customer
                        support to facilitate the transfer with the necessary
                        information. Or you can visit “My Orders” section in
                        your account settings and transfer it to someone with an
                        existing TIXME account by filling in their details.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Page;