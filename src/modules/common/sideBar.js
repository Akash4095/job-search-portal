import React, { useState, useEffect } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsAddUserList, getIsUserList } from "../search/data/selectors";
import AddListForm from "./addListForm";
import CommanResponseModal from "./commonModal";
import { clearUserListRes, getUserList } from "../search/data/actions";

const SideBar = ({ sessionUserId }) => {

    const addListRes = useSelector((state) => getIsAddUserList(state));
    const userListRes = useSelector((state) => getIsUserList(state));
    const [addListModal, setAddListModal] = useState({ open: false, msg: "" });
    const [sidebarUserList, setSidebarUserList] = useState([]);
    const [openCommonModal, setOpenCommonModal] = useState({
        open: false,
        size: "",
        headerContent: "",
        headerIcon: "",
        modalContent: "",
        buttonColor: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gotoWelcomePage = () => {
        navigate("/welcome");
    };
    const openAddListModal = () => {
        setAddListModal({ open: true, msg: "" });
    };

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (addListRes && addListRes !== null && addListRes !== undefined) {
            if (addListRes.status === "success") {
                setOpenCommonModal({ open: true, size: "mini", headerContent: "Add List Response", headerIcon: "check circle", modalContent: "Success", buttonColor: "green" })
                dispatch(clearUserListRes())
                let obj = {}
                obj.userid = sessionUserId.toString()
                // obj.userid = "1"
                dispatch(getUserList(obj))
            }
        }

    }, [addListRes])

    useEffect(() => {
        if (userListRes && userListRes !== null && userListRes !== undefined) {
            if (userListRes.status === "success") {
                setSidebarUserList(userListRes.list)
            }
        }

    }, [userListRes])

    //   console.log("addListRes", addListRes);
    //   console.log("userListRes", userListRes);
    //   console.log('sidebarUserList', sidebarUserList)

    return (
        <section className="sidebar-container">
            <div className="sidebar-header">
                <div className="top" onClick={() => gotoWelcomePage()}>
                    <span className="getlist">getlist</span>
                    <span className="a">{`{a}`}</span>
                </div>
            </div>
            <div className="sidebar-middle scrollable-container-sidebar">
                <div className="sidebar-list">
                    <Icon name="bars" className="sidebar-icons" />
                    <div className="default-list-lock">Default List</div>
                    <Icon name="lock" />
                </div>
                {
                    (sidebarUserList && sidebarUserList.length > 0) ?
                        sidebarUserList.map((item) => {
                            return (
                                <div className="sidebar-list">
                                    <Icon name="bars" className="sidebar-icons" />
                                    <div className="default-list1">{item.listname}</div>
                                </div>
                            )
                        })

                        : null

                }

                <div className="sidebar-add-list" onClick={() => openAddListModal()}>
                    <Icon name="add" className="sidebar-icons" />
                    <div className="default-list1">Add List</div>
                </div>
            </div>
            <div className="footer-actions">
                <div className="sidebar-f-list">
                    <Icon name="user" className="sidebar-icons" />
                    <div className="default-list">My Team</div>
                </div>
                <div className="sidebar-f-list">
                    <Icon name="help circle" className="sidebar-icons" />
                    <div className="default-list">Help</div>
                </div>
                <div className="sidebar-f-list">
                    <Icon name="clipboard outline" className="sidebar-icons" />
                    <div className="default-list">Integration</div>
                </div>
            </div>
            <div className="widget-last">
                <div className="getlista">Subscription Expiry Date</div>
                <div>25 July 2023</div>
            </div>
            <Modal
                size="mini"
                open={addListModal.open}
                onClose={() => setAddListModal({ open: false, msg: "" })}
            >
                <Modal.Content>
                    <AddListForm setAddListModal={setAddListModal} />
                </Modal.Content>
            </Modal>
            <CommanResponseModal
                openCommonModal={openCommonModal}
                setOpenCommonModal={setOpenCommonModal}
            />
        </section>
    );
};

export default SideBar;
