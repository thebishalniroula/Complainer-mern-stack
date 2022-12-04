const { validateNewUser } = require("../utils/validation");
const User = require("../models/User");

async function userController(req, res) {
  const { value, error } = validateNewUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email already registered.");
  user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("Username already registered.");
  user = new User(req.body);
  await user.save();
  res
    .status(200)
    .send({ id: user._id, username: user.username, email: user.email });
}
module.exports = userController;
