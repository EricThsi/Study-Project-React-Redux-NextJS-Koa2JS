const axios = require('axios');

const config = require('../config');

const {
  clientId: client_id,
  clientSecret: client_secret,
  requestTokenUrl,
} = config.github;
console.log(client_id);

module.exports = (server) => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
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
      console.log(result.status, result.data);

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
        ctx.redirect('/');
      } else {
        const errorMsg = result.data && result.data.error;
        ctx.body = `request token failed, ${errorMsg}`;
      }
    } else {
      await next();
    }
  });
};
