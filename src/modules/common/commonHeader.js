import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsCodeSendResponse } from "../home/data/selectors";
import userImage from "../../images/user.png";

const CommonHeaderComponent = ({ fname }) => {

    const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state))

    const [searchClicked, setSearchClicked] = useState(true);
    const [listClicked, setListClicked] = useState(false);

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

    return (
        <header className="common-header">
            <div className="top-tab">
                <div
                    style={{ color: searchClicked ? "#2185d0" : "#666" }}
                    onClick={() => navigateToSearch()}
                >
                    Search
                </div>

                <div
                    style={{ color: listClicked ? "#2185d0" : "#666" }}
                    onClick={() => navigateToList()}
                >
                    List
                </div>
            </div>
            <div className="balance">
                <div className="getlista">Available Credits</div>
                <div className="div">
                    <span>15</span>
                    <span className="span"> / 20</span>
                </div>
            </div>

            <div className="top-actions">
                <Icon name="bell outline" color="grey" />
                <span className="notification-count">5</span>
                <Icon name="setting" color="grey" />
                <img src={userImage} width="25px" height="20px" />
                <div className="profile">
                    <div className="user-parent">
                        <div className="search">{fname}</div>
                        <Icon name="caret down" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CommonHeaderComponent;
