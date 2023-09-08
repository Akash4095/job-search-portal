import React, { useEffect, useState } from "react";
import { Formik, Field, Form as FormikForm } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SideBar from '../../common/sideBar'
import CommonHeaderComponent from '../../common/commonHeader'
import EditSvg from "../../svg/editSvg";
import { FormikInputComponent } from '../../../utilities/formUtils';
import { Button, Form, Container } from "semantic-ui-react";
import "./myteam.css"
import { getIsCodeSendResponse, getIsUserProfileDetailsFetched, getIsUserProfileDetailsUpdated } from "../../home/data/selectors";
import ImageDragDrop from "./imageDragDrop";
import { clearFetchedUserProfileDetails, clearUpdateUserProfileDetails, fetchUserProfileDetails, updateUserProfileDetails } from "../../home/data/actions";
import { toast } from "react-toastify";
import { getIsUpdateInitialValues } from "../data/selectors";
import { getUserList } from "../../search/data/actions";
import { BASE_URL } from '../../../store/path'



const UpdateProfile = ({ sessionUserId }) => {

    const updateIitailValues = useSelector((state) => getIsUpdateInitialValues(state));
    const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));
    const userProfileRes = useSelector((state) => getIsUserProfileDetailsFetched(state));
    const userProfileUpdatedRes = useSelector((state) => getIsUserProfileDetailsUpdated(state));


    const [profilePicObj, setProfilePicObj] = useState("")
    const [imageName, setImageName] = useState("")
    const [selectedImage, setSelectedImage] = useState("");
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [designation, setDesignation] = useState("")
    const [company, setCompany] = useState("")


    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionUserId) {
            dispatch(fetchUserProfileDetails(sessionUserId.toString()))
            let obj = {};
            obj.userid = (sessionUserId) ? sessionUserId.toString() : "";
            dispatch(getUserList(obj));
        }
    }, [sessionUserId, userProfileUpdatedRes])


    useEffect(() => {
        if (userProfileRes) {
            if (userProfileRes.status === "success") {
                setImageName(userProfileRes.profilepic)
                setFullName(userProfileRes.fullname)
                setEmail(userProfileRes.secondaryemail)
                setDesignation(userProfileRes.designation)
                setCompany(userProfileRes.company)
                setSelectedImage(`${BASE_URL}/static/profile/${userProfileRes.profilepic}`)
            }
        }

    }, [userProfileRes])



    useEffect(() => {
        if (userProfileUpdatedRes) {
            if (userProfileUpdatedRes.status && userProfileUpdatedRes.status === "success") {
                toast.success(userProfileUpdatedRes.msg ? userProfileUpdatedRes.msg : "");
                setTimeout(() => {
                    dispatch(clearUpdateUserProfileDetails())
                    window.location.reload(false)
                }, 1500)

            }
        }

    }, [userProfileUpdatedRes])

    const saveAddEmailForm = (values, resetForm) => {
        if (sessionUserId) {
            const formData = new FormData();
            formData.append("company", values.company);
            formData.append("secondaryemail", values.secondaryemail);
            formData.append("userid", sessionUserId.toString());
            formData.append("fullname", values.fullname);
            formData.append("designation", values.designation);
            if (selectedImage) {
                formData.append("profilepic", profilePicObj);
            }
            dispatch(updateUserProfileDetails(formData))
            setTimeout(() => {
                resetForm()
                setSelectedImage("")
            }, 1500)

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
                                <ImageDragDrop setProfilePicObj={setProfilePicObj} setSelectedImage={setSelectedImage} />
                            </div>
                            <img src={selectedImage} alt='' width="126" height="126" className='profile-picture-img' />

                        </div>
                        <div className='update-form'>
                            <Formik
                                id="userprofile"
                                size="large"
                                width={5}
                                initialValues={updateIitailValues}
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
                                            name="fullname"
                                            label="Full Name"
                                            component={FormikInputComponent}
                                            className="welcome-popup-input"
                                            setFieldValueM={fullName ? fullName : ""}
                                        />

                                        <Field
                                            name="secondaryemail"
                                            label="Email"
                                            component={FormikInputComponent}
                                            className="welcome-popup-input"
                                            setFieldValueM={email ? email : ""}
                                        />
                                        <Field
                                            name="designation"
                                            label="Designation"
                                            component={FormikInputComponent}
                                            className="welcome-popup-input"
                                            setFieldValueM={designation ? designation : ""}
                                        />
                                        <Field
                                            name="company"
                                            label="Company"
                                            component={FormikInputComponent}
                                            className="welcome-popup-input"
                                            setFieldValueM={company ? company : ""}
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