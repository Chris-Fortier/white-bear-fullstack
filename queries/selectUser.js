// this query returns a user from the database that matches an inputed email and password
module.exports = function selectUser(email, password) {
   return `
      SELECT
         id, email, created_at
      FROM
         users
      WHERE
         email = '${email}'
         AND password = '${password}'
      LIMIT 1;
   `;
};
