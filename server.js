const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const dotenv=require('dotenv');
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let app = express();
app.use(cors());
// app.use(express.static('uploads'))
app.use("/uploads", express.static("uploads"));

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNO: Number,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/signup", upload.single("profilePic"), async (request, response) => {
  console.log(request.body);
  console.log(request.file.path);

  try {
    let newUser = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      age: request.body.age,
      email: request.body.email,
      password: request.body.password,
      mobileNo: request.body.mobileNO,
      profilePic: request.file.path,
    });
    await User.insertMany([newUser]);
    response.json({ status: "success", msg: "User created successfully" });
  } catch (error) {
    response.json({
      status: "Failure",
      msg: "Unable to create account",
      err: error,
    });
  }
});

app.post("/login", upload.none(), async (request, response) => {
  console.log(request.body);

  let userDetails = await User.find().and({ email: request.body.email });

  if (userDetails.length > 0) {
    if (userDetails[0].password == request.body.password) {
      let userDataToSend = {
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        age: userDetails[0].age,
        email: userDetails[0].email,
        mobileNO: userDetails[0].mobileNO,
        profilePic: userDetails[0].profilePic,
      };

      response.json({ status: "Success", data: userDataToSend });
    } else {
      response.json({ status: "Failure", msg: "invalid password" });
    }
  } else {
    response.json({ status: "Failure", msg: "user doesnot exist" });
  }
});

app.listen(process.env.port, () => {
  console.log("port number is 1357");
});

let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.mdbUrl);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB");
  }
};

connectToMDB();
