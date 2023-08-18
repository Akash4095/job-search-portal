import React from "react";
import { Checkbox, Grid, Icon, Image, Table } from "semantic-ui-react";

const ListTable = ({
  rowClicked,
  setRowClicked,
  selectAll,
  setSelectAll,
  selectedRows,
  setSelectedRows,
}) => {
  let data = [];

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
      setSelectedRows(data.map((row) => row.id));
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const tagListFunction = () => {

  }

  const unTagListFunction = () => {

  }

  const addToListFunction = () => {

  }

  const listExportFunction = () => {

  }

  const deleteSelectedList = () => {

  }

  return (
    <div>
      <div style={{ width: rowClicked ? "65vw" : "81vw" }}>
        <Grid style={{ marginLeft: "1%", marginRight: "1%", marginBottom: "-6px" }}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Checkbox
                className="listActions-checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              {selectedRows.length > 0 ? (
                <span className="list-selected">
                  <span> {selectedRows.length + " Selected"} </span>
                </span>
              ) : <span>Select All</span>}
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={2} className="listActionBtns">
              <div onClick={() => tagListFunction()}><Icon size="tiny" name="tag" /> Tag</div>
            </Grid.Column>
            <Grid.Column width={2} className="listActionBtns">
              <div onClick={() => unTagListFunction()}> <Icon name="tags" /> Untag</div>
            </Grid.Column>
            <Grid.Column width={2} className="listActionBtns">
              <div onClick={() => addToListFunction()}><Icon name="list" />Add to list</div>
            </Grid.Column>
            <Grid.Column width={2} className="listActionBtns">
              <div onClick={() => listExportFunction()}>  <Icon name="download" /> Export</div>
            </Grid.Column>
            <Grid.Column width={2} >
              <span className="error" onClick={() => deleteSelectedList()}>
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
                  <Table.HeaderCell style={{ width: "24%" }}>
                    Person
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "18%" }}>
                    Company
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "24%" }}>
                    Tags
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "24%" }}>
                    Contact Details
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "2%" }}></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {/* {
                data.map((item)=>{
                    <Table.Row key={"id"}>

                    </Table.Row>
                })
              } */}
                <Table.Row onClick={() => setRowClicked(true)}>
                  <Table.Cell style={{ width: "3%" }}>
                    <Checkbox
                      style={{ marginLeft: "8px" }}
                    //   checked={selectedRows.includes(row.id)}
                    //   onChange={() => handleRowClick(row.id)}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ width: "24%" }}>
                    <div className="d_flex">
                      <img
                        src=""
                        alt=""
                        height={rowClicked ? "40" : "55"}
                        width={rowClicked ? "40" : "55"}
                        style={{
                          borderRadius: "10px",
                          marginTop: "5px",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <div className="list-person-name">Akash Athnure</div>
                        <div className="list-person-work">UX Design Lead </div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell style={{ width: "18%" }}>
                    <Icon name="google" />
                    <span>Google</span>
                  </Table.Cell>
                  <Table.Cell style={{ width: "24%" }}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      <div className="tag-item">Lead Designer</div>
                      <div className="tag-item">Designer</div>
                      <div className="tag-item">UX/UI hhhhh</div>
                    </div>
                  </Table.Cell>
                  <Table.Cell
                    style={{ width: "24%", fontSize: "12px", color: "#666" }}
                  >
                    <div>
                      <div>
                        <Icon color="grey" name="mail outline" />
                        <span style={{ fontSize: "11px" }}>
                          akashathnure40@gmail.com
                        </span>
                      </div>
                      <div>
                        <Icon
                          color="grey"
                          name="phone"
                          flipped="horizontally"
                        />
                        <span style={{ fontSize: "11px" }}>8095595412</span>
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
              </Table.Body>
            </Table>
          </div>
        </>
      </div>
    </div>
  );
};

export default ListTable;
