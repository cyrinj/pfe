const User = require('../models/user.model.js')
const trip = require('../models/trip.model.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone')
const U=  require('../modules/user.module.js')
//now is testing u
const fs = require('fs');
var ObjectId = require('mongodb').ObjectID;


module.exports.subform = (x) => {
    return new Promise((resolve, reject) => {

    
        console.log('~######################################## test trip ~########################################\n')
 
               trip.title = x.title
                
   
                let newtrip = new trip (trip);
                newtrip.save(function(err,trip) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(trip)

                    }
                });





 
    







    })}






















module.exports.editprofile = (token,x) => {
    return new Promise((resolve, reject) => {
        console.log("test edit profile token.id =  "+token.id)
        User.findByIdAndUpdate(token.id,   
            {
                $set: { 
                    first_name: x.first_name,
                        last_name: x. last_name,
                        username: x.  username,
                        email: x. email,
                        password: x.  password,
                        adresse: x.adresse,
                        code_postal: x.   code_postal,
                        ville: x. ville,
                        gouvernement: x.gouvernement,
                        pays: x. pays,
                        telephone: x. telephone,
                        date_naissance: x.date_naissance
                } }, { new: true }).then(user => {
                console.log("test edit profile !!! "+ user)
                resolve(user)




    }) .catch(err => {
        console.log(' edit profile err ', err)
        reject(err);
    });


})

}






module.exports.profile = (token) => {
    return new Promise((resolve, reject) => {

console.log('test profile trip ', token )
        User.find({ email: token.email }).then(data => {

           resolve (data)



            
        }) .catch(err => {
            console.log('test err ', err)
            reject(err);
        });
    })
}
 