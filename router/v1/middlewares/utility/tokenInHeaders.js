const response = require("dark-snow-response");
const User = require("../../../../models/user.model.js");
const jwt = require('jsonwebtoken');
//Token is supposed to be correct
module.exports = function(req, res, next) {

    console.log('token ', req.params.token)
    if (req.params.token &&
        typeof req.params.token === 'string') {
        req.token = req.params.token;
        console.log(req.token)
        next();
    } else {
        response.unauthorized(res);
    }





}