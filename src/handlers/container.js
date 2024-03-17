const createUserHandlerFactory = require('./create-user');
const loginHandlerFactory = require('./login');

class Container {
  constructor(services) {
    return {
      createUserHandler: createUserHandlerFactory({services}),
      loginHandler: loginHandlerFactory({services})
    }
  }
}

module.exports = Container;