import React, { useState } from 'react'
import SideBar from '../common/sideBar'
import SearchResults from './searchResults'
import CommonHeaderComponent from '../common/commonHeader'
import CommonSearchComponent from '../common/commonSearchComponent'
import { Button, Icon } from 'semantic-ui-react'
import UserCart from './userCart'


const Search = () => {

    const [rowClicked, setRowClicked] = useState(false)
    console.log('rowClicked', rowClicked)

    const userRowClicked = () => {
       
    }
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
                <div className='d_flex'>
                <div className='scrollable-container' style={{height: "70vh", overflowY: "scroll", width: "78vw" }}>
                    <SearchResults rowClicked={rowClicked} setRowClicked={setRowClicked} />
                    <SearchResults rowClicked={rowClicked} />
                    <SearchResults rowClicked={rowClicked} />
                    <SearchResults rowClicked={rowClicked} setRowClicked={setRowClicked} />
                </div>
                {
                    rowClicked ? <UserCart setRowClicked={setRowClicked}/> : null
                }
                </div>
            </div>
        </div>
    )
}

export default Search