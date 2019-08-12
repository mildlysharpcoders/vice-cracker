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

  getAllUsers: (request, response) => {
    db.User.find({})
      .then(result => {
        console.log("All users: ", result);
        response.json(result);
      })
      .catch(err => {
        console.log(err);
        response.send(err);
      });
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
    db.User.findOne({ email: request.body.email })
      .then(result => {
        if (result && result.email) {
          console.log("Found existing user: ", result.email);
          response.sendStatus(409);
        } else {
          db.User.create(request.body)
            .then(result => {
              console.log("Created new user: ", result.email);
              response.sendStatus(201);
            })
            .catch(err => {
              console.log(err);
              response.send(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
        response.send(err);
      });
  },

  createDefaultUser: () => {
    createDefault();
  }
};

function createDefault() {
  db.User.findOne({ email: "admin@admin.com" }).then(result => {
    if (!result) {
      let defaultUser = {
        password: "admin",
        email: "admin@admin.com",
        firstname: "Admin",
        lastname: "Adminator",
        address: "1234 Admin St.",
        city: "Adminville",
        state: "IL",
        zip: "11111"
      };
      db.User.create(defaultUser).then(result => {
        console.log("Create default Admin user");
      });
    } else {
      console.log("Admin User present");
    }
  });
}

module.exports = userController;
