import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Container, Header, Icon } from 'semantic-ui-react'
import { FormikInputComponent } from "../../../utilities/formUtils";
import { addTags } from '../data/actions';

const AddTagNameForm = ({ setAddTagModal, sessionUserId }) => {

    const dispatch = useDispatch();

    const saveAddTagForm = (values) => {
        let obj = {}
        obj.tagname = values.tagname
        obj.listid = values.listid
        obj.profileid = values.profileid
        obj.userid = sessionUserId.toString()
        // obj.userid = "1"
        dispatch(addTags(obj))
        setAddTagModal({ open: false, obj: "" })
    }

    return (
        <Container>
            <Header as='h3' style={{ marginBottom: "15px" }}>Add Tag Name  </Header>

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
                        <Button type="button" size="small" color='red' className="CustomeBTN" onClick={() => setAddTagModal({ open: false, obj: {} })}>Close</Button>
                        <Button type="submit" size="small" color='blue' className="CustomeBTN">Add</Button>
                    </Form>
                )}
            />
        </Container>
    );
};

export default AddTagNameForm;