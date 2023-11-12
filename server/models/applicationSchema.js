const mongoose = require("mongoose");


const applicationSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
  },
  mobileno: {
    type: Number,
    require: true,
  },

  service:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
  
  },
  address:{
    type:String,
    require:true
  },
  district:{
    type:String,
    require:true
  },
  taluko:{
    type:String,
    require:true
  },
  village:{
    type:String,
    require:true
  },
  subregoffice:{
    type:String,
    require:true
  },
  remark:{
    type:String
  },
  status:{
    type:String,
    require:true,
  },
  adminStatus:{
    type:String,
    require:true
  },
  otherDetail:Object,
  doc: [Object],
});

module.exports = mongoose.model("applicationdata", applicationSchema);
