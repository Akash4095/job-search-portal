import React, { useEffect, useState } from "react";
import { Formik, Field, Form as FormikForm } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Modal,
    Form,
    Container,
    Header,
    Icon,
} from "semantic-ui-react";
import { FormikInputComponent } from "../../../utilities/formUtils";
import CancelSvg from "../../svg/cancelSvg";

const AddEmailForm = (props) => {
    const dispatch = useDispatch();

    const saveAddEmailForm = (values) => {
        if (props.sessionUserId && props.sessionUserId !== undefined) {
            let obj = {};
            // obj.listname = values.listname
            // obj.userid = props.sessionUserId.toString()
            // dispatch(addUserList(obj))
            props.setAddEmailModal(false);
        }
    };

    const closeModal = () => {
        props.setAddEmailModal(false);
    };

    return (
        <Container>
            <div
                className="welcome-popup-close-icon"
                onClick={() => props.setAddEmailModal(false)}
            >
                <CancelSvg />
            </div>
            <div className="welcome-popup-header">Just for us!</div>

            <Formik
                id="finbank"
                size="large"
                width={5}
                initialValues={{ listname: "" }}
                validationSchema={null}
                onSubmit={(values, { resetForm }) => {
                    saveAddEmailForm(values, resetForm);
                }}
                render={({
                    values,
                    handleSubmit,
                    onChange,
                    handleChange,
                    setFieldValue,
                    errors,
                    handleBlur,
                }) => (
                    <Form
                        as={FormikForm}
                        size="small"
                        width={5}
                        onSubmit={handleSubmit}
                        onBlur={handleBlur}
                        className="emailform"
                    >
                        <Field
                            name="name"
                            label="Name"
                            component={FormikInputComponent}
                            className="welcome-popup-input"
                        />
                        <Field
                            name="email"
                            label="Email"
                            component={FormikInputComponent}
                            className="welcome-popup-input"
                        />
                        <Field
                            name="designation"
                            label="Designation"
                            component={FormikInputComponent}
                            className="welcome-popup-input"
                        />
                        <Field
                            name="company"
                            label="Company"
                            component={FormikInputComponent}
                            className="welcome-popup-input"
                        />
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
                                fontWeight: "400"
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

export default AddEmailForm;
