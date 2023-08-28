import React, { useState, useEffect } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsAddUserList, getIsUserList } from "../search/data/selectors";
import AddListForm from "./addListForm";
import CommanResponseModal from "./commonModal";
import { clearUserListRes, getUserList } from "../search/data/actions";
import { clearFetchedList, fetchList, saveSideListPayload } from "../list/data/actions";
import { getIsFetchedListResSave } from "../list/data/selectors";
import LockSvg from "../svg/lockSvg"
import ListSvg from "../svg/listSvg";
import AddListSvg from "../svg/addListSvg";
import MyTeamSvg from "../svg/myTeamSvg";
import HelpSvg from "../svg/helpSvg";
import IntegrationSvg from "../svg/integrationSvg";

const SideBar = ({ sessionUserId }) => {
  const addListRes = useSelector((state) => getIsAddUserList(state));
  const userListRes = useSelector((state) => getIsUserList(state));
  const [addListModal, setAddListModal] = useState({ open: false, msg: "" });
  const listResponse = useSelector((state) => getIsFetchedListResSave(state));
  const [sidebarUserList, setSidebarUserList] = useState([]);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoWelcomePage = () => {
    navigate("/welcome");
  };
  const openAddListModal = () => {
    setAddListModal({ open: true, msg: "" });
  };



  useEffect(() => {
    if (addListRes && addListRes !== null && addListRes !== undefined) {
      if (addListRes.status === "success") {
        dispatch(clearUserListRes());

        let obj = {};
        obj.userid = (sessionUserId && sessionUserId !== undefined && sessionUserId !== null) ? sessionUserId.toString() : "";
        dispatch(getUserList(obj));
      }

    }
  }, [addListRes]);

  useEffect(() => {
    if (userListRes && userListRes !== null && userListRes !== undefined) {
      if (userListRes.status === "success") {
        setSidebarUserList(userListRes.list);
      }
    }
  }, [userListRes]);

  useEffect(() => {
    if (listResponse && listResponse !== null && listResponse !== undefined) {
      if (listResponse.status === "success") {
        if (
          listResponse.list &&
          listResponse.list.length &&
          listResponse.list.length > 0
        ) {
          navigate("/list");
          dispatch(clearFetchedList());
        }
      }
    }
  }, [listResponse]);


  const callListFunction = (row) => {
    let obj = {};
    obj.userid = row.userid.toString();
    obj.listid = row.id.toString();
    dispatch(fetchList(obj));
    dispatch(saveSideListPayload(obj))
  };

  return (
    <section className="sidebar-container">
      <div className="sidebar-header">
        <div className="top" onClick={() => gotoWelcomePage()}>
          <div className="getlist">getlist</div>
          <div className="a">{`{a}`}</div>
        </div>
      </div>
      <div className="sidebar-middle scrollable-container-sidebar">
        <div className="sidebar-list-lock">
          {/* <Icon name="bars" className="sidebar-icons" /> */}
          <div className="listSvg">
            <ListSvg />
          </div>
          <div className="default-list-lock">Default List</div>
          {/* <Icon name="lock" /> */}
          <div className="lockSvg">
            <LockSvg />
          </div>
        </div>
        {sidebarUserList && sidebarUserList.length > 0
          ? sidebarUserList.map((item) => {
            return (
              <div
                className="sidebar-list"
                onClick={() => callListFunction(item)}
              >
                {/* <Icon name="bars" className="sidebar-icons" /> */}
                <div className="listSvg">
                  <ListSvg />
                </div>
                <div className="default-list1">{item.listname}</div>
              </div>
            );
          })
          : null}

        <div className="sidebar-add-list" onClick={() => openAddListModal()}>
          {/* <Icon name="add" className="sidebar-icons" /> */}
          <div className="addlistSvg">
            <AddListSvg />
          </div>
          <div className="default-list1">Add List</div>
        </div>
      </div>
      <div className="footer-actions">
        <div className="sidebar-f-list">
          {/* <Icon name="user" className="sidebar-icons" /> */}
          <div className="footerSvg">
            <MyTeamSvg />
          </div>
          <div className="default-list">My Team</div>
        </div>
        <div className="sidebar-f-list">

          <div className="footerSvg">
            <HelpSvg />
          </div>
          <div className="default-list">Help</div>
        </div>
        <div className="sidebar-f-list">

          <div className="footerSvg">
            <IntegrationSvg />
          </div>
          <div className="default-list">Integration</div>
        </div>
      </div>
      <div className="widget-last">
        <div className="subscription-date">Subscription Expiry Date</div>
        <div>25 July 2023</div>
      </div>
      <Modal
        size="mini"
        open={addListModal.open}
        onClose={() => setAddListModal({ open: false, msg: "" })}
      >
        <Modal.Content>
          <AddListForm setAddListModal={setAddListModal} sessionUserId={sessionUserId} />
        </Modal.Content>
      </Modal>

    </section>
  );
};

export default SideBar;