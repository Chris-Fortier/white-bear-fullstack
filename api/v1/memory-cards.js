// The memory-cards resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards"); // change this
const validateJwt = require("../../utils/validateJWT");

// @route      GET api/v1/memory-cards (http://localhost:3045/api/v1/memory-cards)  // change this
// @desc       Get all memory cards for a user by search term and order
// @access     Private
// test: http://localhost:3045/api/v1/memory-cards?searchTerm=saw&order=memory_cards.created_at%20DESC
router.get("/", validateJwt, (req, res) => {
   console.log(req.query);
   const { searchTerm, order } = req.query; // put the query into some consts (destructoring es6)
   const userId = req.user.id; // got the user id from the validateJwt
   let constructedSearchTerm;
   if (searchTerm === undefined) {
      constructedSearchTerm = "%%";
   } else {
      constructedSearchTerm = `%${searchTerm}%`; // my fix
   }

   // change this
   // db.query(selectAllCards(userId, searchTerm, order))
   // https://www.npmjs.com/package/mysql#escaping-query-values
   db.query(selectAllCards, [
      userId,
      constructedSearchTerm,
      constructedSearchTerm,
      { toSqlString: () => order }, // this will convert order to a SQL string
   ]) // this syntax style prevents hackers
      .then((memoryCards) => {
         // successful response
         // console.log(memoryCards);

         // we need to convert the names of our data from database-side snake_case to camelCase
         // we can also use this to "shape the data" for the client
         // this is where we can "shrink out payload", the data we sent to the client
         // I suspect this is where I am going to convert flattened loadouts to nested
         const camelCaseMemoryCards = memoryCards.map((memoryCard) => {
            // for every memoryCard, return a new object
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

         res.json(camelCaseMemoryCards);
      })
      .catch((err) => {
         // report error
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
