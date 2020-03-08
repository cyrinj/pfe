const router = require('express').Router()

// router.use('/v1/secure', require('./api.secure.router.js'))
router.use("/v1", require('./api.public.router'))

module.exports = router