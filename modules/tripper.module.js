const User = require('../models/user.model.js')
const trip = require('../models/trip.model.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone')
const U=  require('../modules/user.module.js')
//now is testing u
const fs = require('fs');
var ObjectId = require('mongodb').ObjectID;



module.exports. updatetrip = ( x) => {
    return new Promise((resolve, reject) => {
      
       trip.find({ '_id': x._id }).then(data => {
           
            let newtrp = data[0]
           newtrp.title=x.title
             newtrp.continent = x.continent
                newtrp.country=x.country
                newtrp.theme = x.theme
                newtrp.duration=x.duration
                newtrp.from = x.from
                newtrp.to=x.to
                newtrp.program=x.program
                newtrp.inspiration = x.inspiration
                newtrp.agencyname=x.agencyname
                newtrp.agencyemail=x.agencyemail
                newtrp.agencynumber = x.agencynumber
                newtrp.price=x.price
                newtrp.program=x.program



         trip.findOneAndUpdate({ '_id': newtrp._id }, newtrp, { new: true }).then(dt => {
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















const multer = require('multer');


 
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'rsc/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,  file.originalname);
  }
});
var upload= multer ({storage: storage}) 

module.exports.subform = (tokenid ,x) => {
    return new Promise((resolve, reject) => {
         
    
        console.log('~######################################## test trip ~########################################\n')
          trip1={}
               trip1.title = x.title
               trip1.owner=tokenid
          
               trip1.continent = x.continent
                trip1.country=x.country
                trip1.theme = x.theme
                trip1.duration=x.duration
                trip1.from = x.from
                trip1.to=x.to
                trip1.program=x.program
                trip1.inspiration = x.inspiration
                trip1.agencyname=x.agencyname
                trip1.agencyemail=x.agencyemail
                trip1.agencynumber = x.agencynumber
                trip1.price=x.price
                trip1.confirmedByWantotrip=false
                trip1.propositiondeleted= false ; 
                trip1.program=x.program
                    
                
               let newtrip = new trip (trip1);
               if ( newtrip.title==null) { reject("title required");}  
               else {
                newtrip.save(function(err,trip) {
                    if (err) {
                        reject(err);
                    } else {
                        



                       

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
               }




 
    







    })}






















module.exports.editprofile = (token,x,filename) => {
    return new Promise((resolve, reject) => {
        console.log("test edit profile token.id =  "+token.id)
        User.findByIdAndUpdate(token.id,   
            {
                $set: {
                    
                    profilePictureUrl:"http://localhost:3000/uploads/"+token.id+"/"+filename, 
                    first_name: x.first_name,
                       /* last_name: x. last_name,
                        username: x.  username,
                        email: x. email,
                        password: x.  password,
                        adresse: x.adresse,
                        code_postal: x.   code_postal,
                        ville: x. ville,
                        gouvernement: x.gouvernement,
                        pays: x. pays,
                        telephone: x. telephone,
                        date_naissance: (x.date_naissance) */
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
 