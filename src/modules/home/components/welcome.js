import React from "react";
import "./welcome.css";
import { Grid, Icon } from "semantic-ui-react";
import SideBar from "../../common/sideBar";
import SearchComponent from "../../common/searchComponent";
import { NavLink } from "react-router-dom";


const Welcome = () => {

  return (
    <div className="d_flex">
      <SideBar />
      <div className="right-panel">
        <header className="header">
          <div className="top-tab">
            <NavLink to="/welcome" className="search-wrapper" activeClassName="nav_active">
              <div className="search">Search</div>
            </NavLink>
            <NavLink to="/welcome" className="list-wrapper" activeClassName="nav_active">
              <div className="search">List</div>
            </NavLink>
          </div>
          <div className="balance">
            <div className="getlista">Available Credits</div>
            <div className="div">
              <span>15</span>
              <span className="span"> / 20</span>
            </div>
          </div>
          <div className="top-actions">
            <Icon name="bell outline" color="grey" />
            <Icon name="setting" color="grey"/>
            <img width='25px' height='20px' />
            <div className="profile">
              <div className="user-parent">
                <div className="search">Dinesh</div>
                <Icon name="caret down" />
              </div>
            </div>
          </div>
        </header>
        <div className="user-container">
          <img src="" alt="" className="user-container-img" width="100" height="100" />
          <div className="user-name-parent">
            <b className="user-name">Hello Dinesh!</b>
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
        <p style={{color:"#1c34b0"}}>Your Summary</p>
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
