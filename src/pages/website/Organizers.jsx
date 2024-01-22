import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import MobileMenu from '../../components/mobilemenu';
import { apiurl, app_url } from "../../common/Helpers";
import { Link } from "react-router-dom";
import Noimg from "../../common/image/noimg.jpg";
const Home = () => {
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
      {" "}
      <HeaderMenu />
      <div className="mx-lg-4 my-lg-3 banner-organizer-page bg-primary-color rounded-8 position-relative">
        <MobileMenu />
        <h1 className="banner-h text-white text-start text-uppercase">Explore our organizers</h1>
      </div>
      <Row className="mx-4" style={{ marginTop: '50px' }}>
        <div className="row p-3">
          {organizers.map((items, index) => (
            <div className="col-12 col-md-2" key={index}>
              <div className="organizer-box text-center">
                <img src={items.profile_picture ? items.profile_picture : Noimg} className="organizer-dp" alt="" style={{ borderRadius: '8px' }} />
                <p className="organizer-box-name mb-0">{items.name}</p>
                <p className="organizer-box-event-count  mb-2">{items.eventDataCount} Event</p>
                <div className="mx-2">
                  <Link
                    className="btn w-100 theme-bg text-white"
                    to={`${app_url}organizer-profile/${items._id}/${items.first_name}`}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Row>
      <Footer />
    </>
  );
};

export default Home;