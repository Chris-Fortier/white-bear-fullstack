// this creates a new memory card on the database

const insertMemoryCard = `
   INSERT INTO memory_cards SET ?;
`;

module.exports = insertMemoryCard;
