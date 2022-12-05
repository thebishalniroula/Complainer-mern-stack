const express = require("express");
const authoriseUser = require("../middlewares/auth");
const Complain = require("../models/Complain");
const router = express.Router();

router.use(authoriseUser);

router.post("/", async (req, res) => {
  console.log(req.body);
  const complain = req.body.anonymous
    ? new Complain({ ...req.body, role: req.user.role })
    : new Complain({
        ...req.body,
        submittedBy: req.user.username,
      });

  try {
    await complain.save();
    return res.status(201).send("Complain registered successfully.");
  } catch (error) {
    res.status(500);
  }
});

router.get("/", async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(400).send("Unauthorised request.");
  const complains = await Complain.find();
  res.status(200).send(complains);
});

router.delete("/:id", async (req, res) => {
  if (req.user.role !== "admin") return res.status(400);
  const id = req.params.id;
  const complain = await Complain.findById(id);
  if (!complain)
    return res.status(404).send("Deletion failed. Resource does not exist.");
  try {
    await Complain.findByIdAndDelete(id);
    res.status(204).send("Complain deleted successfully.");
  } catch (error) {
    res.status(500).send("Some error occured deleting the complain.");
  }
});

module.exports = router;
