const express = require("express");
const app = express();
const path = require("path");
var cors = require("cors");

app.use(cors());
app.use(express.json());

// res means response

// need one of these for every url route
app.use("/api/v1/users", require("./api/v1/users")); // the route and then the file
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards")); // the route and then the file
app.use("/api/v1/queue", require("./api/v1/queue")); // the route and then the file

// if none of the routes are hit, use what's in the build folder
app.use(express.static("client/build"));
app.get("*", (req, res) => {
   // "*" is a wildcard
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); // __dirname means present directory
});

const port = process.env.PORT || 3045; // use the variable we have for the port or a default port of 3045
app.listen(port, () =>
   console.log(`Server running at listening at http://localhost:${port}`)
);

// go to http://localhost:3045/api/v1/users to see the user object
