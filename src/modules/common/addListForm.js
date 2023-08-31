import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Container, Header, Icon } from 'semantic-ui-react'
import { FormikInputComponent, } from '../../utilities/formUtils'
import { getIsCodeSendResponse } from '../home/data/selectors';
import { addUserList } from '../search/data/actions';
import CancelSvg from '../svg/cancelSvg';


const AddListForm = (props) => {

    const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));


    const dispatch = useDispatch();



    const saveAddListForm = (values) => {
        if (props.sessionUserId && props.sessionUserId !== undefined) {
            let obj = {}
            obj.listname = values.listname
            obj.userid = props.sessionUserId.toString()
            dispatch(addUserList(obj))
            props.setAddListModal({ open: false, msg: "" })
        }
    }

    const closeModal = () => {
        props.setAddListModal({ open: false, msg: "" })
    }

    return (
        <Container>
            <div
                className="welcome-popup-close-icon"
                onClick={() => closeModal()}
            >
                <CancelSvg />
            </div>
            <div className="welcome-popup-header">Add List Name </div>
         
            <Formik id="finbank" size="large" width={5}
                initialValues={{ listname: "" }}
                validationSchema={null}
                onSubmit={(values, { resetForm }) => {
                    saveAddListForm(values, resetForm)
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

export default AddListForm