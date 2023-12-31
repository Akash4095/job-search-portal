import React, { useState, useEffect } from 'react'
import "./myteam.css"
import SideBar from '../../common/sideBar'
import CommonHeaderComponent from '../../common/commonHeader'
import DotsSvg from '../../svg/dotsSvg'
import { Modal } from 'semantic-ui-react'
import SendInviteForm from './sendInvite'
import { useDispatch } from 'react-redux'
import { getUserList } from '../../search/data/actions'


const MyTeamList = ({ sessionUserId, setSessionUserId }) => {

    const [inviteModal, setInviteModal] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        let obj = {};
        obj.userid = (sessionUserId) ? sessionUserId.toString() : "";
        dispatch(getUserList(obj));

    }, [sessionUserId]);

    return (
        <div className='d_flex'>
            <SideBar sessionUserId={sessionUserId} />
            <div className="right-panel">
                <CommonHeaderComponent sessionUserId={sessionUserId} setSessionUserId={setSessionUserId} />
                <div className='myteam-container'>
                    {/* <div className='myteam-header'>
                        <div className='myteam-title'>My Team</div>
                        <div className='searchbar'>
                            <div className='searchbar-div1'>
                                <input type='text' className='searchInput'></input>
                            </div>
                            <div className='searchbar-div2'>
                                Search
                            </div>
                        </div>
                        <div className='addmember-btn' onClick={() => setInviteModal(true)}>
                            <p>Add Member</p>
                        </div>
                    </div>
                    <div className='scrollable-container myteam-body'>
                        <div className='table-header'>
                            <div className='table-header1'>Account</div>
                            <div className='table-header2'>Email</div>
                            <div className='table-header3'>Role</div>
                        </div>
                        <div className='table-body'>
                            <div className='table-row'>
                                <div className='table-td1'>Gaurav</div>
                                <div className='table-td2'>gaurav.gaur@lista.com</div>
                                <div className='table-td3'>Admin</div>
                                <div className="dotsSvg">
                                    <DotsSvg />
                                </div>
                            </div>

                        </div>
                    </div> */}

                    <div style={{ marginLeft: "40%", marginTop: "20%" }}>Version 2.0 coming soon </div>

                </div>
            </div>
            <Modal
                size="mini"
                open={inviteModal}
                style={{ width: "28vw" }}
            >
                <Modal.Content>
                    <SendInviteForm setInviteModal={setInviteModal} sessionUserId={sessionUserId} />
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default MyTeamList