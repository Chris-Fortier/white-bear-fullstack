require("dotenv").config();
const mysql = require("mysql"); // import this package
const selectUser = require("./queries/selectUser");
const { toJson, toSafeParse } = require("./utils/helpers");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

// res means response

connection.query(selectUser("mike@gmail.com", "replace_me"), (err, res) => {
   if (err) {
      console.log(err);
   } else {
      const user = toSafeParse(toJson(res))[0]; // converts the response to a single user object
      console.log(user);
   }
});

connection.end();
