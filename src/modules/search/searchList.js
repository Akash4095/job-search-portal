import React from 'react'
import SideBar from '../common/sideBar'
import SearchResults from './searchResults'
import CommonHeaderComponent from '../common/commonHeader'
import CommonSearchComponent from '../common/commonSearchComponent'
import { Button, Icon } from 'semantic-ui-react'


const Search = () => {
    return (
        <div className='d_flex'>
            <SideBar />
            <div className='right-panel'>
                <CommonHeaderComponent />
                <br />
                <br />
                <br />
                <br />
                <div style={{ left: "10%", position: "relative" }}>
                    <CommonSearchComponent />
                </div>
                <p className='search-result-count'>304 Search Result Product Designer</p>
                {/* <p className='selected'>
                    <span> 3 Selected</span>
                    <Button icon labelPosition='left' color='blue' size='mini' style={{ padding: "5px 0px", marginLeft: "20px", borderRadius: "6px" }}>
                        <Icon name='list ul' color='white' size='mini' />
                        Add to list
                    </Button>
                </p> */}
                <div style={{ height: "72vh", overflowY: "scroll" }}>
                    <SearchResults />
                    <SearchResults />
                    <SearchResults />
                    <SearchResults />
                </div>
            </div>
        </div>
    )
}

export default Search