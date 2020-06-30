const express = require("express");
const app = express();

// res means response

// need one of these for every url route
app.use("/api/v1/users", require("./api/v1/users")); // the route and then the file
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards")); // the route and then the file
app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 3045; // use the variable we have for the port or a default port of 3045
app.listen(port, () =>
   console.log(`Server running at listening at http://localhost:${port}`)
);

// go to http://localhost:3045/api/v1/users to see the user object
