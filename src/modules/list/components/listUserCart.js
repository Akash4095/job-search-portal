import React, { useState } from 'react'
import { Accordion, Button, Feed, Icon } from 'semantic-ui-react'

const ListUserCart = ({ setRowClicked }) => {

    const [accordion, setAcordion] = useState(false)

    return (
        <div className='list-usercart-container scrollable-container'>
            <div className=''>
                <div className='padding10'>
                    <div className='d_flex'>
                        <img src='' width="40" height="40" className='borderRadius' />
                        <Icon size='mini' color='grey' name='cancel' className='list-user-cart-close-icon' onClick={() => setRowClicked(false)} />
                    </div>
                </div>
                <div className='padding10'>
                    <div className='list-user-cart-name'>Akash Athnure</div>
                    <div className='list-user-cart-work'>UX Design Lead </div>
                </div>
                <div className='list-company-details' >
                    <div className='padding10'>
                        <div style={{ fontSize: "11px" }}> Company Details</div>
                        <div><Icon name='apple' ></Icon> Apple</div>
                        <div className='list-user-cart-description'>
                            Worked with over 70+ startups and
                            dozens of leading Silicon Valley VC
                            firms as a Senior UX Designer... More
                        </div>
                    </div>
                </div>
            </div>
            <div className='list-contact-details' >
                <div className='padding10'>
                    <div className='contact-details-header' >Contact Details <Icon size='mini' name='download' /> </div>
                    <div>
                        <div>
                            <Icon size='mini' color='grey' name='mail outline' />
                            <span style={{ fontSize: "11px", color: "#2185d0" }}> akashathnure40@gmail.com</span>
                        </div>
                        <div>
                            <Icon size='mini' color='grey' name='mail outline' />
                            <span style={{ fontSize: "11px", color: "#2185d0" }}> akashathnure40@gmail.com</span>
                        </div>
                        <div>
                            <Icon size='mini' color='grey' name='phone' flipped="horizontally" />
                            <span style={{ fontSize: "10px", color: "#2185d0" }}>8095595412</span>
                        </div>
                        <div>
                            <Icon size='mini' color='grey' name='phone' flipped="horizontally" />
                            <span style={{ fontSize: "10px", color: "#2185d0" }}>8095595412</span>
                        </div>
                    </div>
                    <div style={{ paddingTop: "5px" }}>
                        <Icon name="linkedin" />
                        <Icon name="twitter" />
                        <Icon name="dribbble" />
                    </div>
                </div>
            </div>
            <div className='list-user-tags'>
                <div className='padding10'>
                    <div style={{ fontSize: "11px" }}>Tags</div>
                </div>
                <div className='padding10'>
                    <span style={{ fontSize: "11px", color: "#2185d0" }}>
                        <Icon color="blue" name="add" /> <span>Add Tag</span>
                    </span>
                </div>
            </div>
            <div className='list-user-tags'>
                <div className='padding10'>

                    <Accordion>
                        <Accordion.Title
                            active={accordion}
                            index={0}
                            onClick={() => setAcordion(!accordion)}
                        >
                            <div className='prev-comp-accord'>
                                <span>
                                    Previous Company
                                </span>
                                <span>
                                    <Icon name='angle down' />
                                </span>
                            </div>
                        </Accordion.Title>
                        <Accordion.Content active={accordion}>
                            <p>
                                company 1 company 2
                            </p>
                        </Accordion.Content>
                    </Accordion>
                </div>

            </div>
            <div className='add-list-user-to-list'>
                <div className='padding10'>
                    <Button basic color='blue' size='large' className='list-user-cart-btn'>
                        <Icon name='list ul' color='white' size='mini' />
                        Add to list
                    </Button>
                </div>
                <div className='padding10'>
                    <span className="user-cart-delete-btn">
                        <Icon color="red" name="trash alternate" /> <span>Delete</span>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default ListUserCart