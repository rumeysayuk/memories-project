import axios from 'axios';
import * as queryString from "querystring";

const API = axios.create({baseURL: process.env.REACT_APP_BASE_API_URI})
let url = 'http://localhost:5000/api/posts/search'
API.interceptors.request.use((req) => {
   if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
   }
   return req
})

export const getPost = (id) => API.get(`/posts/${id}`)

export const getPosts = (page) => API.get(`/posts?page=${page}`);

export const createPost = (newPost) => API.post("/posts", newPost)

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const comment = (value, id) => API.post(`/posts/${id}/comment-post`, {value} )

export const likePost = (id) => API.patch(`/posts/${id}/like-post`)

export const getPostsBySearch = (searchQuery) =>
   API.get(`/posts/search-posts?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`)

export const signin = (formData) => API.post(`/auth/signin`, formData)

export const signup = (formData) => API.post(`/auth/signup`, formData)