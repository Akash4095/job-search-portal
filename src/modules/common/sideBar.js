import React from 'react'
import { Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gotoWelcomePage = () => {
        navigate("/welcome")
    }
    return (
        <section className="sidebar-container">
            <div className="sidebar-header">
                <div className="top" onClick={() => gotoWelcomePage()}>
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
                <div className="sidebar-add-list">
                    <Icon name="add" className='sidebar-icons' />
                    <div className="default-list1">Add List</div>
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