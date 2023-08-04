import React from 'react'
import { Checkbox, Icon, Image, Table } from 'semantic-ui-react'

const ListTable = ({ rowClicked, setRowClicked }) => {
    return (
        <div>
            <div style={{ width: rowClicked ? "65vw" : "81vw" }}>
                <div className='listActions'>
                    <div style={{ width: "20%" }}>
                        <Checkbox className='listActions-checkbox' />
                        <span>Select All</span>
                    </div>
                    <div style={{ width: rowClicked ? "20%" : "35%" }}>

                    </div>
                    <div className='listActions-btns' style={{ width: rowClicked ? "60%" : "45%" }}>
                        <span className='marginRight7'> <Icon name="tag" /> <span>Tag</span></span>
                        <span className='marginRight7'> <Icon name="tags" /> <span>Untag</span></span>
                        <span className='marginRight7'> <Icon name="list" /> <span>Add to list</span></span>
                        <span className='marginRight6'> <Icon name="download" /> <span>Export</span></span>
                        <span className='error'> <Icon color='red' name="trash alternate" /> <span>Delete</span></span>
                    </div>
                </div>
                <>
                    <div className='scrollable-container' style={{ height: '70vh', overflowY: 'auto' }}>
                        <Table basic='very' className='list-table'>
                            <Table.Header>
                                <Table.Row className='list-header-row'>
                                    <Table.HeaderCell style={{ width: "3%" }}></Table.HeaderCell>
                                    <Table.HeaderCell style={{ width: "24%" }}>Person</Table.HeaderCell>
                                    <Table.HeaderCell style={{ width: "18%" }}>Company</Table.HeaderCell>
                                    <Table.HeaderCell style={{ width: "24%" }}>Tags</Table.HeaderCell>
                                    <Table.HeaderCell style={{ width: "24%" }}>Contact Details</Table.HeaderCell>
                                    <Table.HeaderCell style={{ width: "2%" }}></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row onClick={() => setRowClicked(true)}>
                                    <Table.Cell style={{ width: "3%", }}>
                                        <Checkbox style={{ marginLeft: "8px" }} />
                                    </Table.Cell>
                                    <Table.Cell style={{ width: "24%" }}>
                                        <div className='d_flex'>
                                            <img src="" alt="" width="28" height="28" style={{ borderRadius: "10px", marginTop: "5px", marginRight: "10px" }} />
                                            <div>
                                                <div className='list-person-name'>Akash Athnure</div>
                                                <div className='list-person-work'>UX Design Lead </div>
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
                                                <span style={{fontSize:"11px"}}> akashathnure40@gmail.com</span>
                                            </div>
                                            <div>
                                                <Icon color='grey' name='phone' flipped="horizontally" />
                                                <span style={{fontSize:"11px"}}>8095595412</span>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' style={{ width: "2%" }}>
                                        <Icon color='grey' name='ellipsis vertical' style={{ cursor: "pointer", paddingRight: "10px" }} />
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </>
            </div>
        </div>
    )
}

export default ListTable