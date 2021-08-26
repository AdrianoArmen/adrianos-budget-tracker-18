//Imnport libraries
const express = require("express");
const mongoose = require("mongoose");

//Port defined
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes required
app.use(require("./routes"));

app.use(express.static("public"));

//Mongo Mongoose local host connection - URI used to connect Apollo server
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
