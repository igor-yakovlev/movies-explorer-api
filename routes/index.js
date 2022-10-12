const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');

router.use(userRouter);
router.use(moviesRouter);

module.exports = router;
