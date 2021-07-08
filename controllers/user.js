require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();
const { SECRET } = process.env;

/////// SIGNUP ROUTE ///////
router.post("/signup", async (req, res) => {
  try {
    // salt password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create user
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});

/////// LOGIN ROUTE ///////
router.post("/login", async (req, res) => {
  try {
    // check if there is a user with that name in the database
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // if password does match return a json web token
        // payload is the username and SECRET will decode it
        const token = jwt.sign({ username }, SECRET);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ error: "PASSWORD DOES NOT MATCH" });
      }
    } else {
      res.status(400).json({ error: "USER DOES NOT EXIST" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
