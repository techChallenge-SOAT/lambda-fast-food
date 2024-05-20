const createUserHandlerFactory = require('./create-user');
const loginHandlerFactory = require('./login');
const meHandlerFactory = require("./me");
const RespondToNewPasswordAuthChallengeHandlerFactory = require('./respond-to-auth-challenge');
class Container {
  constructor(services) {
    return {
      createUserHandler: createUserHandlerFactory({services}),
      loginHandler: loginHandlerFactory({services}),
      meHandler: meHandlerFactory({services}),
      respondToNewPasswordAuthChallengeHandler: RespondToNewPasswordAuthChallengeHandlerFactory({services})
      
    }
  }
}

module.exports = Container;