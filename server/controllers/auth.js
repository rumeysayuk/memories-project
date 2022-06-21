import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/users.js"

export const signin = async (req, res) => {
   const {email, password} = req.body
   try {
      const isExistUser = await User.findOne({email})
      if (!isExistUser) return res.status(404).json({message: "User doesn't exist"})
      const isPasswordCorrect = await bcrypt.compare(password, isExistUser.password)
      if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})

      const token = jwt.sign({email: isExistUser.email, id: isExistUser._id}, process.env.SECRET_KEY, {expiresIn: "1h"})

      res.status(200).json({result: isExistUser, token})
   } catch (err) {
      res.status(500).json({message: "Somethings went wrong."})
   }
}

export const signup = async (req, res) => {
   const {email, password, firstName, lastName, confirmPassword} = req.body
   console.log(req.body)
   try {
      const isExistUser = await User.findOne({email})
      if (isExistUser) return res.status(400).json({message: "User already exist! "})
      if (password !== confirmPassword) return res.status(400).json({message: "Passwords don't match !"})
      const hashedPass = await bcrypt.hash(password, 12)
      const result = await User.create({ email, password: hashedPass, name: `${firstName} ${lastName}`})
      const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET_KEY, {expiresIn: "1h"})
      res.status(200).json({result, token})

   } catch (err) {
      res.status(500).json({message: "Somethings went wrong."})
   }
}