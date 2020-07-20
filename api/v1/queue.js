// The queue resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectQueue = require("../../queries/selectQueue");
const validateJwt = require("../../utils/validateJWT");

// @route      GET api/v1/queue
// @desc       Get all memory cards for a user that are queued to occur next
// @access     Private
// test:
router.get("/", validateJwt, (req, res) => {
   const userId = req.user.id; // got the user id from the validateJwt

   // https://www.npmjs.com/package/mysql#escaping-query-values
   db.query(selectQueue, userId)
      .then((memoryCards) => {
         const camelCaseMemoryCards = memoryCards.map((memoryCard) => {
            return {
               id: memoryCard.id,
               imagery: memoryCard.imagery,
               answer: memoryCard.answer,
               userId: memoryCard.user_id,
               createdAt: memoryCard.created_at,
               nextAttemptAt: memoryCard.next_attempt_at,
               lastAttemptAt: memoryCard.last_attempt_at,
               totalSuccessfulAttempts: memoryCard.total_successful_attempts,
               level: memoryCard.level,
            };
         });
         return res.status(200).json(camelCaseMemoryCards);
      })
      .catch((err) => {
         // report error
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
