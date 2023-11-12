const express = require("express");
const { upload } = require("../helper/multerConfig");
const { fileUpload,getFiles,dynamicUpload } = require("../controller/apiController");
const router = express.Router();

router.post("/", upload.fields([{
    name: 'doc1', maxCount: 1
  }, {
    name: 'doc2', maxCount: 1
  }]), fileUpload);

router.post("/getform", getFiles);
router.post("/dynamic",upload.array("files"), dynamicUpload);

module.exports = router;