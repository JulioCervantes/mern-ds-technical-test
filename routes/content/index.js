const express = require('express');
const router = express.Router();
const contentController = require('../../controllers/content');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', contentController.getContents);

router.get('/:id', contentController.getContentById);

router.post('/',  upload.single('data'), contentController.uploadContent);

router.put('/:id', contentController.updateContent);

router.delete('/:id', contentController.deleteContent);

module.exports = router;