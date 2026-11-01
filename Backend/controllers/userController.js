const { response, json } = require('express');
const Users = require('../models/userModel')

const jwtKey = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    console.log('Inside Register User');
    console.log(req.body); 
    const { username, email, password } = req.body 

    try {
        const exisstingUser = await Users.findOne({ email })

        if (exisstingUser) {
            res.status(400).json({ message: "User already exists with this emailId" })
        }
        else {
            const newUser = new Users({ username, email, password })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }

    catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message })
    }
}


exports.loginUser = async (req, res) => {
    console.log('Inside Login User');
    console.log(req.body);
    const { email, password } = req.body 

    try {
        const existingUser = await Users.findOne({ email }) 
        console.log(existingUser);

        if (existingUser) {
            if (existingUser.password === password) {
                const token = jwtKey.sign({ userId: existingUser._id, userMail: existingUser.email, role: existingUser.role, subscriber: existingUser.subscriber }, process.env.jwtKey)
                res.status(200).json({ message: "Login Successfull", user: existingUser, token })
                console.log(token);
            }

            else {
                res.status(400).json("Incorrect Password")
            }
        }
        else {
            res.status(400).json("Invalid Credentials!")
        }
    }

    catch (error) {
        res.status(500).json("Error :", error)
    }
}




exports.googleAuth = async (req, res) => {
    console.log("Inside Google Login");
    const { email, password, username, profile } = req.body

    try {
        const existingUser = await Users.findOne({ email })

        if (existingUser) {
            const token = jwtKey.sign({ userId: existingUser._id, userMail: existingUser.email, role: existingUser.role, subscriber: existingUser.subscriber }, process.env.jwtKey)
            console.log(token);
            res.status(200).json({
                message: "Login Successfull",
                user: existingUser, token
            });
        }

        else {
            const newUser = new Users({ email, password, username, profile });
            await newUser.save();

            const token = jwtKey.sign({
                userMail: newUser.email,
                role: newUser.role,
                subscriber: newUser.subscriber
            }, process.env.jwtKey)
            console.log(token);
            res.status(201).json({
                message: "Login Successful",
                user: newUser, token
            })
        }
    }

    catch (error) {
        res.status(500).json("Error :", error)
    }
}



exports.getUsersList = async (req, res) => {
    console.log("Inside User GET");
    try {
        const usersList = await Users.find({ "role": "FilmPulseUser" })
        console.log(usersList);
        res.status(200).json({
            message: "Users Fetched successfully",
            data: usersList
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}






exports.updateProfileWithImage = async (req, res) => {
  try {
    const email = req.payload || req.user?.userMail || req.user?.email;
    const { username, bio, designation } = req.body;

    if (!email) {
      return res.status(400).json({ message: "User email not found in token" });
    }

    let imagePath;

    if (req.file) {
      imagePath = `/uploads/profile-images/${req.file.filename}`;
    }

    const updatedUser = await Users.findOneAndUpdate(
      { email },
      {
        username,
        bio,
        designation,
        ...(imagePath && { profile: imagePath })
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error updating profile", error: error.message });
  }
};
