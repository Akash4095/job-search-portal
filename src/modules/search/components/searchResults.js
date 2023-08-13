import React, { useEffect, useState } from "react";
import { Checkbox, Grid, Icon } from "semantic-ui-react";
import "./searchResult.css";
import UserCart from "./userCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProfileToList, fetchProfileDetails } from "../data/actions";

const SearchResults = ({
  row,
  key,
  rowClicked,
  setRowClicked,
  selectAll,
  setSelectAll,
  selectedRows,
  setSelectedRows,
  sessionUserId,
  setAddListModal
}) => {
  let data = [];

  const dispatch = useDispatch();

  const handleRowClick = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };
  

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  function createMarkup(msg) {
    return { __html: msg };
  }

  const getUserProfileDetails = (row) => {
    let obj = {}
    obj.profileid = (row.id).toString()
    obj.userid = sessionUserId
    dispatch(fetchProfileDetails(obj))
    setRowClicked(true)
  }

  const addProfileToListFunc = (row) => {
    setAddListModal({ open: true, msg: "", obj: row })

  }

  return (
    <div style={{ display: "flex" }} key={key}>
      <div style={{ width: rowClicked ? "60vw" : "75vw" }}>
        <div className="search-result-container">
          <Grid className="search-result-grid" style={{ margin: "0px" }}>
            <Grid.Row className="search-result-grid-row">
              <Grid.Column width={2}>
                <Checkbox
                  className="search-result-checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowClick(row.id)}
                />
                <img
                  src={
                    row && row.profilepic && row.profilepic !== undefined
                      ? row.profilepic
                      : ""
                  }
                  height={rowClicked ? "40" : "55"}
                  width={rowClicked ? "40" : "55"}
                  className="border-radius"
                />
              </Grid.Column>
              <Grid.Column width={12} style={{ marginLeft: "-3%" }}>
                <p className="userName" onClick={() => getUserProfileDetails(row)}>
                  {row && row.title ? (
                    <span dangerouslySetInnerHTML={createMarkup(row.title)} />
                  ) : (
                    ""
                  )}
                </p>
                <p className="userDescription">
                  {row && row.description && row.description !== undefined ? (
                    <span
                      dangerouslySetInnerHTML={createMarkup(row.description)}
                    />
                  ) : (
                    ""
                  )}
                </p>
              </Grid.Column>
              <Grid.Column width={2} className="action-column">
                <Link to={row.linkedinlink} target="_blank">
                  <div title="Linkedin Profile">
                    <Icon color="grey" name="linkedin" />
                  </div>
                </Link>
                <Icon name="twitter" />
                <Icon name="dribbble" />
              </Grid.Column>
              <p className="add-list-btn" onClick={() => addProfileToListFunc(row)}>Add List</p>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
