import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import imgage  from "../../../images/loginpageImg.png"
import "./login.css"

const Login = () => {
    return (
        <div>
            <div className="get-started">
                <div className="getlista-wrapper">
                    <span className="getlist">getlist</span>
                    <span className="a">{`{a}`}</span>
                </div>
                <div className="get-started-divider" />
                <b className="is-gateway-to">is gateway to #openweb</b>
                <b className="finds-anyone-from"> finds anyone, from anywhere</b>
                <Grid>
                    <Grid.Row style={{ marginTop: "-60px" }}>
                        <Grid.Column width={9}>
                            <img className="left-grid" alt="" src={imgage} />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <div className="right-grid">
                                <div className="get-started-parent">
                                    <div className="sign-up-with">Get Started</div>
                                    <button className="linkedin-btn">
                                        <Icon name='linkedin' size='large' />
                                        <div className="sign-up-with">Sign up with Linkedin</div>
                                    </button>
                                </div>
                                <div className="login-ul-container">
                                    <ul className="login-page-ul">
                                        <li>
                                            Touch base with 500 Million people across globe
                                        </li>
                                        <li>
                                            Find the perfect person for your company
                                        </li>
                                        <li>Pay as go</li>
                                        <li>Find their contact details</li>
                                        <li>{`Engage with them on the fly `}</li>
                                    </ul>
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>

                    </Grid.Row>
                </Grid>
            </div>
            <footer className="getlista-2023-">{`© getlist{a} 2023 - All rights reserved.`}</footer>
        </div>
    )
}

export default Login