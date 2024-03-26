const mongoose = require('mongoose');
const userInfoSchema = require('./userInfo');

const tokenSchema = mongoose.Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
});

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
    data: userInfoSchema,
    tokens: tokenSchema
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
        delete returnedObject.tokens
    }
});

module.exports = mongoose.model('User', userSchema);