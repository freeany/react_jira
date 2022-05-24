// https://prettier.io/docs/en/options.html#print-width

"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier" // prettier中的规则会覆盖eslint中的规则
    ]
  },



如果你只是添加了几个空格， 那么lint-staged prevented an empty git commit.
lint-staged会阻止你的提交。所以它会帮你检查这次提交是否是一个有效的提交。


如果出现了特殊的情况，需要提交这次被检测出来为空的提交，那么可以在._husky下的pre-commit中给lint-staged添加参数 npx lint-staged --allow-empty。 当提交之后把--allow-empty删除。