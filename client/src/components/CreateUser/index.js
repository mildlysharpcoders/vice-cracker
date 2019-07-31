import React from "react";

function CreateUser(props) {
  return (
    <>
      <form>
        First name:
        <input
          type="text"
          name="firstname"
          value={props.user.firstname}
          onChange={props.handleInputChange}
        />
        <br />
        Last name:
        <input
          type="text"
          name="lastname"
          value={props.user.lastname}
          onChange={props.handleInputChange}
        />
        <br />
        Email:
        <input
          type="text"
          name="email"
          value={props.user.email}
          onChange={props.handleInputChange}
        />
        <br />
        Password:
        <input
          type="password"
          name="password"
          value={props.user.password}
          onChange={props.handleInputChange}
        />
        <br />
        Address:
        <input
          type="text"
          name="address"
          value={props.user.address}
          onChange={props.handleInputChange}
        />
        <br />
        City:
        <input
          type="text"
          name="city"
          value={props.user.city}
          onChange={props.handleInputChange}
        />
        <br />
        State:
        <input
          type="text"
          name="state"
          value={props.user.state}
          onChange={props.handleInputChange}
        />
        <br />
        Zip:
        <input
          type="text"
          name="zip"
          value={props.user.zip}
          onChange={props.handleInputChange}
        />
        <br />
        <input
          type="submit"
          value="Create User"
          onClick={props.handleButtonClick}
        />
      </form>
    </>
  );
}

export default CreateUser;
