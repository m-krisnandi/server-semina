const express = require('express');
const router = express.Router();
const {
  create,
  index,
  find,
  update,
  updateStatusEvent,
  destroy,
} = require('./controller');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post('/events', authenticateUser, authorizeRoles('organizer'), create);
router.get('/events', authenticateUser, authorizeRoles('organizer'), index);
router.get('/events/:id', authenticateUser, authorizeRoles('organizer'), find);
router.put(
  '/events/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  update
);
router.put(
  '/events/:id/status',
  authenticateUser,
  authorizeRoles('organizer'),
  updateStatusEvent
);
router.delete(
  '/events/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  destroy
);

module.exports = router;
