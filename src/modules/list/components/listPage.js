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

const ListPage = () => {

  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));

  const [rowClicked, setRowClicked] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [sessionUserId, setSessionUserId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let obj = {}
    obj.userid = sessionUserId
    // obj.userid = "1"
    dispatch(getUserList(obj))

  }, [sessionUserId])

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
          if (getLoginAuthRes.data.id && getLoginAuthRes.data.id !== undefined && getLoginAuthRes.data.id !== null) {
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
          <CommonSearchComponent setSearchedText={setSearchedText} />
        </div>
        <div className="d_flex">
          <ListTable
            rowClicked={rowClicked}
            setRowClicked={setRowClicked}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />

          {rowClicked ? (
            <ListUserCart
              rowClicked={rowClicked}
              setRowClicked={setRowClicked}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
