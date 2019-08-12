import React from "react";

const UserContext = React.createContext({
  user: {},
  loggedIn: false,
  logout: event => {},
  login: event => {}
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
