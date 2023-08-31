import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Container, Header, Icon } from 'semantic-ui-react'
import { FormikInputComponent } from "../../../utilities/formUtils";
import { addTags } from '../data/actions';
import { getIsListProfileDetailsPayload } from '../data/selectors';
import CancelSvg from '../../svg/cancelSvg';

const AddTagNameForm = ({ setAddTagModal, sessionUserId, selectedRows }) => {


    const profileDetailsPayload = useSelector((state) => getIsListProfileDetailsPayload(state));

    const dispatch = useDispatch();


    const saveAddTagForm = (values) => {

        if (selectedRows && selectedRows.length && selectedRows.length > 0) {
            selectedRows.map((item) => {
                let obj = {}
                obj.tagname = values.tagname
                obj.listid = (item.listid).toString()
                obj.profileid = (item.profileid).toString()
                obj.userid = sessionUserId ? (sessionUserId).toString() : ""
                dispatch(addTags(obj))
            })
        } else {
            let obj = {}
            obj.tagname = values.tagname
            obj.listid = (profileDetailsPayload.listid ? profileDetailsPayload.listid : "").toString()
            obj.profileid = (profileDetailsPayload.profileid ? profileDetailsPayload.profileid : "").toString()
            obj.userid = (profileDetailsPayload.userid ? profileDetailsPayload.userid : "").toString()
            dispatch(addTags(obj))

        }
        setAddTagModal({ open: false, obj: "" })

    }

    return (
        <Container>
            <div
                className="welcome-popup-close-icon"
                onClick={() => setAddTagModal({ open: false, obj: "" })}
            >
                <CancelSvg />
            </div>
            <div className="welcome-popup-header">Add Tag Name </div>
        

            <Formik id="finbank" size="large" width={5}
                initialValues={{ tagname: "" }}
                validationSchema={null}
                onSubmit={(values, { resetForm }) => {
                    saveAddTagForm(values, resetForm)
                }}
                render={({ values, handleSubmit, onChange, handleChange, setFieldValue, errors, handleBlur }) => (

                    <Form as={FormikForm} size="small" width={5} onSubmit={handleSubmit} onBlur={handleBlur} >

                        <Field name='tagname' isLabel='false' component={FormikInputComponent} className="listName" placeholder="Enter Tag Name" />
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
    );
};

export default AddTagNameForm;