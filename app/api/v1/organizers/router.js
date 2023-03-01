const express = require('express');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');
const { createCMSOrganizer, createCMSUser } = require('./controller');
const router = express.Router();

router.post(
  '/organizers',
  authenticateUser,
  authorizeRoles('owner'),
  createCMSOrganizer
);
router.post(
  '/users',
  authenticateUser,
  authorizeRoles('organizer'),
  createCMSUser
);

module.exports = router;
