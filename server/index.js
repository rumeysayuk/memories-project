import express from "express"
import 'dotenv/config'
import bodyParser from "body-parser"
import cors from "cors"
import databaseConnectionHelper from "./helpers/database/databaseConnectionHelper.js"
import routes from './routes/index.js';
const app = express()
databaseConnectionHelper();
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use('/api', routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`Server running on ${PORT} : ${process.env.NODE_ENV}`);

});
