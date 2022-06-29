import express from 'express';
import auth from "../middleware/auth.js";
import {getPosts,getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost,commentPost} from '../controllers/posts.js';

const router = express.Router();

router.get('/search-posts', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch("/:id", auth, updatePost)
router.delete("/:id", auth, deletePost)
router.patch("/:id/like-post", auth, likePost)
router.post("/:id/comment-post", auth, commentPost)

export default router;