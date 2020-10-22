import express = require('express');
import userController from '../controllers/user.controller';

const router = express.Router();

router.get(
  '/',
  userController.list,
);

router.get(
  '/:username',
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
router.put(
  '/profile',
  userController.update,
)
export default router;