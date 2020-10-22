import userRoute from './user.routes';
import taskRoute from './task.routes';
import boardRoute from './board.routes';


import express = require('express');
const router = express.Router();

router.use('/users', userRoute);
router.use('/boards', boardRoute);
router.use('/tasks', taskRoute);

export default router;
