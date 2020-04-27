const Router = require('koa-router');

const router = new Router();
const apiCtl = require('../controllers/api');

const { handleGithubApi } = apiCtl;

router.get('/github', handleGithubApi);

module.exports = router;
