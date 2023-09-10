import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, Icon, Modal, Segment, TransitionablePortal } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsAllNotification, getIsCodeSendResponse, getIsDashboardDetails, getIsNotificationCount, getIsReactLoginResponse, getIsUpdateAllNotification, getIsUserProfileDetailsFetched } from "../home/data/selectors";
import userImage from "../../images/user.png";
import BellSvg from "../svg/bellSvg";
import { BASE_URL } from '../../store/path'
import CancelSvg from '../svg/cancelSvg';
import { fetchAllNotification, fetchNotificationCount, fetchUserProfileDetails, updateAllNotification } from "../home/data/actions";


const CommonHeaderComponent = () => {

    const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state))
    const dashboardRes = useSelector((state) => getIsDashboardDetails(state));
    const reactLoginRes = useSelector((state) => getIsReactLoginResponse(state));
    const userProfileRes = useSelector((state) => getIsUserProfileDetailsFetched(state));
    const countRes = useSelector((state) => getIsNotificationCount(state));
    const allNotificationRes = useSelector((state) => getIsAllNotification(state));
    const updateAllNotificationRes = useSelector((state) => getIsUpdateAllNotification(state));

    const [searchClicked, setSearchClicked] = useState(true);
    const [listClicked, setListClicked] = useState(false);
    const [usedCredit, setUsedCredit] = useState("");
    const [totalCredit, setTotalCredit] = useState("");
    const [userName, setUserName] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [sessionUserId, setSessionUserId] = useState("");
    const [notifyCount, setNotifyCount] = useState(0);
    const [callCount, setCallCount] = useState(true);
    const [notifyData, setNotifyData] = useState([]);
    const [notifyPortal, setNotifyPortal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const usrId = localStorage.getItem("userid");
    useEffect(() => {
        if (usrId) {
            setSessionUserId(usrId)
        }

    }, [usrId])

    const navigateToSearch = () => {
        setSearchClicked(true);
        setListClicked(false);
        navigate("/search");
    };

    const navigateToList = () => {
        setSearchClicked(false);
        setListClicked(true);
        navigate("/list");
    };

    useEffect(() => {
        let pathname = window.location.pathname
        if (pathname === "/list") {
            setSearchClicked(false);
            setListClicked(true);
        }

        if (pathname === "/search") {
            setSearchClicked(true);
            setListClicked(false);
        }

    }, [searchClicked, listClicked])

    useEffect(() => {
        if (dashboardRes && dashboardRes.status === "success") {
            if (dashboardRes.data && dashboardRes.data !== null && dashboardRes.data !== undefined) {
                setUsedCredit(dashboardRes.data.creditused)
                setTotalCredit(dashboardRes.data.credittotal)
            }
        }

    }, [dashboardRes])



    useEffect(() => {
        if (reactLoginRes) {
            if (reactLoginRes.status === "success") {
                if (reactLoginRes.fname) {
                    setUserName(reactLoginRes.fname);
                    setSessionUserId(reactLoginRes.id)
                    setSelectedImage(`${BASE_URL}/static/profile/${reactLoginRes.profilepic}`)
                }
            }

        }
    }, [reactLoginRes]);

    useEffect(() => {
        if (userProfileRes) {
            if (userProfileRes.status === "success") {
                setSelectedImage(`${BASE_URL}/static/profile/${userProfileRes.profilepic}`)
            }
        }

    }, [userProfileRes])

    useEffect(() => {
        if (sessionUserId) {
            dispatch(fetchUserProfileDetails(sessionUserId.toString()))
        }
    }, [sessionUserId]);

    useEffect(() => {
        if (callCount) {
            let id = (sessionUserId) ? sessionUserId.toString() : "";
            dispatch(fetchNotificationCount(id));
            setCallCount(false)
        }
    }, [callCount]);

    setTimeout(() => {
        setCallCount(true)
    }, 180000)


    useEffect(() => {
        if (countRes && countRes.status === "success") {
            setNotifyCount(countRes.count)
        }

    }, [countRes])

    useEffect(() => {
        if (allNotificationRes && allNotificationRes.status === "success") {
            if (allNotificationRes.data) {
                setNotifyData(allNotificationRes.data)
            }
        }

    }, [allNotificationRes])

    useEffect(() => {
        if (updateAllNotificationRes && updateAllNotificationRes.status === "success") {
            let id = (sessionUserId) ? sessionUserId.toString() : "";
            dispatch(fetchNotificationCount(id));
        }

    }, [updateAllNotificationRes])


    useEffect(() => {
        if (notifyData && notifyData.length > 0) {
            let userid = notifyData[0].userid
            let ids = notifyData.map(item => item.id).join(', ')
            let obj = {}
            obj.ids = ids.toString()
            obj.userid = userid.toString()
            dispatch(updateAllNotification(obj))


        }
    }, [notifyData])

    const closeModal = () => {
        setNotifyPortal(false)
        setNotifyData([])
    }

    const showAllNotifications = () => {
        if(notifyCount > 0){
            let id = (sessionUserId) ? sessionUserId.toString() : "";
            dispatch(fetchAllNotification(id))
            setNotifyPortal(true)
        }
    }

    useEffect(() => {
        const usrName = localStorage.getItem("username");
        const usrid = localStorage.getItem("userid");
        if (usrName) {
            setUserName(usrName);
        }
    }, [])

    const navigateToWelcomePage = () => {
        navigate("/welcome");
    }

    const navigateToUpdateProfilePage = () => {
        navigate("/updateprofile");
    }

    const navigateToPricingPage = () => {
        let id = (sessionUserId) ? sessionUserId.toString() : "";
        let encodedId = btoa(id)
        let url = `${BASE_URL}/pricing?var=${encodedId}`
        window.location.href = url;
    }
    const logoutSession = () => {
        let url = `${BASE_URL}/mainlogout`
        window.location.href = url;
        localStorage.clear()
    }

    return (
        <header className="common-header">
            <div className="top-tab">
                <div
                    style={{ color: searchClicked ? "#1BE885" : "#fff", borderBottom: searchClicked ? "2px solid" : "none" }}
                    onClick={() => navigateToSearch()}
                >
                    Search
                </div>

                <div
                    style={{ color: listClicked ? "#1BE885" : "#fff", borderBottom: listClicked ? "2px solid" : "none" }}
                    onClick={() => navigateToList()}
                >
                    List
                </div>
            </div>
            <div className="balance-container">
                <div className="balance">
                    <div className="balance-background">
                        <div className="getlista">Available Credits</div>
                        <div className="div">
                            <span style={{ color: "#1BE885" }}>{usedCredit}</span>
                            <span style={{ color: "#C7B4B4" }}> / {totalCredit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="top-actions-container">
                <div className="top-actions">
                    <div style={{ position: "relative", right: "6%" }} onClick={() => showAllNotifications()}>
                        <BellSvg />
                        <span className="notification-count">{notifyCount}</span>
                    </div>
                    <div className="header-image-container">
                        <img src={selectedImage ? selectedImage : userImage} width="25px" height="25px" className="borderRadius" />
                    </div>
                    <div className="profile-wrapper">
                        <div className="profile">
                            <div className="user-parent">
                                <div className="header-user-name">{userName}</div>
                                <Dropdown text='' style={{ marginLeft: "-14px", marginTop: "-3px", borderRadius: "6px", zIndex: "105" }}>
                                    <Dropdown.Menu direction="left" style={{ width: "12vw", marginTop: "26px" }} >
                                        <Dropdown.Item onClick={() => navigateToWelcomePage()} className="logout-popup-item" >Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigateToUpdateProfilePage()} className="logout-popup-item" >Edit Profile</Dropdown.Item>
                                        {/* <Dropdown.Item className="logout-popup-item"> Reporting</Dropdown.Item>
                                        <Dropdown.Item className="logout-popup-item"> User Management</Dropdown.Item>
                                        <Dropdown.Item className="logout-popup-item">Settings</Dropdown.Item>
                                        <Dropdown.Item className="logout-popup-item">Contact/Help</Dropdown.Item> */}

                                        <Dropdown.Item className="logout-popup-item" onClick={() => navigateToPricingPage()}>Pricing</Dropdown.Item>

                                        <Dropdown.Item onClick={() => logoutSession()} className="logout-popup-item">  Log Out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                size="small"
                open={notifyPortal}
                centered={false}
                dimmer="inverted"
                style={{ marginTop: "12vh", marginLeft: "40vw", height: "25vh", overflowY: "scroll" }}
            >
                <div
                    className="welcome-popup-close-icon"
                    onClick={() => closeModal()}
                >
                    <CancelSvg />
                </div>
                <Modal.Content>
                    {
                        (notifyData && notifyData.length > 0) ? notifyData.map((item) => {
                            return (
                                <div>{item.notifytext}</div>
                            )
                        }) : <div>{"No Notifications Found"}</div>
                    }
                </Modal.Content>
            </Modal>
        </header>
    );
};

export default CommonHeaderComponent;
