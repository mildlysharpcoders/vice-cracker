const db = require("../models");

const userController = {
  getAuthenticatedUser: (request, response) => {
    console.log("userController.getAuthenticatedUser", request.user);
    if (request.user) {
      response.json(request.user);
    } else {
      console.log("No authenticated user");
      response.json({ result: "false" });
    }
  },
  login: (request, response) => {
    console.log("UserController.login");
    response.json(request.user);
  },
  logout: (request, response) => {
    console.log("userController.logout");
    request.logout();
    response.send("user logged out");
  },
  create: (request, response) => {
    createUser(request, response);
  }
};

function createUser(request, response) {
  console.log(request.body);
  db.User.create(request.body)
    .then(result => {
      console.log("Created new user: ", result);
      response.json(result);
    })
    .catch(err => {
      console.log(err);
      response.send(err);
    });
}

module.exports = userController;
