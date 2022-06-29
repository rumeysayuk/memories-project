import {
   GET_ALL,
   CREATE,
   UPDATE,
   DELETE,
   POST_LIKE,
   GET_BY_SEARCH,
   START_LOADING,
   END_LOADING, GET_POST, COMMENT
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

export const createPost = (post, history) => async (dispatch) => {
   try {
      dispatch({type: START_LOADING});
      const {data} = await api.createPost(post)
      history.push(`/posts/${data.data._id}`);
      dispatch({type: CREATE, payload: data.data})
   } catch (err) {
      console.log(err.message)
   }
}

export const commentPost = (value, id) => async (dispatch) => {
   try {
      const {data} = await api.comment(value, id)
      dispatch({type: COMMENT, payload: data});

      return data.comments
   } catch (err) {
      console.log(err.message)
   }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
   try {
      dispatch({type: START_LOADING});
      await api.getPostsBySearch(searchQuery).then(({data: {data}}) => {
         dispatch({type: GET_BY_SEARCH, payload: {data}});
         dispatch({type: END_LOADING});
      }).catch(err => {
         dispatch({type: END_LOADING});
         console.log(err?.response?.data?.message)
      })
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
   const user = JSON.parse(localStorage.getItem("profile"))
   try {
      const {data} = await api.likePost(id, user?.token)
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