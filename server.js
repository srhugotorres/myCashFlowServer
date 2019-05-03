const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const billModel = require('./models/bill');
const spendingModel = require('./models/spending');
const debtModel = require('./models/debt');

const app = express();
const port = process.env.PORT || 4000;
const api = require('./routes/api/index.js');
const apiURL = '/api';
const dbConnString = 'mongodb://127.0.0.1:27017/mycashflow';

// Connect to MongoDB
mongoose
    .connect(dbConnString, { useNewUrlParser: true })
    .then(() =>
        console.log("MongoDB database connection established successfully")
    )
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiURL + '/bill', api(billModel));
app.use(apiURL + '/spending', api(spendingModel));
app.use(apiURL + '/debt', api(debtModel));

app.listen(port, () => console.log(`Listening on port ${port}`));