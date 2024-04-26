const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRouter = require("./routes/user");
const {connectMongoDb} = require("./connection")

const app = express();

const PORT = 8000;

// connection
connectMongoDb("mongodb://127.0.0.1:27017/login-users")
.then(()=>{console.log(`mongodb connected`);})

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

// requests 
app.use("/api/users", userRouter)


app.listen(PORT, () => {
  console.log(`server is starting a port ${PORT}`);
});