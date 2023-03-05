//basic server details 

const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    //A Mongoose schema defines the structure of the document, default values, validators, etc.
    name:
    {
        type:String,
        required: 'this field is required'
    },
    email:
    {
        type:String
    },
    contactNo:
    {
        type:Number
    },
    Qualification:
    {
        type:String
    }
});

mongoose.model('Employee',employeeSchema); // mongoose.model() - used to create a collection of a particular database of MongoDB.