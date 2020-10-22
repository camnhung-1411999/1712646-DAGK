import express = require('express');
import taskController from '../controllers/task.controller';
const router = express.Router();
// listUser
router.get(
  '/',
  taskController.list,
);
router.get(
  '/:id',
  taskController.find,
)
router.post(
  '/',
  taskController.create,
);
router.put(
  '/:id',
  taskController.update,
)
router.delete(
  '/:id',
  taskController.delete
)

export default router;