const db = require("../models");

const userController = {
    getAuthenticatedUser: (request, response) => {
        console.log("Authenticated User", request.user);
        response.json(request.user);
    },
    login: (request, response) => {
        console.log("UserController.login")
        response.json(request.user);

    },
    logout: (request, response) => {
        request.logout();
        response.send("user logged out");
    },
    create: (request, response) => {
        createUser(request, response);
    }
}

function createUser(request, response) {
    db.User.create(request.body)
    .then(result => {
      console.log("Created new user: ", result);
      response.send("Created User");
    })
    .catch(err => {
      console.log(err);
      response.send(err);
    })
}

module.exports = userController;