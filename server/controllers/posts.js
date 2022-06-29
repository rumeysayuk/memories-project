import mongoose from "mongoose";
import Posts from "../models/posts.js";

export const getPost = async (req, res) => {
   const {id} = req.params
   try {
      const post = await Posts.findById(id)
      res.status(200).json(post)
   } catch (err) {
      res.status(404).json({message: err.message})
   }
}

export const getPosts = async (req, res) => {
   const {page} = req.query
   try {
      const LIMIT = 8
      const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page
      const total = await Posts.countDocuments({})

      const posts = await Posts.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)
      res.status(200).json({currentPage: Number(page), data: posts, numberOfPage: Math.ceil(total / LIMIT)})
   } catch (err) {
      res.status(404).json({message: err.message})
   }
}

export const getPostsBySearch = async (req, res) => {
   const {searchQuery, tags} = req.query;
   try {
      const filter = {$or: []}
      if (!!searchQuery) filter.$or.push({title: new RegExp(searchQuery, "i")})
      if (tags?.length > 0) filter.$or.push({tags: {$in: tags.split(',')}})
      const posts = await Posts.find(filter.$or?.length > 0 ? filter : {});
      return res.json({data: posts});
   } catch (error) {
      res.status(404).json({message: error.message});
   }
}

export const createPost = async (req, res) => {
   const post = req.body
   const newPost = new Posts({...post, creator: req.userId, createdAt: new Date().toISOString()})
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
   if (!req.userId) return res.json({message: "Unauthorized"})
   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

   const post = await Posts.findById(id)

   const index = post.likes.findIndex((id) => id === String(req.userId))
   if (index === -1) {
      post.likes.push(req.userId)
   } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId))
   }
   const updatedPost = await Posts.findByIdAndUpdate(id, post, {new: true})

   res.status(200).json(updatedPost)
}

export const commentPost = async (req, res) => {
   const {id} = req.params
   const {value} = req.body

   const post = await Posts.findById(id)
   
   post.comments.push(value)

   const updatedPost = await Posts.findByIdAndUpdate(id, post, {new: true})

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