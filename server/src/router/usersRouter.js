const { Router } = require('express');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');

const usersRouter = Router();

usersRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

module.exports = usersRouter;
