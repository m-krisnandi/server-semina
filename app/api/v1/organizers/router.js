const express = require('express');
const { authenticateUser } = require('../../../middlewares/auth');
const { createCMSOrganizer, createCMSUser } = require('./controller');
const router = express.Router();

router.post('/organizers', createCMSOrganizer);
router.post('/users', authenticateUser, createCMSUser)

module.exports = router;