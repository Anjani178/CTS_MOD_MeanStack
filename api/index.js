const express = require('express')
const router = express.Router()

require('./routes/info')(router)
require('./routes/authentication')(router);
require('./routes/search')(router);

module.exports = router