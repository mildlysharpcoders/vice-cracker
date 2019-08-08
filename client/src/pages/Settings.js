import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      betteroption: "",
      limit: "",
      cost: ""
    };
    console.log(this.props);
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    console.log(this.props);
    let vice = {
      email: this.props.user.email,
      name: this.state.name,
      betteroption: this.state.betteroption,
      limit: this.state.limit,
      cost: this.state.cost,
      weekly: [],
      monthly: []
    };

    console.log(vice);

    // Save to db
    API.createVice(vice)
      .then(response => {
        console.log("Vice Created:", response.data);
        this.setState({
          name: "",
          betteroption: "",
          limit: "",
          cost: ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderRedirect = () => {
    if (!this.props.user || !this.props.user.email) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <>
        {this.renderRedirect()}
        <div>
          <h1>Settings</h1>
          <div className="NewVice">
            <div>
              <div className="input-group flex-nowrap">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="addon-wrapping">
                    &#191;
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  className="form-control"
                  placeholder="Your Vice"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
            <br />
            <div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  name="betteroption"
                  value={this.state.betteroption}
                  onChange={this.handleInputChange}
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Better Option
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Health Food Stuff
                  </a>
                  <a className="dropdown-item" href="#">
                    Gym
                  </a>
                  <a className="dropdown-item" href="#">
                    Walk
                  </a>
                </div>
              </div>
            </div>
            <br />
            <div className="input-group flex-nowrap">
              <div className="input-group-prepend">
                <span className="input-group-text" id="addon-wrapping">
                  &#191;
                </span>
              </div>
              <input
                type="number"
                name="limit"
                value={this.state.limit}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Consumption/Week"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <br />
            <div className="input-group flex-nowrap">
              <div className="input-group-prepend">
                <span className="input-group-text" id="addon-wrapping">
                  &#36;
                </span>
              </div>
              <input
                type="number"
                name="cost"
                value={this.state.cost}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Cost"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
          <br />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.handleFormSubmit}
          >
            Submit
          </button>
        </div>
      </>
    );
  }
}

export default Settings;
