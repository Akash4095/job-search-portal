import React from 'react'
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'

class Example extends React.Component {
  constructor() {
    super()
    this.state = {tags: []}
  }

  handleChange = (tags) => {
    this.setState({tags})
  }

  render() {
    return <TagsInput value={this.state.tags} onChange={this.handleChange} />
  }
}
// import React, { useState } from "react";
// import { TagsInput } from "react-tag-input-component";

// const Example = () => {
//   const [selected, setSelected] = useState(["papaya"]);

//   return (
//     <div>
//       <h1>Add Fruits</h1>
//       <pre>{JSON.stringify(selected)}</pre>
//       <TagsInput
//         value={selected}
//         onChange={setSelected}
//         name="fruits"
//         placeHolder="enter fruits"
//       />
//       <em>press enter or comma to add new tag</em>
//     </div>
//   );
// };

// export default Example;