import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import Dropdown from "../components/CustomDropdown/CustomDropdown.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Container from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import Header from "./../components/Header/Header"
import Modal from "./../components/modal/index.js"


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      betteroption: "Choose better option",
      limit: "",
      cost: "",
      error: "",
      betteroptions: [],
      redirect: false
    };
  }

  componentDidMount = () => {
    this.loadBetterOptions();
  };

  componentDidUpdate = prevProps => {
    if (this.props.user.email !== prevProps.user.email) {
      if (this.props.user.email) {
        this.setState({ redirect: false });
      } else {
        this.setState({ redirect: true });
      }
    }
  };

  loadBetterOptions = () => {
    API.getBetterOptions()
      .then(response => {
        this.setState({ betteroptions: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  isEmpty = (item, message) => {
    if (!item || !item.trim().length === 0) {
      this.setState({ error: message });
      return true;
    }
    return false;
  };

  validate = () => {
    if (this.isEmpty(this.state.name, "Vice Name must not be blank")) {
      return false;
    }

    if (
      this.isEmpty(
        this.state.betteroption,
        "Healthier Option must not be blank"
      )
    ) {
      return false;
    }

    if (this.isEmpty(this.state.limit, "Consumption Limit must not be blank")) {
      return false;
    }

    if (this.state.limit.startsWith("-")) {
      this.setState({ error: "Consumption Limit must be a positive number" });
      return false;
    }

    if (this.state.limit.indexOf(".") !== -1) {
      this.setState({ error: "Consumption Limit must be a whole number" });
      return false;
    }

    if (this.isEmpty(this.state.cost, "Cost must not be blank")) {
      return false;
    }

    if (this.state.cost.startsWith("-")) {
      this.setState({ error: "Cost must be a positive number" });
      return false;
    }

    this.setState({ error: "" });
    return true;
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.validate()) {
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
            betteroption: "Choose better option",
            limit: "",
            cost: ""
          });
          this.props.history.push("/vices");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleDeleteButtonClick = vice => {
    console.log("Delete Vice Button Clicked for vice:", vice.name);
    API.deleteVice(vice._id)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/Vices" />;
    }
  };

  handleMenuClick = betteroption => {
    this.setState({ betteroption });
  };

  render() {
    return (
      <>
     <Header brand=""/>
      <Container>
        <Card style={{minWidth: "fit-content", margin: "30px" }}>
          {this.renderRedirect()}
          <CardHeader>Create Your Vice</CardHeader>
          <CardBody>
            <Container>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Name Your Vice"
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
            </Container>

            <Container>
              <GridItem xs={12} sm={12} md={12}>
                <Dropdown
                  buttonText={this.state.betteroption}
                  dropdownList={this.state.betteroptions}
                  onClick={this.handleMenuClick}
                  buttonProps={{
                    round: true,
                    color: "info",
                    textShadow: "2px 2px black"
                  }}
                />
              </GridItem>
            </Container>

            <Container>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Consumption"
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
            </Container>

            <Container>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Cost"
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
            </Container>

            <p>{this.state.error}</p>

            <Button
              color="primary"
              round
              type="button"
              className="btn btn-secondary"
              onClick={event => this.handleFormSubmit(event)}
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      
        <GridItem xs={12} sm={12} md={12}>
<Modal />

</GridItem>
      </Container>
      
      </>
    );
  }
}

export default Settings;
