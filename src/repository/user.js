class UserRepository {
  constructor(userAdapter) {
    this.adapter = userAdapter;
  }

  async create({ username, email, password }) {
    if (!username) {
      throw new Error("Username is required");
    }
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    return this.adapter.create({ username, email, password });
  }

  async login({ username, password }) {
    if (!username) {
      throw new Error("Username is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    return this.adapter.login({ username, password });
  }
}

module.exports = UserRepository;
