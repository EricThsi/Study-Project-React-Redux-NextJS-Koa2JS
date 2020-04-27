const Router = require('koa-router');

const router = new Router();
const { requestGithub } = require('../../libs/api');

router.get('/github', async (ctx, next) => {
  const { session } = ctx;
  const githubAuth = session && session.githubAuth;
  const token = githubAuth && githubAuth.access_token;
  let headers = {};

  if (token) {
    headers['Authorization'] = `${githubAuth.token_type} ${token}`;
  }

  const result = await requestGithub(
    method,
    ctx.url.replace('/github/', '/'),
    ctx.request.body || {},
    headers
  );
  ctx.status = result.status;
  ctx.body = result.data;
});

module.exports = router;
