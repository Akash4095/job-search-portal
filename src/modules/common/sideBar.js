import React, { useState, useEffect } from "react";
import { Button, Icon, Modal, Popup } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getIsAddUserList, getIsDeleteUserList, getIsUpdateUserList, getIsUserList } from "../search/data/selectors";
import AddListForm from "./addListForm";
import CommanResponseModal from "./commonModal";
import { clearDeleteUserListRes, clearUpdateUserListRes, clearUserListRes, getUserList } from "../search/data/actions";
import { clearFetchedList, fetchList, saveSideListPayload } from "../list/data/actions";
import { getIsFetchedListResSave } from "../list/data/selectors";
import LockSvg from "../svg/lockSvg"
import ListSvg from "../svg/listSvg";
import AddListSvg from "../svg/addListSvg";
import MyTeamSvg from "../svg/myTeamSvg";
import HelpSvg from "../svg/helpSvg";
import IntegrationSvg from "../svg/integrationSvg";
import GetlistSvg from "../svg/getlist{a}.svg";
import ListEditSvg from "../svg/listEditSvg"
import EditDeleteMenus from "./editDeleteMenus";
import EditListForm from "./editListForm";
import { toast } from "react-toastify";

const SideBar = ({ sessionUserId }) => {

  const addListRes = useSelector((state) => getIsAddUserList(state));
  const updateListRes = useSelector((state) => getIsUpdateUserList(state));
  const deleteListRes = useSelector((state) => getIsDeleteUserList(state));
  const userListRes = useSelector((state) => getIsUserList(state));
  const [addListModal, setAddListModal] = useState({ open: false, msg: "" });
  const [editListModal, setEditListModal] = useState({ open: false, obj: {} });
  const listResponse = useSelector((state) => getIsFetchedListResSave(state));
  const [sidebarUserList, setSidebarUserList] = useState([]);
  const [isHovered, setIsHovered] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoWelcomePage = () => {
    navigate("/welcome");
  };
  const openAddListModal = () => {
    setAddListModal({ open: true, msg: "" });
  };



  useEffect(() => {
    if (addListRes) {
      if (addListRes.status === "success") {
        dispatch(clearUserListRes());
        toast.success("List added Succesfully");
        let obj = {};
        obj.userid = (sessionUserId) ? sessionUserId.toString() : "";
        dispatch(getUserList(obj));
      }

    }
  }, [addListRes]);

  useEffect(() => {
    if (updateListRes) {
      if (updateListRes.status === "success") {
        toast.success("List Updated Succesfully");
        dispatch(clearUpdateUserListRes());

        let obj = {};
        obj.userid = (sessionUserId) ? sessionUserId.toString() : "";
        dispatch(getUserList(obj));
      }
      if (updateListRes.status === "failed") {
        toast.error("Something went wrong");
        dispatch(clearUpdateUserListRes());
      }

    }
  }, [updateListRes]);

  useEffect(() => {
    if (deleteListRes) {
      if (deleteListRes.status === "success") {
        toast.success(deleteListRes.data ? deleteListRes.data : "");
        dispatch(clearDeleteUserListRes());

        let obj = {};
        obj.userid = (sessionUserId) ? sessionUserId.toString() : "";
        dispatch(getUserList(obj));
      }

      if (deleteListRes.status === "failed") {
        toast.error(deleteListRes.data ? deleteListRes.data : "");
        dispatch(clearDeleteUserListRes());
      }

    }
  }, [deleteListRes]);

  useEffect(() => {
    if (userListRes) {
      if (userListRes.status === "success") {
        setSidebarUserList(userListRes.list);
      }
    }
  }, [userListRes]);

  useEffect(() => {
    if (listResponse) {
      if (listResponse.status === "success") {
        if (
          listResponse.list &&
          listResponse.list.length &&
          listResponse.list.length > 0
        ) {
          navigate("/list");
          dispatch(clearFetchedList());
        }
        if (
          listResponse.list &&
          listResponse.list.length &&
          listResponse.list.length === 0
        ) {
          toast.success("Default List Has No Data");
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
          <div className="getlist-sidebar">getlist</div>
          <div className="a-bracket">{`{a}`}</div>
          {/* <img src={GetlistSvg} alt="" /> */}
        </div>
      </div>
      <div className="sidebar-middle scrollable-container-sidebar">
        {/* <div className="sidebar-list-lock">
          <div className="listSvg">
            <ListSvg />
          </div>
          <div className="default-list-lock">Default List</div>
          <div className="lockSvg">
            <LockSvg />
          </div>
        </div> */}
        {sidebarUserList && sidebarUserList.length > 0
          ? sidebarUserList.map((item) => {
            return (
              <div className="sidebar-list"
              >
                <div className="listSvg">
                  <ListSvg />
                </div>
                <div className="default-list1" onClick={() => callListFunction(item)}>{item.listname}</div>
                {
                  item.listname === "Default List" ?
                    <div className="lockSvg">
                      <LockSvg />
                    </div> :
                    <div>
                      <Popup
                        content={
                          <EditDeleteMenus
                            item={item}
                            setEditListModal={setEditListModal}
                          />}
                        on="click"
                        pinned
                        wide
                        position="bottom center"
                        style={{ marginLeft: "6px", marginTop: "2px" }}
                        trigger={
                          <div id="popupBtn">
                            <ListEditSvg />
                          </div>
                        }
                      />

                    </div>

                }
              </div>
            );
          })
          : null}

        <div className="sidebar-add-list" onClick={() => openAddListModal()}>
          <div className="addlistSvg">
            <AddListSvg />
          </div>
          <div className="default-list1">Add List</div>
        </div>
      </div>
      <div className="footer-actions">
        <div className="sidebar-f-list">
          <div className="footerSvg">
            <NavLink to="/myteam" activeClassName="active">
              <MyTeamSvg />
            </NavLink>
          </div>
          <div className="default-list">
            <NavLink to="/myteam" activeClassName="active">
              My Team
            </NavLink>
          </div>
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
      // onClose={() => setAddListModal({ open: false, msg: "" })}
      >
        <Modal.Content>
          <AddListForm setAddListModal={setAddListModal} sessionUserId={sessionUserId} />
        </Modal.Content>
      </Modal>
      <Modal
        size="mini"
        open={editListModal.open}
      >
        <Modal.Content>
          <EditListForm setEditListModal={setEditListModal} editListModal={editListModal} sessionUserId={sessionUserId} />
        </Modal.Content>
      </Modal>

    </section>
  );
};

export default SideBar;