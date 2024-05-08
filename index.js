const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require("path");
const fileRouter = require("./routes/file");
const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' })

//disk storage
const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, "./uploads")
  },
  filename:(req,file,cb)=>{
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})


const upload = multer({storage})

//variables
const app = express();
const PORT = 8000;

// connection
// connectMongoDb("mongodb://127.0.0.1:27017/login-users")
// .then(()=>{console.log(`mongodb connected`);})

// middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


//body parser
app.use(bodyParser.urlencoded({ extended: false }));


// requests 
app.use("/",upload.single("profileImage") ,fileRouter);

// listen
app.listen(PORT, () => {
  console.log(`server is starting a port ${PORT}`);
});