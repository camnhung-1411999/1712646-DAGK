import express = require('express');
import userController from '../controllers/user.controller';

const router = express.Router();

router.get(
  '/',
  userController.find,
)
router.post(
  '/login',
  userController.detail,
)
router.post(
  '/',
  userController.create,
)
router.post(
  '/social',
  userController.loginSocial,
)
router.post(
  '/checkPw/:user',
  userController.checkPassword,
)
router.get(
  '/refresh',
  userController.refresh,
)
router.put(
  '/:user',
  userController.update,
)
router.get
export default router;