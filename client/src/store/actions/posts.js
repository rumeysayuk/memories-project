import {GET_ALL, CREATE, UPDATE, DELETE} from '../../constants/actionTypes';
import * as api from "../../api"

export const getPosts = () => async (dispatch) => {
   try {
      const {data} = await api.getPosts();
      dispatch({type: GET_ALL, payload: data});
   } catch (err) {
      console.log(err.message);
   }
};

export const createPost = (post) => async (dispatch) => {
   try {
      const {data} = await api.createPost(post)
      dispatch({type: CREATE, payload: data})
   } catch (err) {
      console.log(err.message)
   }
}
export const updatePost = (id, post) => async (dispatch) => {
   try {
      const {data} = await api.updatePost(id, post);
      dispatch({type: UPDATE, payload: data});
   } catch (error) {
      console.log(error.message);
   }
};

export const deletePost = (id) => async (dispatch) => {
   try {
      await api.deletePost(id)
      dispatch({type: DELETE, payload: id})
   } catch (err) {
      console.log(err.message)
   }
}