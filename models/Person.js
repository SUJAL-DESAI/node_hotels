const mongoose = require('mongoose');

// Define the schema for a person
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum : ['Waiter', 'Chef', 'Manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false
    },
    salary: {
        type: Number,
        required: true
    }
    
});

//Create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;  