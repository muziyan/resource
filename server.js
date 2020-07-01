const koa = require("koa")
const app = new koa();
const Router = require("koa-router")
const router = new Router()
const static = require("koa-static-router")

const fs = require("fs")
const path = require("path")

const ejs = require("ejs")

const resolve = dir => path.resolve(__dirname,dir)

let fileList = fs.readdirSync("./");
let routes = [];
fileList.forEach(v =>{
    let file = fs.statSync(path.resolve(__dirname,v));
    if (file.isDirectory() && v !== ".idea" && v !== "node_modules" && v !== ".git"){
        routes.push(v)
    }
})

let staticList = [];
let data = {
    title:"static resource server",
    item:[]
}
routes.forEach(v=>{
    let dir = v;
    let router = `/${v}`
    staticList.push({
        dir,
        router
    })
    data.item.push({
        url : `./${v}/index.html`,
        title : v
    })
})

router.get("/",(ctx,next)=>{
    let template = fs.readFileSync(resolve("./template.html.ejs"),'utf8');
    ctx.body = ejs.render(template, data);
})

app
    .use(router.routes())
    .use(static(staticList));

app.listen("3000",()=>{
    // let c = require("child_process"),
    //     url = "http://localhost:3000",
    //     cmd = 'xdg-open';
    // c.exec(`${cmd} "${url}"`)
})