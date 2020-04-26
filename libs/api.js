const axios = require('axios');

const GITHUB_BASE_URL = 'https://api.github.com';
const isServer = typeof window === 'undefined';

const requestGithub = async (method, url, data, headers) => {
  return await axios({
    method,
    url: `${GITHUB_BASE_URL}${url}`,
    data,
    headers,
  });
};

const request = async ({ method = 'GET', url, data = {} }, req, res) => {
  if (!url) {
    throw Error('URL required!');
  }

  if (isServer) {
    const { session } = req;
    const { githubAuth = {} } = session;
    const headers = {};

    if (githubAuth.access_token) {
      headers[
        'Authorization'
      ] = `${githubAuth.token} ${githubAuth.access_token}`;
    }

    return await requestGithub(method, url, data, headers);
  } else {
    return await axios({
      method,
      url: `/github${url}`,
      data,
    });
  }
};

module.exports = {
  request,
  requestGithub,
};
