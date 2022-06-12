import axios from 'axios';

const url = process.env.REACT_APP_BASE_API_URI;

export const getPosts = () => axios.get(url+"/posts");

export const createPost =(newPost)=>axios.post(url+"/posts",newPost)