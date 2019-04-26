const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 4000;

//Configuraçao do banco de dados
const dbConnString = require("./config/keys").mongoURI;

//Conectar ao MongoDb
mongoose
  .connect(dbConnString, { useNewUrlParser: true })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
