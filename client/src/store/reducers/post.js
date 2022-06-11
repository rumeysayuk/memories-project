export default (posts = [], action) => {
   switch (action.type) {
      case "GET_ALL":
         return posts
      case "CREATE":
         return posts
      default:
         return posts
   }
}