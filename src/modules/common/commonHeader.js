import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const CommonHeaderComponent = () => {
    return (
        <header className="common-header">
            <div className="top-tab">
                <NavLink to="/search" className="search-wrapper" activeClassName="nav_active">
                    <div className="search">Search</div>
                </NavLink>
                <NavLink to="/welcome" className="list-wrapper" activeClassName="nav_active">
                    <div className="search">List</div>
                </NavLink>
            </div>
            <div className="balance">
                <div className="getlista">Available Credits</div>
                <div className="div">
                    <span>15</span>
                    <span className="span"> / 20</span>
                </div>
            </div>
            <div className="top-actions">
                <Icon name="bell outline" color="grey" />
                <span className='notification-count'>5</span>
                <Icon name="setting" color="grey" />
                <img width='25px' height='20px' />
                <div className="profile">
                    <div className="user-parent">
                        <div className="search">Dinesh</div>
                        <Icon name="caret down" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default CommonHeaderComponent