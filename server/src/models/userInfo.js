const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
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
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const userInfoSchema = mongoose.Schema({
    info: infoSchema,
    links: [linkSchema]
});

userInfoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = userInfoSchema;