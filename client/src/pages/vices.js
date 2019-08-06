import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import SelectVice from "../components/viceSelector";
import Nav from "./../components/Nav";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

class Vices extends Component {
  constructor(props) {
    super(props);
  }

  renderRedirect = () => {
    console.log("Vice props renderRedirect: ", this.props);
    if (!this.props.user.email) {
      return <Redirect to="/" />;
    }
    // return <p>HI</p>;
  };

  render() {
    return (
      <>
        {this.renderRedirect()}
        <div>
          <Nav />
        </div>
        <Container fluid>
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
        </Container>
      </>
    );
  }
}

export default Vices;
