import React, { useEffect, useState } from "react";
import { Accordion, Button, Feed, Icon, Modal } from "semantic-ui-react";
import { displayDate } from "../../../utilities/listUtils";
import { Link } from "react-router-dom";
import { getIsListProfileDetails } from "../data/selectors";
import { useSelector } from "react-redux";
import AddTagNameForm from "./addTagName";

const ListUserCart = ({
  setRowClicked,
  sessionUserId,
  addTagModal,
  setAddTagModal,
}) => {
  const [accordion, setAcordion] = useState(false);
  const [contactAccordion, setContactAcordion] = useState(false);
  const [tagsAccordion, setTagsAcordion] = useState(false);
  const [prevCompanyAccordion, setPrevCompanyAcordion] = useState(false);
  const [profileDetails, setProfileDetails] = useState("");

  const profileDetailsRes = useSelector((state) =>
    getIsListProfileDetails(state)
  );

  useEffect(() => {
    if (
      profileDetailsRes &&
      profileDetailsRes !== undefined &&
      profileDetailsRes !== null &&
      profileDetailsRes !== {}
    ) {
      if (profileDetailsRes.status === "success") {
        setProfileDetails(profileDetailsRes);
      }
    }
  }, [profileDetailsRes]);

  const openTagModal = (row) => {
    console.log("row", row);
    setAddTagModal({ open: true, obj: {} })
  };

  return (
    <div className="list-usercart-container scrollable-container">
      <div className="">
        <div className="paddingImg">
          <div className="d_flex">
            <img
              src={
                profileDetails !== ""
                  ? profileDetails.profilepic
                    ? profileDetails.profilepic
                    : ""
                  : ""
              }
              width="50"
              height="50"
              className="borderRadius"
            />
            <Icon
              size="mini"
              color="grey"
              name="cancel"
              className="list-user-cart-close-icon"
              onClick={() => setRowClicked(false)}
            />
          </div>
        </div>
        <div className="paddingUsrDetails">
          <div className="user-cart-name">
            {profileDetails !== ""
              ? profileDetails.full_name
                ? profileDetails.full_name
                : ""
              : ""}
          </div>
          <div className="user-cart-work">
            {profileDetails !== ""
              ? profileDetails.designation
                ? profileDetails.designation
                : ""
              : ""}
          </div>
        </div>
        <div className="list-company-details">
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
            <div className="list-user-cart-description">
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
              {profileDetails.contacts && profileDetails.contacts.length > 0
                ? profileDetails.contacts.map((item, index) => {
                  return (
                    <div style={{ fontSize: "11px" }}>
                      <div className="wordBreak list-contacts">
                        <Icon size="mini" color="grey" name="mail outline" />
                        <span style={{ fontSize: "11px", color: "#2185d0" }}>
                          akashathnure40@gmail.com
                        </span>
                      </div>
                      <div className="list-contacts">
                        <Icon
                          size="mini"
                          color="grey"
                          name="phone"
                          flipped="horizontally"
                        />
                        <span style={{ fontSize: "10px", color: "#2185d0" }}>
                          8095595412
                        </span>
                      </div>
                    </div>
                  );
                })
                : "N/A"}
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
              active={tagsAccordion}
              index={0}
              onClick={() => setTagsAcordion(!tagsAccordion)}
            >
              <div className="accord-title">
                <span>Tags</span>
                <span>
                  <Icon name={tagsAccordion ? "angle down" : "angle right"} />
                </span>
              </div>
            </Accordion.Title>
            <Accordion.Content active={tagsAccordion}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="tag-item">
                  <div className="tag-color1"></div> Lead Designer
                </div>
                <div className="tag-item">
                  <div className="tag-color2"></div>Designer
                </div>
                <div className="tag-item">
                  <div className="tag-color3"></div> UX/UI hhhhh
                </div>
              </div>
              <div className="paddingTop5">
                <span
                  style={{ fontSize: "11px", color: "#2185d0", cursor: "pointer" }}
                  onClick={() => openTagModal()}
                >
                  <Icon color="blue" name="add" /> <span>Add Tag</span>
                </span>
              </div>
            </Accordion.Content>
          </Accordion>
        </div>
      </div>
      {/* <div className="list-user-tags">
                <div className="padding5">
                    <div style={{ fontSize: "11px" }}>Tags</div>
                </div>
                <div className="padding5">
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <div className="tag-item">Lead Designer</div>
                        <div className="tag-item">Designer</div>
                        <div className="tag-item">UX/UI hhhhh</div>
                    </div>
                    <div className="paddingTop5">
                        <span style={{ fontSize: "11px", color: "#2185d0" }}>
                            <Icon color="blue" name="add" /> <span>Add Tag</span>
                        </span>
                    </div>
                </div>
            </div> */}
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
                      <li className="wordBreak">{item.company}</li>
                      <div style={{ padding: "0 8%" }}>
                        {index == 0 && item.enddate === "" ? (
                          <>
                            {displayDate(item.startdate).split("-")[2]}{" "}
                            {item.startdate !== "" ? "- Present" : ""}
                          </>
                        ) : (
                          <>
                            {displayDate(item.startdate).split("-")[2]}{" "}
                            {item.startdate !== "" ? "-" : ""}
                            {displayDate(item.enddate).split("-")[2]}
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
      <div className="add-list-user-to-list">
        <div className="padding10 alignCenter">
          <Button
            basic
            color="blue"
            size="large"
            className="list-user-cart-btn"
          >
            <Icon name="list ul" color="white" size="mini" />
            Add to list
          </Button>
        </div>
        <div className="padding10 alignCenter fontSize12">
          <span className="error">
            <Icon color="red" name="trash alternate" /> <span>Delete</span>
          </span>
        </div>
      </div>
      <Modal
        size="mini"
        open={addTagModal.open}
        onClose={() => setAddTagModal({ open: false, obj: {} })}
      >
        <Modal.Content>
          <AddTagNameForm
            setAddTagModal={setAddTagModal}
            sessionUserId={sessionUserId}
          />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default ListUserCart;
