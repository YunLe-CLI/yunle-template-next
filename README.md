# 基于dva.js + next.js [![Build Status](https://travis-ci.org/hexiao-o/yunle-template-node.svg?branch=master)](https://travis-ci.org/hexiao-o/yunle-template-node)

如使用该前端脚手架，可以先安装

1. `npm install -g yunle-cli`

2. `yunle init node <project-name>`

3. `cd <project-name> && npm install`

4. `npm run dev`

## 开发流程

![开发流程图](docs/images/images.png)

## 相关命令

> 开发过程中，你用得最多的会是`npm run dev`，但是这里还有很多其它的处理：

|`npm run <script>`|用途|
|------------------|-----------|
|`start`|生产环境服务启动在8080端口。|
|`dev`|开发环境服务启动在8080端口。|
|`pm2Stop`|生产环境服务pm2停止服务。|
|`pm2Delete`|生产环境服务pm2删除服务。|
|`pm2List`|生产环境服务pm2启动列表。|
|`pm2Logs`|生产环境服务pm2日志。|
|`test`|启动代码检查，测试。|

## 程序目录

```
.
├── app                      # 应用源文件
│   ├── server.js            # server程序
│   └── router.js            # server路由
├── configs                  # 程序配置文件
│   └── server.conf.js   # 服务器配置文件
├── logs                     # 程序日志
├── themes                   # yunle-cli应用主题
├── nginx                    # nginx配置文件
├── test                     # 单元测试
├── Dockerfile               # dockerfile
├── docker-compose.yml       # docker compose
├── docker-compose.yml       # docker compose
├── nodemon.josn             # nodemon配置文件
└── process.json             # pm2配置文件
```

## mockjs学习

[http://mockjs.com/](http://mockjs.com/)

## rap API文档工具学习

[http://rap.taobao.org/org/index.do](http://rap.taobao.org/org/index.do)
