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
  
}

module.exports = UserService;