const db = require("../models");
const bcrypt = require("bcrypt");

const userController = {
  getAuthenticatedUser: (request, response) => {
    if (request.isAuthenticated()) {
      console.log(request.user.email, "is authorized");
      response.json(request.user);
    } else {
      if (request.cookies.email) {
        console.log(request.cookies.email, "is authorized by cookie");
        response.json({ email: request.cookies.email });
      } else {
        console.log("No authenticated user");
        response.sendStatus(401);
      }
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
    if (request.user) {
      response.cookie("email", request.user.email);
      response.json(request.user);
    }
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
          bcrypt.hash(request.body.password, 10, (err, hash) => {
            if (err) {
              console.log(err);
              response.send(500);
            } else {
              request.body.password = hash;
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
  },

  whackUsers: (request, response) => {
    console.log("Whacking User Database!!!");
    db.User.deleteMany({})
      .then(result => {
        response.sendStatus(200);
      })
      .catch(error => {
        console.log(error);
        response.sendStatus(500);
      });
  }
};

function createDefault() {
  bcrypt.hash("password", 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      db.User.findOne({ email: "admin@admin.com" }).then(result => {
        if (!result) {
          let defaultUser = {
            password: hash,
            email: "admin@admin.com",
            firstname: "Admin",
            lastname: "Adminator",
            address: "1234 Admin St.",
            city: "Adminville",
            state: "IL",
            zip: "11111"
          };
          db.User.create(defaultUser).then(result => {
            console.log("Created default admin@admin.com user");
          });
        } else {
          console.log("admin@admin.com User present");
        }
      });
    }
  });
}

module.exports = userController;
