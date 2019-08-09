import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import ViceItem from "../components/ViceItem";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      betteroption: "Recipe",
      limit: "",
      cost: "",
      vices: []
    };
    console.log(this.props);
  }

  componentDidMount = () => {
    this.loadVices();
  };

  loadVices = () => {
    const user = this.props.user.email;
    if (user) {
      API.getVicesForUser(user)
        .then(response => {
          console.log("Vices returned:", response.data);
          this.setState({ vices: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
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

    API.createVice(vice)
      .then(response => {
        console.log("Vice Created:", response.data);
        this.setState({
          name: "",
          betteroption: "",
          limit: "",
          cost: ""
        });
        this.loadVices();
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDeleteButtonClick = vice => {
    console.log("Delete Vice Button Clicked for vice:", vice.name);
    API.deleteVice(vice._id)
      .then(response => {
        console.log(response.data);
        this.loadVices();
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
                <div>
                  <select name="betteroption" value={this.state.betteroption} onChange={this.handleInputChange}>
                    <option value="Recipe">Recipe</option>
                    <option value="Gym">Gym</option>
                  </select>
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
        {this.state.vices.map(vice => {
          return (
            <ViceItem
              key={vice.name}
              vice={vice}
              handleButtonClick={this.handleDeleteButtonClick}
            />
          );
        })}
      </>
    );
  }
}

export default Settings;
