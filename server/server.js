const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const next = require('next');
const dotenv = require('dotenv');
const session = require('koa-session');
const Redis = require('ioredis');
const atob = require('atob');

dotenv.config();

const RedisSessionStore = require('./sessionStore');
const routing = require('./routes');

const env = process.env.NODE_ENV;
const isDev = env !== 'production';

const app = next({
  dev: isDev,
});
// redis client, use default config
const redis = new Redis();
const handle = app.getRequestHandler();

// set global method
global.atob = atob;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = [process.env.APP_KEY];
  const SESSION_CONFIG = {
    key: 'app:sess',
    store: new RedisSessionStore(redis),
  };

  server.use(session(SESSION_CONFIG, server));
  server.use(koaBody());
  routing(server);

  router.get('/api/user/info', async (ctx, next) => {
    const user = ctx.session.userInfo;

    if (!user) {
      ctx.status = 401;
      ctx.body = '401, Need Login';
    } else {
      ctx.body = user;
      ctx.set('Content-Type', 'application/json');
    }
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
