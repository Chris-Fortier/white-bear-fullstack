// The memory-cards resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards"); // change this

// @route      GET api/v1/memory-cards (http://localhost:3045/api/v1/memory-cards)  // change this
// @desc       Get all memory cards for a user by search term and order
// @access     Public
router.get("/", (req, res) => {
   // change this
   db.query(
      selectAllCards(
         "6eb4cf5f-f8d8-4e7c-9663-764438da6e18",
         "saw",
         "`memory_cards`.`created_at` DESC"
      )
   )
      .then((dbRes) => {
         // successful response
         console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         // report error
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
