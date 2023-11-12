const fs = require("fs");
const path = require("path");

//Importing Schema
const formSchema = require("../models/formSchema");
const dynamicSchema = require("../models/applicationSchema");
const userSchema = require("../models/userSchema");

const registerUser = async (req, res) => {
  
console.log(req.body);


  const {
    fname,
    username,
    email,
    mobileno,
    dob,
    gender,
    metaid,
    password,
    cpassword,
  } = req.body;

  if (
    !fname ||
    !username ||
    !email ||
    !mobileno ||
    !dob ||
    !gender ||
    !metaid ||
    !password ||
    !cpassword
  ) {
    return res.status(400).json({ error: "Please fill the Form " });
  }

  try {
    const isExist = await userSchema.find({
      $or: [
        { mobileno: req.body.mobileno },
        { email: req.body.email },
        { username: req.body.username },
      ],
    });

    if (isExist.length > 0) {
      console.log(isExist);    
      return res.status(400).json({ error: "user Alredy Exists" });
    }

    const user = new userSchema(req.body);

    const newuser = await user.save();

    if (newuser) {
      return res.status(200).json({ data: req.body });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userLogin = await userSchema.find({
      $and: [{ email }, { password }],
    });

    if (!userLogin.length) {
      return res.status(400).json({ error: "Invalid Credentials" });
    } else {
      return res.status(200).json({ data: userLogin[0] });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// export the controllers
module.exports = { registerUser, loginUser };
