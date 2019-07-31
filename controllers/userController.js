const db = require("../models");

const userController = {
    getAuthenticatedUser: (request, response) => {
        console.log("Authenticated User", request.user);
        response.json(request.user);
    },
    login: (request, response) => {
        console.log("UserController.login");
        console.log(response);
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
    console.log(request.body);
    db.User.create(request.body)
    .then(result => {
      console.log("Created new user: ", result);
      response.json(result);
    })
    .catch(err => {
      console.log(err);
      response.send(err);
    })
}

module.exports = userController;