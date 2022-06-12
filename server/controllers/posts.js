import mongoose from "mongoose";
import Posts from "../models/posts.js";

export const getPosts = async (req, res) => {
   try {
      const postMessages = await Posts.find()
      res.status(200).json({
         success: true,
         data: postMessages
      })
   } catch (err) {
      res.status(404).json({
         success: false,
         message: err.message
      })
   }

}
export const createPost = async (req, res) => {
   const post = req.body
   const newPost = new Posts(post)
   try {
      await newPost.save()
      res.status(201).json({
         success: true,
         data: newPost
      })
   } catch (err) {
      res.status(409).json({
         success: false,
         message: err.message
      })
   }
}
export const updatePost = async (req, res) => {
   const {id: _id} = req.params
   const post = req.body
   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

   const updatedPost = await Posts.findByIdAndUpdate(_id, {...post,_id}, {new: true})

   res.status(200).json({
      success: true,
      data: updatedPost
   })
}