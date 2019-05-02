const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const billAPI = require('./routes/api/billAPI.js')
const debtAPI = require('./routes/api/debtAPI.js')
const PORT = 4000;
const apiURL = '/api';
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/mycashflow', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use(apiURL + '/bill', billAPI);
app.use(apiURL + '/debt', debtAPI);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});