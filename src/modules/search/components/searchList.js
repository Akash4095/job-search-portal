import React, { useState, useEffect } from "react";
import SideBar from "../../common/sideBar";
import SearchResults from "./searchResults";
import CommonHeaderComponent from "../../common/commonHeader";
import CommonSearchComponent from "../../common/commonSearchComponent";
import { Button, Dimmer, Icon, Loader, Modal } from "semantic-ui-react";
import UserCart from "./userCart";
import {
  getIsCodeSendResponse,
  getIsSearchedText,
} from "../../home/data/selectors";
import {
  getIsAddProfileToListRes,
  getIsAddUserList,
  getIsFetchedSearchByQuery,
  getIsUserList,
} from "../data/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearProfileToListRes,
  clearSearchByQuery,
  clearUserListRes,
  getUserList,
} from "../data/actions";
import CommanResponseModal from "../../common/commonModal";
import AddUserProfileToListForm from "./addUserProfile";
import { toast } from "react-toastify";

const Search = ({ setSearchedText, searchedText, sessionUserId, setSessionUserId }) => {
  const searchResult = useSelector((state) => getIsFetchedSearchByQuery(state));
  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));
  const inputText = useSelector((state) => getIsSearchedText(state));
  const userListRes = useSelector((state) => getIsUserList(state));
  const addListRes = useSelector((state) => getIsAddUserList(state));
  const addProfileToListRes = useSelector((state) =>
    getIsAddProfileToListRes(state)
  );

  const [rowClicked, setRowClicked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [items, setItems] = useState([]);
  const [start, setStart] = useState(1);
  const [userCartLoader, setUserCartLoader] = useState({
    open: false,
    msg: "",
  });
  const [listLoader, setListLoader] = useState({ open: false, msg: "" });

  const [addListModal, setAddListModal] = useState({
    open: false,
    msg: "",
    obj: {},
  });
  const [isModalOpen, setModalOpen] = useState({ open: false, msg: "" })
  const [showViewMoreButton, setShowViewMoreButton] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usrId = localStorage.getItem("userid");
  // console.log('usrId', usrId)
  useEffect(() => {
    if (usrId && usrId !== null && usrId !== undefined) {
      setSessionUserId(usrId)
    }
  }, [usrId])

  useEffect(() => {
    let obj = {};
    obj.userid = (sessionUserId && sessionUserId !== undefined && sessionUserId !== null) ? sessionUserId.toString() : "";
    dispatch(getUserList(obj));

  }, [sessionUserId]);

  useEffect(() => {
    if (searchResult && searchResult !== null && searchResult !== undefined) {
      if (searchResult.status && searchResult.status === "success") {
        setItems(searchResult.data);
      }
      if (searchResult.status && searchResult.status === "failed") {
        setModalOpen({ open: true, msg: searchResult.msg ? searchResult.msg : "" })
      }
      setListLoader({ open: false, msg: "" });
    }
  }, [searchResult]);

  const closeModal = () => {
    dispatch(clearSearchByQuery())
    setModalOpen({ open: false, msg: "" })
  }

  useEffect(() => {
    if (addListRes && addListRes !== null && addListRes !== undefined) {
      if (addListRes.status && addListRes.status === "success") {
        toast.success("List Added Successfully");
        dispatch(clearUserListRes());
      }
    }
  }, [addListRes]);

  useEffect(() => {
    if (
      addProfileToListRes &&
      addProfileToListRes !== null &&
      addProfileToListRes !== undefined
    ) {
      if (
        addProfileToListRes.status &&
        addProfileToListRes.status === "success"
      ) {
        setSelectedRows([]);
        toast.success(addProfileToListRes.msg ? addProfileToListRes.msg : "");
        dispatch(clearProfileToListRes());
      }
    }
  }, [addProfileToListRes]);



  const addProfilesToListFunc = (row) => {
    setAddListModal({ open: true, msg: "", obj: row });
  };

  const handleViewMoreClick = () => {
    setStart(start + 10);
  };

  return (
    <div className="d_flex">
      <SideBar sessionUserId={sessionUserId} />
      <div className="right-panel">
        <CommonHeaderComponent />

        <CommonSearchComponent
          start={start}
          text={searchedText}
          setSearchedText={setSearchedText}
          setLoader={setListLoader}
          sessionUserId={sessionUserId}
        />
        <div className="search-container">
          <p className="search-result-count">
            {items.length > 0 ? items.length + " " + searchedText : ""}
          </p>
          {selectedRows.length > 0 ? (
            <p className="list-selected">
              <span> {selectedRows.length + " Selected"} </span>
              <Button
                icon
                labelPosition="left"
                color="blue"
                size="mini"
                onClick={() => addProfilesToListFunc()}
                style={{
                  padding: "6px 0px",
                  marginLeft: "20px",
                  borderRadius: "6px",
                }}
              >
                <Icon name="list ul" color="white" size="mini" />
                Add to list
              </Button>
            </p>
          ) : null}

          <div className="d_flex">
            <div
              className="scrollable-container search-result-container"
              style={{ height: "70vh", overflowY: "scroll", width: "78vw" }}
            >
              <>
                {items && items.length > 0
                  ? items.map((item, index) => {
                    return (
                      <SearchResults
                        key={index}
                        row={item}
                        rowClicked={rowClicked}
                        setRowClicked={setRowClicked}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        sessionUserId={sessionUserId}
                        setAddListModal={setAddListModal}
                        userCartLoader={userCartLoader}
                        setUserCartLoader={setUserCartLoader}
                      />
                    );
                  })
                  : null}
              </>
              <div className="view-more-button-container">
                {showViewMoreButton && items && items.length > 0 ? (
                  <button
                    className="view-more-button"
                    onClick={handleViewMoreClick}
                  >
                    View More
                  </button>
                ) : null}
              </div>
            </div>
            {rowClicked ? (
              <UserCart
                setRowClicked={setRowClicked}
                userCartLoader={userCartLoader}
                setUserCartLoader={setUserCartLoader}
                setAddListModal={setAddListModal}
              />
            ) : null}
          </div>
        </div>
        <div className="dimmer-loader-container">
          {listLoader.open && (
            <Dimmer inverted active>
              <Loader active>{listLoader.msg}</Loader>
            </Dimmer>
          )}
        </div>
      </div>
      <Modal
        size="tiny"
        open={addListModal.open}
        // onClose={() => setAddListModal({ open: false, msg: "", obj: {} })}
      >
        <Modal.Content>
          <AddUserProfileToListForm
            addListModal={addListModal}
            setAddListModal={setAddListModal}
            selectedRows={selectedRows}
            sessionUserId={sessionUserId}
          />
        </Modal.Content>
      </Modal>
      <Modal open={isModalOpen.open} size="mini">
        <Modal.Header>Error</Modal.Header>
        <Modal.Content>
          <h4 className="error">{isModalOpen.msg}</h4>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" inverted color="red" onClick={() => closeModal()}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Search;
