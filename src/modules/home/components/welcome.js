import React, { useState, useEffect } from "react";
import "./welcome.css";
import { Grid, Icon, Modal } from "semantic-ui-react";
import userImage from "../../../images/user.png";
import SideBar from "../../common/sideBar";
import SearchComponent from "../../common/searchComponent";
import { NavLink } from "react-router-dom";
import CommonHeaderComponent from "../../common/commonHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsCodeSendResponse, getIsDashboardDetails } from "../data/selectors";
import { fetchDashboardDetails } from "../data/actions";
import { getUserList } from "../../search/data/actions";
import AddEmailForm from "./addEmailForm";

const Welcome = ({ setSearchedText, searchedText, sessionUserId, setSessionUserId }) => {

  const [userName, setUserName] = useState(0);
  const [leads, setLeads] = useState(0);
  const [search, setSearch] = useState(0);
  const [list, setList] = useState(0);
  const [team, setTeam] = useState(0);
  const [tags, setTags] = useState(0);
  const [addEmail, setAddEmailModal] = useState(false)

  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));
  const dashboardRes = useSelector((state) => getIsDashboardDetails(state));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usrId = localStorage.getItem("userid");
  // console.log('usrId', usrId)
  useEffect(() => {
    if (usrId && usrId !== null && usrId !== undefined) {
      setSessionUserId(usrId)
    }
  }, [usrId])

  useEffect(() => {
    const usrName = localStorage.getItem("username");
    // console.log('usrName', usrName)
    if (usrName && usrName !== null && usrName !== undefined) {
      setUserName(usrName);
    } else {
      setUserName("");
    }
    const usrId = localStorage.getItem("userid");
    if (usrId && usrId !== null && usrId !== undefined) {
      dispatch(fetchDashboardDetails(usrId.toString()))
    }

  }, [])

  useEffect(() => {
    let obj = {};
    obj.userid = (sessionUserId && sessionUserId !== undefined && sessionUserId !== null) ? sessionUserId.toString() : "";
    dispatch(getUserList(obj));
  }, [sessionUserId]);

  useEffect(() => {
    if (dashboardRes && dashboardRes.status === "success") {
      if (dashboardRes.data && dashboardRes.data !== null && dashboardRes.data !== undefined) {
        setLeads(dashboardRes.data.leads)
        setSearch(dashboardRes.data.search)
        setList(dashboardRes.data.list)
        setTeam(dashboardRes.data.team)
        setTags(dashboardRes.data.tags)
      }
    }

  }, [dashboardRes])

  useEffect(() => {
    if (
      getLoginAuthRes &&
      getLoginAuthRes !== null &&
      getLoginAuthRes !== undefined
    ) {
      if (getLoginAuthRes.status === "success") {
        if (
          getLoginAuthRes.data &&
          getLoginAuthRes.data !== undefined &&
          getLoginAuthRes.data !== null &&
          getLoginAuthRes.data !== {}
        ) {
          if (getLoginAuthRes.data.fname && getLoginAuthRes.data.fname !== undefined && getLoginAuthRes.data.fname !== null) {
            setUserName(getLoginAuthRes.data.fname);
            setSessionUserId(getLoginAuthRes.data.id)

          }
          if (getLoginAuthRes.data.id && getLoginAuthRes.data.id !== undefined && getLoginAuthRes.data.id !== null) {
            dispatch(fetchDashboardDetails(getLoginAuthRes.data.id))
          }

        }

      }
    }
  }, [getLoginAuthRes]);


  return (
    <div className="d_flex">
      <SideBar />
      <div className="right-panel">
        <CommonHeaderComponent />
        <div className="user-container">
          <div className="image-container">
            <img
              src={userImage}
              alt=""
              className="user-container-img"
              width="100"
              height="100"
            />
          </div>
          <div className="user-name-parent" onClick={() => setAddEmailModal(true)}>
            <b className="user-name">{"Hello " + ((userName && userName !== undefined && userName !== null) ? userName : "")}</b>
            <div className="bio">
              <p>
                We're here to help you find the perfect candidates for your
                needs. Easily search, filter, and connect with talented
                individuals.
              </p>
              <p style={{ marginTop: "-15px" }}>
                Start exploring now and unlock your company's potential!
              </p>
            </div>
          </div>
        </div>
        <div className="searchbar-container">
          <p className="searchbar-p">
            Who can I look up for you today?
          </p>
          <SearchComponent setSearchedText={setSearchedText} sessionUserId={sessionUserId} />
        </div>

        <div className="summary-grid-container">
          <p className="summary-p">Your Summary</p>
          <div className="summary-frame">
            <div className="summary-div">
              <div className="summary-div-num">{search}</div>
              <div className="summary-div-text">Search conducted</div>
            </div>
            <div className="summary-div">
              <div className="summary-div-num">{tags}</div>
              <div className="summary-div-text">Tags created</div>
            </div>
            <div className="summary-div">
              <div className="summary-div-num">{list}</div>
              <div className="summary-div-text">Lists created</div>
            </div>
            <div className="summary-div">
              <div className="summary-div-num">{team}</div>
              <div className="summary-div-text">Team members</div>
            </div>
            <div className="summary-div">
              <div className="summary-div-num">{leads}</div>
              <div className="summary-div-text">Leads left</div>
            </div>

          </div>
        </div>
      </div>
      <Modal
        size="mini"
        open={addEmail}
        className="welcome-popup-container"
      >
        <Modal.Content>
          <AddEmailForm setAddEmailModal={setAddEmailModal} sessionUserId={sessionUserId} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Welcome;
