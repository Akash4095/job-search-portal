import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react';

const SearchComponent = () => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);

  };

  return (
    <div className="input-wrapper">
      <Icon name="search" />
      <input
        placeholder="Search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

export default SearchComponent