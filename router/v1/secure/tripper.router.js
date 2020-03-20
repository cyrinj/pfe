const router = require('express').Router();
const response = require('ybha-response');
var nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const userModule = require('../../../modules/user.module.js');
const tripperModule = require('../../../modules/tripper.module.js');
 
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token,  process.env.JWT, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      
      next()
    })
   }



   router.post('/updatetrip',(req, res) => {
     
   
    tripperModule.updatetrip(  req.body).then((result) => {
      
     
      response.json(res, result) 


    })
      


   })
   


   router.post('/annulertriproposition',(req, res) => {
   
    console.log(req.body.id)
    tripperModule.annulertriproposition(req.body.id).then((result) => {
        
      response.json(res, result) 
    
    
    
    }).catch((err) => {
       response.badRequest(res, err);
    }); 



      
  })





   router.post('/removetrip',(req, res) => {
   

    tripperModule. removetrip(req.body.id).then((result) => {
        
      response.json(res, result) 
    
    
    
    }).catch((err) => {
       response.badRequest(res, err);
    }); 



      
  })



   router.post('/alltripsbyuser',authenticateToken,    (req, res) => {
   

    tripperModule.alltripsbyuser( req.user.id  ).then((result) => {
        
      response.json(res, result) 
    
    
    
    }).catch((err) => {
       response.badRequest(res, err);
    }); 



      
  })




router.post('/submitform',authenticateToken,    (req, res) => {
 
 var y =req.user.id
tripperModule.subform ( req.user.id , req.body ).then((result) => {
        
  response.json(res, result) 



}).catch((err) => {
   response.badRequest(res, err);
}); 


}) ; 


router.get('/profile' ,authenticateToken,  (req, res) => {
   
    tripperModule.profile(req.user ).then((result) => {
        
       
       response.json(res, result) 

   

    }).catch((err) => {
        response.badRequest(res, err);
    });


})

router.get('/editprofile', authenticateToken,  (req, res) => {

       
    tripperModule.editprofile(req.user ,req.body ).then((result) => {
        
       
      response.json(res, result) 

  

   }).catch((err) => {
       response.badRequest(res, err);
   }); 



})
 
////////////////////////////1////////////////////////////////////////
router.get('/getripinfo', authenticateToken,  (req, res) => {

       
  tripperModule. getripinfo(req.body.id ).then((result) => {
      
     
    response.json(res, result) 



 }).catch((err) => {
     response.badRequest(res, err);
 }); 



})









 

































module.exports = router 