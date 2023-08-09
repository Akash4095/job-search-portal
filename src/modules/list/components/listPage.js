import React, { useState } from "react";
import CommonHeaderComponent from "../../common/commonHeader";
import CommonSearchComponent from "../../common/commonSearchComponent";
import SideBar from "../../common/sideBar";

import ListTable from "./listTable";
import ListUserCart from "./listUserCart";

const ListPage = () => {

  const [rowClicked, setRowClicked] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

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
