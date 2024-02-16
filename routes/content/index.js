const express = require('express');
const router = express.Router();
//const contentController = require('../../controllers/content');

router.get('/', (req, res) => {
  res.send('Get content');
});

router.get('/:id', (req, res) => {
  res.send('Get content by id');
});

router.post('/', (req, res) => {
  res.send('Create content');
});

router.put('/:id', (req, res) => {
  res.send('Update content');
});

router.delete('/:id', (req, res) => {
  res.send('Delete content');
});

module.exports = router;