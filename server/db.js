const mongoose = require('mongoose');
// require('dotenv').config();

// Define the MongoDB connection URL
const mongoURL='mongodb://localhost:27017/FullStackVoterdb'
// const mongoURL = process.env.MONGODB_URL_LOCAL 
// Replace 'mydatabase' with your database name
// const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});


// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;

