const fs = require("fs");
const path = require("path");

//Importing Schema
const adminSchema=require("../models/adminSchema");

const registerAdmin = async (req, res) => {
  console.log(req.body);
  try {
    const admin = new adminSchema(req.body);

    const newadmin = await admin.save();

    if (newadmin) {
      res.status(200).json({ data: newadmin });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const adminLogin = await adminSchema.find({
          $and: [{ email }, { password }],
        });
    
        if (!adminLogin.length) {
          return res.status(400).json({ error: "Invalid Credentials" });
        } else {
          return res.status(200).json({ data:adminLogin[0]});
        }
      } catch (err) {
       res.status(400).json({error:err.message});
      }
};

// export the controllers
module.exports = { registerAdmin, loginAdmin };
