const mongoose = require('mongoose');
const userInfoSchema = require('./userInfo');

const pictureSchema = mongoose.Schema({
    url: String, //need to update so that it can accept and return image data
    alt: String
});

pictureSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const userSchema = mongoose.Schema({
    username: {    
        type: String,    
        required: true,    
        unique: true // this ensures the uniqueness of username  
    },
    passwordHash: String,
    picture: pictureSchema,
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