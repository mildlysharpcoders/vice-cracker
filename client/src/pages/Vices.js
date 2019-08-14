import React, { Component } from "react";
// import { Col, Row, Container } from "../components/Grid";
import Nav from "../components/Nav";
import API from "../utils/API";
import { Redirect, Link } from "react-router-dom";
import ViceItem from "../components/ViceItem";

class Vices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vices: []
    };
  }

  componentDidMount = () => {
    this.loadVices();
  };

  loadVices = () => {
    const user = this.props.user.email;
    if (user) {
      API.getVicesForUser(user)
        .then(response => {
          console.log(response.data.length, "vices returned");
          this.setState({ vices: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  renderRedirect = () => {
    if (!this.props.user || !this.props.user.email) {
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

  handleButtonClick = vice => {
    console.log("Increment Vice Button Clicked for vice:", vice.name);
    API.createViceEvent(vice)
      .then(response => {
        console.log(response.data);
        this.loadVices();
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
        {this.state.vices.map(vice => {
          return (
            <ViceItem
              key={vice.name}
              vice={vice}
              handleButtonClick={this.handleButtonClick}
            />
          );
        })}
        <Link to="/settings">Settings</Link>
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