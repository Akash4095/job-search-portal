import React, { useState, useEffect } from "react";
import CommonHeaderComponent from "../../common/commonHeader";
import CommonSearchComponent from "../../common/commonSearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../../common/sideBar";
import { Checkbox, Grid, Icon, Image, Modal, Table } from "semantic-ui-react";
import ListTable from "./listTable";
import ListUserCart from "./listUserCart";
import { getUserList } from "../../search/data/actions";
import { getIsCodeSendResponse } from "../../home/data/selectors";
import AddTagNameForm from "./addTagName";
import { getIsFetchedList, getIsListProfileDetailsPayload, getIsSidebarListPayload, getIsTagsRes, } from "../data/selectors";
import { toast } from "react-toastify";
import { clearTagsRes, fetchList, fetchListProfileDetails, } from "../data/actions";
import TagSvg from "../../svg/tagSvg";
import UnTagSvg from "../../svg/unTagSvg";
import AddListSvg from "../../svg/addListSvg";
import DownloadSvg from "../../svg/downloadSvg";
import DeleteSvg from "../../svg/deleteSvg";

const ListPage = ({ setSearchedText, searchedText, sessionUserId, setSessionUserId }) => {
  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));
  const tagsAddedRes = useSelector((state) => getIsTagsRes(state));
  const sidebarPayload = useSelector((state) => getIsSidebarListPayload(state));
  const profileDetailsPayload = useSelector((state) =>
    getIsListProfileDetailsPayload(state)
  );
  const listResponse = useSelector((state) => getIsFetchedList(state));

  const [rowClicked, setRowClicked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [start, setStart] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [listCartLoader, setListCartLoader] = useState({
    open: false,
    msg: "",
  });
  const [addTagModal, setAddTagModal] = useState({ open: false, obj: {} });
  const [listArray, setListArray] = useState([]);

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
    if (tagsAddedRes && tagsAddedRes !== null && tagsAddedRes !== undefined) {
      if (tagsAddedRes.status && tagsAddedRes.status === "success") {
        toast.success(tagsAddedRes.msg ? tagsAddedRes.msg : "");
        if (selectedRows && selectedRows.length > 0) {
          dispatch(fetchList(sidebarPayload));
        } else {
          dispatch(fetchListProfileDetails(profileDetailsPayload));
        }
        dispatch(clearTagsRes());
        setSelectedRows([]);
      }
    }
  }, [tagsAddedRes]);


  useEffect(() => {
    if (listResponse && listResponse !== null && listResponse !== undefined) {
      if (listResponse.status === "success") {
        if (
          listResponse.list &&
          listResponse.list.length &&
          listResponse.list.length > 0
        ) {
          setRowClicked(false)
          setListArray(listResponse.list);
        }
      }
    }
  }, [listResponse]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(listArray.map((row) => row));
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const unselectAll = () => {
    setSelectedRows([])
    setSelectAll(false)
  }

  const tagListFunction = () => {
    setAddTagModal({ open: true, obj: {} })
  };

  const unTagListFunction = () => { };

  const addToListFunction = () => { };

  const listExportFunction = () => { };

  const deleteSelectedList = () => { };

  return (
    <div className="d_flex">
      <SideBar sessionUserId={sessionUserId} />
      <div className="right-panel">
        <CommonHeaderComponent />

        <CommonSearchComponent
          setSearchedText={setSearchedText}
          text={searchedText}
          start={start}
          sessionUserId={sessionUserId}
        />
        <div className="list-table-actions">
          <div className="list-actions-select">
            {
              selectedRows.length > 0 ?
                <Icon name="minus square" color="blue" onClick={() => unselectAll()} />
                :
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
            }

            {selectedRows.length > 0 ? (
              <span className="btn-label">
                {selectedRows.length + " Selected"}
              </span>
            ) : (
              <span className="list-select-all">Select All</span>
            )}
          </div>
          {
            selectedRows.length > 0 ? 
            <div className="list-actions-btns">
            <div className="btn-frame" onClick={() => tagListFunction()}>
              <div className="btn-svg">
                <TagSvg />
              </div>
              <div className="btn-label">
                Tag
              </div>
            </div>
            <div className="btn-frame">
              <div className="btn-svg">
                <UnTagSvg />
              </div>
              <div className="btn-label">
                Untag
              </div>
            </div>
            <div className="btn-frame">
              <div className="btn-svg">
                <AddListSvg />
              </div>
              <div className="btn-label">
                Add to list
              </div>
            </div>
            <div className="btn-frame">
              <div className="btn-svg">
                <DownloadSvg />
              </div>
              <div className="btn-label">
                Export
              </div>
            </div>
            <div className="btn-frame">
              <div className="btn-svg">
                <DeleteSvg />
              </div>
              <div className="btn-label-delete">
                Delete
              </div>
            </div>
          </div>
          : null
          }
      
        </div>
        <div className="d_flex">
          <div
            className="scrollable-container search-result-container"
            style={{ height: "70vh", overflowY: "scroll", width: "79vw" }}
          >
            <ListTable
              listArray={listArray}
              setListArray={setListArray}
              rowClicked={rowClicked}
              setRowClicked={setRowClicked}
              selectAll={selectAll}
              setSelectAll={setSelectAll}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              sessionUserId={sessionUserId}
              setLoader={setListCartLoader}
              addTagModal={addTagModal}
              setAddTagModal={setAddTagModal}
            />
          </div>
          {rowClicked ? (
            <ListUserCart
              selectedRows={selectedRows}
              rowClicked={rowClicked}
              setRowClicked={setRowClicked}
              sessionUserId={sessionUserId}
              addTagModal={addTagModal}
              setAddTagModal={setAddTagModal}
              loader={listCartLoader}
              setLoader={setListCartLoader}
            />
          ) : null}
        </div>
      </div>
      <>
        <Modal
          size="mini"
          open={addTagModal.open}
          onClose={() => setAddTagModal({ open: false, obj: {} })}
        >
          <Modal.Content>
            <AddTagNameForm setAddTagModal={setAddTagModal} sessionUserId={sessionUserId} selectedRows={selectedRows} />
          </Modal.Content>
        </Modal>

      </>
    </div>
  );
};

export default ListPage;
