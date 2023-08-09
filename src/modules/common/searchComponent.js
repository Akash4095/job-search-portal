import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getIsSearchedText } from '../home/data/selectors';
import { getSearchedComponentText } from '../home/data/actions';

const SearchComponent = () => {
  const [input, setInput] = useState("");
  const inputText = useSelector((state) => getIsSearchedText(state));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setInput(value);

  };

  const saveSearchedText = () => {
    dispatch(getSearchedComponentText(input))
    setTimeout(() => {
      navigate("/search")
    }, 700)

  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('enter clicked',)
      saveSearchedText();
    }
  };

  return (
    <div className="input-wrapper">
      <Icon name="search" onClick={() => saveSearchedText()} />
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