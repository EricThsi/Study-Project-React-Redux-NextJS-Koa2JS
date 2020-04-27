const Router = require('koa-router');

const authCtl = require('../controllers/auth');
const router = new Router();

const { auth, logout, prepareAuth } = authCtl;

router.get('/auth', auth);
router.post('/logout', logout);
router.get('/prepare-auth', prepareAuth);

module.exports = router;
