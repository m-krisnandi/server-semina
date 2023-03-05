const express = require('express');
const { index, find, create, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');
const router = express.Router();

router.get('/payments', authenticateUser, authorizeRoles('organizer'), index);
router.post('/payments', authenticateUser, authorizeRoles('organizer'), create);
router.get(
  '/payments/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  find
);
router.put(
  '/payments/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  update
);
router.delete(
  '/payments/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  destroy
);

module.exports = router;
