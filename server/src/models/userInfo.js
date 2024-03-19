const mongoose = require('mongoose');

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

const infoSchema = mongoose.Schema({
    picture: pictureSchema,
    name: String,
    location: String,
    bio: String
});

infoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const linkSchema = mongoose.Schema({
    name: String,
    url: String
});

linkSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const userInfoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    info: infoSchema,
    links: [linkSchema]
});

userInfoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.user
    }
});

module.exports = userInfoSchema;