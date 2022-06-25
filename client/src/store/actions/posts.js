import {
   GET_ALL,
   CREATE,
   UPDATE,
   DELETE,
   POST_LIKE,
   GET_BY_SEARCH,
   START_LOADING,
   END_LOADING, GET_POST
} from '../../constants/actionTypes';
import * as api from "../../api"

export const getPosts = (page) => async (dispatch) => {
   try {
      dispatch({type: START_LOADING,})
      const {data} = await api.getPosts(page);
      dispatch({type: GET_ALL, payload: data});
      dispatch({type: END_LOADING,})
   } catch (err) {
      console.log(err.message);
   }
};

export const getPost = (id) => async (dispatch) => {
   try {
      dispatch({type: START_LOADING,})
      const {data} = await api.getPost(id);
      dispatch({type: GET_POST, payload: data});
      dispatch({type: END_LOADING,})
   } catch (err) {
      console.log(err.message);
   }
};

export const createPost = (post) => async (dispatch) => {
   try {
      dispatch({type: START_LOADING});
      const {data} = await api.createPost(post)
      dispatch({type: CREATE, payload: data})
   } catch (err) {
      console.log(err.message)
   }
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
   try {
      dispatch({type: START_LOADING});
      const {data: {data}} = await api.getPostsBySearch(searchQuery);

      dispatch({type: GET_BY_SEARCH, payload: {data}});
      dispatch({type: END_LOADING});
   } catch (error) {
      console.log(error);
   }
};
export const updatePost = (id, post) => async (dispatch) => {
   try {
      const {data} = await api.updatePost(id, post);
      dispatch({type: UPDATE, payload: data});
   } catch (error) {
      console.log(error.message);
   }
};

export const likePost = (id) => async (dispatch) => {
   try {
      const {data} = await api.likePost(id)
      dispatch({type: POST_LIKE, payload: data});
   } catch (err) {
      console.log(err.message)
   }
}

export const deletePost = (id) => async (dispatch) => {
   try {
      await api.deletePost(id)
      dispatch({type: DELETE, payload: id})
   } catch (err) {
      console.log(err.message)
   }
}