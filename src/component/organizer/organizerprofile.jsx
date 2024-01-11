import React from "react";
import Eventlogo from "../../common/icon/eventlogo.svg";
import LocationIcon from "../../common/icon/location.svg";
import MailIcon from "../../common/icon/mail.svg";
const Type = ({ data }) => {
  console.log(data);
  return (
    <div className="organised-by-box eventpage-box-style">
      <div className="organizer-name-sec d-flex align-items-center px-2 py-2">
        <div className="d-inline-block mr-3">
          <img
            height={70}
            width={70}
            src={Eventlogo}
            alt=""
            className="organiger-logo"
          />
        </div>
        <div className="d-inline-block">
          <span className="organizer-by d-block">Organizer Profile</span>
          <span className="organizer-name d-block">KING</span>
        </div>
      </div>
      <div className="border-botton-devider my-2"></div>
      <div className="right-box-con mt-4">
        <div className="d-flex align-items-center">
          <div className="d-inline-block mr-4">
            <p className="followers-title">Followers</p>
            <p className="followers-count">99</p>
          </div>
          <div className="d-inline-block">
            <button type="button" className="follow-btn">
              Follow
            </button>
          </div>
        </div>
        <div className="d-inline-flex align-items-center py-2">
          <div className="d-inline-block mr-1">
            <img height={30} width={30} src={LocationIcon} alt="" />
          </div>
          <div className="d-inline-block">
            <span className="event-page-organizer-deta d-block">
              454 Isaac Frye Hwy, Wilton, United States
            </span>
          </div>
        </div>
        <div className="d-inline-flex align-items-center py-2">
          <div className="d-inline-block mr-1">
            <img height={30} width={30} src={MailIcon} alt="" />
          </div>
          <div className="d-inline-block">
            <span className="event-page-organizer-deta d-block">
              kin@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Type;
