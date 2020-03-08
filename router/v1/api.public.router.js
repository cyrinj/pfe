const router = require('express').Router();

router.use("/auth", require('./public/auth.router.js'));

module.exports = router;