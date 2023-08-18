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

const ListPage = ({ setSearchedText, searchedText }) => {
  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));

  const [rowClicked, setRowClicked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [start, setStart] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sessionUserId, setSessionUserId] = useState("");
  const [listLoader, setListLoader] = useState({ open: false, msg: "" });
  const [addTagModal, setAddTagModal] = useState({ open: false, obj: {} });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let obj = {};
    obj.userid = sessionUserId.toString();
    // obj.userid = "1"
    dispatch(getUserList(obj));
  }, [sessionUserId]);

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
          if (
            getLoginAuthRes.data.id &&
            getLoginAuthRes.data.id !== undefined &&
            getLoginAuthRes.data.id !== null
          ) {
            setSessionUserId(getLoginAuthRes.data.id);
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
        <br />
        <br />
        <br />
        <br />
        <div className="commonSearchCommponent">
          <CommonSearchComponent
            setSearchedText={setSearchedText}
            text={searchedText}
            start={start}
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
            setListLoader={setListLoader}
            addTagModal={addTagModal}
            setAddTagModal={setAddTagModal}
          />

          {rowClicked ? (
            <ListUserCart
              rowClicked={rowClicked}
              setRowClicked={setRowClicked}
              sessionUserId={sessionUserId}
              addTagModal={addTagModal}
              setAddTagModal={setAddTagModal}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
