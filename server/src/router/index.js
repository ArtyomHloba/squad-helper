const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const upload = require('../utils/fileUpload');
const contestsRouter = require('./contestsRouter');
const logger = require('../utils/logger');

const router = express.Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

router.post('/login', validators.validateLogin, userController.login);

router.post('/getUser', checkToken.checkAuth);

router.get('/offers', contestController.getOffers);

router.use(checkToken.checkToken);

router.use('/contests', contestsRouter);

router.post('/dataForContest', contestController.dataForContest);

router.get('/downloadFile/:fileName', contestController.downloadFile);

router.post(
  '/updateContest',
  upload.updateContestFile,
  contestController.updateContest
);

router.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

router.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

router.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

router.post('/updateUser', upload.uploadAvatar, userController.updateUser);

router.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

router.post('/newMessage', chatController.addMessage);

router.post('/getChat', chatController.getChat);

router.post('/getPreview', chatController.getPreview);

router.post('/blackList', chatController.blackList);

router.post('/favorite', chatController.favoriteChat);

router.post('/createCatalog', chatController.createCatalog);

router.post('/updateNameCatalog', chatController.updateNameCatalog);

router.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

router.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);

router.post('/deleteCatalog', chatController.deleteCatalog);

router.post('/getCatalogs', chatController.getCatalogs);

router.use((err, req, res, next) => {
  logger.error(err.message, {
    stack: err.stack,
    url: req.url,
    method: req.method,
  });
  next(err);
});

module.exports = router;
