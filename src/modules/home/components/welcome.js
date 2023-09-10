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
import { getIsCodeSendResponse, getIsDashboardDetails, getIsReactLoginResponse, getIsUserProfileDetailsFetched, getIsUserProfileDetailsUpdated } from "../data/selectors";
import { clearUpdateUserProfileDetails, fetchDashboardDetails, fetchUserProfileDetails } from "../data/actions";
import { getUserList } from "../../search/data/actions";
import AddUserProfileForm from "./addEmailForm";
import { toast } from "react-toastify";
import { BASE_URL } from '../../../store/path'

const Welcome = ({ setSearchedText, searchedText, sessionUserId, setSessionUserId }) => {

  const [userName, setUserName] = useState(0);
  const [leads, setLeads] = useState(0);
  const [search, setSearch] = useState(0);
  const [list, setList] = useState(0);
  const [team, setTeam] = useState(0);
  const [tags, setTags] = useState(0);
  const [userProfileModal, setUserProfileModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState("");


  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));
  const reactLoginRes = useSelector((state) => getIsReactLoginResponse(state));
  const dashboardRes = useSelector((state) => getIsDashboardDetails(state));
  const userProfileRes = useSelector((state) => getIsUserProfileDetailsFetched(state));
  const userProfileUpdatedRes = useSelector((state) => getIsUserProfileDetailsUpdated(state));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usrId = localStorage.getItem("userid");
  useEffect(() => {
    if (usrId) {
      setSessionUserId(usrId)
    }

  }, [usrId])


  useEffect(() => {
    const usrName = localStorage.getItem("username");
    // console.log('usrName', usrName)
    if (usrName) {
      setUserName(usrName);
    } else {
      setUserName("");
    }
    const usrId = localStorage.getItem("userid");
    if (usrId) {
      dispatch(fetchDashboardDetails(usrId.toString()))
    }

    if (usrId) {
      dispatch(fetchUserProfileDetails(usrId.toString()))
    }

  }, [])

  useEffect(() => {
    if (sessionUserId) {
      dispatch(fetchUserProfileDetails(sessionUserId.toString()))
    }
    let obj = {};
    obj.userid = (sessionUserId) ? sessionUserId.toString() : "";
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
    if (reactLoginRes) {
      if (reactLoginRes.status === "success") {
        if (reactLoginRes.fname) {
          setUserName(reactLoginRes.fname);
        }
        if (reactLoginRes.profilepic) {
          setSelectedImage(`${BASE_URL}/static/profile/${reactLoginRes.profilepic}`)
        }
        if (reactLoginRes.id) {
          setSessionUserId(reactLoginRes.id)
          dispatch(fetchDashboardDetails(reactLoginRes.id))
        }
      }

    }
  }, [reactLoginRes]);


  useEffect(() => {
    if (userProfileRes) {
      if (userProfileRes.status && userProfileRes.status === "success") {
        if (userProfileRes.secondaryemail === "" ||
          userProfileRes.designation === "" ||
          userProfileRes.company === "" ||
          userProfileRes.fullname === "") {
          setUserProfileModal(true)
        }
        setSelectedImage(`${BASE_URL}/static/profile/${userProfileRes.profilepic}`)
      }
    }

  }, [userProfileRes])

  useEffect(() => {
    if (userProfileUpdatedRes) {
      if (userProfileUpdatedRes.status && userProfileUpdatedRes.status === "success") {
        toast.success(userProfileUpdatedRes.msg ? userProfileUpdatedRes.msg : "");
        dispatch(clearUpdateUserProfileDetails())
      }
    }

  }, [userProfileUpdatedRes])


  return (
    <div className="d_flex">
      <SideBar sessionUserId={sessionUserId} />
      <div className="right-panel">
        <CommonHeaderComponent sessionUserId={sessionUserId} setSessionUserId={setSessionUserId} />
        <div className="user-container">
          <div className="image-container">
            <img
              src={selectedImage ? selectedImage : userImage}
              alt=""
              className="user-container-img"
              width="100"
              height="100"
            />
          </div>
          <div className="user-name-parent" onClick={() => setUserProfileModal(true)}>
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
        open={userProfileModal}
        className="welcome-popup-container"
      >
        <Modal.Content>
          <AddUserProfileForm setUserProfileModal={setUserProfileModal} sessionUserId={sessionUserId} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Welcome;
