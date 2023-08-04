import React, { useState } from 'react'
import CommonHeaderComponent from '../../common/commonHeader'
import CommonSearchComponent from '../../common/commonSearchComponent'
import SideBar from '../../common/sideBar'

import ListTable from './listTable'
import ListUserCart from './listUserCart'

const ListPage = () => {

    const [rowClicked, setRowClicked] = useState(true)

    return (
        <div className='d_flex'>
            <SideBar />
            <div className='right-panel'>
                <CommonHeaderComponent />
                <br />
                <br />
                <br />
                <br />
                <div className='commonSearchCommponent'>
                    <CommonSearchComponent />
                </div>
                <div className='d_flex'>
                    <ListTable rowClicked={rowClicked} setRowClicked={setRowClicked} />

                    {
                        rowClicked ?
                            <ListUserCart rowClicked={rowClicked} setRowClicked={setRowClicked} />
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ListPage