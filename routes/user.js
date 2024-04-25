const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
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
  
  
  router.get("/", async(req,res)=>{
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
  
  router.get("/:id",async(req,res)=>{
      const user = await User.findById(req.params.id);
      if(!user) return res.status(404).json({error:"user not found"});
   return res.json(user);
  });
  
  router.patch("/:id", async(req,res)=>{
      const {gender} = req.body;
      await User.findByIdAndUpdate(req.params.id,{gender:gender});
      res.json({msg:"success"})
      
  })
  router.delete("/:id", async(req,res)=>{
      await User.findByIdAndDelete(req.params.id);
      return res.json({msg:"success"})
  });

  module.exports = router