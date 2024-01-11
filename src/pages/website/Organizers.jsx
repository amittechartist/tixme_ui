import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Userimagefrom from "../../common/image/user.png";
import { app_url, apiurl } from "../../common/Helpers";
import { Link } from "react-router-dom";
const Page = ({ title }) => {
  const [organizers, setOrganizers] = useState([]);
  const fetchorganizer = async () => {
    try {
      fetch(apiurl + 'website/organizers-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to JSON
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == true) {
            setOrganizers(data.data);
          } else {

          }
        })
        .catch(error => {
          console.error('Insert error:', error);
        });
    } catch (error) {
      console.error('Api error:', error);
    }
  }
  useEffect(() => {
    fetchorganizer();
  }, [])
  return (
    <>
      <Container>
        <Row>
          <Col
            md={12}
            className="title-banner d-flex justify-content-center py-5"
          >
            <h3 className="title-banner-h3">{title}</h3>
          </Col>
          <Col md={12} className="mt-5 mb-4">
            <h3>Total organizer showing: 1</h3>
          </Col>
          {organizers.map((items, index) => (
            <Col md={4} key={index}>
              <div className="organizer-box text-center">
                <img src={Userimagefrom} className="organizer-dp" alt="" />
                <p className="organizer-box-name">{items.name}</p>
                <p className="organizer-box-event-count">1 Event</p>
                <Link
                  className="organizer-box-link"
                  to={`${app_url}organizer-profile/${items._id}/${items.first_name}`}
                >
                  View Profile
                </Link>
              </div>
            </Col>
          ))}

        </Row>
      </Container>
    </>
  );
};
export default Page;
