import { app } from "./app.js";
import dotenv from "dotenv";
import { dbConnect } from "./db/db.js";

dotenv.config();

const Port = process.env.PORT || 5000;

dbConnect()
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

