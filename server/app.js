import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(cookieParser({ origin: 'http://localhost:5173' }));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));




// routes
import { productRouter } from "./routes/product.routes.js";
import { router } from './routes/user.routes.js';
import { commentRouter } from './routes/comment.routes.js';

app.use('/api/v1/users', router);
app.use('/api/v1/users',commentRouter );
app.use('/api/v1/products', productRouter);

export { app };
