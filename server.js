const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const port = process.env.PORT || 4000;

const cors = require("cors");
const app = express();

const users = require("./routes/api/users");
const bills = require("./routes/api/bills.js");
const debts = require("./routes/api/debts.js");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database configuration
const dbConnString = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(dbConnString, { useNewUrlParser: true })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/contasFaturas", bills);
app.use("/api/dividas", debts);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
