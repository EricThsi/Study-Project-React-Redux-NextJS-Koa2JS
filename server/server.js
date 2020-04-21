const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');

const env = process.env.NODE_ENV;
const isDev = env !== 'production';
const app = next({
  dev: isDev,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    await next();
  });

  server.use(router.routes());

  server.listen(3000, () => {
    console.log('Koa server is running on port 3000');
  });
});
