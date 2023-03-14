import React from 'react';
import './DropDown.css';


const DropDown = ({setSortOrder}) => {
  const handleChange = (e) => {
    setSortOrder(e.target.value);
  };
 
  return (
    <div>
      <label htmlFor='sortOrder'>Sort By:</label>
      <select name='sortOrder' onChange={handleChange}>
        <option value='Ascending'>Name A-Z</option>
        <option value='Descending'>Name Z-A</option>
        <option value='AreaAscending'>Area Ascending</option>
        <option value='AreaDescending'>Area Descending</option>
      </select>
    </div>
  )
}

export default DropDown;