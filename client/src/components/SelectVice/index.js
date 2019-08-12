//vices in drop down list to be dynamically generated per user idk how to do/test this yet

import React from 'react';

function SelectVice() {
    return (
   
        <div className="input-field col s12">
        <select>
          <option value="" disabled selected>Choose your option</option>
          <option value="1">Vice One</option>
          <option value="2">Vice Two</option>
          <option value="3">Vice Three</option>
        </select>
        <label>Choose Your Vice
        </label>
      </div>
   
    )
}

export default SelectVice;