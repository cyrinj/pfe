const router = require('express').Router();

router.use("/tripper", require('./secure/tripper.router.js')) ;

module.exports = router;