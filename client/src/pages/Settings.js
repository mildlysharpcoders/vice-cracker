import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import ViceItem from "../components/ViceItem";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import Dropdown from "../components/CustomDropdown/CustomDropdown.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Button from "../components/CustomButtons/Button.jsx";

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
      name: this.state.name.trim(),
      betteroption: this.state.betteroption.trim(),
      limit: this.state.limit.trim(),
      cost: this.state.cost.trim(),
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

  handleIncrementButtonClick = vice => {
    console.log("Increment Vice Button Clicked for vice:", vice);
    API.createViceEvent(vice)
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

  handleMenuClick = betteroption => {
    this.setState({ betteroption });
  };

  render() {
    return (
      <Card>
        {/* {this.renderRedirect()} */}
        <CardHeader>Settings</CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                // type='text'
                labelText="Name Your Vice"
                // name='name'
                // value={this.state.name}
                // onChange={this.handleInputChange}
                className="form-control"
                placeholder="Your Vice"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                inputProps={{
                  type: "text",
                  value: this.state.name,
                  name: "name",
                  onChange: event => this.handleInputChange(event)
                }}
              />
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Dropdown
                buttonText={this.state.betteroption}
                dropdownList={["Gym", "Recipe"]}
                onClick={this.handleMenuClick}
              />
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                // type='number'
                labelText="Consumption"
                // name='limit'
                // value={this.state.limit}
                // onChange={this.handleInputChange}
                className="form-control"
                placeholder="Consumption/Week"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                inputProps={{
                  type: "number",
                  value: this.state.limit,
                  name: "limit",
                  onChange: event => this.handleInputChange(event)
                }}
              />
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                // type='number'
                labelText="Cost"
                // name='cost'
                // value={this.state.cost}
                // onChange={this.handleInputChange}
                className="form-control"
                placeholder="Cost"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                inputProps={{
                  type: "number",
                  value: this.state.cost,
                  name: "cost",
                  onChange: event => this.handleInputChange(event)
                }}
              />
            </GridItem>
          </GridContainer>

          <Button
            color="primary"
            round
            type="button"
            className="btn btn-secondary"
            // onClick={this.handleFormSubmit}
            onClick={event => this.handleFormSubmit(event)}
          >
            Submit
          </Button>

          {this.state.vices.map(vice => {
            return (
              <ViceItem
                key={vice.name}
                vice={vice}
                // handleButtonClick={this.handleIncrementButtonClick}
                onClick={event => this.handleIncrementButtonClick(event)}
              />
            );
          })}
        </CardBody>
      </Card>
    );
  }
}

export default Settings;
