import React, { useEffect, useState } from "react";
import { Accordion, Button, Dimmer, Feed, Icon, Loader } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getIsProfileDetails } from "../data/selectors";
import { Link } from "react-router-dom";
import { displayDate } from "../../../utilities/listUtils";

const UserCart = ({ setRowClicked, userCartLoader, setUserCartLoader }) => {
  const [profileData, setProfileData] = useState([]);
  const [skillsAccordion, setSkillsAcordion] = useState(false);
  const [prevCompanyAccordion, setPrevCompanyAcordion] = useState(false);
  const [educationAccordion, setEducationAcordion] = useState(false);

  const profileDetails = useSelector((state) => getIsProfileDetails(state));

  useEffect(() => {
    if (
      profileDetails &&
      profileDetails !== null &&
      profileDetails !== undefined
    ) {
      if (profileDetails.status === "success") {
        setProfileData(profileDetails);
        setUserCartLoader({ open: false, msg: "" })
      }
      if (profileDetails.status === "failed" || profileDetails.status === "error") {
        setUserCartLoader({ open: false, msg: "" })
      }
    }
  }, [profileDetails]);

  return (
    <div className="usercart-container scrollable-container">
      <div className="">
        <div className="paddingImg">
          <div className="d_flex">
            <img
              src={profileDetails.profilepic ? profileDetails.profilepic : ""}
              width="55"
              height="55"
              className="borderRadius"
            />
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
          <div className="user-cart-name">
            {profileDetails.full_name ? profileDetails.full_name : ""}
          </div>
          <div className="user-cart-work">
            {profileDetails.designation ? profileDetails.designation : ""}
          </div>
        </div>

        <div className="company-details">
          <div className="padding10">
            <div style={{ fontSize: "12px", paddingBottom: "5px" }}>

              Company Details
            </div>
            <div style={{ fontSize: "12px", width: "100%" }} className="d_flex">
              <div style={{ width: "10%" }}>
                <Icon color="blue" name="building outline" />
              </div>
              <div style={{ width: "90%" }}>
                {profileDetails.experience
                  ? profileDetails.experience.length > 0
                    ? profileDetails.experience[0].company
                    : ""
                  : ""}
              </div>
            </div>
            <div style={{ marginLeft: "10%", fontSize: "12px" }}>

              {profileDetails.experience
                ? profileDetails.experience.length > 0
                  ? ("From" + " " + displayDate(profileDetails.experience[0].startdate))
                  : ""
                : ""}
            </div>
            <div className="user-cart-description">
              {profileDetails.description ? profileDetails.description : ""}
            </div>
            <div style={{ marginBottom: "10px" }} className="d_flex">
              <Link
                to={
                  profileDetails.linkedin_url ? profileDetails.linkedin_url : ""
                }
                target="_blank"
              >
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
      <div className="accord-container">
        <div className="padding5">
          <Accordion>
            <Accordion.Title
              active={prevCompanyAccordion}
              index={0}
              onClick={() => setPrevCompanyAcordion(!prevCompanyAccordion)}
            >
              <div className="accord-title">
                <span>Previous Company</span>
                <span>
                  <Icon name="angle down" />
                </span>
              </div>
            </Accordion.Title>
            <Accordion.Content active={prevCompanyAccordion}>
              {profileDetails.experience && profileDetails.experience.length > 0
                ? profileDetails.experience.map((item, index) => {
                  return (
                    <div style={{ fontSize: "11px" }}>
                      <li className="wordBreak">{item.company}</li>
                      <div style={{ padding: "0 8%" }}>
                        {
                          (index == 0 && item.enddate === "") ?
                            <>
                              {displayDate(item.startdate).split("-")[2]} {item.startdate !== "" ? "- Present" : ""}

                            </>
                            :
                            <>
                              {displayDate(item.startdate).split("-")[2]} {item.startdate !== "" ? "-" : ""}
                              {displayDate(item.enddate).split("-")[2]}
                            </>
                        }

                      </div>
                    </div>
                  );
                })
                : "N/A"}
            </Accordion.Content>
          </Accordion>
        </div>
      </div>


      <div className="accord-container">
        <div className="padding5">
          <Accordion>
            <Accordion.Title
              active={skillsAccordion}
              index={0}
              onClick={() => setSkillsAcordion(!skillsAccordion)}
            >
              <div className="accord-title">
                <span>Skilss</span>
                <span>
                  <Icon name="angle down" />
                </span>
              </div>
            </Accordion.Title>
            <Accordion.Content active={skillsAccordion}>
              <div className="wordBreak"> {profileDetails.skills ? profileDetails.skills : "N/A"} </div>
            </Accordion.Content>
          </Accordion>
        </div>
      </div>
      <div className="accord-container">
        <div className="padding5">
          <Accordion>
            <Accordion.Title
              active={educationAccordion}
              index={0}
              onClick={() => setEducationAcordion(!educationAccordion)}
            >
              <div className="accord-title">
                <span>Education</span>
                <span>
                  <Icon name="angle down" />
                </span>
              </div>
            </Accordion.Title>
            <Accordion.Content active={educationAccordion}>
              {profileDetails.education && profileDetails.education.length > 0
                ? profileDetails.education.map((item) => {
                  return (
                    <div style={{ fontSize: "11px" }}>
                      <li className="wordBreak">{item.degree_name ? item.degree_name : ""}</li>
                      <div style={{ padding: "0 8%" }}>
                        {displayDate(item.startdate).split("-")[2]}  {item.startdate !== "" ? "-" : ""}
                        {displayDate(item.enddate).split("-")[2]}
                      </div>
                    </div>
                  );
                })
                : "N/A"}
            </Accordion.Content>
          </Accordion>
        </div>
      </div>
      <div className="add-user-to-list">
        <div className="paddingBtn">
          <Button basic color="blue" size="large" className="user-cart-btn">
            <Icon name="list ul" color="white" size="mini" />
            Add to list
          </Button>
        </div>
      </div>
      <div className="dimmer-loader-container">
        {(userCartLoader.open) &&
          <Dimmer inverted active>
            <Loader size="tiny" active>{userCartLoader.msg}</Loader>
          </Dimmer>
        }
      </div>
    </div>
  );
};

export default UserCart;
