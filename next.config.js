const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const config = require('./config');

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPE = 'user';

module.exports = withBundleAnalyzer(
  withSass({
    /* config options here */
    publicRuntimeConfig: {
      GITHUB_OAUTH_URL,
      OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${config.github.clientId}&scope=${SCOPE}`,
    },
    analyzerBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZER),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html',
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html',
      },
    },
  })
);
