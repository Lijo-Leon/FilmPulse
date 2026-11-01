// 1. Import dotenv
require('dotenv').config()

// 2. Import mongoose
const mongoose = require('mongoose')

// 3. Read connection string
const dbString = process.env.connectionString

// 4. Connect to MongoDB
mongoose.connect(dbString)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log('Error Connecting to MongoDB:', err)
    })
