import React, { Component } from "react";
import Card from "./../components/Card/Card.jsx";
import CardBody from "./../components/Card/CardBody.jsx";
import Container from "./../components/Grid/GridContainer.jsx";
import API from "../utils/API";

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessages: []
    };
  }

  componentDidMount = () => {
    this.loadStatusMessages();
  };

  componentDidUpdate = prevProps => {
    if (this.props.user.email !== prevProps.user.email) {
      this.loadStatusMessages();
      //   if (this.props.user.email) {
      //     this.setState({ redirect: false });
      //   } else {
      //     this.setState({ redirect: true });
      //   }
    }
  };

  loadStatusMessages = () => {
    const user = this.props.user.email;
    if (user) {
      API.getStatusMessagesForUser(user)
        .then(response => {
          let sortedMessages = response.data.sort((a, b) => {
            if (a.timestamp < b.timestamp) return 1;
            if (a.timestamp > b.timestamp) return -1;
            return 0;
          });
          this.setState({ statusMessages: sortedMessages });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <>
        <Container>
          {/* {this.renderRedirect()} */}
          {this.state.statusMessages.map(status => {
            return (
              <Card style={{ width: "max-content" }} key={status._id}>
                <CardBody>
                  <p>
                    {status.timestamp}: {status.message}{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={status.href}
                    >
                      {status.hrefName}
                    </a>
                  </p>
                </CardBody>
              </Card>
            );
          })}
        </Container>
      </>
    );
  }
}

export default Status;
