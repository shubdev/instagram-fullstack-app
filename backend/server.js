import dotenv from "dotenv";
dotenv.config();  //to connect .env file with our project
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

app.listen(8080, () => {

  console.log("server run at  poprt 8080.");

})



