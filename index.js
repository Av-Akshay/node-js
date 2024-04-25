const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const users = require("./MOCK_DATA.json");
const { type } = require("os");
const { error } = require("console");

const app = express();

const PORT = 8000;

// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/login-users")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(`mongodb connection error ${error}`);
  });

//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  jobTitle: {
    type: String,
    require: true,
  },
},{timestamps:true});


const User = mongoose.model("user", userSchema);

//body parser
app.use(bodyParser.urlencoded({ extended: false }));



app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log(body);
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({ msg: "All fields are require..." });
  }
     await User.create({ 
        firstName:body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
      });
      return res.status(200).json({msg: "user add successfully"});
});

app.listen(PORT, () => {
  console.log(`server is starting a port ${PORT}`);
});

app.get("/api/users", async(req,res)=>{
    const allUsers = await User.find({});
    const html =`
    <ul>
    ${ allUsers.map((item)=>`<li>${item.firstName}.</li>`
    ).join("")}
    </ul>
    `;

    res.json(allUsers)
    // res.send(html);
})

app.get("/api/users/:id",async(req,res)=>{
    const user = await User.findById(req.params.id);
 if(!user) return res.status(404).json({error:"user not found"});
 return res.json(user);
});

app.patch("/api/users/:id", async(req,res)=>{
    const {gender} = req.body;
    await User.findByIdAndUpdate(req.params.id,{gender:gender});
    res.json({msg:"success"})

})
app.delete("/api/users/:id", async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({msg:"success"})
})