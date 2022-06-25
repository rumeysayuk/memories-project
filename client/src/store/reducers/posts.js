import {
   GET_ALL,
   CREATE,
   UPDATE,
   DELETE,
   POST_LIKE,
   GET_BY_SEARCH,
   START_LOADING,
   END_LOADING,
   GET_POST
} from '../../constants/actionTypes';

export default (state = {isLoading: true, posts: []}, action) => {
   switch (action.type) {
      case START_LOADING:
         return {...state, isLoading: true}
      case END_LOADING:
         return {...state, isLoading: false}
      case GET_ALL:
         return {
            ...state, posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages
         };
      case GET_POST:
         return {...state, post: action.payload};
      case GET_BY_SEARCH:
         return {...state, posts: action.payload};
      case POST_LIKE:
         return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
      case CREATE:
         return { ...state, posts: [...state.posts, action.payload] };
      case UPDATE:
         return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
      case DELETE:
         return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
      default:
         return state;
   }
};