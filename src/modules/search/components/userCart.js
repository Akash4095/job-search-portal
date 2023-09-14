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
import BlueListSvg from "../../svg/blueListSvg";

const UserCart = ({
  selectedRows,
  setRowClicked,
  userCartLoader,
  setUserCartLoader,
  setAddListModal,
  addProfilesToListFunc,
}) => {
  const [profileData, setProfileData] = useState([]);
  const [skillsAccordion, setSkillsAcordion] = useState(false);
  const [contactAccordion, setContactAcordion] = useState(true);
  const [prevCompanyAccordion, setPrevCompanyAcordion] = useState(false);
  const [educationAccordion, setEducationAcordion] = useState(false);
  const [insightsAccordion, setInsightsAcordion] = useState(false)
  const [contactLoader, setContactLoader] = useState(false);

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
      contactDetails !== null
    ) {
      if (contactDetails.status === "success") {
        dispatch(fetchProfileDetails(profileDetailsPayload));
      }
      setContactLoader(false)
    }
  }, [contactDetails]);


  const callProfileContacts = () => {
    let obj = {}
    obj.userid = profileDetailsPayload.userid
    obj.profileid = profileDetailsPayload.profileid
    obj.listid = "1"
    dispatch(fetchProfileContactDetails(obj));
    setContactLoader(true)
  };

  function createMarkup(msg) {
    const htmlContent = msg.replace(/\n/g, '<br />');
    return { __html: htmlContent };
  }

  return (
    <div className="usercart-container scrollable-container">
      {
        (profileDetails && profileDetails !== null && profileDetails !== undefined && (profileDetails.status === "success" || profileDetails.status === "failed")) ?
          <>
            <div className="">
              <div className="paddingImg">
                <div className="d_flex">
                  <div className="usercart-image">
                    <img
                      src={profileDetails.profilepic ? profileDetails.profilepic : ""}
                      width="80"
                      height="80"
                      className="borderRadius"
                    />
                  </div>
                  <div className="mobile-cart-img">
                    <img
                      src={profileDetails.profilepic ? profileDetails.profilepic : ""}
                      width="60"
                      height="60"
                      className="borderRadius"
                    />
                  </div>
                  <div className="cartNameWork">
                    <div className="user-cart-name">
                      {profileDetails.full_name ? profileDetails.full_name : ""}
                    </div>
                    <div className="user-cart-work">
                      {profileDetails.designation ? profileDetails.designation : ""}
                    </div>
                  </div>

                  <div className="user-cart-close-icon" onClick={() => setRowClicked(false)}>
                    <CancelSvg />
                  </div>
                </div>
              </div>

              <div className="company-details">
                <div className="padding10">
                  <div className="list-user-cart-company">
                    Company Details
                  </div>
                  <div style={{ fontSize: "14px", width: "100%" }} className="list-user-cart-company-name">
                    <div>
                      {profileDetails.experience
                        ? profileDetails.experience.length > 0
                          ? profileDetails.experience[0].company
                          : ""
                        : ""}
                    </div>
                    <div style={{ marginLeft: "12px", }} className="fromFontSize">
                      {profileDetails.experience
                        ? profileDetails.experience.length > 0
                          ? " From" +
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
                  </div>

                  <div className="user-cart-description">
                    {profileDetails.description ? profileDetails.description : ""}
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
                  // onClick={() => setContactAcordion(!contactAccordion)}
                  >
                    <div className="accord-title">
                      <span>Contact Details</span>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={contactAccordion}>
                    <div style={{ fontSize: "12px" }}>
                      {profileDetails.email && profileDetails.email.length > 0
                        ? profileDetails.email.map((item, index) => {
                          return (
                            <div className="wordBreak list-contacts">
                              <Icon size="mini" color="grey" name="mail outline" />
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#007bff",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          );
                        })
                        : ""}
                    </div>
                    <div style={{ fontSize: "12px" }}>
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
                                  fontSize: "12px",
                                  color: "#007bff",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          );
                        })
                        : ""}
                    </div>

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => callProfileContacts()}
                    >
                      {profileDetails.contactstatus &&
                        (profileDetails.contactstatus == "false" ||
                          profileDetails.contactstatus == false) ? (
                        <Button size="small" color="blue" style={{ padding: "8px 18px", marginTop: "12px", }}>{"get{contact}"}</Button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div style={{ position: "relative" }}>
                      {contactLoader && (
                        <Dimmer inverted active style={{ position: "reletive" }}>
                          <Loader size="tiny" active>
                            <div style={{ fontSize: "12px" }}>{"Fetching Contacts"}</div>
                          </Loader>
                        </Dimmer>
                      )}
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
                  // onClick={() => setPrevCompanyAcordion(!prevCompanyAccordion)}
                  >
                    <div className="accord-title">
                      <span>Previous Company</span>
                      <span>
                        {/* <Icon
                          name={prevCompanyAccordion ? "angle down" : "angle right"}
                        /> */}
                      </span>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={prevCompanyAccordion} className="prev-accord">
                    {profileDetails.experience && profileDetails.experience.length > 0
                      ? profileDetails.experience.map((item, index) => {
                        return (
                          <div className="prev-com-container">
                            <div className="wordBreak prev-com-name">
                              {item.company && item.company !== ""
                                ? item.company
                                : ""}
                            </div>
                            <div style={{ width: "20%" }} className="fontSize13">
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
                      : ""}
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
                      <span>Skills</span>
                      <span>
                        <Icon name={skillsAccordion ? "angle down" : "angle right"} />
                      </span>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={skillsAccordion}>
                    <div className="skillsWrap">
                      {(profileDetails.skills && profileDetails.skills !== "") ?
                        profileDetails.skills.split(",").map((item) => {
                          return (
                            <div className="tag-item-frame">
                              <div className="tag-name"> {item}</div>
                            </div>
                          )
                        }) : ""}

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

                          <div className="prev-com-container">
                            <div className="wordBreak prev-com-name">
                              {item.degree_name && item.degree_name !== ""
                                ? item.degree_name
                                : ""}
                            </div>
                            {
                              (item.degree_name && item.degree_name !== "") ?
                                <div style={{ width: "20%" }} className="fontSize13">
                                  {displayDate(item.startdate).split("-")[2]}
                                  {item.startdate !== "" ? "-" : ""}
                                  {item.startdate !== ""
                                    ? displayDate(item.enddate).split("-")[2]
                                    : ""}

                                </div>
                                : null
                            }

                          </div>
                        );
                      })
                      : ""}
                  </Accordion.Content>
                </Accordion>
              </div>
            </div>
            <div className="accord-container">
              <div className="padding5">
                <Accordion>
                  <Accordion.Title
                    active={insightsAccordion}
                    index={0}
                    onClick={() => setInsightsAcordion(!insightsAccordion)}
                  >
                    <div className="accord-title">
                      <span>Insights</span>
                      <span>
                        <Icon name={insightsAccordion ? "angle down" : "angle right"} />
                      </span>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={insightsAccordion}>
                    <div className="insights-name">
                      {(profileDetails.insights) ?
                        <span dangerouslySetInnerHTML={createMarkup(profileDetails.insights)} /> : ""}

                    </div>
                  </Accordion.Content>
                </Accordion>
              </div>
            </div>
            <div className="add-user-to-list" style={{ marginBottom: selectedRows ? "8%" : "2%" }} onClick={() => addProfilesToListFunc()}>
              <div className="paddingBtn alignCenter">
                <div className="btn-frame user-cart-addbtn">
                  <div className="listCartBtn">
                    <BlueListSvg />
                  </div>
                  <div className="btn-label">
                    Add to list
                  </div>
                </div>
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
