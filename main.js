const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const post = require("./routes/post");
const user = require("./routes/user");

const app = express();
const port = process.env.port || 3031;
const db_name = "js-bootcamp";

// Set up middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up routes
app.use("/api/post", post)
app.use("/api/user", user)

app.listen(port, () => {
  console.log("Server is listening");
});


// mongodb://localhost:27017/db_name
// Connect to DB
mongoose.connect(`mongodb://localhost:27017/${db_name}`, { useNewUrlParser: true }, (err) => {
  if (err) return console.log(err, "error")

  console.log("Connected successfully");
});
