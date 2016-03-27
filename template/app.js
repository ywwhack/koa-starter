'use strict';
import Koa from 'koa';
import koaRouter from 'koa-router';
import serve from 'koa-static';

const app = new Koa();
const router = koaRouter();

router.get('/', async (ctx, next) => {
  ctx.body = 'hello world';
});

app.use(serve('.'));
app.use(router.routes());

app.listen(3000, () => {
  console.log('listending on port 3000');
});