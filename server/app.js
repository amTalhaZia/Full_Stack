import  express  from 'express';
import dotenv  from "dotenv"
import cors  from "cors"
import { router } from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express()


app.use(express.json())

app.use(cors( {
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({
    extended: true 
}))
app.use(express.static("public"))


// routes

app.use('/api/v1/users', router)



export {app}