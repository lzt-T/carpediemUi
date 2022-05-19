var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router')();
var path = require('path')
const formidable = require('formidable')
var bodyParser = require('koa-bodyparser');
app.use(bodyParser())
const cors = require("@koa/cors");
app.use(cors())

Router.get('/', async (ctx) => {
    ctx.body = "ok"
})
Router.post('/upload', async (ctx) => {
    let form = new formidable.IncomingForm({ multiples: true, uploadDir: path.join(__dirname, 'public'), keepExtensions: true });
    // 调用parse上传
    form.parse(ctx.req, (err, value, files) => {
        if (err) {
            ctx.body = "ok"
        }
    })
    ctx.body = "ok"
})
app
    .use(Router.routes())   	//启动路由
    .use(Router.allowedMethods());
app.listen(3300);  	//端口

