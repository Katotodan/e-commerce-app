const express = require('express')
const dbConnection = require('./DB/connectiondb')
const routes = require('./Routes/route')
const app = express()
const cors = require('cors')
const PORT = 8080

// Middleware
app.use(cors({
    origin:"http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'Access-Control-Allow-Credentials', 
        'Access-Control-Allow-Origin',
    ],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("", routes)
const startApp = async() =>{
    try {
        await dbConnection()
        app.listen(PORT, console.log('Server is listening on port' +PORT+'....'))
    } catch (error) {
        console.log(error)
    }
}
startApp()
