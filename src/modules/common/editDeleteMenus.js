import React from 'react'
import { useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react'
import { deleteUserList } from '../search/data/actions';

const EditDeleteMenus = ({ item, setEditListModal }) => {

    const dispatch = useDispatch();
    

    const editSidebarList = () => {
        setEditListModal({ open: true, obj: item })
        document.body.click();
    }

    const deleteSidebarList = () => {
        let obj = {}
        obj.listid = (item.id).toString()
        obj.userid = (item.userid).toString()
        dispatch(deleteUserList(obj))
        document.body.click();
    }

    return (
        <Container className='optionHolderDiv heightSetOption' style={{ width: "100%", height: "48px", cursor: "pointer" }}>
            <div style={{ height: "24px" }} className='logout-popup-item' onClick={() => editSidebarList()}>Edit</div>
            <div style={{ height: "24px" }} className='logout-popup-item' onClick={() => deleteSidebarList()}>Delete</div>
        </Container>
    )
}

export default EditDeleteMenus