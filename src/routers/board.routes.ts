import express = require('express');
import boardController from '../controllers/board.controller';

const router = express.Router();

router.get(
  '/',
  boardController.list,
);
router.get(
  '/:id',
  boardController.find,
);
router.post(
  '/',
  boardController.create,
);
router.put(
  '/:id',
  boardController.update,
);
router.delete(
  '/:id',
  boardController.delete,
);

export default router;