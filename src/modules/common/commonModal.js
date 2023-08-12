import React, { useEffect } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

const CommanResponseModal = (props) => {
    const {
        openCommonModal,
        setOpenCommonModal,
    } = props;


    const iconStyle = {
        fontSize: "27px",

    };

    return (
        <Modal
            id="common-modal"
            size={openCommonModal.size}
            open={openCommonModal.open}
            onClose={() => setOpenCommonModal({ open: false, size: "", headerContent: "", headerIcon: "", modalContent: "", buttonColor: "" })}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <Modal.Header>
                <Icon name={openCommonModal.headerIcon} color={openCommonModal.buttonColor} style={iconStyle} />
                <span
                    style={{
                        marginLeft: "3px",
                        fontSize: "22px",
                    }}
                >
                    {openCommonModal.headerContent}
                </span>
            </Modal.Header>
            <Modal.Content>{openCommonModal.modalContent}</Modal.Content>
            <Modal.Actions>
                <Button
                    id="closeModal"
                    inverted
                    color={openCommonModal.buttonColor}
                    onClick={() => setOpenCommonModal({ open: false, size: "", headerContent: "", headerIcon: "", modalContent: "", buttonColor: "" })}
                >
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default CommanResponseModal;