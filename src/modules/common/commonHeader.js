import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsCodeSendResponse, getIsDashboardDetails } from "../home/data/selectors";
import userImage from "../../images/user.png";
import BellSvg from "../svg/bellSvg";


const CommonHeaderComponent = () => {

    const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state))
    const dashboardRes = useSelector((state) => getIsDashboardDetails(state));

    const [searchClicked, setSearchClicked] = useState(true);
    const [listClicked, setListClicked] = useState(false);
    const [usedCredit, setUsedCredit] = useState("");
    const [totalCredit, setTotalCredit] = useState("");
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

                    }

                }

            }
        }
    }, [getLoginAuthRes]);


    useEffect(() => {
        const usrName = localStorage.getItem("username");
        console.log('usrName-header', usrName)
        if (usrName && usrName !== null && usrName !== undefined) {
            setUserName(usrName);
        } else {
            setUserName("");
        }
    }, [])

    const navigateToWelcomePage = () => {
        navigate("/welcome");
    }

    const logoutSession = () => {
        navigate("/");
        localStorage.clear()
    }

    return (
        <header className="common-header">
            <div className="top-tab">
                <div
                    style={{ color: searchClicked ? "#2185d0" : "#666", borderBottom: searchClicked ? "2px solid" : "none" }}
                    onClick={() => navigateToSearch()}
                >
                    Search
                </div>

                <div
                    style={{ color: listClicked ? "#2185d0" : "#666", borderBottom: listClicked ? "2px solid" : "none" }}
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
                            <span>{usedCredit}</span>
                            <span className="span"> / {totalCredit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="top-actions-container">
                <div className="top-actions">
                    <div style={{ position: "relative" }}>
                        <BellSvg />
                        <span className="notification-count">5</span>
                    </div>
                    <img src={userImage} width="25px" height="25px" />
                    <div className="profile-wrapper">
                        <div className="profile">
                            <div className="user-parent">
                                <div className="search">{userName}</div>
                                <Dropdown text='' style={{ marginLeft: "-10px", marginTop: "-3px", borderRadius: "6px" }}>
                                    <Dropdown.Menu direction="left" style={{ width: "12vw", marginTop: "6px" }} >
                                        <Dropdown.Item onClick={() => navigateToWelcomePage()} className="logout-popup-item" >Profile</Dropdown.Item>
                                        <Dropdown.Item className="logout-popup-item"> Reporting</Dropdown.Item>
                                        <Dropdown.Item className="logout-popup-item"> User Management</Dropdown.Item>
                                        <Dropdown.Item className="logout-popup-item">Settings</Dropdown.Item>
                                        <Dropdown.Item className="logout-popup-item">Contact/Help</Dropdown.Item>
                                        <Dropdown.Item className="logout-popup-item"> Reporting</Dropdown.Item>
                                        <Dropdown.Item onClick={() => logoutSession()} className="logout-popup-item">  Log Out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CommonHeaderComponent;
