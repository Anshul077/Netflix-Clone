import express from "express"
import { Connection } from "./Database/Connection.js"
import cors from "cors"
import Routes from "./routes/Routes.js"
import bodyParser from 'body-parser';

const app=express()

const PORT = 8000

app.listen(PORT,()=>{
    try {
        console.log(`Server successfully running on Port ${PORT}`)
    } catch (error) {
        console.log("server not running",error)
    }
} )
Connection()
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/',Routes)
