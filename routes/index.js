'use strict'

const express = require('express');
const router = express.Router();
const cors = require('cors');

const templateRoutes = require('./template');

router.use('/templates', templateRoutes);

module.exports = router;