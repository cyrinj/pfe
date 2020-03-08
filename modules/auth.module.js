const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone')
const U=  require('../modules/user.module.js')
//now is testing u
const fs = require('fs');
var ObjectId = require('mongodb').ObjectID;


let env = JSON.parse(fs.readFileSync('./.secret.json'));
Object.keys(env).forEach(key => process.env[key] = env[key]);


var x
module.exports.Activate = ( accessToken) => {
    return new Promise((resolve, reject) => {
        console.log("activation accesstoken !! "+ accessToken)

        jwt.verify(accessToken, process.env.JWT, (err, info) => {
            console.log(err+"new bloc /users authenticate token")
            if (err) return res.sendStatus(403)
           else{x=info}
          
           
          })
          console.log("***************************************")
          console.log(x)
          console.log(x.id)
      
          console.log("***************************************")

                 User.findByIdAndUpdate(x.id, { $set: { activated:true } }, (err, us) => {
            if (err) {
                reject(err);
            } else {
                resolve("Account  activated");
                console.log("activation test " )
            }
        });
    });



}








module.exports.register  = (user) => {
    return new Promise((resolve, reject) => {
        User.find({ email: user.email }).then(data => {
            console.log('~######################################## test user ~########################################\n')
            if (data && data.length && data.length > 0) {
                reject("This Email Is Already Taken");
            } else {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(user.password, salt);
                let profilePictureUrl = "https://cdn3.iconfinder.com/data/icons/gray-user-toolbar/512/manager-512.png"
                user.password = hash;
                user.salt = salt;
                user.username=user.username
                user.isConnected = true;
                user.profilePictureUrl = profilePictureUrl;
                user.createdAt = moment().tz("Africa/Tunisia").format();
                user.last_signIn = moment().tz("Africa/Tunisia").format();
                user.updatedAt = moment().tz("Africa/Tunisia").format();
                user.activated = false
                user.adresse = ""
                user.code_postal = ""
                user.ville = ""
                user.gouvernement = ""
                user.pays = ""
                user.note = {}
                user.date_naissance = null
                user.type_account = ""
                user.profilePictureUrl = profilePictureUrl
                user.vapoint = user.vapoint
               /* let payload = {
                    email: user.email,
                    password: user.password
                }
                let token = jwt.sign(payload, process.env.JWT);

 */
                let newuser = new User(user);
                newuser.save(function(err, user) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user)

                    }
                });






            }
        })
    })
}
 
 