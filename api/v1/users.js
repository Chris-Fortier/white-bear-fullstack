// The users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const insertUser = require("../../queries/insertUser");
const { toJson, toSafeParse, toHash } = require("../../utils/helpers");

// @route      GET api/v1/users
// @desc       Get a valid user via email and password
// @access     Public
router.get("/", (req, res) => {
   db.query(selectUser("mike@gmail.com", "replace_me"))
      .then((dbRes) => {
         // successful response
         const user = toSafeParse(toJson(dbRes))[0]; // converts the response to a single user object
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         // report error to the user
         console.log(err);
         res.status(400).json(err);
      });
});

// @route      POST api/v1/users (going to post one thing to this list of things)
// @desc       Creat a new user
// @access     Public
router.post("/", async (req, res) => {
   const user = {
      id: req.body.id,
      email: req.body.email,
      password: await toHash(req.body.password), // hash the password (npm install bcrypt)
      created_at: req.body.createdAt,
   };

   db.query(insertUser, user)
      .then((dbRes) => {
         console.log("dbRes", dbRes);
         // return the user data to we can put in redux store
      })
      .catch((err) => {
         console.log("err", err);
         // return a 400 error to user
      });
}); // this is an express function

module.exports = router;
