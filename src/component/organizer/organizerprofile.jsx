import React, { useEffect, useState } from "react";
import LocationIcon from "../../common/icon/location.svg";
import MailIcon from "../../common/icon/mail.svg";
import toast from "react-hot-toast";
import { apiurl, app_url } from "../../common/Helpers";
import Nouserphoto from '../../common/image/nouser.png';
import { Link } from "react-router-dom";
const Type = ({ props }) => {
  const Beartoken = localStorage.getItem('userauth');
  const [FollowApi, setFollowApi] = useState(false);
  const [Organizerdata, setOrganizerdata] = useState(props);
  const [Followtype, setFollowtype] = useState(false);
  const [Followtypeloader, setFollowtypeloader] = useState(false);
  const followOrganizer = async () => {
    try {
      if (!Beartoken) {
        toast.error("You need to login first");
        return false;
      }
      setFollowApi(true)
      const requestData = {
        organizerid: Organizerdata._id
      }
      fetch(apiurl + "website/follow-organizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            setOrganizerdata(data.data);
            if (data.typestatus == 1) {
              setFollowtype(false)

            } else if (data.typestatus == 2) {
              setFollowtype(true)

            } else {
              toast.error("Internal Server Error");
            }
          } else {

          }
          setFollowApi(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setFollowApi(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setFollowApi(false)
    }
  }
  const checkfollowOrganizer = async (organizer_id) => {
    try {
      setFollowtypeloader(true)
      const userBeartoken = localStorage.getItem('userauth');
      const requestData = {
        organizerid: organizer_id
      }
      fetch(apiurl + "website/check-follow-organizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userBeartoken}`, // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            setFollowtype(true)
          } else {
          }
          setFollowtypeloader(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setFollowtypeloader(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setFollowtypeloader(false)
    }
  }
  useEffect(() => {
    if (Organizerdata) {
      checkfollowOrganizer(Organizerdata._id);
    }
  }, []);
  return (
    <div className="organised-by-box eventpage-box-style-event-view">
      <div className="organizer-name-sec">
        <div className="row d-flex align-items-end">
          <div className="col-6 col-md-7  d-flex align-items-end">
            <div className="d-inline-block mr-3">
              <img
                height={70}
                width={70}
                src={Organizerdata && Organizerdata.profile_picture ? Organizerdata.profile_picture : Nouserphoto}
                alt=""
                className="organiger-logo"
              />
            </div>
            <div className="d-inline-block">
              <span className="organizer-by d-block">Organised</span>
              <Link to={`${app_url}organizer-profile/${Organizerdata._id}/${Organizerdata.first_name}`}><span className="organizer-name d-block">By {Organizerdata.first_name}</span></Link>
            </div>
          </div>
          <div className="col-6 col-md-5 text-end">
            {FollowApi ? (
              <button type="button" className="follow-btn">wait...</button>
            ) : (
              <>
                {Followtype ? (
                  <button onClick={() => followOrganizer()} type="button" class="Unfollow-btn-1">Following</button>
                ) : (
                  <button onClick={() => followOrganizer()} type="button" className="follow-btn">
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-botton-devider my-2"></div>
      <div className="right-box-con">
        <div className="row">
          <div className="col-8 col-lg-8 col-xl-8">
            <div className="align-items-center py-2">
              <div className="d-inline-block mr-1">
                <img height={30} width={30} src={LocationIcon} alt="" />
              </div>
              <div className="d-inline-block">
                <span className="event-page-organizer-deta d-block">
                  {Organizerdata.countryname ? Organizerdata.countryname : '--'}
                </span>
              </div>
            </div>
            <div className="align-items-center py-2">
              <div className="d-inline-block mr-1">
                <img height={30} width={30} src={MailIcon} alt="" />
              </div>
              <div className="d-inline-block">
                <span className="event-page-organizer-deta d-block">
                  {Organizerdata.email ? Organizerdata.email : '--'}
                </span>
              </div>
            </div>
          </div>
          <div className="col-4 col-lg-4 col-xl-4">
            {Followtypeloader ? (
              <div className="linear-background w-100"> </div>
            ) : (
              <>
                <div className="row align-items-center d-flex">
                  <div className="col-12 text-end">
                    <p className="followers-title">Followers</p>
                    <p className="followers-count">{Organizerdata.followers ? Organizerdata.followers : 0}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};
export default Type;
