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
   const {id} = req.params
   const post = req.body
   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

   const updatedPost = await Posts.findByIdAndUpdate(id, {...post, id}, {new: true})

   res.status(200).json({
      success: true,
      data: updatedPost
   })
}

export const likePost = async (req, res) => {
   const {id} = req.params
   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

   const post = await Posts.findById(id)
   const updatedPost = await Posts.findByIdAndUpdate(id, {likeCount: post.likeCount + 1},{new:true})

   res.status(200).json(updatedPost)
}

export const deletePost = async (req, res) => {
   const {id} = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

   await Posts.findByIdAndRemove(id)
   res.status(200).json({
      success: true,
      message: "Post deleted"
   })
}