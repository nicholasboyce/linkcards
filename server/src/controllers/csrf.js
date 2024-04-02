const { csrfSync } = require("csrf-sync");
const {
    generateToken
} = csrfSync();

exports.getToken = (request, response) => {
    response.json({ token: generateToken(request) });
}