import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { router } from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import { productRouter } from "./routes/product.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(cookieParser({ origin: 'http://localhost:5173' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use('/api/v1/users', router);
app.use('/api/v1/products', productRouter);

export { app };
