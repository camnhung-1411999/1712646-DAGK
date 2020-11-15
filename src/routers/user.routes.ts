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
  '/google',
  userController.loginGoogle,
)
router.post(
  '/checkPw/:user',
  userController.checkPassword,
)
router.put(
  '/:user',
  userController.update,
)
router.get
export default router;