const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogpostRoutes = require('./blogpostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/blogpost', blogpostRoutes);
router.use('/blogpost', commentRoutes);

module.exports = router;