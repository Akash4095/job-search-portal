import React, { useEffect, useState } from "react";
import { Button, Feed, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getIsProfileDetails } from "../data/selectors";
import { Link } from "react-router-dom";
import { displayDate } from "../../../utilities/listUtils";

const UserCart = ({ setRowClicked }) => {

  const [profileData, setProfileData] = useState([])

  const profileDetails = useSelector((state) => getIsProfileDetails(state));

  useEffect(() => {
    if (profileDetails && profileDetails !== null && profileDetails !== undefined) {
      if (profileDetails.status === "success") {
        setProfileData(profileDetails)
      }
    }

  }, [profileDetails])

  return (
    <div className="usercart-container scrollable-container">
      <div className="">
        <div className="paddingImg">
          <div className="d_flex">
            <img src={profileDetails.profilepic ? profileDetails.profilepic : ""} width="55" height="55" className="borderRadius" />
            <Icon
              size="mini"
              color="grey"
              name="cancel"
              className="user-cart-close-icon"
              onClick={() => setRowClicked(false)}
            />
          </div>
        </div>
        <div className="paddingUsrDetails">
          <div className="user-cart-name">{profileDetails.full_name ? profileDetails.full_name : ""}</div>
          <div className="user-cart-work">{profileDetails.designation ? profileDetails.designation : ""}</div>
        </div>

        <div className="company-details">
          <div className="padding10">
            <div style={{ fontSize: "12px", paddingBottom: "5px" }}> Company Details</div>
            <div style={{ fontSize: "12px", width: "100%" }} className="d_flex">
              <div style={{ width: "10%" }}>
                <Icon color="blue" name="building outline" />
              </div>
              <div style={{ width: "90%" }}>
                {profileDetails.experience ? profileDetails.experience.length > 0 ? profileDetails.experience[0].company : "" : ""}
              </div>

            </div>
            <div style={{ marginLeft: "10%", fontSize: "12px" }}>From {profileDetails.experience ? profileDetails.experience.length > 0 ? displayDate(profileDetails.experience[0].startdate) : "" : ""}</div>
            <div className="user-cart-description">
              {profileDetails.description ? profileDetails.description : ""}
            </div>
            <div style={{ marginBottom: "10px" }} className="d_flex">
              <Link to={profileDetails.linkedin_url ? profileDetails.linkedin_url : ""} target="_blank">
                <div title="Linkedin Profile">
                  <Icon color="grey" name="linkedin" />
                </div>
              </Link>
              <Icon name="twitter" />
              <Icon name="dribbble" />
            </div>
          </div>
        </div>
      </div>
      <div className="previouscompany">
      <div style={{ fontSize: "12px", paddingBottom: "5px",paddingLeft:"4%" }}> Previous Company</div>
        {
          (profileDetails.experience && profileDetails.experience.length > 0) ?

            profileDetails.experience.map((item) => {
              return (
                <div className="previousCompanyPadding">
                  <div style={{ fontSize: "11px" }}>
                    <div>{item.company}</div>
                    <div>{displayDate(item.startdate).split("-")[2]}-{displayDate(item.enddate).split("-")[2]}</div>
                  </div>
                </div>
              )
            })

            : null

        }

      </div>
      <div className="add-user-to-list">
        <div className="padding10">
          <Button basic color="blue" size="large" className="user-cart-btn">
            <Icon name="list ul" color="white" size="mini" />
            Add to list
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
