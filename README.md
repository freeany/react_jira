

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
    https://github.com/conventional-changelog/commitlint
    ` npm i commitlint `
    ` echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js `

