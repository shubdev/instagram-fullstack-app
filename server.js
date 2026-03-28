import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

app.listen(8080, () => {
  console.log("server connect to port 8080");
});
