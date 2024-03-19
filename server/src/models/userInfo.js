const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    url: String,
    alt: String
});

const infoSchema = mongoose.Schema({
    picture: pictureSchema,
    name: String,
    location: String,
    bio: String
});

const linkSchema = mongoose.Schema({
    name: String,
    link: String
});

const userInfoSchema = mongoose.Schema({
    info: infoSchema,
    links: [linkSchema]
});

userInfoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('UserInfo', userInfoSchema);