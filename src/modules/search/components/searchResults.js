import React, { useEffect, useState } from "react";
import { Checkbox, Grid, Icon } from "semantic-ui-react";
import "./searchResult.css";
import UserCart from "./userCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfileToList,
  clearProfileDetails,
  fetchProfileDetails,
  saveProfileDetailsPayload,
} from "../data/actions";
import CheckBoxSvg from "../../svg/checkBoxSvg";
import LinkedinSvg from "../../svg/linkedinSvg";
import DorribleSvg from "../../svg/dorribleSvg";
import TwiterSvg from "../../svg/twiterSvg";

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
  setAddListModal,
  loader,
  setUserCartLoader,
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

  function createMarkup(msg) {
    return { __html: msg };
  }

  const getUserProfileDetails = (row) => {
    let obj = {};
    obj.profileid = row.id.toString();
    obj.userid = (sessionUserId && sessionUserId !== undefined && sessionUserId !== null) ? sessionUserId.toString() : "";
    dispatch(fetchProfileDetails(obj));
    dispatch(saveProfileDetailsPayload(obj));
    setUserCartLoader({ open: true, msg: "Loading Profile" });
    setRowClicked(true);
    dispatch(clearProfileDetails())
  };

  const addProfileToListFunc = (row) => {
    setAddListModal({ open: true, msg: "", obj: row });
  };

  return (
    <div className="cart" style={{ width: rowClicked ? "60vw" : "78vw" }}>
      <div>
        <Checkbox
          className="search-result-checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => handleRowClick(row.id)}
        />
      </div>
      <div className="cart-content">
        <div className="cart-body">
          <div className="cart-img">
            <img
              src={
                row && row.profilepic && row.profilepic !== undefined
                  ? row.profilepic
                  : ""
              }
              height="58"
              width="58"
              className="border-radius"
            />
          </div>
          <div className="cart-frame">
            <div className="cart-name-header" style={{ width: rowClicked ? "50vw" : "68vw" }}>
              <div className="cart-user-name" onClick={() => getUserProfileDetails(row)}>
                {row && row.title ? (
                  <span dangerouslySetInnerHTML={createMarkup(row.title)} />
                ) : (
                  ""
                )}
              </div>
              <div className="cart-user-icons">
                <Link to={row.linkedinlink} target="_blank">
                  <div title="Linkedin Profile">
                    <Icon color="grey" name="linkedin" />
                  </div>
                </Link>
                <Icon name="twitter" color="grey" />
                <Icon name="dribbble" color="grey" />
              </div>
            </div>
            <div className="cart-description" style={{ width: rowClicked ? "42vw" : "60vw" }}>
              {row && row.description && row.description !== undefined ? (
                <span
                  dangerouslySetInnerHTML={createMarkup(row.description)}
                />
              ) : (
                ""
              )}
            </div>
            <div className="cart-add-to-list" onClick={() => addProfileToListFunc(row)}>
              Add to list
            </div>
          </div>
        </div>
      </div>
      {/* <Grid className="search-result-grid" style={{ margin: "0px" }}>
            <Grid.Row className="search-result-grid-row" key={key}>
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
                <p
                  className="userName"
                  onClick={() => getUserProfileDetails(row)}
                >
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
              <p
                className="add-list-btn"
                onClick={() => addProfileToListFunc(row)}
              >
                Add List
              </p>
            </Grid.Row>
          </Grid> */}
    </div>
  );
};

export default SearchResults;
