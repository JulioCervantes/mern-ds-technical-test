const express = require('express');
const router = express.Router();
const contentController = require('../../controllers/content');

router.get('/', contentController.getContents);

router.get('/:id', contentController.getContentById);

router.post('/', contentController.uploadContent);

router.put('/:id', contentController.updateContent);

router.delete('/:id', contentController.deleteContent);

module.exports = router;