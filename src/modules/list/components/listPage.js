import React, { useState, useEffect } from "react";
import CommonHeaderComponent from "../../common/commonHeader";
import CommonSearchComponent from "../../common/commonSearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../../common/sideBar";

import ListTable from "./listTable";
import ListUserCart from "./listUserCart";
import { getUserList } from "../../search/data/actions";
import { getIsCodeSendResponse } from "../../home/data/selectors";
import {
  getIsListProfileDetailsPayload,
  getIsSidebarListPayload,
  getIsTagsRes,
} from "../data/selectors";
import { toast } from "react-toastify";
import {
  clearTagsRes,
  fetchList,
  fetchListProfileDetails,
} from "../data/actions";

const ListPage = ({ setSearchedText, searchedText, sessionUserId }) => {
  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));
  const tagsAddedRes = useSelector((state) => getIsTagsRes(state));
  const sidebarPayload = useSelector((state) => getIsSidebarListPayload(state));
  const profileDetailsPayload = useSelector((state) =>
    getIsListProfileDetailsPayload(state)
  );

  const [rowClicked, setRowClicked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [start, setStart] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [listCartLoader, setListCartLoader] = useState({
    open: false,
    msg: "",
  });
  const [addTagModal, setAddTagModal] = useState({ open: false, obj: {} });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUserId && sessionUserId !== undefined) {
      let obj = {};
      obj.userid = sessionUserId.toString();
      dispatch(getUserList(obj));
    }
  }, [sessionUserId]);


  useEffect(() => {
    if (tagsAddedRes && tagsAddedRes !== null && tagsAddedRes !== undefined) {
      if (tagsAddedRes.status && tagsAddedRes.status === "success") {
        toast.success(tagsAddedRes.msg ? tagsAddedRes.msg : "");
        if (selectedRows && selectedRows.length > 0) {
          dispatch(fetchList(sidebarPayload));
        } else {
          dispatch(fetchListProfileDetails(profileDetailsPayload));
        }
        dispatch(clearTagsRes());
        setSelectedRows([]);
      }
    }
  }, [tagsAddedRes]);

  return (
    <div className="d_flex">
      <SideBar sessionUserId={sessionUserId} />
      <div className="right-panel">
        <CommonHeaderComponent />
        <br />
        <br />
        <br />
        <br />
        <div className="commonSearchCommponent">
          <CommonSearchComponent
            setSearchedText={setSearchedText}
            text={searchedText}
            start={start}
            sessionUserId={sessionUserId}
          />
        </div>
        <div className="d_flex">
          <ListTable
            rowClicked={rowClicked}
            setRowClicked={setRowClicked}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            sessionUserId={sessionUserId}
            setLoader={setListCartLoader}
            addTagModal={addTagModal}
            setAddTagModal={setAddTagModal}
          />

          {rowClicked ? (
            <ListUserCart
              selectedRows={selectedRows}
              rowClicked={rowClicked}
              setRowClicked={setRowClicked}
              sessionUserId={sessionUserId}
              addTagModal={addTagModal}
              setAddTagModal={setAddTagModal}
              loader={listCartLoader}
              setLoader={setListCartLoader}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
