const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_models"); //..to get the models from parent directory

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res
        .status(503)
        .send("You don't have permission to create a new owner");
    }

    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  });
}

router.get("/", (req, res) => {
  res.send("Owners route working");
});

module.exports = router;
