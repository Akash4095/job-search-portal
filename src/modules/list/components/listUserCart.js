import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Dimmer,
  Feed,
  Icon,
  Loader,
  Modal,
} from "semantic-ui-react";
import { displayDate } from "../../../utilities/listUtils";
import { Link } from "react-router-dom";
import {
  getIsListProfileDetails,
  getIsListProfileDetailsPayload,
  getIsProfileContactDetails,
} from "../data/selectors";
import { useDispatch, useSelector } from "react-redux";
import AddTagNameForm from "./addTagName";
import {
  deleteListProfile,
  fetchListProfileDetails,
  fetchProfileContactDetails,
} from "../data/actions";
import CancelSvg from "../../svg/cancelSvg";
import ContactDownloadSvg from "../../svg/contactDownloadSvg";
import AddListSvg from "../../svg/addListSvg";
import BlueListSvg from "../../svg/blueListSvg";
import DeleteSvg from "../../svg/deleteSvg";

const ListUserCart = ({
  selectedRows,
  setRowClicked,
  sessionUserId,
  addTagModal,
  setAddTagModal,
  loader,
  setLoader,
}) => {
  const [accordion, setAcordion] = useState(false);
  const [contactAccordion, setContactAcordion] = useState(true);
  const [tagsAccordion, setTagsAcordion] = useState(true);
  const [prevCompanyAccordion, setPrevCompanyAcordion] = useState(false);
  const [profileDetails, setProfileDetails] = useState("");
  const [emails, setEmails] = useState([]);
  const [phones, setPhones] = useState([]);

  const dispatch = useDispatch();

  const profileDetailsPayload = useSelector((state) =>
    getIsListProfileDetailsPayload(state)
  );

  const contactDetails = useSelector((state) =>
    getIsProfileContactDetails(state)
  );

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
        setLoader({ open: false, msg: "" });
      }
    }
  }, [profileDetailsRes]);

  useEffect(() => {
    if (
      contactDetails &&
      contactDetails !== undefined &&
      contactDetails !== null &&
      contactDetails !== {}
    ) {
      if (contactDetails.status === "success") {
        dispatch(fetchListProfileDetails(profileDetailsPayload));
        setEmails(contactDetails.email);
        setPhones(contactDetails.phones);
      }
    }
  }, [contactDetails]);

  const openTagModal = (row) => {
    setAddTagModal({ open: true, obj: {} });
  };

  const callProfileContacts = () => {
    dispatch(fetchProfileContactDetails(profileDetailsPayload));
  };
  
  const deleteProfileFromList = () => {
    let obj = {}
    obj.listid = (profileDetailsPayload.listid ? profileDetailsPayload.listid : "").toString()
    obj.profileid = (profileDetailsPayload.profileid ? profileDetailsPayload.profileid : "").toString()
    obj.userid = (profileDetailsPayload.userid ? profileDetailsPayload.userid : "").toString()
    dispatch(deleteListProfile(obj))

  }
  return (
    <div className="list-usercart-container scrollable-container">

      {
        (profileDetailsRes && profileDetailsRes !== null && profileDetailsRes !== undefined && (profileDetailsRes.status === "success" || profileDetailsRes.status === "failed")) ?
          <>
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
                    width="80"
                    height="80"
                    className="borderRadius"
                  />
                  <div className="cartNameWork">
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
                  <div className="user-cart-close-icon" onClick={() => setRowClicked(false)}>
                    <CancelSvg />
                  </div>
                </div>
              </div>
              {/* <div className="paddingUsrDetails">
            
              </div> */}
              <div className="list-company-details">
                <div className="padding10">
                  <div className="list-user-cart-company">
                    Company Details
                  </div>
                  <div className="list-user-cart-company-name">
                    <div>
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
                        : ""}
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
                        : ""}
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => callProfileContacts()}
                    >
                      {profileDetails.contactstatus &&
                        (profileDetails.contactstatus == "false" ||
                          profileDetails.contactstatus == false) ? (
                        <Button size="small" style={{ padding: "8px 18px", marginTop: "12px", background: "#007bff", color: "#fff" }}>{"get{contact}"}</Button>
                      ) : (
                        ""
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
                    <div style={{ display: "flex", flexWrap: "wrap", paddingTop: "5px" }}>
                      {profileDetails.tags && profileDetails.tags.length > 0
                        ? profileDetails.tags.map((item, index) => {
                          return (
                            <div className="tag-item">
                              <div className={`tag-color${index + 1}`}></div> {item}
                            </div>
                          );
                        })
                        : ""}
                    </div>
                    <div className="paddingTop5">
                      <div className="btn-frame" onClick={() => openTagModal(profileDetails)}>
                        <div className="btn-svg">
                          <AddListSvg />
                        </div>
                        <div className="btn-label">
                          Add Tag
                        </div>
                      </div>
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
                      {/* <span>
                        <Icon
                          name={prevCompanyAccordion ? "angle down" : "angle right"}
                        />
                      </span> */}
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
            <div className="list-footer-btns">
              <div className="alignCenter">
                <div className="btn-frame list-user-cart-btn">
                  <div className="listCartBtn">
                    <BlueListSvg />
                  </div>
                  <div className="btn-label">
                    Add to list
                  </div>
                </div>
              </div>
              <div className="btn-frame alignCenter listcart-delete-btn" onClick={() => deleteProfileFromList()}>
                <div className="btn-svg" >
                  <DeleteSvg />
                </div>
                <div className="btn-label-delete">
                  Delete
                </div>
              </div>
            </div>


          </>
          : ""
      }
      <Modal
        size="mini"
        open={addTagModal.open}
        onClose={() => setAddTagModal({ open: false, obj: {} })}
      >
        <Modal.Content>
          <AddTagNameForm
            setAddTagModal={setAddTagModal}
            sessionUserId={sessionUserId}
            selectedRows={selectedRows}
          />
        </Modal.Content>
      </Modal>
      <div className="dimmer-loader-container">
        {loader.open && (
          <Dimmer inverted active>
            <Loader size="tiny" active>
              {loader.msg}
            </Loader>
          </Dimmer>
        )}
      </div>
    </div>
  );
};

export default ListUserCart;
