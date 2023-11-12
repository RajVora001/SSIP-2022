const fs = require("fs");
const path = require("path");

//Importing Schema
const appSchema = require("../models/applicationSchema");

const addApplication = async (req, res) => {
  try {
    // console.log("this is body ");
    // console.log(req.body);

    const {
      fname,
      mobileno,
      applicantID,
      service,
      email,
      address,    
      district,
      taluko,
      village,
      subregoffice,
      dob,
      ...newObj
    } = req.body;
    // console.log("new obj");
    // console.log(newObj);

    let filesArray = [];

    // console.log(req.files);

    req.files.forEach((ele) => {
      const file = {
        type: ele.fieldname,
        docImg: {
          data: fs.readFileSync(
            path.join(__dirname, "..", "uploads", ele.filename)
          ),
          contentType: "Image/png",
        },
      };
      fs.unlink(path.join(__dirname, "..", "uploads", ele.filename), (err) => {
        if (err) {
          throw err;
        }
      });
      filesArray.push(file);
    });

    // console.log("this is updated files array");
    // console.log(filesArray);

let tempObj={
  fname: req.body.fname,
  mobileno: req.body.mobileno,

  dob: req.body.dob,
  service: req.body.service,
  email: req.body.email,
  address: req.body.address,
  district: req.body.district,
  taluko: req.body.taluko,
  village: req.body.village,
  subregoffice: req.body.subregoffice,
  remark: "",
  status: "pending",
  adminStatus: "admin1",
  otherDetail: newObj,
  doc: filesArray,
}

    const newSample = new appSchema(tempObj);

    const response = await newSample.save();


let chainRes=await fetch("http://localhost:5000/api/mine",{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(tempObj),
});

console.log("blockchain status"+chainRes.status);

    res.status(201).json({data:response});

    // res.status(200).send("working fine");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({error:err.message});
  }
};
const getAllApplication = async (req, res) => {
  try {
    const { type } = req.body;

    const formRes = await appSchema.find({ status: type }, { service: 1 });

    if (!formRes.length) {
      return res.status(404).json({ error: "You have No application to see" });
    } else {
      return res.status(200).json({ data: formRes });
    }
  } catch (err) {
    res.send(400).json({ error: err.message });
  }
};
const findApplication = async (req, res) => {
  try {
    const { id } = req.body;

    const formRes = await appSchema.find({ _id: id });

    if (!formRes.length) {
      return res.status(404).json({ error: "application not found" });
    } else {
      return res.status(200).json({ data: formRes });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
const getUserApplication = async (req, res) => {
  try {
    const { email } = req.body;

    const formRes = await appSchema.find({ email},{service:1,status:1});

    if (!formRes.length) {
      return res.status(404).json({ error: "You Have Not Submit Any Application" });
    } else {
      return res.status(200).json({ data:formRes});
    }
  } catch (err) {
    console.log("signin err:" + err);
  }
};

const rejectApplication = async (req, res) => {
  try {
    const { id, msg } = req.body;
    const resData = await appSchema.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          remark: msg,
          status: "rejected",
        },
      }
    );

    if (resData._id) {
      return res.status(200).json({ data: true });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const acceptApplication = async (req, res) => {
  try {
    const { id } = req.body;
    const resData = await appSchema.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: "accepted",
        },
      }
    );

    if (resData._id) {
      return res.status(200).json({ data: true });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// export the controllers
module.exports = {
  addApplication,
  getAllApplication,
  findApplication,
  getUserApplication,
  rejectApplication,
  acceptApplication,
};
