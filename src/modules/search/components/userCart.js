import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Dimmer,
  Feed,
  Icon,
  Loader,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getIsProfileDetails, getIsProfileDetailsPayload } from "../data/selectors";
import { Link } from "react-router-dom";
import { displayDate } from "../../../utilities/listUtils";
import { extractMonthNames } from "../../common/getMonthName";
import { fetchProfileContactDetails } from "../../list/data/actions";
import { getIsProfileContactDetails } from "../../list/data/selectors";
import { fetchProfileDetails } from "../data/actions";
import CancelSvg from "../../svg/cancelSvg";
import ContactDownloadSvg from "../../svg/contactDownloadSvg";

const UserCart = ({
  setRowClicked,
  userCartLoader,
  setUserCartLoader,
  setAddListModal,
}) => {
  const [profileData, setProfileData] = useState([]);
  const [skillsAccordion, setSkillsAcordion] = useState(false);
  const [contactAccordion, setContactAcordion] = useState(false);
  const [prevCompanyAccordion, setPrevCompanyAcordion] = useState(false);
  const [educationAccordion, setEducationAcordion] = useState(false);

  const profileDetails = useSelector((state) => getIsProfileDetails(state));
  const profileDetailsPayload = useSelector((state) =>
    getIsProfileDetailsPayload(state)
  );

  const contactDetails = useSelector((state) =>
    getIsProfileContactDetails(state)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      profileDetails &&
      profileDetails !== null &&
      profileDetails !== undefined
    ) {
      if (profileDetails.status === "success") {
        setProfileData(profileDetails);
        setUserCartLoader({ open: false, msg: "" });
      }
      if (
        profileDetails.status === "failed" ||
        profileDetails.status === "error"
      ) {
        setUserCartLoader({ open: false, msg: "" });
      }
    }
  }, [profileDetails]);

  useEffect(() => {
    if (
      contactDetails &&
      contactDetails !== undefined &&
      contactDetails !== null &&
      contactDetails !== {}
    ) {
      if (contactDetails.status === "success") {
        dispatch(fetchProfileDetails(profileDetailsPayload));
      }
    }
  }, [contactDetails]);

  const addProfileToListFunc = (row) => {
    setAddListModal({ open: true, msg: "", obj: row });
  };

  const callProfileContacts = () => {
    let obj = {}
    obj.userid = profileDetailsPayload.userid
    obj.profileid = profileDetailsPayload.profileid
    obj.listid = "1"
    dispatch(fetchProfileContactDetails(obj));
  };

  return (
    <div className="usercart-container scrollable-container">
      {
        (profileDetails && profileDetails !== null && profileDetails !== undefined && (profileDetails.status === "success" || profileDetails.status === "failed")) ?
          <>
            <div className="">
              <div className="paddingImg">
                <div className="d_flex">
                  <img
                    src={profileDetails.profilepic ? profileDetails.profilepic : ""}
                    width="55"
                    height="55"
                    className="borderRadius"
                  />
                  <div className="user-cart-close-icon" onClick={() => setRowClicked(false)}>
                    <CancelSvg />
                  </div>
                </div>
              </div>
              <div className="paddingUsrDetails">
                <div className="user-cart-name">
                  {profileDetails.full_name ? profileDetails.full_name : "N/A"}
                </div>
                <div className="user-cart-work">
                  {profileDetails.designation ? profileDetails.designation : "N/A"}
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
                          : "N/A"
                        : "N/A"}
                    </div>
                  </div>
                  <div style={{ marginLeft: "10%", fontSize: "12px" }}>
                    {profileDetails.experience
                      ? profileDetails.experience.length > 0
                        ? "From" +
                        " " +
                        ((profileDetails.experience[0].startdate && profileDetails.experience[0].startdate !== "") ?
                          extractMonthNames(
                            displayDate(profileDetails.experience[0].startdate)
                          ) : "") +
                        " " +
                        (profileDetails.experience[0].startdate &&
                          profileDetails.experience[0].startdate !== "" &&
                          profileDetails.experience[0].startdate !== undefined
                          ? displayDate(
                            profileDetails.experience[0].startdate
                          ).split("-")[2]
                          : "")
                        : ""
                      : ""}
                  </div>
                  <div className="user-cart-description">
                    {profileDetails.description ? profileDetails.description : "N/A"}
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
                    active={contactAccordion}
                    index={0}
                    onClick={() => setContactAcordion(!contactAccordion)}
                  >
                    <div className="accord-title">
                      <span>Contact Details</span>
                      <span>
                        <Icon
                          name={contactAccordion ? "angle down" : "angle right"}
                        />
                      </span>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={contactAccordion}>
                    <div
                      style={{ paddingLeft: "86%", cursor: "pointer" }}
                      onClick={() => callProfileContacts()}
                    >
                      {profileDetails.contactstatus &&
                        (profileDetails.contactstatus == "false" ||
                          profileDetails.contactstatus == false) ? (
                        <div className="contact-download-svg">
                          <ContactDownloadSvg />
                        </div>

                      ) : (
                        ""
                      )}
                    </div>

                    <div style={{ fontSize: "11px" }}>
                      {profileDetails.email && profileDetails.email.length > 0
                        ? profileDetails.email.map((item, index) => {
                          return (
                            <div className="wordBreak list-contacts">
                              <Icon size="mini" color="grey" name="mail outline" />
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#2185d0",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          );
                        })
                        : "N/A"}
                    </div>
                    <div style={{ fontSize: "11px" }}>
                      {profileDetails.phone && profileDetails.phone.length > 0
                        ? profileDetails.phone.map((item, index) => {
                          return (
                            <div className="list-contacts">
                              <Icon
                                size="mini"
                                color="grey"
                                name="phone"
                                flipped="horizontally"
                              />
                              <span
                                style={{
                                  fontSize: "10px",
                                  color: "#2185d0",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          );
                        })
                        : "N/A"}
                    </div>

                    <div style={{ paddingTop: "10px" }}>
                      <Icon name="linkedin" />
                      <Icon name="twitter" />
                      <Icon name="dribbble" />
                    </div>
                  </Accordion.Content>
                </Accordion>
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
                        <Icon
                          name={prevCompanyAccordion ? "angle down" : "angle right"}
                        />
                      </span>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={prevCompanyAccordion}>
                    {profileDetails.experience && profileDetails.experience.length > 0
                      ? profileDetails.experience.map((item, index) => {
                        return (
                          <div style={{ fontSize: "11px" }}>
                            <li className="wordBreak">
                              {item.company && item.company !== ""
                                ? item.company
                                : "N/A"}
                            </li>
                            <div style={{ padding: "0 8%" }}>
                              {index == 0 && item.enddate === "" ? (
                                <>
                                  {displayDate(item.startdate).split("-")[2]}
                                  {item.startdate !== "" ? "- Present" : ""}
                                </>
                              ) : (
                                <>
                                  {displayDate(item.startdate).split("-")[2]}
                                  {item.startdate !== "" ? "-" : ""}
                                  {item.startdate !== ""
                                    ? displayDate(item.enddate).split("-")[2]
                                    : ""}
                                </>
                              )}
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
                        <Icon name={skillsAccordion ? "angle down" : "angle right"} />
                      </span>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={skillsAccordion}>
                    <div className="wordBreak skills">
                      {profileDetails.skills ? profileDetails.skills : "N/A"}
                    </div>
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
                        <Icon
                          name={educationAccordion ? "angle down" : "angle right"}
                        />
                      </span>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={educationAccordion}>
                    {profileDetails.education && profileDetails.education.length > 0
                      ? profileDetails.education.map((item) => {
                        return (
                          <div style={{ fontSize: "11px" }}>
                            <li className="wordBreak">
                              {item.degree_name && item.degree_name !== ""
                                ? item.degree_name
                                : "N/A"}
                            </li>
                            <div style={{ padding: "0 8%" }}>
                              {displayDate(item.startdate).split("-")[2]}
                              {item.startdate !== "" ? "-" : ""}
                              {item.startdate !== ""
                                ? displayDate(item.enddate).split("-")[2]
                                : ""}
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
              <div className="paddingBtn alignCenter">
                <Button
                  basic
                  color="blue"
                  size="large"
                  className="user-cart-btn"
                  onClick={() => addProfileToListFunc(profileDetails)}
                >
                  <Icon name="list ul" color="white" size="mini" />
                  Add to list
                </Button>
              </div>
            </div>
          </>
          : ""
      }

      <div className="dimmer-loader-container">
        {userCartLoader.open && (
          <Dimmer inverted active>
            <Loader size="tiny" active>
              {userCartLoader.msg}
            </Loader>
          </Dimmer>
        )}
      </div>
    </div>
  );
};

export default UserCart;
