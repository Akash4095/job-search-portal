import React, { useState, useEffect } from "react";
import "./welcome.css";
import { Grid, Icon } from "semantic-ui-react";
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

const Welcome = ({ setSearchedText, searchedText, sessionUserId, setSessionUserId }) => {

  const [userName, setUserName] = useState("");
  const [leads, setLeads] = useState("");
  const [search, setSearch] = useState("");
  const [list, setList] = useState("");
  const [team, setTeam] = useState("");
  const [tags, setTags] = useState("");

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
          <div className="user-name-parent">
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
            Find the right person using <b className="keywords">keywords</b>
          </p>
          <SearchComponent setSearchedText={setSearchedText} sessionUserId={sessionUserId} />
        </div>
        <Grid className="summary-grid">
          <p style={{ color: "#1c34b0", marginBottom: "20px" }}>Your Summary</p>
          <Grid.Row>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent">
                <div className="div1">{search}</div>
                <div className="parent-div">Search conducted</div>
              </div>
            </Grid.Column>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent">
                <div className="div1">{tags}</div>
                <div className="parent-div">Tags created</div>
              </div>
            </Grid.Column>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent">
                <div className="div1">{list}</div>
                <div className="parent-div">Lists created</div>
              </div>
            </Grid.Column>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent">
                <div className="div1">{team}</div>
                <div className="parent-div">Team members</div>
              </div>
            </Grid.Column>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent">
                <div className="div1">{leads}</div>
                <div className="parent-div">Leads left</div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Welcome;
