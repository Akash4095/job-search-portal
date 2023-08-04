import React from 'react'
import { Button, Feed, Icon } from 'semantic-ui-react'

const ListUserCart = ({ setRowClicked }) => {

    return (
        <div className='list-usercart-container'>
            <div className=''>
                <div className='d_flex'>
                    <img src='' width="40" height="40" className='borderRadius' />
                    <Icon size='mini' color='grey' name='cancel' className='list-user-cart-close-icon' onClick={() => setRowClicked(false)} />
                </div>
                <div className='list-user-cart-name'>Akash Athnure</div>
                <div className='list-user-cart-work'>UX Design Lead </div>
                <div className='list-company-details' >
                    <div style={{ fontSize: "11px" }}> Company Details</div>
                    <div><Icon name='apple' ></Icon> Apple</div>
                    <div className='list-user-cart-description'>
                        Worked with over 70+ startups and
                        dozens of leading Silicon Valley VC
                        firms as a Senior UX Designer... More
                    </div>
                </div>
            </div>
            <div className='list-contact-details' >
                <div style={{ fontSize: "12px", color: "#666" }}>Contact Details</div>
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
                <div>
                    <Icon name="linkedin" />
                    <Icon name="twitter" />
                    <Icon name="dribbble" />
                </div>
            </div>
            <div className='add-list-user-to-list'>
                <Button basic color='blue' size='large' className='list-user-cart-btn'>
                    <Icon name='list ul' color='white' size='mini' />
                    Add to list
                </Button>

            </div>

        </div>
    )
}

export default ListUserCart