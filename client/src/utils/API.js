import axios from "axios";

export default {
  getAuthenticatedUser: function() {
    return axios.get("/api/user/getAuthenticatedUser");
  },

  createUser: function(user) {
    return axios.post("/api/user/create", user);
  },

  login: function(loginInfo) {
    return axios.post("/api/user/login", loginInfo);
  },

  logout: function() {
    return axios.post("/api/user/logout", {});
  }

};
