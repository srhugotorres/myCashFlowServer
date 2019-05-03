const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4000;
const apiURL = '/api';

const cors = require('cors');
const app = express();

const api = require('./routes/api');
const billModel = require('./models/bill');
const spendingModel = require('./models/spending')


const dbConnString = 'mongodb://127.0.0.1:27017/mycashflow';

// Connect to MongoDB
mongoose
    .connect(dbConnString, { useNewUrlParser: true })
    .then(() =>
        console.log("MongoDB database connection established successfully")
    )
    .catch(err => console.log(err));


app.use(apiURL + '/bill', api(billModel));
app.use(apiURL + '/spending', api(spendingModel));
    
    
app.listen(port, () => console.log(`Server is running on port: ${port}`));
