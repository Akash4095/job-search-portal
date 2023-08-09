import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedComponentText } from '../home/data/actions';
import { getIsCodeSendResponse, getIsSearchedText } from '../home/data/selectors';
import { fetchSearchByQuery } from '../search/data/actions';

const CommonSearchComponent = ({ setSearchedText }) => {

  const [input, setInput] = useState("");
  const [userId, setUserId] = useState("");

  const inputText = useSelector((state) => getIsSearchedText(state));

  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (
      getLoginAuthRes &&
      getLoginAuthRes !== null &&
      getLoginAuthRes !== undefined
    ) {
      if (getLoginAuthRes.status === "success") {
        if (
          getLoginAuthRes.data &&
          getLoginAuthRes.data !== undefined &&
          getLoginAuthRes.data !== null &&
          getLoginAuthRes.data !== {}
        ) {
          if (getLoginAuthRes.data.id && getLoginAuthRes.data.id !== undefined && getLoginAuthRes.data.id !== null) {
            setUserId(getLoginAuthRes.data.id);
          }

        }
      }
    }
  }, [getLoginAuthRes]);

  const handleChange = (value) => {
    setInput(value);
  };



  const saveSearchedText = () => {
    dispatch(getSearchedComponentText(input))
    setSearchedText(input)
    let obj = {}
    obj.query = input
    obj.start = "1"
    obj.userid = { userId }
    dispatch(fetchSearchByQuery(obj))
    // navigate("/search")
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      saveSearchedText();
    }
  };

  return (
    <div className="common-input-wrapper">
      <Icon name="search" className='searchIcon' onClick={() => saveSearchedText()} />
      <input
        placeholder="Search..."
        value={input || inputText}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default CommonSearchComponent