const userRoutes = require('./users');
const express = require("express");
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080; // localhost 8080

app.listen(PORT, () => console.log("Server started"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build')); //Client side code
const appRouter = (app, fs) => {  //Server side code
    userRoutes(app, fs);
};
appRouter(app, fs);