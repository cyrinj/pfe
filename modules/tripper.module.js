const User = require('../models/user.model.js')
const trip = require('../models/trip.model.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone')
const U=  require('../modules/user.module.js')
//now is testing u
const fs = require('fs');
var ObjectId = require('mongodb').ObjectID;



module.exports. updatetrip = ( id ,x) => {
    return new Promise((resolve, reject) => {
         console.log("id :" +id)
       trip.find({ '_id': id }).then(data => {
             console.log("DATA :    "+data)
            let tripp = data[0]
            tripp.title="cvb"
            console.log("/////////////////////////////////")
            console.log("tripp id : " + tripp._id)
         trip.findOneAndUpdate({ '_id': tripp._id }, tripp, { new: true }).then(dt => {
                console.log("dt result " + dt)
                resolve(dt)
            }) 
        }).catch((err) => {
            reject(err+ "problem update ") 

    })


    })}

module.exports. annulertriproposition = (id) => {
    return new Promise((resolve, reject) => {
       
       trip.findByIdAndUpdate(id, { $set: { propositiondeleted:true } }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                console.log("+++++++++++++"+res)
                resolve("proposition annulée");
                
            }
        });
 
            




    }
    )
}

 

module.exports.removetrip = (id) => {
    return new Promise((resolve, reject) => {
  trip.remove({_id:id}  , (err) => {
    if (err) {
    reject (err)   
    
    }else { resolve ("sucess")}
    })  
  
  .catch(err => {
    console.log(' removing error ', err)
    reject(err);
           })

  
    })
  
  }




///////////////////////////////////1///////////////////////////////
module.exports.getripinfo= (id) => {
    return new Promise((resolve, reject) => {

  
        trip.find({ _id : id }).then(data => 
            {
            if (data !== null && data.length && data.length > 0) {
                resolve (data)
            }
            else {
                reject("no info found")
            }



            })
        
    
    }).catch(err => {
        console.log(' getting trip info error ', err)
        reject(err);
               })


        }




module.exports.alltripsbyuser = (id) => {
    return new Promise((resolve, reject) => {


   
        
        trip.find({ owner: id }).then(data => {
            if (data !== null && data.length && data.length > 0) {
                resolve (data)
            }
            else {
                reject("no trips found")
            }
               
    
    
        })
        .catch(err => {
            console.log(' getting trips du user error ', err)
            reject(err);
                   })
    
    









})}

















module.exports.subform = (tokenid ,x) => {
    return new Promise((resolve, reject) => {
         
    
        console.log('~######################################## test trip ~########################################\n')
          
               trip.title = x.title
               trip.owner=tokenid
 
               trip.continent = x.continent
                trip.country=x.country
                trip.theme = x.theme
                trip.duration=x.duration
                trip.from = x.from
                trip.to=x.to
                trip.program=x.program
                trip.inspiration = x.inspiration
                trip.agencyname=x.agencyname
                trip.agencyemail=x.agencyemail
                trip.agencynumber = x.agencynumber
                trip.price=x.price
                trip.confirmedByWantotrip=false
                trip.propositiondeleted= false ; 
                trip.program=x.program

                    
                let newtrip = new trip (trip);
                newtrip.save(function(err,trip) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(trip)

                    }
                });

                User.findByIdAndUpdate(tokenid,   
                    {
                         $push: { trips: newtrip  }  }, { new: true }).then(user => {
                        console.log("check the trips attrib"+ user)
                        resolve(user)
        
            }) .catch(err => {
                console.log(' add trip  err ', err)
                reject(err);
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
                        date_naissance: (x.date_naissance) 
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
 