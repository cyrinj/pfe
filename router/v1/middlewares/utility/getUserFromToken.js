const response = require("dark-snow-response");
const User = require("../../../../models/user.model.js");
const jwt = require('jsonwebtoken');
//Token is supposed to be correct
module.exports = function(req, res, next) {
    console.log('tken in getinfo', req.token)

    let decoded = jwt.decode(req.token);
    User.find({ email: decoded.email })
        .populate('user.first_name', 'first_name last_name profilePictureUrl')
        .exec(function(err, fuser) {
            if (fuser[0]) {
                req.user = fuser[0];
                next();
            } else {
                response.unauthorized(res, err);
            }
        }).catch((err) => {
            response.error(res, err);
        });
}