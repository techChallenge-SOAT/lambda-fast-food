const createUserHandlerFactory = require('./create-user');
const loginHandlerFactory = require('./login');
const meHandlerFactory = require("./me");
const RespondToNewPasswordAuthChallengeHandlerFactory = require('./respond-to-auth-challenge');
const disableUserHandlerFactory = require('./disable-user');
class Container {
  constructor(services) {
    return {
      createUserHandler: createUserHandlerFactory({services}),
      loginHandler: loginHandlerFactory({services}),
      meHandler: meHandlerFactory({services}),
      respondToNewPasswordAuthChallengeHandler: RespondToNewPasswordAuthChallengeHandlerFactory({services}),
      disableUserHandler: disableUserHandlerFactory({services}),
    }
  }
}

module.exports = Container;