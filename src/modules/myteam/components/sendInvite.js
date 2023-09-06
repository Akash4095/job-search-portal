import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Container, Header, Icon } from 'semantic-ui-react'
import { FormikInputComponent, } from '../../../utilities/formUtils'
import CancelSvg from '../../svg/cancelSvg';
import { getIsSendInvite } from '../data/selectors';
import { sendInviteSchema } from '../data/model';


const SendInviteForm = (props) => {

    const sendinvite = useSelector(state => getIsSendInvite(state, props))
    const dispatch = useDispatch();

    const saveSendInviteForm = (values) => {
        console.log('================', values)
        if (props.sessionUserId && props.sessionUserId !== undefined) {
            let obj = {}
            props.setInviteModal(false)
        }
    }

    const closeModal = () => {
        props.setInviteModal(false)
    }
    console.log('sendinvite', sendinvite)
    return (
        <Container style={{ padding: "0px 12px" }}>
            <div
                className="welcome-popup-close-icon"
                onClick={() => closeModal()}
            >
                <CancelSvg />
            </div>
            <div className="sendInvite-top">
                <div className='sendInvite-header'>
                    Collaborate and Conquer Together
                </div>
                <div className='sendInvite-text'>
                    {"Forge a strong team on getlist{a} and unlock a world of collaborative possibilities. build your team now and conquer your goals together!"}
                </div>
            </div>
            <br />

            <Formik id="sendinvite" size="large" width={5}
                initialValues={sendinvite}
                validationSchema={sendInviteSchema}
                onSubmit={(values, { resetForm }) => {
                    saveSendInviteForm(values, resetForm)
                }}
                render={({ values, handleSubmit, onChange, handleChange, setFieldValue, errors, handleBlur }) => (

                    <Form as={FormikForm} size="small" width={5} onSubmit={handleSubmit} onBlur={handleBlur} >

                        <Field name='email' label='Email' component={FormikInputComponent} className="listName" isMandatory={true} />
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
                                marginBottom:"16px"
                            }}
                        >
                            Send Invite
                        </Button>
                    </Form>
                )}
            />
        </Container>
    )
}

export default SendInviteForm