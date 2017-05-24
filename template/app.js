const Koa = require('koa')
const koaRouter = require('koa-router')
const serve = require('koa-static')
const multer = require('koa-multer')
const cors = require('koa-cors')
const convert = require('koa-convert')

const app = new Koa()
const router = koaRouter()
const upload = multer({dest: './uploads/'})

router.get('/', async (ctx, next) => {
  ctx.body = 'hello world'
})

router.post('/upload', upload.any(), async (ctx, next) => {
  console.log(ctx.req.body)
  console.log(ctx.req.files)
  ctx.body = {status: 'ok'}
});

app.use(convert(cors()))
app.use(serve('.'))
app.use(router.routes())

app.listen(3000, () => {
  console.log('listending on port 3000')
})