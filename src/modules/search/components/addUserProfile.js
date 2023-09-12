import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Container, Header, Icon } from 'semantic-ui-react'
import { addProfileToList } from '../data/actions';
import UserListSelect from './userListSelect';
import { getAddList, getIsProfileDetailsPayload } from '../data/selectors';
import AddListForm from '../../common/addListForm';
import CancelSvg from '../../svg/cancelSvg';
import { addListSchema } from '../data/model';


const AddUserProfileToListForm = (props) => {

    const profileDetailsPayload = useSelector((state) => getIsProfileDetailsPayload(state));
    const initialVal = useSelector((state) => getAddList(state));
    const [listModal, setListModal] = useState({ open: false, msg: "" });

    const dispatch = useDispatch();

    const saveForm = (values) => {

        if (props.selectedRows && props.selectedRows.length && props.selectedRows.length > 0) {
            props.selectedRows.map((item) => {
                let obj = {}
                obj.listid = (values.listid).toString()
                obj.profileid = (item).toString()
                obj.userid = props.sessionUserId ? (props.sessionUserId).toString() : ""
                dispatch(addProfileToList(obj))
            })
        } else {
            let obj = {}
            obj.listid = (values.listid).toString()
            obj.profileid = (profileDetailsPayload.profileid ? profileDetailsPayload.profileid : "").toString()
            obj.userid = (profileDetailsPayload.userid ? profileDetailsPayload.userid : "").toString()
            dispatch(addProfileToList(obj))

        }
        props.setAddListModal({ open: false, msg: "", obj: {} })
        if (props.setRowClicked) {
            props.setRowClicked(false)
        }
    }


    const closeModal = () => {
        props.setAddListModal({ open: false, msg: "", obj: {} })
    }


    return (
        <Container>
            <div
                className="welcome-popup-close-icon"
                onClick={() => props.setAddListModal({ open: false, msg: "", obj: {} })}
            >
                <CancelSvg />
            </div>
            <div className="welcome-popup-header">Add Profile To List

            </div>

            <p className='note-text'>Note: U can Add New List from below Add List button</p>
            <br />
            <Formik id="finbank" size="large" width={5}
                initialValues={initialVal}
                validationSchema={addListSchema}
                onSubmit={(values, { resetForm }) => {
                    saveForm(values, resetForm)
                }}
                render={({ values, handleSubmit, onChange, handleChange, setFieldValue, errors, handleBlur }) => (

                    <Form as={FormikForm} size="small" width={5} onSubmit={handleSubmit} onBlur={handleBlur} >

                        <UserListSelect name='listid' label="Select List Name" placeholder="Select" isSelection={true} />
                        <br />
                        <br />
                        <Button type="submit" size="small" color='blue' className="CustomeBTN" style={{ padding: "10px 30px" }}>Add Profile To List</Button>
                        <Button type='button' size='small' color='green' onClick={() => setListModal({ open: true, msg: "" })} floated='right' style={{ padding: "10px 30px" }}>Add New List</Button>
                    </Form>
                )}
            />
            <Modal
                size="mini"
                open={listModal.open}
            >
                <Modal.Content>
                    <AddListForm setAddListModal={setListModal} sessionUserId={props.sessionUserId} />
                </Modal.Content>
            </Modal>
        </Container>
    )
}

export default AddUserProfileToListForm