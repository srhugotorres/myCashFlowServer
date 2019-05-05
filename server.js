
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");

const app = express();
const port = process.env.PORT || 4000;
const api = require('./routes/api/index.js');
const apiURL = '/api';

const users = require("./routes/api/users");
const billModel = require('./models/bill');
const spendingModel = require('./models/spending');
const debtModel = require('./models/debt');

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

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes
app.use(apiURL + "/users", users);
app.use(apiURL + '/bill', api(billModel));
app.use(apiURL + '/spending', api(spendingModel));
app.use(apiURL + '/debt', api(debtModel));

app.listen(port, () => console.log(`Server is running on port: ${port}`));

