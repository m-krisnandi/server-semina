const express = require('express');
const router = express.Router();
const {
  create,
  index,
  find,
  update,
  updateStatusEvent,
  destroy
} = require('./controller');

router.post('/events', create);
router.get('/events', index);
router.get('/events/:id', find);
router.put('/events/:id', update);
router.put('/events/:id/status', updateStatusEvent);
router.delete('/events/:id', destroy);

module.exports = router;
