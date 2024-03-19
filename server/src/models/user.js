const mongoose = require('mongoose');
const userInfoSchema = require('./userInfo');

const userSchema = mongoose.Schema({
    username: {    
        type: String,    
        required: true,    
        unique: true // this ensures the uniqueness of username  
    },
    passwordHash: String,
    data: userInfoSchema
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
});

module.exports = mongoose.model('User', userSchema);