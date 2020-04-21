const Koa = require('koa');
const next = require('next');

const env = process.env.NODE_ENV;
const isDev = env !== 'production';
const app = next({
  dev: isDev,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log('Koa server is running on port 3000');
  });
});
