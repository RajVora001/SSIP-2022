const mongoose = require("mongoose");

// const imgSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     require: true,
//   },
//   docImg: {
//     type:Object,
   
//   },
// });

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  uniqueID: {
    type: String,
    require: true,
  },
  doc: [Object],
});

module.exports = mongoose.model("formdata", formSchema);
