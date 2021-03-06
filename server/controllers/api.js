const { requestGithub } = require('../../libs/request');

class APIController {
  async handleGithubApi(ctx, next) {
    const { session } = ctx;
    const { method } = ctx.request;
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
  }
}

module.exports = new APIController();
