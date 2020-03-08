const response = require("dark-snow-response");
const User = require("../../../../models/user.model.js");
const jwt = require('jsonwebtoken');
const authModule = require('../../../../modules/auth.module.js');


module.exports = function(req, res, next) {

    let id = user._id;
    console.log('user: ', user, 'id :', id)
    delete user._id;
    user.activated = true;
    console.log(user)
    authModule.updateUser(id, user).then(fuser => {
        req.user = fuser
        res.redirect('https://wantotrip.net');
    }).catch(err => {
        console.error(err);
        response.error(res);
    })
    




}