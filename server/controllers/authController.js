const { validateExistingUser } = require("../utils/validation");
const User = require("../models/User");

async function authController(req, res) {
  const { value, error } = validateExistingUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ username: req.body.username });
  if (!user || user.role !== req.body.role)
    return res.status(400).send("Invalid username or password.");
  const password = await user.comparePassword(req.body.password, user.password);
  if (password) {
    const token = await user.createToken(user);

    return res
      .status(200)
      .header("Access-Control-Expose-Headers", "X-auth-token")
      .header("X-auth-token", token)
      .send({ role: user.role, username: user.username, email: user.email });
  }
  res.status(400).send("Invalid username or password.");
}

module.exports = authController;
