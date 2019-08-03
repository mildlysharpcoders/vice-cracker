import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import selectVice from "../components/viceSelector";

render () {
 
    return (
        <Container fluid>
        <Row>
        <Col size="m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <selectVice />
              <br />

              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>

            <div className="card-action">
            <a className="waves-effect waves-teal btn-flat">Delete Vice</a>
              
            </div>
          </div>
    </Col>
     
      </Row>
      </Container>
    )
}