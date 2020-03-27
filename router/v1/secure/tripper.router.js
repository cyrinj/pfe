const router = require('express').Router();
const response = require('ybha-response');
var nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const userModule = require('../../../modules/user.module.js');
const tripperModule = require('../../../modules/tripper.module.js');
var mkdirp = require('mkdirp'); 





const multer = require('multer');

var path = require('path')


function folder (req, res, next){
  console.log("./rsc/uploads/" +req.user.id)
  var pth= "./rsc/uploads/" +req.user.id
  mkdirp(pth, function (err) {
    if (err) response.badRequest(res,err)
    else {
      
       
      next()
    }
  })
}



const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


 
var storage = multer.diskStorage ({
  
  destination: function(req, file, cb) {
    cb(null, 'rsc/uploads/'+req.user.id);
  },
  filename: function(req, file, cb) {
    cb(null, req.user.id+path.extname(file.originalname));
    }
  
  
  }  );
  





var upload= multer ({storage: storage ,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter



}) 
 
 
  /*router.post ('/test' , authenticateToken,folder, upload.single('Image'),(req, res) => {
  if (req.file== null) {
    response.badRequest(res, "file format unacepted  ");

   }
    
  
 }) */


 router.get('/editprofile', authenticateToken, folder,upload.single('Image'), (req, res) => {
 
       if (req.file==null) {
        response.badRequest(res, "file format unacepted  ");

       }
       else{
  tripperModule.editprofile(req.user ,req.body, req.file.filename ).then((result) => {
      
     
    response.json(res, result) 



 }).catch((err) => {
     response.badRequest(res, err);
 }); 

       }

})



















 router.post('/submitform',authenticateToken,    (req, res) => {
 
  var y =req.user.id
 tripperModule.subform ( req.user.id , req.body ).then((result) => {
         
   response.json(res, result) 
 
 
 
 }).catch((err) => {
    response.badRequest(res, err);
 }); 
 
 
 }) ; 
 










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






router.get('/profile' ,authenticateToken,  (req, res) => {
   
    tripperModule.profile(req.user ).then((result) => {
        
       
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