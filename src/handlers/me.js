const invalidInputExceptions = ["Username is required", "Password is required", "Incorrect username or password"];

const MeHandler = ({ services }) => (req, res) => {
  const { authorization } = req.headers;  
  return services.User.Check({ AccessToken: authorization.replace("Bearer ", "")})
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

module.exports = MeHandler