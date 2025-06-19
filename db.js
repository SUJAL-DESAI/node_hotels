const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Define MongoDB connection URL and database name
const mongoURL = process.env.MONGODB_URL; 

// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


// Get the default connection
//Mongose maintains a default connection object representing the MongoDB connection

const db = mongoose.connection;

//Define Eventlisteners for the connection

db.on('connected', () => {
    console.log('Connected to the MongoDB server');
})

db.on ('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
})

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
})

// Export the database connection

module.exports = db;