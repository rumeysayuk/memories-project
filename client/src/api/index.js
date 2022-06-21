import axios from 'axios';

const url = process.env.REACT_APP_BASE_API_URI;

export const getPosts = () => axios.get(`${url}/posts`);

export const createPost = (newPost) => axios.post(`${url}/posts`, newPost)

export const updatePost = (id, updatedPost) => axios.patch(`${url}/posts/${id}`, updatedPost)

export const deletePost =(id) => axios.delete(`${url}/posts/${id}`)

export const likePost = (id) => axios.patch(`${url}/posts/${id}/like-post`)

export const signin =(formData) => axios.post(`${url}/auth/signin`,formData)

export const signup =(formData) => axios.post(`${url}/auth/signup`,formData)