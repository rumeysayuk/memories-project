import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   name: {type: String},
   email: {
      type: String
   },
   password: {
      type: String
   },
   createdAt: {
      type: Date,
      default: Date.now()
   }
})

const Users = mongoose.model("Users", userSchema)

export default Users