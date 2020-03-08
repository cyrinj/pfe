const router = require('express').Router();
const response = require('ybha-response');
var nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const userModule = require('../../../modules/user.module.js');
const authModule = require('../../../modules/auth.module.js');
  const getUserFromToken = require('../middlewares/utility/getUserFromToken')
  const tokenInHeaders = require('../middlewares/utility/tokenInHeaders')
  const activateUser = require('../middlewares/utility/activateUser')
// const Mailer = require("../../../modules/utilities/email.module.js");
 
// Register a new User
var accessToken,mailOptions,host,link;
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rbiiaziz900@gmail.com",
        //process.env.GMAILPW EXPORT
        pass: process.env.GMAILPW
    }
   });



router.post('/register', (req, res) => {
    console.log('register user router', req.body)

   
    let pass = req.body.password
    authModule.register(req.body).then((data) => {
       
        console.log('############ user register::  ############\n',data  )
        console.log('############ password::  ############\n', pass)

        let payload = {
            email: data.email,
            id: data._id,
            username:data.username

        }
         accessToken = jwt.sign(payload, process.env.JWT);




        validate (req,res ,data.email ,  accessToken)
     }).catch((err) => {
        console.log(err);
        if (err === "This Email Is Already Taken") {
            response.badRequest(res, "This Email Is Already Taken");
        } else {
            response.badRequest(res);
        }
    });
});




function validate (req,res,mail,accessToken){
    console.log("------------------------------------------------------")
    console.log("validate token test "+accessToken)
    host=req.get('host');
    link="http://"+req.get('host')+"/api/v1/auth/verify?id="+accessToken;
    mailOptions={
        to : mail,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to validate your account .<br><a href="+link+">Click here to verify</a>"
    }
   // console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            
        res.end("sent");
         }
   });
   }
    


   router.get('/activation/:token', tokenInHeaders, getUserFromToken, activateUser, (req, res) => response.accepted(res, "Account Activated"));



   router.get('/verify',function(req,res){
 


   console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    { 
       // console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==accessToken)


        {  console.log("inn the loop")
              authModule.Activate(accessToken ).then((data) => {
                console.log("activated")
            }).catch((err) => {
                console.log(err);

            })





           // console.log("email is verified");
           // res.send("<h1>Email "+mailOptions.to+" is been Successfully verified" + '<script>         setTimeout(function () {  window.location = "http://localhost:8080/"; }, 2000)</script>')
           res.send("<h1>Email "+mailOptions.to+" is been Successfully verified") 
            
   
            //Activate user


            

             
        
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
    });

 

let template = `
<h1> Want to trip :</h1>
<p>merci de cliquer sur le lien pour activer votre compte:</p><br>
`;

module.exports = router 