const invalidInputExceptions = [
  "Username is required",
  "Password is required",
  "Email is required",
  "Invalid Email",
  "Password did not conform with password policy: Password must have uppercase characters",
];


const RespondToNewPasswordAuthChallengeHandlerFactory = ({services}) => (req, res) => {
  const { username, newPassword, session } = req.body;
  //not using async/await here because express tends to leak memory when using async/await with lambdas
  return services.User.RespondToNewPasswordAuthChallenge({ username, newPassword, session })
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

module.exports = RespondToNewPasswordAuthChallengeHandlerFactory
