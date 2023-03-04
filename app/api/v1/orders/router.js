const express = require('express');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');
const { index } = require('./controller');
const router = express.Router();

router.get(
  '/orders',
  authenticateUser,
  authorizeRoles('organizer', 'owner'),
  index
);

module.exports = router;
