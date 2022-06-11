import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
   try {
      const postMessages = await postMessage.find()
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
   const newPost = new PostMessage(post)
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