import React, { Component } from "react";
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
    console.log("loadStatusMessages");
    const user = this.props.user.email;
    if (user) {
      API.getStatusMessagesForUser(user)
        .then(response => {
          console.log(response.data.length, "status messages returned");
          console.log(response.data);
          let sortedMessages = response.data.sort( (a,b) => a.timestamp < b.timestamp);
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
        {/* {this.renderRedirect()} */}

        {this.state.statusMessages.map(status => {
          return (
            <div key={status._id}>
                <p>{status.timestamp}: {status.message} <a target="_blank" href={status.href}>{status.hrefName}</a></p>
            </div>
          );
        })}
      </>
    );
  }
}

export default Status;
