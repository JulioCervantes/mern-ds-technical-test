const express = require('express');
const router = express.Router();
const topicController = require('../../controllers/topic');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', topicController.getTopics);

router.get('/:id', topicController.getTopicById);

router.post('/', upload.single('data'), topicController.createTopic);

router.put('/:id', topicController.updateTopic);

router.delete('/:id', topicController.deleteTopic);

module.exports = router;