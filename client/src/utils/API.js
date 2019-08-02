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
  },

  getVicesForUser: function(email) {
    return axios.get(`/api/vice/${email}`);
  },
  
  createVice: function(vice) {
    return axios.post("/api/vice", vice);
  },

  updateVice: function(vice) {
    return axios.put("/api/vice", vice);
  },

  deleteVice: function(vice) {
    return axios.delete("/api/vice", vice);
  },

  createViceEvent: function(vice) {
    return axios.post("/api/vice/event", vice);
  }
}