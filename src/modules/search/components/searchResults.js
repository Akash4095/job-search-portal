import React from "react";
import { Checkbox, Grid, Icon } from "semantic-ui-react";
import "./searchResult.css";
import UserCart from "./userCart";

const SearchResults = ({
  row,
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

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: rowClicked ? "60vw" : "75vw" }}>
        <div
          className="search-result-container"
        >
          <Grid className="search-result-grid" style={{ margin: "0px" }}>
            <Grid.Row className="search-result-grid-row">
              <Grid.Column width={2}>
                <Checkbox
                  className="search-result-checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowClick(row.id)}
                />
                <img src={(row && row.profilepic && row.profilepic !== undefined) ? row.profilepic : ""} height="40" width="40" className="border-radius" />
              </Grid.Column>
              <Grid.Column width={12} style={{ marginLeft: "-3%" }}>
                <p className="wordBreak" onClick={() => setRowClicked(true)}>
                  {(row && row.title) ? (row.title) : ""}
                </p>
                <p className="wordBreak">
                  {(row && row.description && row.description !== undefined) ? (row.description) : ""}
                </p>
              </Grid.Column>
              <Grid.Column width={2} className="action-column">
                <Icon name="linkedin" />
                <Icon name="twitter" />
                <Icon name="dribbble" />
              </Grid.Column>
              <p className="add-list-btn">Add List</p>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
