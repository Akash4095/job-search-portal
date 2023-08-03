import React from 'react'
import { Button, Feed, Icon } from 'semantic-ui-react'

const UserCart = ({ setRowClicked }) => {
    return (
        <div className='usercart-container'>
            <div className=''>
                <div className='d_flex'>
                    <img src='' width="40" height="40" className='borderRadius' />
                    <Icon size='mini' color='grey' name='cancel' style={{ right: "8px", position: "absolute", cursor: "pointer" }} onClick={() => setRowClicked(false)} />
                </div>
                <div style={{ fontSize: "14px", fontWeight: "600" }}>Akash Athnure</div>
                <div style={{ color: "#666", fontSize: "13px", fontWeight: "500" }}>UX Design Lead </div>
                <div className='company-details' style={{ marginTop: "5px", color: "#666", borderBottom: "1px solid #ccc" }}>
                    <div style={{ fontSize: "12px" }}> Company Details</div>
                    <div><Icon name='apple' ></Icon> Apple</div>
                    <div style={{ marginLeft: "10%" }}>From March 2021</div>
                    <div style={{ margin: "10px 3px", fontSize: "12px" }}>
                        Worked with over 70+ startups and
                        dozens of leading Silicon Valley VC
                        firms as a Senior UX Designer... More
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <Icon name="linkedin" />
                        <Icon name="twitter" />
                        <Icon name="dribbble" />
                    </div>
                </div>
            </div>
            <div className='previouscompany' style={{ borderBottom: "1px solid #ccc", margin: "10px 3px" }}>
                <div style={{ fontSize: "12px" }}>

                    <div>
                        Facebook
                    </div>
                    <div>
                        2012-2015
                    </div>

                </div>
                <div style={{ fontSize: "12px" }}>
                    <div>
                        <div>
                            Facebook
                        </div>
                        <div>
                            2012-2015
                        </div>
                    </div>
                </div>

            </div>
            <div className='add-user-to-list'>
                <Button basic color='blue' size='large' style={{ padding: "8px 55px", marginLeft: "10px", borderRadius: "6px" }}>
                    <Icon name='list ul' color='white' size='mini' />
                    Add to list
                </Button>

            </div>

        </div>
    )
}

export default UserCart