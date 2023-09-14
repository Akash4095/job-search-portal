import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Grid, Icon, Image, Modal, Table } from "semantic-ui-react";
import { clearListProfileDetails, fetchListProfileDetails, saveListProfileDetailsPayload } from "../data/actions";
import TagsSvg from "../../svg/TagsSvg";
import EmailSvg from "../../svg/emailSvg";
import CallSvg from "../../svg/callSvg";
import DotsSvg from "../../svg/dotsSvg";

const ListTable = ({
  listArray,
  setListArray,
  rowClicked,
  setRowClicked,
  selectAll,
  setSelectAll,
  selectedRows,
  setSelectedRows,
  sessionUserId,
  setLoader,
  addTagModal,
  setAddTagModal
}) => {




  const dispatch = useDispatch();




  const handleRowClick = (row) => {

    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(row)) {
        return prevSelectedRows.filter((item) => item !== row);
      } else {
        return [...prevSelectedRows, row];
      }
    });
  };



  const fetchlistCartDetails = (row) => {
    
      let obj = {}
      obj.userid = (sessionUserId && sessionUserId !== undefined && sessionUserId !== null) ? sessionUserId.toString() : "";
      obj.profileid = row.profileid
      obj.listid = row.listid
      dispatch(fetchListProfileDetails(obj))
      dispatch(saveListProfileDetailsPayload(obj))
      setLoader({ open: true, msg: "Loading" })
      setRowClicked(true);
      dispatch(clearListProfileDetails())

    
  };

  const tagListFunction = () => {
    setAddTagModal({ open: true, obj: {} })
  };


  return (
    <div>
      <div className="list-table-container">

        <div className="list-table-header">
          <div className="checkbox-space">

          </div>
          <div className="list-person-div">
            <div className="header-name">
              Person
            </div>
          </div>
          <div className="list-company-div">
            <div className="header-name">
              Company
            </div>
          </div>
          <div className="list-tags-div">
            <div className="header-name">
              Tags
            </div>
            <div className="tags-svg">
              <TagsSvg />
            </div>
          </div>
          <div className="list-contact-div">
            <div className="header-name">
              Contact Details
            </div>
          </div>
          <div className="list-last-div">
          </div>
        </div>
        <div
          className="scrollable-container list-body"
        >
          <div className="">
            {listArray.length > 0 &&
              listArray.map((item) => {
                return (
                  <div className="list-table-row">
                    <div className="list-column1">
                      <Checkbox
                        checked={selectedRows.includes(item)}
                        onChange={() => handleRowClick(item)}
                      />
                    </div>
                    <div className="list-column2" >
                      <img
                        src={item.profilepic ? item.profilepic : ""}
                        alt=""
                        height="40"
                        width="40"
                        style={{
                          borderRadius: "6px",
                          flexShrink: 0,
                        }}
                      />
                      <div className="list-person-container" onClick={() => fetchlistCartDetails(item)}>
                        <div className="list-name-frame">
                          <div className="list-person-name">
                            {item.name ? item.name : ""}
                          </div>
                        </div>
                        <div className="list-person-work">
                          {item.position ? item.position : "Role N/A"}
                        </div>
                      </div>

                    </div>
                    <div className="list-column3" onClick={() => fetchlistCartDetails(item)}>
                      <div className="company-name">
                        {item.company ? item.company : "N/A"}
                      </div>
                    </div>
                    <div className="list-column4">
                      <div className="tagsWrap">
                        {item.tags && item.tags.length > 0
                          ? item.tags.map((tagname, index) => {
                            return (
                              <div className="tag-item-frame">
                                <div className={`tag-color${Math.floor(Math.random() * 10) + 1}`}></div>
                                <div className="tag-name"> {tagname}</div>
                              </div>
                            );
                          })
                          : ""}
                      </div>
                    </div>
                    <div className="list-column5">
                      <div className="email-container">
                        <div className="emailSvg">
                          <EmailSvg />
                        </div>
                        <div className="email">
                          {item.email ? item.email : "N/A"}
                        </div>
                      </div>
                      <div className="mobile-container">
                        <div className="emailSvg">
                          <CallSvg />
                        </div>
                        <div className="email">
                          {item.mobile ? item.mobile : "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="list-column6">
                      <div className="dotsSvg">
                        <DotsSvg />
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div
          className="scrollable-container list-body-mobile"
        >
          <div className="">
            {listArray.length > 0 &&
              listArray.map((item) => {
                return (
                  <div className="list-table-row">
                    <div className="list-column1">
                      <Checkbox
                        checked={selectedRows.includes(item)}
                        onChange={() => handleRowClick(item)}
                        style={{ transform: "scale(0.8)" }}
                      />
                    </div>
                    <div className="list-column2" >
                      {/* <img
                        src={item.profilepic ? item.profilepic : ""}
                        alt=""
                        height="20"
                        width="20"
                        style={{
                          borderRadius: "6px",
                          flexShrink: 0,
                        }}
                      /> */}
                      <div className="list-person-container" onClick={() => fetchlistCartDetails(item)}>
                        <div className="list-name-frame">
                          <div className="list-person-name">
                            {item.name ? item.name : ""}
                          </div>
                        </div>
                        <div className="list-person-work">
                          {item.position ? item.position : "Role N/A"}
                        </div>
                      </div>

                    </div>
                    <div className="list-column3" onClick={() => fetchlistCartDetails(item)}>
                      <div className="company-name">
                        {item.company ? item.company : "N/A"}
                      </div>
                    </div>
                    <div className="list-column4">
                      <div className="tagsWrap">
                        {item.tags && item.tags.length > 0
                          ? item.tags.map((tagname, index) => {
                            return (
                              <div className="tag-item-frame">
                                <div className={`tag-color${Math.floor(Math.random() * 10) + 1}`}></div>
                                <div className="tag-name"> {tagname}</div>
                              </div>
                            );
                          })
                          : ""}
                      </div>
                    </div>
                    <div className="list-column5">
                      <div className="email-container">
                        <div className="emailSvg">
                          <EmailSvg />
                        </div>
                        <div className="email">
                          {item.email ? item.email : "N/A"}
                        </div>
                      </div>
                      <div className="mobile-container">
                        <div className="emailSvg">
                          <CallSvg />
                        </div>
                        <div className="email">
                          {item.mobile ? item.mobile : "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="list-column6">
                      <div className="dotsSvg">
                        <DotsSvg />
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTable;
