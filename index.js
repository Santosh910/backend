import express from 'express'
// import { Hello } from './Controllers/GlobalControllers.js'
import router from './Routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

const app = express()
dotenv.config();
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());


app.use((req,res,next) =>{
    console.log("hi from middleware use")
    // res.send("hi  from middleware use")
    next();
})

app.get("/", function (req, res) {
    res.send('hello santosh...')
})

app.get('/',(req,res)=> {
    res.send("welcome to backend")
}) 

app.use("/api/v1", router)

mongoose.connect('mongodb+srv://survesantosh09:67kDdxwCIBYPytGO@cluster0.hhewsjk.mongodb.net/Awdiz').then(() => console.log('database connected!'))

// mongoose.connect(process.env.MONGOURL).then(() => console.log("Database connected"))


app.listen(8001, () => console.log("app is running on 8000"))