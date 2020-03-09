/*const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone')
const U=  require('../modules/user.module.js')
//now is testing u
const fs = require('fs');
var ObjectId = require('mongodb').ObjectID;


let env = JSON.parse(fs.readFileSync('./.secret.json'));
Object.keys(env).forEach(key => process.env[key] = env[key]);

module.exports.profile = (token) => {
    return new Promise((resolve, reject) => {


        User.find({ email: token.email }).then(data => {

           resolve (data)



            
        }) .catch(err => {
            console.log('test err ', err)
            reject(err);
        });
    })
}
*/