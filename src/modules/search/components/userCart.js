import React from "react";
import { Button, Feed, Icon } from "semantic-ui-react";

const UserCart = ({ setRowClicked }) => {
  return (
    <div className="usercart-container scrollable-container">
      <div className="">
        <div className="padding10">
          <div className="d_flex">
            <img src="" width="40" height="40" className="borderRadius" />
            <Icon
              size="mini"
              color="grey"
              name="cancel"
              className="user-cart-close-icon"
              onClick={() => setRowClicked(false)}
            />
          </div>
        </div>
        <div className="padding10">
          <div className="user-cart-name">Akash Athnure</div>
          <div className="user-cart-work">UX Design Lead </div>
        </div>

        <div className="company-details">
          <div className="padding10">
            <div style={{ fontSize: "11px" }}> Company Details</div>
            <div>
              <Icon name="apple"></Icon> Apple
            </div>
            <div style={{ marginLeft: "10%" }}>From March 2021</div>
            <div className="user-cart-description">
              Worked with over 70+ startups and dozens of leading Silicon Valley
              VC firms as a Senior UX Designer... More
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Icon name="linkedin" />
              <Icon name="twitter" />
              <Icon name="dribbble" />
            </div>
          </div>
        </div>
      </div>
      <div className="previouscompany">
        <div className="padding10">
          <div style={{ fontSize: "11px" }}>
            <div>Facebook</div>
            <div>2012-2015</div>
          </div>
          <div style={{ fontSize: "11px" }}>
            <div>
              <div>Facebook</div>
              <div>2012-2015</div>
            </div>
          </div>
        </div>
      </div>
      <div className="add-user-to-list">
        <div className="padding10">
          <Button basic color="blue" size="large" className="user-cart-btn">
            <Icon name="list ul" color="white" size="mini" />
            Add to list
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
