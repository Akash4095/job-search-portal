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
import { updateUserProfileDetails } from "../data/actions";
import ImageDragDrop from "./imageDrop";

const AddUserProfileForm = (props) => {

    const dispatch = useDispatch();
    const formDataObj = new FormData();
    const [profilePicSelected, setProfilePicSelected] = useState(false);
    const [profilePicObj, setProfilePicObj] = useState(formDataObj);

    const saveAddEmailForm = (values) => {
        if (props.sessionUserId) {
            const formData = new FormData();
            formData.append("company", values.company);
            formData.append("secondaryemail", values.secondaryemail);
            formData.append("userid", props.sessionUserId.toString());
            formData.append("fullname", values.fullname);
            formData.append("designation", values.designation);
            formData.append("profilepic", profilePicObj);
            dispatch(updateUserProfileDetails(formData))
            props.setUserProfileModal(false);
        }
    };


    return (
        <Container>
            <div
                className="welcome-popup-close-icon"
                onClick={() => props.setUserProfileModal(false)}
            >
                <CancelSvg />
            </div>
            <div className="welcome-popup-header">Just for us!</div>

            <Formik
                id="userprofile"
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
                            name="fullname"
                            label="Name"
                            component={FormikInputComponent}
                            className="welcome-popup-input"
                        />
                        <Field
                            name="secondaryemail"
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
                        <ImageDragDrop
                            profilePicSelected={profilePicSelected}
                            setProfilePicSelected={setProfilePicSelected}
                            setProfilePicObj={setProfilePicObj}
                            className="welcome-popup-file"
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

export default AddUserProfileForm;
