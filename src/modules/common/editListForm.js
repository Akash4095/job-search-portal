import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Container, Header, Icon } from 'semantic-ui-react'
import { FormikInputComponent, } from '../../utilities/formUtils'
import { addUserList, updateUserList } from '../search/data/actions';
import CancelSvg from '../svg/cancelSvg';
import { cloneDeep } from 'lodash';


const EditListForm = (props) => {

    const dispatch = useDispatch();

    const updateListForm = (values) => {
        if (props.sessionUserId) {
            let obj = {}
            obj.listname = (values.listname).toString()
            obj.listid = (values.id).toString()
            obj.userid = props.sessionUserId.toString()
            dispatch(updateUserList(obj))
            props.setEditListModal({ open: false, obj: "" })
        }
    }

    const closeModal = () => {
        props.setEditListModal({ open: false, obj: "" })
    }

    return (
        <Container>
            <div
                className="welcome-popup-close-icon"
                onClick={() => closeModal()}
            >
                <CancelSvg />
            </div>
            <div className="welcome-popup-header">Update List Name </div>

            <Formik id="finbank" size="large" width={5}
                initialValues={cloneDeep(props.editListModal.obj)}
                validationSchema={null}
                onSubmit={(values, { resetForm }) => {
                    updateListForm(values, resetForm)
                }}
                render={({ values, handleSubmit, onChange, handleChange, setFieldValue, errors, handleBlur }) => (

                    <Form as={FormikForm} size="small" width={5} onSubmit={handleSubmit} onBlur={handleBlur} >

                        <Field name='listname' isLabel='false' component={FormikInputComponent} className="listName" placeholder="Enter List Name" />
                        <br />

                        <Button
                            type="submit"
                            style={{
                                background: "#2b81e7",
                                padding: "10px 24px",
                                width: "100%",
                                gap: "10px",
                                borderRadius: "6px",
                                color: "#fff",
                                fontWeight: "400",
                                // marginTop:"6px"
                            }}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            />
        </Container>
    )
}

export default EditListForm