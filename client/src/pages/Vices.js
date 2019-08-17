import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import ViceItem from "../components/ViceItem";
import Card from "../components/Card/Card.jsx";
import Container from "../components/Grid/GridContainer.jsx"

// import CardHeader from "../components/Card/CardHeader.jsx";
// import CardBody from "../components/Card/CardBody.jsx";

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

  componentDidUpdate = prevProps => {
    if (this.props.user.email !== prevProps.user.email) {
      this.loadVices();
    }
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
      
      <Container>
        {/* {this.renderRedirect()} */}
        {this.state.vices.map(vice => {
          return (
      
            <div key={vice.name}>
              <ViceItem
                vice={vice}
                handleButtonClick={this.handleButtonClick}
              />
            </div>
        
          );
        })}
      
      </Container>
    );
  }
}

export default Vices;
