# 项目构建

``` bash
# 安装项目依赖,仅第一次或者有新包加入的时候需要安装
npm install

# 启动本地启动开发 dev 环境 localhost:8000
npm run dev

# 项目打包 压缩上线
npm run build

```

# 项目结构描述

```
├── build                                       // webpack配置文件
├── config                                      // webpack配置文件
├── src                                         // 源码目录
│   ├── api                                     // 接口文件统一维护
│   ├── assets                                  // 一些静态资源
│   ├── components                              // 组件
│   ├── icons                                   // 项目图标
│   ├── mock                                    // mock接口数据
│   ├── public                                  // 公共所有
│   ├── router                                  // 路由配置
│   ├── store                                   // vuex全局状态管理
│   └── style                                   // 样式相关
│   └── utils                                   // 工具类
│   └── view                                    // 项目系统页面
|       └──layout                               // 系统界面
|       └──login                                // 登录页面
|       └──dashboard                            // 系统首页
|       └──monitor                              // 设备监控
|       └──devices                              // 设备管理
|       └──maintenance                          // 运维管理
|       └──company                              // 企业管理
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件
│   ├── permission.js                           // 权限配置拦截
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件

```