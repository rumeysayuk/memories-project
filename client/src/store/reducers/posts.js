import {GET_ALL, CREATE, UPDATE, DELETE} from '../../constants/actionTypes';

export default (posts = [], action) => {
   switch (action.type) {
      case GET_ALL:
         return action.payload;
      case CREATE:
         return [...posts, action.payload];
      case DELETE:
         return posts.filter((post)=>post._id !== action.payload)
      case UPDATE:
         return {
            success: true,
            data: posts.data.map((post) => (post._id === action.payload.data._id ? action.payload.data : post))
         };
      default:
         return posts;
   }
};