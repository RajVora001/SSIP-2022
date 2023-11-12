const fs = require("fs");
const path = require("path");
const formSchema = require("../models/formSchema");

const dynamicSchema = require("../models/applicationSchema");

const fileUpload = async (req, res, next) => {
  try {
   
    let filesArray = [];
    
    for (const key in req.files) {
      const mapObj = req.files[key][0];

      console.log(mapObj);

      const file = {
        type: mapObj.fieldname,

        docImg: {
          data: fs.readFileSync( path.join(__dirname, "..", "uploads", mapObj.filename)  ),
          contentType: "Image/png",
        },
      };
      filesArray.push(file);
    }

    console.log("this is updated files array");
    console.log(filesArray);

    const newSample = new formSchema({
      name: req.body.name,
      mobile: req.body.mobile,
      uniqueID: req.body.uniqueID,
      doc: filesArray,
    });

   const response = await newSample.save();

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

const getFiles=async (req,res)=>{
try{

  console.log("body :"+ req.body.id);

const searchItem=await dynamicSchema.find({uniqueID:req.body.id})

console.log(searchItem);

res.status(200).send(searchItem);

}catch(err){
  res.status(400).send(err.message);
}
}



const dynamicUpload = async (req, res, next) => {
  try {
   
    
console.log("this is body ");
console.log(req.body);

const {name,mobile,uniqueID,...newObj}=req.body;
console.log("new obj");
console.log(newObj);

    let filesArray = [];
    
// console.log(req.files);

req.files.forEach((ele)=>{
  const file = {
    type: ele.fieldname,
    docImg: {
      data: fs.readFileSync( path.join(__dirname, "..", "uploads", ele.filename)  ),
      contentType: "Image/png",
    },
  };
  fs.unlink(path.join(__dirname, "..", "uploads", ele.filename), (err) => {
    if (err) {
        throw err;
    }});
  filesArray.push(file);
})


    console.log("this is updated files array");
    console.log(filesArray);


    const newSample = new dynamicSchema({
      name: req.body.name,
      mobile: req.body.mobile,
      uniqueID: req.body.uniqueID,
      otherDetail:newObj,
      doc: filesArray,
    });

   const response = await newSample.save();

    res.status(200).send(response);


    // res.status(200).send("working fine");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};







module.exports = { fileUpload ,getFiles,dynamicUpload};
