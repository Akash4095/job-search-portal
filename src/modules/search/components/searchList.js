import React, { useState, useEffect } from "react";
import SideBar from "../../common/sideBar";
import SearchResults from "./searchResults";
import CommonHeaderComponent from "../../common/commonHeader";
import CommonSearchComponent from "../../common/commonSearchComponent";
import { Button, Icon } from "semantic-ui-react";
import UserCart from "./userCart";
import { getIsCodeSendResponse, getIsSearchedText } from "../../home/data/selectors";
import { getIsAddUserList, getIsFetchedSearchByQuery, getIsUserList } from "../data/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearchByQuery, getUserList } from "../data/actions";

const Search = ({ setSearchedText, searchedText }) => {

  const searchResult = useSelector((state) => getIsFetchedSearchByQuery(state));
  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));
  const inputText = useSelector((state) => getIsSearchedText(state));
  const userListRes = useSelector((state) => getIsUserList(state));
  const addListRes = useSelector((state) => getIsAddUserList(state));

  const [rowClicked, setRowClicked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [items, setItems] = useState([]);
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
    if (searchResult && searchResult !== null && searchResult !== undefined) {
      if (searchResult.status && searchResult.status === "success") {
        setItems(searchResult.data)
      }
    }

  }, [searchResult])

  useEffect(() => {
    if (addListRes && addListRes !== null && addListRes !== undefined) {
      if (addListRes.status && addListRes.status === "success") {

      }
    }

  }, [addListRes])

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


  const userRowClicked = () => { };
  return (
    <div className="d_flex">
      <SideBar sessionUserId={sessionUserId} />
      <div className="right-panel">
        <CommonHeaderComponent />
        <br />
        <br />
        <br />
        <br />
        <div style={{ left: "10%", position: "relative" }}>
          <CommonSearchComponent text={inputText} setSearchedText={setSearchedText} />
        </div>
        <p className="search-result-count">
          {(items.length > 0) ? items.length + " " + searchedText : ""}
        </p>
        {
          selectedRows.length > 0 ?
            <p className='selected'>
              <span> {selectedRows.length + " Selected"} </span>
              <Button icon labelPosition='left' color='blue' size='mini' style={{ padding: "6px 0px", marginLeft: "20px", borderRadius: "6px" }}>
                <Icon name='list ul' color='white' size='mini' />
                Add to list
              </Button>
            </p>
            : null

        }

        <div className="d_flex">
          <div
            className="scrollable-container"
            style={{ height: "70vh", overflowY: "scroll", width: "78vw" }}
          >
            {
              (items && items.length > 0) ?
                items.map((item, index) => {
                  return (
                    <SearchResults
                      key={index}
                      row={item}
                      rowClicked={rowClicked}
                      setRowClicked={setRowClicked}
                      selectAll={selectAll}
                      setSelectAll={setSelectAll}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      sessionUserId={sessionUserId}
                    />
                  )
                }) : null
            }

          </div>
          {rowClicked ? <UserCart setRowClicked={setRowClicked} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
