const express = require('express');
const router = express.Router();
//const topicController = require('../../controllers/topic');

router.get('/', (req, res) => {
  res.send('Get topics');
});

router.get('/:id', (req, res) => {
  res.send('Get topic by id');
});

router.post('/', (req, res) => {
  res.send('Create topic');
});

router.put('/:id', (req, res) => {
  res.send('Update topic');
});

router.delete('/:id', (req, res) => {
  res.send('Delete topic');
});

module.exports = router;