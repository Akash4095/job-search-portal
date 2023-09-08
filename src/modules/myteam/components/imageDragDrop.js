import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import EditSvg from "../../svg/editSvg";


const fileTypes = ["JPG", "PNG", "JPEG", "GIF"];

function ImageDragDrop(props) {

    const handleChange = (fileObj) => {
        // console.log('fileObj', fileObj)
        props.setProfilePicObj(fileObj)
        if (fileObj && fileObj.name !== null && fileObj.name !== undefined) {
            const imageURL = URL.createObjectURL(fileObj);
            props.setSelectedImage(imageURL);

        } else {


        }

    };



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
                children={<div className="img-drag-drop"><EditSvg /> </div>}
                required={true}
            />
        </>
    );
}

export default ImageDragDrop;