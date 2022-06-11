import axios from "axios"

const url = process.env.REACT_APP_URL + "/posts"

export const getPosts = () => axios.get(url)

