const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');
const errorHandler = require('../../utils/error-handler');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.use(errorHandler);

module.exports = router;
