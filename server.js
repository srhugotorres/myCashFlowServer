const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 4000;

const users = require("./routes/api/users");
const incomes = require("./routes/api/incomes");
const spendings = require("./routes/api/spending");
const creditcards = require("./routes/api/creditcards");
const dashboard = require("./routes/api/dashboard");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database configuration
const dbConnString = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(dbConnString, { useNewUrlParser: true, useFindAndModify: false })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/incomes", incomes);
app.use("/api/spendings", spendings);
app.use("/api/creditcards", creditcards);
app.use("/api/dashboard", dashboard);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
