import React from "react";
import "./welcome.css";
import { Grid, Icon } from "semantic-ui-react";
import SideBar from "../../common/sideBar";
import SearchComponent from "../../common/searchComponent";
import { NavLink } from "react-router-dom";
import CommonHeaderComponent from "../../common/commonHeader";


const Welcome = ({ userDetails }) => {
  // console.log('userDetails', userDetails)
  let fname = (userDetails && userDetails !== null && userDetails !== undefined) ? userDetails.fname : ""
  return (
    <div className="d_flex">
      <SideBar />
      <div className="right-panel">
        <CommonHeaderComponent fname={fname} />
        <div className="user-container">
          <img src="" alt="" className="user-container-img" width="100" height="100" />
          <div className="user-name-parent">
            <b className="user-name">{fname}</b>
            <div className="bio">
              <p>We're here to help you find the perfect candidates for your needs. Easily search, filter, and connect with talented individuals.</p>
              <p style={{ marginTop: "-15px" }}>
                Start exploring now and unlock your company's potential!
              </p>
            </div>
          </div>
        </div>
        <div className="searchbar-container">
          <p className="searchbar-p">Find the right person using <b className="keywords">keywords</b></p>
          <SearchComponent />
        </div>
        <Grid className="summary-grid">
          <p style={{ color: "#1c34b0" }}>Your Summary</p>
          <Grid.Row>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent">
                <div className="div1">9</div>
                <div className="parent-div">Search conducted</div>
              </div>
            </Grid.Column>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent" >
                <div className="div1">29</div>
                <div className="parent-div">Tags created</div>
              </div>
            </Grid.Column>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent">
                <div className="div1">4</div>
                <div className="parent-div">Lists created</div>
              </div>
            </Grid.Column>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent">
                <div className="div1">10</div>
                <div className="parent-div">Team members</div>
              </div>
            </Grid.Column>
            <Grid.Column width={3} className="summary-grid-column">
              <div className="parent">
                <div className="div1">34</div>
                <div className="parent-div">Leads left</div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Welcome;
