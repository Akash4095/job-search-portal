import React from 'react'
import CommonHeaderComponent from '../../common/commonHeader'
import CommonSearchComponent from '../../common/commonSearchComponent'
import SideBar from '../../common/sideBar'
import { Checkbox, Icon, Image, Table } from 'semantic-ui-react'

const ListPage = () => {
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
                <div className='d_flex' style={{ width: "95%", marginLeft: "2%", }}>
                    <div style={{ width: "20%" }}>
                        <Checkbox style={{ marginRight: "10px", paddingTop: "4px" }} />
                        <span>Select All</span>
                    </div>
                    <div style={{ width: "35%" }}>

                    </div>
                    <div style={{ width: "45%", color: "#2185d0 " }}>
                        <span style={{ marginRight: "7%" }}> <Icon name="tag" /> <span>Tag</span></span>
                        <span style={{ marginRight: "7%" }}> <Icon name="tags" /> <span>Untag</span></span>
                        <span style={{ marginRight: "7%" }}> <Icon name="list" /> <span>Add to list</span></span>
                        <span style={{ marginRight: "6%" }}> <Icon name="download" /> <span>Export</span></span>
                        <span style={{ color: "red" }}> <Icon color='red' name="trash alternate" /> <span>Delete</span></span>
                    </div>
                </div>
                <>
                    <Table basic='very' style={{ width: "95%", marginLeft: "2%", background: "#fff", paddingTop: "5px" }}>
                        <Table.Header>
                            <Table.Row style={{ marginTop: "5px", color: "#ccc", fontSize: "13px" }}>
                                <Table.HeaderCell style={{ width: "3%" }}></Table.HeaderCell>
                                <Table.HeaderCell style={{ width: "24%" }}>Person</Table.HeaderCell>
                                <Table.HeaderCell style={{ width: "18%" }}>Company</Table.HeaderCell>
                                <Table.HeaderCell style={{ width: "24%" }}>Tags</Table.HeaderCell>
                                <Table.HeaderCell style={{ width: "24%" }}>Contact Details</Table.HeaderCell>
                                <Table.HeaderCell style={{ width: "2%" }}></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell style={{ width: "3%", }}>
                                    <Checkbox style={{ marginLeft: "8px" }} />
                                </Table.Cell>
                                <Table.Cell style={{ width: "24%" }}>
                                    <div className='d_flex'>
                                        <img src="" alt="" width="28" height="28" style={{ borderRadius: "10px", marginTop: "5px", marginRight: "10px" }} />
                                        <div>
                                            <div style={{ fontSize: "14px", fontWeight: "600" }}>Akash Athnure</div>
                                            <div style={{ color: "#666", fontSize: "13px", fontWeight: "500" }}>UX Design Lead </div>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell style={{ width: "18%" }}>
                                    <Icon name="google" /><span>Google</span>
                                </Table.Cell>
                                <Table.Cell style={{ width: "24%" }}>
                                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                                        <div className='tag-item'>Lead Designer</div>
                                        <div className='tag-item'>Designer</div>
                                        <div className='tag-item'>UX/UI hhhhh</div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell style={{ width: "24%", fontSize: "12px", color: "#666" }}>
                                    <div>
                                        <div>
                                            <Icon color='grey' name='mail outline' />
                                            <span> akashathnure40@gmail.com</span>
                                        </div>
                                        <div>
                                            <Icon color='grey' name='phone' flipped="horizontally" />
                                            <span>8095595412</span>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell textAlign='center' style={{ width: "2%" }}>
                                    <Icon color='grey' name='ellipsis vertical' />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </>

            </div>
        </div>
    )
}

export default ListPage