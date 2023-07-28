import React from 'react'
import { Icon } from 'semantic-ui-react'

const SideBar = () => {
    return (
        <section className="sidebar-container">
            <div className="sidebar-header">
                <div className="top">
                    <span className="getlist">getlist</span>
                    <span className="a">{`{a}`}</span>
                </div>
            </div>
            <div className="sidebar-middle">
                <div className="sidebar-list">
                    <Icon name="bars" className='sidebar-icons' />
                    <div className="default-list1">Default List</div>
                    <Icon name="lock" />
                </div>
            </div>
            <div className="footer-actions">
                <div className="sidebar-f-list">
                    <Icon name="user" className='sidebar-icons' />
                    <div className="default-list">My Team</div>
                </div>
                <div className="sidebar-f-list">
                    <Icon name="help circle" className='sidebar-icons' />
                    <div className="default-list">Help</div>
                </div>
                <div className="sidebar-f-list">
                    <Icon name="clipboard outline" className='sidebar-icons' />
                    <div className="default-list">Integration</div>
                </div>
            </div>
            <div className="widget-last">
                <div className="getlista">Subscription Expiry Date</div>
                <div>25 July 2023</div>
            </div>
        </section>

    )
}

export default SideBar