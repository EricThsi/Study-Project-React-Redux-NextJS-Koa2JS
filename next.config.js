const withSass = require('@zeit/next-sass');

const config = require('./config');

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPE = 'user';

module.exports = withSass({
  /* config options here */
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${config.github.clientId}&scope=${SCOPE}`,
  },
});
