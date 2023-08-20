import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Container, Header, Icon } from 'semantic-ui-react'
import { FormikInputComponent, } from '../../utilities/formUtils'
import { getIsCodeSendResponse } from '../home/data/selectors';
import { addUserList } from '../search/data/actions';


const AddListForm = (props) => {

    const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));
   

    const dispatch = useDispatch();



    const saveAddListForm = (values) => {
        let obj = {}
        obj.listname = values.listname
        obj.userid = props.sessionUserId.toString()
        dispatch(addUserList(obj))
        props.setAddListModal({ open: false, msg: "" })
    }

    const closeModal = () => {
        props.setAddListModal({ open: false, msg: "" })
    }

    return (
        <Container>
            <Header as='h3' style={{ marginBottom: "15px" }}>Add List Name  </Header>

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
                        <Button type="button" size="small" color='red' className="CustomeBTN" onClick={() => closeModal()}>Close</Button>
                        <Button type="submit" size="small" color='blue' className="CustomeBTN">Add</Button>
                    </Form>
                )}
            />
        </Container>
    )
}

export default AddListForm