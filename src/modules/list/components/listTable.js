import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Grid, Icon, Image, Modal, Table } from "semantic-ui-react";
import { getIsFetchedList } from "../data/selectors";
import AddTagNameForm from "./addTagName";
import { fetchListProfileDetails } from "../data/actions";

const ListTable = ({
  rowClicked,
  setRowClicked,
  selectAll,
  setSelectAll,
  selectedRows,
  setSelectedRows,
  sessionUserId,
  setListLoader,
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


  const handleRowClick = (rowId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(listArray.map((row) => row.id));
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const fetchlistCartDetails = (row) => {
    let obj = {}
    obj.userid = sessionUserId.toString()
    obj.profileid = row.profileid
    obj.listid = row.id
    dispatch(fetchListProfileDetails(obj))
    setListLoader({ open: true, msg: "Loading" })
    setRowClicked(true);

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
      <div style={{ width: rowClicked ? "65vw" : "81vw" }}>
        <Grid
          style={{ marginLeft: "1%", marginRight: "1%", marginBottom: "-6px" }}
        >
          <Grid.Row>
            <Grid.Column width={3}>
              {
                selectedRows.length > 0 ?
                  <Icon name="minus square" color="blue" />
                  :
                  <Checkbox
                    className="listActions-checkbox"
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
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={2} className="listActionBtns">
              <div onClick={() => tagListFunction()}>
                <Icon size="tiny" name="tag" /> Tag
              </div>
            </Grid.Column>
            <Grid.Column width={2} className="listActionBtns">
              <div onClick={() => unTagListFunction()}>
                <Icon name="tags" /> Untag
              </div>
            </Grid.Column>
            <Grid.Column width={2} className="listActionBtns">
              <div onClick={() => addToListFunction()}>
                <Icon name="list" />
                Add to list
              </div>
            </Grid.Column>
            <Grid.Column width={2} className="listActionBtns">
              <div onClick={() => listExportFunction()}>
                <Icon name="download" /> Export
              </div>
            </Grid.Column>
            <Grid.Column width={2}>
              <span
                className="error cursor-pointer"
                onClick={() => deleteSelectedList()}
              >
                <Icon color="red" name="trash alternate" /> <span>Delete</span>
              </span>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <>
          <div
            className="scrollable-container"
            style={{
              height: "70vh",
              overflowY: "auto",
              width: rowClicked ? "67vw" : "81vw",
            }}
          >
            <Table basic="very" className="list-table">
              <Table.Header>
                <Table.Row className="list-header-row">
                  <Table.HeaderCell style={{ width: "3%" }}></Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "24%", paddingTop: "7px" }}>
                    Person
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "18%", paddingTop: "7px" }}>
                    Company
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "28%", paddingTop: "7px" }}>
                    Tags
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "20%", paddingTop: "7px" }}>
                    Contact Details
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "2%" }}></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {listArray.length > 0 &&
                  listArray.map((item) => {
                    return (
                      <Table.Row key={item.id}>
                        <Table.Cell style={{ width: "3%" }}>
                          <Checkbox
                            style={{ marginLeft: "8px" }}
                            checked={selectedRows.includes(item.id)}
                            onChange={() => handleRowClick(item.id)}
                          />
                        </Table.Cell>
                        <Table.Cell
                          style={{ width: "24%", cursor: "pointer" }}
                          onClick={() => fetchlistCartDetails(item)}
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
                        <Table.Cell style={{ width: "18%" }}>
                          {/* {item && item.company_logo && item.company_logo !== "" ? (
                          <img
                            src={item.company_logo}
                            height={rowClicked ? "15" : "15"}
                            width={rowClicked ? "15" : "15"}
                          className="border-radius"
                          />
                        ) : (
                          <Icon color="blue" name="building outline" />
                        )} */}
                          <div style={{ position: "relative", top: "-12px" }}>
                            <Icon color="blue" name="building outline" />
                            <span style={{ wordBreak: "break-all", fontSize: "12px", fontFamily: "Inter" }}>
                              {item.company ? item.company : ""}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell style={{ width: "28%" }}>
                          <div style={{ display: "flex", flexWrap: "wrap" }}>
                            <div className="tag-item">
                              <div className="tag-color1"></div> Lead Designer
                            </div>
                            <div className="tag-item">
                              <div className="tag-color2"></div>Designer
                            </div>
                            <div className="tag-item">
                              <div className="tag-color3"></div> UX/UI hhhhh
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            width: "20%",
                            color: "#666",
                            wordBreak: "break-all",
                          }}
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
                        <Table.Cell textAlign="center" style={{ width: "2%" }}>
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
            </Table>
            <Modal
              size="mini"
              open={addTagModal.open}
              onClose={() => setAddTagModal({ open: false, obj: {} })}
            >
              <Modal.Content>
                <AddTagNameForm setAddTagModal={setAddTagModal} sessionUserId={sessionUserId} />
              </Modal.Content>
            </Modal>
          </div>
        </>
      </div>
    </div>
  );
};

export default ListTable;
