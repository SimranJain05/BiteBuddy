//  creating schema

const mongoose = require('mongoose');

// destructuring --- Schema ko mongoose m se nikal rhe hai

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    location:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);   // exporting schema , so that it can be further imported and used by any program
