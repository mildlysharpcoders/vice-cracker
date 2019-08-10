import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";






class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    // console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  handleButtonClick = event => {
    event.preventDefault();
    console.log("Login Button Clicked");
    let loginInfo = {
      username: this.state.email,
      password: this.state.password
    };
    console.log("Login info sent:", loginInfo);
    API.login(loginInfo)
      .then(response => {
        console.log("Login data returned", response.data);
        this.setState({ email: "", password: "" });
        this.props.updateUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderRedirect = () => {
    if (this.props.user.email) {
      return <Redirect to="/vices" />;
    }
  };


  render() {
  
    
    return (
      
      <Card>
        <CardHeader>VICE CRACKER</CardHeader>
      <CardBody>
      
        {this.renderRedirect()}
        
  
        <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                  labelText="Username"
                  id="float"
                  formControlProps={{
                      fullWidth: true
                  }}
              />
          </GridItem>
          <br />
          <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                  labelText="Password"
                  id="float"
                  formControlProps={{
                      fullWidth: true
                  }}
              />
          </GridItem>
    
          
          <br />
          <Button color="primary" round>Log In</Button>
          <br />
          <Link to="/create">Create New User</Link>
     
        </CardBody>
        </Card>
   
    );
  }
}


export default Login;
