const express = require('express');
const router = express.Router();
//const categoryController = require('../../controllers/category');

router.get('/', (req, res) => {
  res.send('Get categories');
});

router.get('/:id', (req, res) => {
  res.send('Get category by id');
});

router.post('/', (req, res) => {
  res.send('Create category');
});

router.put('/:id', (req, res) => {
  res.send('Update category');
});

router.delete('/:id', (req, res) => {
  res.send('Delete category');
});

module.exports = router;