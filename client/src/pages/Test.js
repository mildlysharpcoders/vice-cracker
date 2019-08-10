import React, { Component } from "react";
import API from "../utils/API";

class Test extends Component {
  handleSendEntry = () => {
      API.sendEntryReminders();
  };

  handleSendStatus = () => {
      API.sendStatusUpdates();
  };

  render() {
    return (
      <>
        <div>
          <button type="button" onClick={this.handleSendEntry}>
            Send Entry Reminders
          </button>
        </div>
        <br />
        <div>
          <button type="button" onClick={this.handleSendStatus}>
            Send Status Updates
          </button>
        </div>
      </>
    );
  }
}

export default Test;
