const express = require("express");
const router = express.Router();
const userModel = require("../model/User"); //This is model that saves the data in mongodb

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; //from frontend
  const user = await userModel.findOne({ email });  //returns true or false


  if (user) {
    res.statusMessage = "User already Exists";
    res.status(209).end();
  } 

  else {
    try {
      const newUser = new userModel({ name, email, password });
      res.status(200).send("Regitered Successfully");
      newUser.save();       //Saving data in MongoDB
    } catch (err) {
      res.status(400).send("Unable to Register ");
    }
  }

});

router.post("/login", async (req, res) => {
  const { email, password } = req.body; //from frontend
  const user = await userModel.findOne({ email }); //finding in the schema of the database

  if (user) {
    if (user.password === password) {
      res.status(200).send("Login Successfully");
    } 
    else {
      res.status(401).send("Password Wrong");
    }
  } 
  else {
    res.statusMessage = "User not found";
    res.status(204).end();
  }
});
module.exports = router;
