import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getIsCodeSendResponse, getIsSearchedText } from '../home/data/selectors';
import { getSearchedComponentText } from '../home/data/actions';
import { fetchSearchByQuery } from '../search/data/actions';

const SearchComponent = ({ setSearchedText, sessionUserId }) => {

  const [input, setInput] = useState("");

  const inputText = useSelector((state) => getIsSearchedText(state));
  const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleChange = (value) => {
    setInput(value);

  };

  const saveSearchedText = () => {

    dispatch(getSearchedComponentText(input))
    setSearchedText(input)
    let obj = {}
    obj.query = input
    obj.start = "1"
    obj.userid = (sessionUserId && sessionUserId !== undefined && sessionUserId !== null) ? sessionUserId.toString() : "";
    dispatch(fetchSearchByQuery(obj))
    setTimeout(() => {
      navigate("/search")
    }, 700)

  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      saveSearchedText();
    }
  };

  return (
    <div className="input-wrapper">
      <Icon name="search" className='searchIcon' onClick={() => saveSearchedText()} />
      <input
        placeholder="Search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default SearchComponent