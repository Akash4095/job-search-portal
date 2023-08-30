import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Icon } from "semantic-ui-react";


const fileTypes = ["JPG", "PNG", "JPEG", "GIF"];

function ImageDragDrop(props) {

    const handleChange = (fileObj) => {
        // console.log('fileObj', fileObj)
        props.setProfilePicObj(fileObj)
        if (fileObj && fileObj.name !== null && fileObj.name !== undefined) {
            if (props.setProfilePicSelected) {
                props.setProfilePicSelected(true)
            }
        } else {
            if (props.setProfilePicSelected) {
                props.setProfilePicSelected(false)
            }

        }


    };

    useEffect(() => {
        if (props.profilePicSelected === false) {
            props.setProfilePicSelected(false)
        }

    }, [props.profilePicSelected])

    const typeErrorFunc = (err) => {

    }

    return (
        <>
            <FileUploader
                name="file"
                handleChange={handleChange}
                types={fileTypes}
                maxSize={10000}
                onTypeError={(err) => typeErrorFunc(err)}
                children={<div className="imageUpload"><Icon color="grey" name='image' size="large"></Icon> {props.profilePicSelected ? <span style={{ color: "#1be885" }}>Selected</span> : "Select Profile Pic"}</div>}
                required={true}
            />
        </>
    );
}

export default ImageDragDrop;