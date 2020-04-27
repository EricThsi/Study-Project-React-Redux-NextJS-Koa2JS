const axios = require('axios');
const Router = require('koa-router');

const config = require('../../config');
const router = new Router();

const {
  clientId: client_id,
  clientSecret: client_secret,
  requestTokenUrl,
} = config.github;

router.get('/auth', async (ctx, next) => {
  const { code } = ctx.query;
  if (!code) {
    ctx.body = "Code doesn't exist";
    return;
  }

  const result = await axios({
    method: 'POST',
    url: requestTokenUrl,
    data: {
      client_id,
      client_secret,
      code,
    },
    headers: {
      Accept: 'application/json',
    },
  });
  // console.log(result.status, result.data);

  if (result.status === 200 && result.data && !result.data.error) {
    ctx.session.githubAuth = result.data;
    const { access_token, token_type } = result.data;

    const userInfoRep = await axios({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });

    ctx.session.userInfo = userInfoRep.data;
    ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/');
    ctx.session.urlBeforeOAuth = '';
  } else {
    const errorMsg = result.data && result.data.error;
    ctx.body = `request token failed, ${errorMsg}`;
  }
});

router.post('/logout', async (ctx, next) => {
  ctx.session = null;
  ctx.body = 'Logout successfully.';
});

router.get('/prepare-auth', async (ctx, next) => {
  const { url } = ctx.query;
  ctx.session.urlBeforeOAuth = url;
  ctx.body = 'Okay';
});

module.exports = router;
