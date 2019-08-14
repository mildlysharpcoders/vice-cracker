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

  whackUsers: function() {
    return axios.get("/api/user/whack");
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

  deleteVice: function(id) {
    return axios.delete("/api/vice/" + id);
  },

  createViceEvent: function(vice) {
    return axios.post("/api/vice/event", vice);
  },

  getBetterOptions: function() {
    return axios.get("/api/vice/getbetteroptions");
  },

  sendEntryReminders: function() {
    return axios.get("/api/reminder/entry");
  },

  sendStatusUpdates: function() {
    return axios.get("/api/reminder/status");
  }
};
