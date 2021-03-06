import express = require('express');
import boardController from '../controllers/board.controller';

const router = express.Router();

router.get(
  '/',
  boardController.list,
);
router.get(
  '/:user',
  boardController.find,
);
router.get(
  '/name/:id',
  boardController.findName,
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