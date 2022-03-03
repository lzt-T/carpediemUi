var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router')();
var path = require('path')
const formidable = require('formidable')
var bodyParser = require('koa-bodyparser');
app.use(bodyParser())
const cors = require("@koa/cors");
app.use(cors())
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});


Router.get('/', async (ctx) => {
    ctx.body = "asd"
})
Router.post('/su', async (ctx) => {
    let form = new formidable.IncomingForm({ multiples: true, uploadDir: path.join(__dirname, 'public'), keepExtensions: true });
    // 调用parse上传
    form.parse(ctx.req, (err, value, files) => {
        if (err) {
            ctx.body = "asddas"
        }
    })

    ctx.body = "asdasd"
})
app
    .use(Router.routes())   	//启动路由
    .use(Router.allowedMethods());
app.listen(3000);  	//端口

