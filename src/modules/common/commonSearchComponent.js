import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedComponentText } from '../home/data/actions';
import { getIsSearchedText } from '../home/data/selectors';

const CommonSearchComponent = ({text}) => {

  const [input, setInput] = useState(""); 
  const inputText = useSelector((state) => getIsSearchedText(state));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setInput(value);

  };

  const saveSearchedText = () => {
    dispatch(getSearchedComponentText(input))
    // navigate("/search")
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('enter clicked',)
      saveSearchedText();
    }
  };

  return (
    <div className="common-input-wrapper">
      <Icon name="search" onClick={() => saveSearchedText()} />
      <input
        placeholder="Search..."
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default CommonSearchComponent