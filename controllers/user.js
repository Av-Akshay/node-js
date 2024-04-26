const User = require("../models/user")

const handelCreateUser = async (req,res)=>{
    const body = req.body;
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
}

const handleGetAllUsers= async(req, res)=>{
const allUsers = await User.find({});
      const html =`
      <ul>
      ${ allUsers.map((item)=>`<li>${item.firstName}.</li>`
  ).join("")}
      </ul>
      `;
  
      // res.send(html);
      res.json(allUsers)
    

};

const getUserById= async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"user not found"});
 return res.json(user);
};

const handelUpdateUserById= async(req,res)=>{
    const {gender} = req.body;
    await User.findByIdAndUpdate(req.params.id,{gender:gender});
    res.json({msg:"success"})
};

const handelDeleteUser = async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({msg:"success"})
}

module.exports = {
    handelCreateUser,
    handleGetAllUsers,
    handelUpdateUserById,
    getUserById,
    handelDeleteUser
}