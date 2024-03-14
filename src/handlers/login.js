const invalidInputExceptions = ["Username is required", "Password is required", "Incorrect username or password"];

const LoginHandler = ({ services }) => (req, res) => {
  const { username, password } = req.body;
  //not using async/await here because express tends to leak memory when using async/await with lambdas
  return services.User.Login({ username, password })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      if (invalidInputExceptions.includes(error.message)) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    });
};

module.exports = LoginHandler
