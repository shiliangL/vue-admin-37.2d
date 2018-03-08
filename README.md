# vue-admin-37.2D


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

> 代码规范

- 公共组件集中一个文件导出、统一维护管理
- 不同业务逻辑严格区分
- 单文件组件方法遵循按照 vue 生命周期函数书写顺序
- 相同逻辑代码函数统一命名

> 开发总结

- layout 组件




> vue 生命周期

- beforeCreate
```

```
- created
```
created的时候数据已经和data属性进行绑定（放在data中的属性当值发生改变的同时，视图也会改变）。
注意看下：此时还是没有el选项
```
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed
