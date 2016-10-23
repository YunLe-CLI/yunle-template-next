# 基础server

![前后端分离架构](doc/image.png)

开发过程中，你用得最多的会是`npm run dev`，但是这里还有很多其它的处理：


|`npm run <script>`|用途|
|------------------|-----------|
|`start`|生产环境服务启动在1337端口。|
|`dev`|开发环境服务启动在5000端口。|
|`pm2Stop`|生产环境服务pm2停止服务。|
|`pm2Delete`|生产环境服务pm2删除服务。|
|`pm2List`|生产环境服务pm2启动列表。|
|`pm2Logs`|生产环境服务pm2日志。|
|`test`|启动代码检查，测试。|

## 程序目录

```
.
├── app                      # 应用源文件
│   ├── bin                  # koa程序
│   |   └── server.js        # server程序
│   ├── configs              # 程序配置文件
│   |   └── server.conf.js   # 服务器配置文件
│   ├── controller           # 程序控制器
│   ├── dist                 # 静态资源打包目录
│   ├── libs                 # 程序小工具
│   ├── logs                 # 程序日志
│   ├── module               # 程序module目录
│   ├── public               # 主页静态资源源文件
│   ├── routes               # 应用程序路由
│   ├── view                 # 应用程序模板
├── nginx                    # nginx配置文件
├── test                     # 单元测试
├── Dockerfile               # dockerfile
├── docker-compose.yml       # docker compose
├── docker-compose.yml       # docker compose
├── nodemon.josn             # nodemon配置文件
└── process.json             # pm2配置文件
```
