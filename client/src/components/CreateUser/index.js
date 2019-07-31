import React from "react";

function CreateUser(props) {
    return (
        <>
    <form>
        First name:<br />
        <input type="text" name="firstname" value="Paul" />
        <br />
        Last name:
        <br />
        <input type="text" name="lastname" value="Black" />
        <br />
        <input type="text" name="email" value="pblack67@comcast.net" />
        <br />
        <input type="text" name="password" value="password" />
        <br />
        <input type="text" name="address" value="400 S. LaSalle St." />
        <br />
        <input type="text" name="city" value="Chicago" />
        <br />
        <input type="text" name="state" value="IL" />
        <br />
        <input type="text" name="zip" value="60605" />
        <br />


        <input type="submit" value="Create User" />
    </form> 
        {/* <button type="button" onClick={props.handleButtonClick}>
            Log Me In
        </button> */}
      </>
    );
  }

  export default CreateUser;