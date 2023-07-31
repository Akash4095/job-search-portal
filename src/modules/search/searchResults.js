import React from "react";
import { Checkbox, Grid, Icon } from "semantic-ui-react";
import "./searchResult.css"

const SearchResults = () => {
    return (
        <div className="search-result-container">
            <Grid className="search-result-grid" style={{margin:"0px"}}>
                <Grid.Row className="search-result-grid-row">
                    <Grid.Column width={2}>
                        <Checkbox className="search-result-checkbox" />
                        <img height="40" width="40" className="border-radius" />
                    </Grid.Column>
                    <Grid.Column width={12} style={{ marginLeft: "-3%" }}>
                        <p className="wordBreak">User Name Lead For Apple Recruting Technology - <b>Apple</b> </p>
                        <p className="wordBreak">Worked with over 70+ startups and dozens of leading Silicon Valley VC firms as a Senior UX Designer / Senior Product
                            Designer. Experienced at working with ...</p>
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
    );
};

export default SearchResults;
