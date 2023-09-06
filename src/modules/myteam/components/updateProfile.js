import React, { useEffect, useState } from "react";
import { Formik, Field, Form as FormikForm } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SideBar from '../../common/sideBar'
import CommonHeaderComponent from '../../common/commonHeader'
import EditSvg from "../../svg/editSvg";
import { FormikInputComponent } from '../../../utilities/formUtils';
import { Button, Form, Container } from "semantic-ui-react";
import "./myteam.css"

const UpdateProfile = ({ sessionUserId }) => {


    const saveAddEmailForm = (values) => {
        if (sessionUserId) {
            const formData = new FormData();
            formData.append("company", values.company);
            formData.append("secondaryemail", values.secondaryemail);
            formData.append("userid", sessionUserId.toString());
            formData.append("fullname", values.fullname);
            formData.append("designation", values.designation);
            // formData.append("profilepic", profilePicObj);
        }
    };
    return (
        <div className='d_flex'>
            <SideBar sessionUserId={sessionUserId} />
            <div className="right-panel">
                <CommonHeaderComponent />
                <div className='updateprofile-container'>
                    <div className='updateprofile-header'>
                        <div className='updateprofile-title'>Profile</div>
                    </div>
                    <div className='updateprofile-cart'>
                        <div className='profile-picture'>
                            <p>Profile Picture</p>
                            <div className='profile-pic-edit'>
                                <EditSvg />
                            </div>
                            <img src='' alt='' width="126" height="126" className='profile-picture-img' />

                        </div>
                        <div className='update-form'>
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
                                        className="updateProfileform"
                                    >
                                        <Field
                                            name="firstname"
                                            label="First Name"
                                            component={FormikInputComponent}
                                            className="welcome-popup-input"
                                        />
                                        <Field
                                            name="lastname"
                                            label="Last Name"
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
                                                width: "auto"
                                            }}
                                            floated="right"
                                        >
                                            save
                                        </Button>
                                    </Form>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile