const invalidInputExceptions = ["Username already disabled"];

const DisableUserHandlerFactory = ({ services }) => (req, res) => {
  const { username } = req.body;

  return services.User.Disable({ username })
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

module.exports = DisableUserHandlerFactory
