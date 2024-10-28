import { app } from "./app.js";
import dotenv from "dotenv";
import { dbConnect } from "./db/db.js";

dotenv.config();

const Port = process.env.PORT || 3000;

dbConnect() 
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

export { app };
