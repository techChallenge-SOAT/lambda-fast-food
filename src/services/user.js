class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  Login({ username, password }) {
    return this.repository.login({ username, password });
  }

  Create({ username, email, password }) {
    return this.repository.create({ username, email, password });
  }

  Check({ AccessToken }) {
    return this.repository.check({ AccessToken });
  }

  RespondToNewPasswordAuthChallenge({ username, newPassword, session }) {
    return this.repository.respondToNewPasswordAuthChallenge({ username, newPassword, session });
  }

  Disable({ username }) {
    return this.repository.disable({ username });
  }
  
}

module.exports = UserService;