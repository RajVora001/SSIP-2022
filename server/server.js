//==> Require the Modules
const express = require("express");

const fs = require("fs");
const path=require("path");
const cors=require("cors");
const bodyParser=require("body-parser");


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//==> Connecting Database
require("./DB/conn");

//==> require the image models
const formSchema = require("./models/formSchema");

//==> Routes of the Application
app.use("/api",require("./routes/apiRoutes"));
app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/admin",require("./routes/adminRoutes"));
app.use("/api/application",require("./routes/applicationRoutes"));


//==> Listening On the Dynamic Port s
app.listen(port, () => console.log(`server started on port ${port}`));
