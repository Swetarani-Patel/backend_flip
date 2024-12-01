// import UserModel from "../model/userSchema.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// export const userSignup = async (req, res) => {
//   const { name, email, mobile, password } = req.body;
//   try {
//     const isExist = await UserModel.findOne({ email });
//     if (isExist) {
//       return res.status(401).json({ message: "username  already exist" });
//     }
//     const hash = bcrypt.hashSync(password, 5);
//     const newUser = new UserModel({ name, email, mobile, password: hash });
//     await newUser.save();
//     res.status(200).json({ message: newUser });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const authenticatedUser = await UserModel.findOne({ email });
//     if (authenticatedUser) {
//       const match = await bcrypt.compare(password, authenticatedUser.password);
//       if (match) {
//         const token = jwt.sign({ id: authenticatedUser._id }, JWT_SECRET_KEY);
//         return res.status(200).json({ data: authenticatedUser, token });
//       } else {
//         return res.status(401).json({ message: "wrong password" });
//       }
//     } else {
//       return res.status(401).json({ message: "login failed" });
//     }
//   } catch (err) {
//     res.status(500).json("Error", err.message);
//   }
// };


import UserModel from "../model/userSchema.js";  // Import the UserModel
import bcrypt from "bcrypt";  // For password hashing
import jwt from "jsonwebtoken";  // For creating JWT tokens
import dotenv from "dotenv";  // For environment variable configuration

dotenv.config();  // Initialize environment variables
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;  // Get the JWT secret from environment

// User Signup function
export const userSignup = async (req, res) => {
  const { name, email, mobile, password } = req.body;
console.log(name, email, mobile, password)
  try {
    // Validate that all fields are provided
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist) {
      return res.status(401).json({ message: "Email already exists" });
    }

    // Check if username (name) already exists
    const isNameExist = await UserModel.findOne({ name });
    if (isNameExist) {
      return res.status(401).json({ message: "Username already exists" });
    }
 
    // Hash the password before saving
    const hash = bcrypt.hashSync(password, 5);  // Hash password with a salt round of 5

    // Create a new user instance
    const newUser = new UserModel({ name, email, mobile, password: hash });
    await newUser.save();  // Save the user to the database

    // Send success response
    res.status(200).json({ message: "User created successfully", user: newUser });
    
  } catch (err) {
    console.log(err,"eror")
    // Catch duplicate key error for unique fields like name or email
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value entered" });
    }

    // Handle any other errors
    res.status(500).json({ message: "Error occurred while creating user", error: err.message });
  }
};

// User Login function
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const authenticatedUser = await UserModel.findOne({ email });
    if (authenticatedUser) {
      // Compare password with hashed password in the database
      const match = await bcrypt.compare(password, authenticatedUser.password);
      if (match) {
        // Generate JWT token on successful login
        const token = jwt.sign({ id: authenticatedUser._id }, JWT_SECRET_KEY);
        return res.status(200).json({ data: authenticatedUser, token });
      } else {
        return res.status(401).json({ message: "Wrong password" });
      }
    } else {
      return res.status(401).json({ message: "Login failed, user not found" });
    }
  } catch (err) {
    // Catch any errors during login
    res.status(500).json({ message: "Error occurred during login", error: err.message });
  }
};
