

# 规范

问题: 我们每个人的ide，或者相同的ide但是ide的配置不一样导致格式化的代码不一样，甚至说开发之间不同的代码格式化习惯也不一样，但是我们希望在代码仓库中对提交的代码保证统一规范的格式化。这样方便我们对代码格式的统一管理、防止出现因为格式化问题产生文件中大量的代码但是因为格式化问题被修改掉、方便对代码仓库的提交记录进行review。

解决
- 使用统一的ide和统一的配置
  缺点: 配置脱离于项目，可能会对开发者的开发习惯产生影响，延误开发效率，可能会对别的项目产生影响，可能会受到编译器版本的影响。有些依赖于当前电脑的编译器。
- 使用工程化的方式对项目的配置进行统一的管理
  优点： 开发者可以使用任意自己喜欢的格式化工具，项目中会有git 的hook在commit的时候对暂存区的代码进行统一的格式化。

1. 安装prettier依赖
    `npm install --save-dev --save-exact prettier`

2. 创建 .prettierrc.js 配置文件
    https://prettier.io/docs/en/options.html#print-width

3. 添加.prettierignore

4. 此时我们就可以使用 `npx prettier --write .`, 来格式化所有的文件。
   但是，我们不希望每次自己输入命令去执行，希望在commit的时候自动化去执行。

5. 安装lint-staged
    `npx mrm@2 lint-staged`
    node版本需要 `14.19.1` +

6. 修改packjson中的lint-staged配置, 添加对ts,tsx类型文件的支持
    ```json
      "lint-staged": {
          "*.{js,css,md,ts,tsx}": "prettier --write"
      }
    ```
7. 如果项目项目配置中使用了eslint的时候
    prettier和eslint可能会有冲突,  `npm i eslint-config-prettier`
    在package.json中添加
    ```js
      "eslintConfig": {
        "extends": [
          "react-app",
          "react-app/jest",
        + "prettier" // prettier中的规则会覆盖eslint中的规则
        ]
      }
    ```

现在我们在git commit 的时候,   就会自动的进行格式化了。
```js
    备注：如果你只是添加了几个空格， 然后git commit， 那么会出现警告 lint-staged prevented an empty git commit.
    lint-staged会阻止你的提交。所以它会帮你检查这次提交是否是一个有效的提交。

    如果出现了特殊的情况，需要提交这次被检测出来为空的提交，那么可以在._husky下的pre-commit中给lint-staged添加参数 npx lint-staged --allow-empty。 当提交之后把--allow-empty删除。
```

8. 在commit的时候我们想要去规范commit的message
     	  github文档： https://github.com/conventional-changelog/commitlint
    
    - ` npm i commitlint `
    
    -  ` echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js `
    
    - ```js
      cat <<EEE > .husky/commit-msg
      #!/bin/sh
      . "\$(dirname "\$0")/_/husky.sh"
      
      npx --no -- commitlint --edit "\${1}"
      EEE
      ```
    
    - `chmod a+x .husky/commit-msg`  将  `'.husky/commit-msg'`   设置为可执行
    
      
    
      规范文档： https://github.com/conventional-changelog/commitlint/#what-is-commitlint



# mock数据

## 简要说明

由于后端与前端并行开发，所以在前期是没有后端接口可以使用的

所以学会最适合自己的 Mock 数据的方法就非常重要

对比业界常见的 Mock 方案，选择并配置其中最合适的方案

## 常见 MOCK 方案

### 1. 代码侵入 (直接在代码中写死 Mock 数据，或者请求本地的 JSON 文件)

优点：无

缺点：

1. 和其他方案比 Mock 效果不好
2. 与真实 Server 环境的切换非常麻烦，一切需要侵入代码切换环境的行为都是不好的

### 2. 请求拦截

代表：[Mock.js](http://mockjs.com/)

示例：

```
Mock.mock(/\\\\/api\\\\/visitor\\\\/list/, 'get', {
  code: 2000,
  msg: 'ok',
  'data|10': [
    {
      'id|+1': 6,
      'name': '@csentence(5)',
      'tag': '@integer(6, 9)-@integer(10, 14)岁 @cword("零有", 1)基础',
      'lesson_image': "<https://images.pexels.com/3737094/pexels-photo-3737094.jpeg>",
      'lesson_package': 'L1基础指令课',
      'done': '@integer(10000, 99999)',
    }
  ]
})
```

优点：

1. 与前端代码分离
2. 可生成随机数据

缺点：

1. 数据都是动态生成的假数据，无法真实模拟增删改查的情况
2. 只支持 ajax，不支持 fetch

(想要了解 ajax 和 fetch 区别的同学来点[我](https://zhuanlan.zhihu.com/p/24594294))

### 3. 接口管理工具

代表：[rap](https://github.com/thx/RAP), [swagger](https://swagger.io/), [moco](https://github.com/dreamhead/moco), [yapi](https://github.com/YMFE/yapi)

优点：

1. 配置功能强大，接口管理与 Mock 一体，后端修改接口 Mock 也跟着更改，可靠

缺点：

1. 配置复杂，依赖后端，可能会出现后端不愿意出手，或者等配置完了，接口也开发出来了的情况。
2. 一般会作为大团队的基础建设而存在， 没有这个条件的话慎重考虑

### 4. 本地 node 服务器

代表：[json-server](https://github.com/typicode/json-server)

优点：

1. 配置简单，json-server 甚至可以 0 代码 30 秒启动一个 REST API Server
2. 自定义程度高，一切尽在掌控中
3. 增删改查真实模拟

缺点：

1. 与接口管理工具相比，无法随着后端 API 的修改而自动修改



## REST API

一句话总结：URI 代表 资源/对象，METHOD 代表行为

```
GET /tickets // 列表
GET /tickets/12 // 详情
POST /tickets  // 增加
PUT /tickets/12 // 替换
PATCH /tickets/12 // 修改
DELETE /tickets/12 // 删除
```

点 [我](https://segmentfault.com/q/1010000005685904) 了解 `patch vs put` 

