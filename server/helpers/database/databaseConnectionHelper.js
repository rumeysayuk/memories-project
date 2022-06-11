import mongoose from "mongoose";

const databaseConnectionHelper = () => {
   mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
      useUnifiedTopology: true,
      })
      .then(() => {
         console.log("mongodb connection successful");
      })
      .catch((err) => {
         console.error(`db error ${err.message}`);
      });
}
export default databaseConnectionHelper