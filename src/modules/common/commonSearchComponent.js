import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedComponentText } from "../home/data/actions";
import {
  getIsCodeSendResponse,
  getIsSearchedText,
} from "../home/data/selectors";
import { fetchSearchByQuery, fetchViewMoreQuery } from "../search/data/actions";
import SearchIconSvg from "../svg/searchIconSvg"

const CommonSearchComponent = ({ setSearchedText, start, text, setLoader, sessionUserId }) => {
  const [input, setInput] = useState("");
  const [welcomeText, setWelcomeText] = useState("");


  const inputText = useSelector((state) => getIsSearchedText(state));

  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (text !== "") {
      setWelcomeText(text);
    } else {
      setWelcomeText("");
    }
  }, [text]);

  useEffect(() => {
    if (input !== "") {
      setWelcomeText("");
    }
  }, [input]);


  const handleChange = (value) => {
    setInput(value);
  };

  const saveSearchedText = () => {
    dispatch(getSearchedComponentText(input));
    setSearchedText(input);
    let obj = {};
    obj.query = input;
    obj.start = start.toString();
    obj.userid = (sessionUserId && sessionUserId !== undefined && sessionUserId !== null) ? sessionUserId.toString() : "";
    dispatch(fetchSearchByQuery(obj));
    if (setLoader) {
      setLoader({ open: true, msg: "Loading" });

    }
    setTimeout(() => {
      if (window.location.pathname && window.location.pathname !== undefined && window.location.pathname == "/list") {
        navigate("/search")
      }
    }, 700)
  };

  useEffect(() => {
    if (start > 1) {

      dispatch(getSearchedComponentText(text));
      setSearchedText(text);
      let obj = {};
      obj.query = text;
      obj.start = start.toString();
      obj.userid = (sessionUserId && sessionUserId !== undefined && sessionUserId !== null) ? sessionUserId.toString() : "";
      dispatch(fetchViewMoreQuery(obj));
      if (setLoader) {
        setLoader({ open: true, msg: "Loading" });
      }

    }
  }, [start]);


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      saveSearchedText();
    }
  };

  return (
    <div className="common-input-wrapper">
      <div className='input-wrapper-child'>
        <div onClick={() => saveSearchedText()} className="searchSvg">
          <SearchIconSvg />
        </div>
        <input
          placeholder="Search..."
          value={input || welcomeText}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyPress}
          className="common-input"
        />
      </div>
    </div>
  );
};

export default CommonSearchComponent;
