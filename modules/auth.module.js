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

module.exports.securtiyquestion = ( reqbody) => {
 
    return new Promise((resolve, reject) => {
       
        User.find({email:reqbody.email , securityquestion: reqbody.securityquestion, response: reqbody.response}).then(data => {
            resolve(data)
          




        }).catch((err) => {
            console.log(err)
            reject(err) 


    })


    })}

module.exports.forgetPassword = (email, password) => {
    return new Promise((resolve, reject) => {
     
        User.find({ 'email': email }).then(data => {
            
            let user = data[0]
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            user.password = hash
            User.findOneAndUpdate({ '_id': user._id }, user, { new: true }).then(dt => {
                resolve(dt)
            })
        }).catch((err) => {
            reject(err+ "l 'email inexistant") 

    })
    })
}






















module.exports.login = (email, password) => {
    return new Promise((resolve, reject) => {

        console.log(" test 2"+ email)
        User.find({ email: email })
            .then(data => {
                if (data !== null && data.length && data.length > 0) {
                    console.log(" test 3"+ data[0].password)
                    if (bcrypt.compareSync(password, data[0].password)) {
                        let payload = {
                            email: data[0].email,
                            id: data[0]._id,
                            username:data[0].username
                        }
                        let token = jwt.sign(payload, process.env.JWT);
                        console.log("token:  "+token)

                        User.findByIdAndUpdate(data[0]._id, { $set: { isConnected: true, last_signIn: moment().tz("Africa/Tunisia").format() } }, { new: true }).then(user => {
                            delete user.salt;
                            delete user.password;
                            console.log("RESULT: " + user);
                            resolve({ user, token });
                        }).catch(err => reject(err))

                    } else {
                        reject("Mot de passe erroné ");
                    }
                } else {
                    reject("email n'existe pas");
                }
            }).catch(err => {
                console.log("email n existe pas ", err)
                reject(err);
            });
    });
}















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






module.exports.logout = (user) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(user._id, { $set: { isConnected: false, last_signOut: moment().tz("Africa/Tunisia").format() } }, (err, us) => {
            if (err) {
                reject(err);
            } else {
                resolve("deconnecte");
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
                user.isConnected = false;
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
 
 