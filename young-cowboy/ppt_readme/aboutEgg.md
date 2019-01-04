title: About_Egg.js
speaker: 小牛仔
highlightStyle:monokai_sublime

[slide]
# Egg.js
Egg.js 为企业级框架和应用而生

[slide]
# 比较
* Express 是 Node.js 社区广泛使用的框架，简单且扩展性强，非常适合做个人项目。但框架本身缺少约定，标准的 MVC 模型会有各种千奇百怪的写法。
* Egg 按照约定进行开发，奉行『约定优于配置』，团队协作成本低。

[slide]
# 特点
* 内置多进程管理
* 基于 Koa 开发，性能优异

[slide]
# begg.js

[http://begg.alibaba-inc.com/zh-cn/begg/index.html](http://begg.alibaba-inc.com/zh-cn/begg/index.html)

[slide]
* Begg 是阿里集团 Node.js 应用 web 框架，基于 Egg.js 开发。
* Begg 基于 Egg.js ，集成了常用的开发插件，并结合阿里 Aone 部署环境开发的 web 应用框架。

[slide]
让我们开始

[slide]
```shell
tnpm install @ali/egg-init -g
ali-egg-init
```

[slide]
```shell
ali-egg-init

? Please select a boilerplate category 
❯ alibaba 
  uc 
  alipay 
  youku 
  opensource 

? Please select a boilerplate type
❯ buc - 适用于基于 buc 的阿里内部应用 
  ali - 适用于阿里集团对外应用 
  columbus - 适用于国际站线上应用 
  lotus - 适用于外综服对外应用 
  plugin - egg 插件 
  canary - 适用于信息平台 Nodejs 应用
```

[slide]
# 运行
```shell
tnpm install
npm run dev
```

[slide]
* app/router.js 用于配置 URL 路由规则，具体参见 Router。
* app/controller/** 用于解析用户的输入，处理后返回相应的结果，具体参见 Controller。
* app/service/** 用于编写业务逻辑层，可选，建议使用，具体参见 Service。
* app/middleware/** 用于编写中间件，可选，具体参见 Middleware。
* app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。
* app/extend/** 用于框架的扩展，可选，具体参见框架扩展。
* config/config.{env}.js 用于编写配置文件，具体参见配置。
* config/plugin.js 用于配置需要加载的插件，具体参见插件开发。
* test/** 用于单元测试，具体参见单元测试。
* app.js 和 agent.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。关于agent.js的作用参见Agent机制。

[slide]
# Router
Router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系
https://eggjs.org/zh-cn/basics/router.html

[slide]
# Controller
负责解析用户的输入，处理后返回相应的结果
https://eggjs.org/zh-cn/basics/controller.html

[slide]
# Service
Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层
https://eggjs.org/zh-cn/basics/service.html

[slide]
# 多进程模型和进程间通讯
https://eggjs.org/zh-cn/core/cluster-and-ipc.html

[slide]
```
+---------+           +---------+          +---------+
|  Master |           |  Agent  |          |  Worker |
+---------+           +----+----+          +----+----+
     |      fork agent     |                    |
     +-------------------->|                    |
     |      agent ready    |                    |
     |<--------------------+                    |
     |                     |     fork worker    |
     +----------------------------------------->|
     |     worker ready    |                    |
     |<-----------------------------------------+
     |      Egg ready      |                    |
     +-------------------->|                    |
     |      Egg ready      |                    |
     +----------------------------------------->|
```

* Master 启动后先 fork Agent 进程
* Agent 初始化成功后，通过 IPC 通道通知 Master
* Master 再 fork 多个 App Worker
* App Worker 初始化成功，通知 Master
* 所有的进程初始化成功后，Master 通知 Agent 和 Worker 应用启动成功* 

[slide]
#Master VS Agent VS Worker

| 类型     | 进程数量         | 作用             | 稳定性  | 是否运行业务代码 |
| ------ | ------------ | -------------- | ---- | -------- |
| Master | 1            | 进程管理，进程间消息转发   | 非常高  | 否        |
| Agent  | 1            | 后台运行工作（长连接客户端） | 高    | 少量       |
| Worker | 一般设置为 CPU 核数 | 执行业务代码         | 一般   | 是        |

[slide]
# Mysql

提供了 egg-mysql 插件来访问 MySQL 数据库

```shell
npm i --save egg-mysql

// config/plugin.js
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
```

https://eggjs.org/zh-cn/tutorials/mysql.html

[slide]
# 部署
todo...
