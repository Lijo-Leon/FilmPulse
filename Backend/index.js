//1. Import Express
const express = require('express')

// 2. Import dotenv for environment variables
require('dotenv').config()


//3. Import db Connection
const db = require('./config/db')

//4.import cors
const cors = require('cors')

// 5. Import Routes
const router = require('./router/route')

//Global middleware
const appMiddleware = require('./middlewares/appMiddleware')

//Express app acreation
const filmPulseServer = express()
//use cors
filmPulseServer.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));
//json Middleware
filmPulseServer.use(express.json())
filmPulseServer.use(express.urlencoded({ extended: true }))
// implementing app level custom middleware
filmPulseServer.use(appMiddleware)
//Static Uploads folder
filmPulseServer.use('/uploads', express.static('./uploads'))
//Use Routes
filmPulseServer.use("/api", router);




//Port define
const PORT = process.env.PORT || 5000

//start server
filmPulseServer.listen(PORT, () => {
    console.log(`FilmPulse Server started on PORT : ${PORT}`)
})
