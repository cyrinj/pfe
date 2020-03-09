const router = require('express').Router();
const response = require('ybha-response');
var nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const userModule = require('../../../modules/user.module.js');
const tripperModule = require('../../../modules/tripper.module.js');


var x
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

router.get('/profile' ,authenticateToken,  (req, res) => {
   
    tripperModule.profile(req.user ).then((result) => {
        
        if (err) throw err;
        // console.log(result);
        else {
          if (result == null ){
            // console.log("user not found");
           
             res.status(201).send( {msg:"don't exist"})
           
            }
            else { res.send(result) }
        }







    }).catch((err) => {
        response.badRequest(res, err);
    });


})














 

































module.exports = router 