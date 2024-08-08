const express = require("express");
const UserService = require("./services/user");
const UserRepository = require("./repository/user");
const CognitoToUserAdapter = require("./adapters/cognito");
const AWS = require("aws-sdk");
const Container = require("./handlers/container");
const dotenv = require("dotenv");

class Main {
  init() {
    dotenv.config();
    const app = express();
    app.use(express.urlencoded({extended: true}));
    app.use(express.json())
    const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
    const adapter = new CognitoToUserAdapter({
      CognitoIdentityServiceProvider: new CognitoIdentityServiceProvider(),
    });
    const repository = new UserRepository(adapter);
    const userServiceInstance = new UserService(repository);
    const services = {
      User: userServiceInstance,
    }
    const {
      createUserHandler,
      loginHandler,
      meHandler,
      respondToNewPasswordAuthChallengeHandler,
      disableUserHandler,
    } = new Container(services);

    app.post("/login", loginHandler);

    app.post("/signup", createUserHandler);

    app.get("/me", meHandler)

    app.post("/respond-to-auth-challenge", respondToNewPasswordAuthChallengeHandler);

    app.delete("/disable-user", disableUserHandler);

    return app
  }
}

module.exports = Main;
