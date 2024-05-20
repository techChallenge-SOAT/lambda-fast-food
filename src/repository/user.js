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
  async check({ AccessToken }) {
    if (!AccessToken) {
      throw new Error("AccessToken is required");
    }
    return this.adapter.check({ AccessToken });
  }
  async respondToNewPasswordAuthChallenge({ username, newPassword, session }) {
    if (!username) {
      throw new Error("Username is required");
    }
    if (!newPassword) {
      throw new Error("NewPassword is required");
    }
    if (!session) {
      throw new Error("Session is required");
    }
    return this.adapter.respondToNewPasswordAuthChallenge({ username, newPassword, session });
  }
}

module.exports = UserRepository;
