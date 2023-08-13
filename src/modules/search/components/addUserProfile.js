import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Container, Header, Icon } from 'semantic-ui-react'
import { addProfileToList } from '../data/actions';
import UserListSelect from './userListSelect';


const AddUserProfileToListForm = (props) => {


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
            obj.profileid = (props.addListModal.obj.id).toString()
            obj.userid = props.sessionUserId ? (props.sessionUserId).toString() : ""
            dispatch(addProfileToList(obj))

        }
        props.setAddListModal({ open: false, msg: "", obj: {} })
    }


    const closeModal = () => {
        props.setAddListModal({ open: false, msg: "", obj: {} })
    }


    return (
        <Container>
            <Header as='h3' style={{ marginBottom: "15px" }}>Add Profile To List</Header>
            <br />
            <Formik id="finbank" size="large" width={5}
                initialValues={{ listid: "" }}
                validationSchema={null}
                onSubmit={(values, { resetForm }) => {
                    saveForm(values, resetForm)
                }}
                render={({ values, handleSubmit, onChange, handleChange, setFieldValue, errors, handleBlur }) => (

                    <Form as={FormikForm} size="small" width={5} onSubmit={handleSubmit} onBlur={handleBlur} >

                        <UserListSelect name='listid' label="Select List Name" placeholder="Select" isSelection={true} />
                        <br />
                        <br />
                        <Button type="button" size="small" color='red' className="CustomeBTN" onClick={() => closeModal()}>Close</Button>
                        <Button type="submit" size="small" color='blue' className="CustomeBTN">Add</Button>

                    </Form>
                )}
            />
        </Container>
    )
}

export default AddUserProfileToListForm