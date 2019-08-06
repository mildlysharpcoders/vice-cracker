import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import SelectVice from "../components/viceSelector";
import Nav from "./../components/Nav";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

class Vices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      betteroption: "",
      limit: "",
      cost: "",
      weekly: [],
      monthly: []
    };
   }

  renderRedirect = () => {
    // console.log("Vice props renderRedirect: ", this.props);
    if (!this.props.user.email) {
      return <Redirect to="/" />;
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    // console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  handleButtonClick = event => {
    event.preventDefault();
    console.log("Create Vice Button Clicked");
    console.log(this.state);
    this.state.email = this.props.user.email;
    API.createVice(this.state)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        {this.renderRedirect()}
        <div>
          <Nav />
        </div>
        <form>
          Vice Name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <br />
          Better Option:
          <input
            type="text"
            name="betteroption"
            value={this.state.betteroption}
            onChange={this.handleInputChange}
          />
          <br />
          Weekly Consumption Limit:
          <input
            type="text"
            name="limit"
            value={this.state.limit}
            onChange={this.handleInputChange}
          />
          <br />
          Unit Cost:
          <input
            type="text"
            name="cost"
            value={this.state.cost}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="submit"
            value="Create Vice"
            onClick={this.handleButtonClick}
          />
        </form>
        {/* <Container fluid>
          <Row>
            <Col size="m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <SelectVice />
                  <br />
                  <br />
                  <p>
                    I am a very simple card. I am good at containing small bits
                    of information. I am convenient because I require little
                    markup to use effectively.
                  </p>
                </div>
                <a className="btn-floating halfway-fab waves-effect waves-light red">
                  <i className="material-icons">add</i>
                </a>
                <div className="card-action">
                  <a className="waves-effect waves-teal btn-flat">
                    Delete Vice
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container> */}
      </>
    );
  }
}

export default Vices;
