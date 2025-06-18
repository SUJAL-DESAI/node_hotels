const mongoose = require('mongoose');

// Define MongoDB connection URL and database name
const mongooseURL = 'mongodb://localhost:27017/hotels'; // Replace with your MongoDB connection string And database name mongodb://localhost:27017

// Connect to MongoDB
mongoose.connect(mongooseURL, {
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