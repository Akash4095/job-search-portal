import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Grid, Icon, Image, Modal, Table } from "semantic-ui-react";
import { getIsFetchedList } from "../data/selectors";
import AddTagNameForm from "./addTagName";
import { clearListProfileDetails, fetchListProfileDetails, saveListProfileDetailsPayload } from "../data/actions";
import TagSvg from "../../svg/tagSvg";
import UnTagSvg from "../../svg/unTagSvg";
import AddListSvg from "../../svg/addListSvg";
import DownloadSvg from "../../svg/downloadSvg";
import DeleteSvg from "../../svg/deleteSvg";
import TagsSvg from "../../svg/TagsSvg";
import EmailSvg from "../../svg/emailSvg";
import CallSvg from "../../svg/callSvg";
import DotsSvg from "../../svg/dotsSvg";

const ListTable = ({
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

  const [listArray, setListArray] = useState([]);


  const dispatch = useDispatch();

  const listResponse = useSelector((state) => getIsFetchedList(state));

  useEffect(() => {
    if (listResponse && listResponse !== null && listResponse !== undefined) {
      if (listResponse.status === "success") {
        if (
          listResponse.list &&
          listResponse.list.length &&
          listResponse.list.length > 0
        ) {
          setListArray(listResponse.list);
        }
      }
    }
  }, [listResponse]);


  const handleRowClick = (row) => {

    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(row)) {
        return prevSelectedRows.filter((item) => item !== row);
      } else {
        return [...prevSelectedRows, row];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(listArray.map((row) => row));
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const unselectAll = () => {
    setSelectedRows([])
    setSelectAll(false)
  }

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

  const unTagListFunction = () => { };

  const addToListFunction = () => { };

  const listExportFunction = () => { };

  const deleteSelectedList = () => { };

  return (
    <div>
      <div style={{ width: rowClicked ? "65vw" : "81vw" }} className="list-table-container">
        <div className="list-table-actions">
          <div className="list-actions-select">
            {
              selectedRows.length > 0 ?
                <Icon name="minus square" color="blue" onClick={() => unselectAll()} />
                :
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
            }

            {selectedRows.length > 0 ? (
              <span style={{ color: "#2185d0", fontSize: "12px" }}>
                {selectedRows.length + " Selected"}
              </span>
            ) : (
              <span style={{ fontSize: "12px" }}>Select All</span>
            )}
          </div>
          <div className="list-actions-btns">
            <div className="btn-frame">
              <div className="btn-svg">
                <TagSvg />
              </div>
              <div className="btn-label">
                Tag
              </div>
            </div>
            <div className="btn-frame">
              <div className="btn-svg">
                <UnTagSvg />
              </div>
              <div className="btn-label">
                Untag
              </div>
            </div>
            <div className="btn-frame">
              <div className="btn-svg">
                <AddListSvg />
              </div>
              <div className="btn-label">
                Add to list
              </div>
            </div>
            <div className="btn-frame">
              <div className="btn-svg">
                <DownloadSvg />
              </div>
              <div className="btn-label">
                Export
              </div>
            </div>
            <div className="btn-frame">
              <div className="btn-svg">
                <DeleteSvg />
              </div>
              <div className="btn-label-delete">
                Delete
              </div>
            </div>
          </div>
        </div>

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
          className="scrollable-container"
          style={{
            height: "70vh",
            overflowY: "auto",
            width: rowClicked ? "67vw" : "81vw",
          }}
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
                    <div className="list-column2">
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
                          {item.position ? item.position : ""}
                        </div>
                      </div>

                    </div>
                    <div className="list-column3">
                      <div className="company-icon">
                        <Icon color="blue" name="building outline" />
                      </div>
                      <div className="company-name">
                        {item.company ? item.company : ""}
                      </div>
                    </div>
                    <div className="list-column4">
                      {item.tags && item.tags.length > 0
                        ? item.tags.map((tagname, index) => {
                          return (
                            <div className="tag-item-frame">
                              <div className={`tag-color${index + 1}`}></div>
                              <div className="tag-name"> {tagname}</div>
                            </div>
                          );
                        })
                        : "N/A"}
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
                      <div className="emailSvg">
                        <DotsSvg />
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <>
          <div
          >
            {/* <Table basic="very" className="list-table">
        

              <Table.Body>
                {listArray.length > 0 &&
                  listArray.map((item) => {
                    return (
                      <Table.Row key={item.id}>
                        <Table.Cell style={{ width: "3%" }}>
                          <Checkbox
                            style={{ marginLeft: "8px" }}
                            checked={selectedRows.includes(item)}
                            onChange={() => handleRowClick(item)}
                          />
                        </Table.Cell>
                        <Table.Cell
                          style={{ width: "24%", cursor: "pointer" }}
                          onClick={() => fetchlistCartDetails(item)}
                          verticalAlign="top"
                        >
                          <div className="d_flex">
                            <img
                              src={item.profilepic ? item.profilepic : ""}
                              alt=""
                              height={rowClicked ? "40" : "55"}
                              width={rowClicked ? "40" : "55"}
                              style={{
                                borderRadius: "50%",
                                marginTop: "5px",
                                marginRight: "10px",
                              }}
                            />
                            <div>
                              <div className="list-person-name">
                                {item.name ? item.name : ""}
                              </div>
                              <div className="list-person-work">
                                {item.position ? item.position : ""}
                              </div>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell style={{ width: "18%" }} verticalAlign="top">

                          <div >
                            <Icon color="blue" name="building outline" />
                            <span style={{ wordBreak: "break-all", fontSize: "12px", fontFamily: "Inter" }}>
                              {item.company ? item.company : ""}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell style={{ width: "28%", fontSize: "12px" }} verticalAlign="top">
                          <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {item.tags && item.tags.length > 0
                              ? item.tags.map((tagname, index) => {
                                return (
                                  <div className="tag-item">
                                    <div className={`tag-color${index + 1}`}></div> {tagname}
                                  </div>
                                );
                              })
                              : "N/A"}
                          </div>
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            width: "20%",
                            color: "#666",
                            wordBreak: "break-all",
                          }}
                          verticalAlign="top"
                        >
                          <div>
                            <div className="icons">
                              <Icon color="grey" name="mail outline" />
                              <span style={{ fontSize: "11px" }}>
                                {item.email ? item.email : "N/A"}
                              </span>
                            </div>
                            <div className="icons">
                              <Icon
                                color="grey"
                                name="phone"
                                flipped="horizontally"
                              />
                              <span style={{ fontSize: "11px" }}>
                                {item.mobile ? item.mobile : "N/A"}
                              </span>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell textAlign="center" style={{ width: "2%" }} verticalAlign="top">
                          <Icon
                            color="grey"
                            name="ellipsis vertical"
                            style={{ cursor: "pointer", paddingRight: "10px" }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table> */}
            <Modal
              size="mini"
              open={addTagModal.open}
              onClose={() => setAddTagModal({ open: false, obj: {} })}
            >
              <Modal.Content>
                <AddTagNameForm setAddTagModal={setAddTagModal} sessionUserId={sessionUserId} selectedRows={selectedRows} />
              </Modal.Content>
            </Modal>
          </div>
        </>
      </div>
    </div>
  );
};

export default ListTable;
