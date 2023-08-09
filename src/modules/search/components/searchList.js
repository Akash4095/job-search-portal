import React, { useState, useEffect } from "react";
import SideBar from "../../common/sideBar";
import SearchResults from "./searchResults";
import CommonHeaderComponent from "../../common/commonHeader";
import CommonSearchComponent from "../../common/commonSearchComponent";
import { Button, Icon } from "semantic-ui-react";
import UserCart from "./userCart";
import { getIsSearchedText } from "../../home/data/selectors";
import { getIsFetchedSearchByQuery } from "../data/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearchByQuery } from "../data/actions";

const Search = () => {

  const [rowClicked, setRowClicked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchedText = useSelector((state) => getIsSearchedText(state));
  const searchResult = useSelector((state) => getIsFetchedSearchByQuery(state));
  const inputText = useSelector((state) => getIsSearchedText(state));

  useEffect(() => {

    if (searchedText && searchedText !== undefined && searchedText !== null) {
      let obj = {}
      obj.query = searchedText
      obj.start = "1"
      obj.userid = "1"
      dispatch(fetchSearchByQuery())
    }

  }, [searchedText])

  useEffect(() => {
    if (searchResult && searchResult !== null && searchResult !== undefined) {
      if (searchResult.status && searchResult.status === "success") {
        setItems(searchResult.data)
      }
    }

  }, [searchResult])


console.log('inputText', inputText)
  const userRowClicked = () => { };
  return (
    <div className="d_flex">
      <SideBar />
      <div className="right-panel">
        <CommonHeaderComponent />
        <br />
        <br />
        <br />
        <br />
        <div style={{ left: "10%", position: "relative" }}>
          <CommonSearchComponent text={inputText}  />
        </div>
        <p className="search-result-count">
          304 Search Result Product Designer
        </p>
        {
          selectedRows.length > 0 ?
            <p className='selected'>
              <span> {selectedRows + " Selected"} </span>
              <Button icon labelPosition='left' color='blue' size='mini' style={{ padding: "5px 0px", marginLeft: "20px", borderRadius: "6px" }}>
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
                items.map((item) => {
                  return (
                    <SearchResults
                      row={item}
                      rowClicked={rowClicked}
                      setRowClicked={setRowClicked}
                      selectAll={selectAll}
                      setSelectAll={setSelectAll}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
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
