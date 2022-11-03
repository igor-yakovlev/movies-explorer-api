const express = require('express');

const defaultRoute = require('./defaultRoute');
const router = express.Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');

router.use(userRouter);
router.use(moviesRouter);

router.use('*', defaultRoute);

module.exports = router;
