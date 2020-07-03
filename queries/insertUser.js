// this creates a new user on the database

// const insertUser = `
//    INSERT INTO users (
//       id,
//       email,
//       \`password\`,
//       created_at
//    )
//    VALUES (?, ?, ?, ?);
// `;
// password is surrounded by escaped backticks \` because it is a MySQL keyword

// new syntax, with this method we just pass an object and the database will use it if all the keys match
const insertUser = `
   INSERT INTO users SET ?;
`;

module.exports = insertUser;
